import QRCode from "qrcode";

/**
 * O QR Code carrega apenas o identificador opaco (credential_code) da inscrição.
 * Nenhum dado pessoal (nome, e-mail, telefone) é embutido no código.
 */
export function buildCredentialUrl(credentialCode: string, origin?: string) {
  const base =
    origin ?? (typeof window !== "undefined" ? window.location.origin : "https://feira-das-profissoes.lovable.app");
  return `${base}/credencial/${credentialCode}`;
}

/** Extrai o código único de um conteúdo lido pela câmera (URL completa ou código puro). */
export function parseCredentialCode(raw: string): string | null {
  const value = raw.trim();
  const uuid = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i.exec(value);
  return uuid ? uuid[0].toLowerCase() : null;
}

export async function renderQrDataUrl(text: string, width = 720) {
  return QRCode.toDataURL(text, {
    width,
    margin: 2,
    errorCorrectionLevel: "M",
    color: { dark: "#042A7E", light: "#FFFFFF" },
  });
}

/** Gera uma credencial em PNG (identificação da feira + nome + QR + orientação). */
export async function buildCredentialImage(params: {
  fullName: string;
  courseInterest: string;
  credentialCode: string;
  qrText: string;
}): Promise<string> {
  const width = 900;
  const height = 1300;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas indisponível");

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#042A7E";
  ctx.fillRect(0, 0, width, 190);

  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.font = "bold 46px system-ui, sans-serif";
  ctx.fillText("6ª Feira das Profissões", width / 2, 82);
  ctx.font = "26px system-ui, sans-serif";
  ctx.fillText("Instituto Social Nossa Senhora de Fátima", width / 2, 130);
  ctx.fillText("Credencial de acesso", width / 2, 168);

  const qr = new Image();
  qr.src = await renderQrDataUrl(params.qrText, 900);
  await new Promise((resolve, reject) => {
    qr.onload = resolve;
    qr.onerror = reject;
  });
  ctx.drawImage(qr, (width - 620) / 2, 300, 620, 620);

  ctx.fillStyle = "#042A7E";
  ctx.font = "bold 42px system-ui, sans-serif";
  ctx.fillText(params.fullName, width / 2, 260);

  ctx.fillStyle = "#334155";
  ctx.font = "28px system-ui, sans-serif";
  ctx.fillText(params.courseInterest, width / 2, 985);
  ctx.font = "22px monospace";
  ctx.fillText(params.credentialCode, width / 2, 1030);

  ctx.fillStyle = "#042A7E";
  ctx.font = "bold 30px system-ui, sans-serif";
  ctx.fillText("Apresente este QR Code na entrada da Feira", width / 2, 1120);
  ctx.fillStyle = "#64748B";
  ctx.font = "24px system-ui, sans-serif";
  ctx.fillText("Pode ser exibido no celular ou impresso.", width / 2, 1165);

  return canvas.toDataURL("image/png");
}
