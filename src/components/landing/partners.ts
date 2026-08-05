import pwi from "@/assets/pwi.png.asset.json";
import mwm from "@/assets/mwm.png.asset.json";
import viacaoGrajau from "@/assets/viacao-grajau.png.asset.json";
import casaMulher from "@/assets/casa-mulher-paulistana.png.asset.json";
import assistenciaSocial from "@/assets/assistencia-social-sp.png.asset.json";

export interface Partner {
  name: string;
  logo: string | null;
}

export const PARTNERS: Partner[] = [
  { name: "Viação Grajaú", logo: viacaoGrajau.url },
  { name: "PWI Sistemas", logo: pwi.url },
  { name: "CM Comandos Lineares", logo: null },
  { name: "MWM", logo: mwm.url },
  { name: "Casa da Mulher Paulistana", logo: casaMulher.url },
  { name: "Cidade de São Paulo — Assistência Social", logo: assistenciaSocial.url },
];
