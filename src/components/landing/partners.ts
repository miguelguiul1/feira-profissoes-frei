import pwi from "@/assets/Nova pasta/PWI.png";
import mwm from "@/assets/Nova pasta/MWM.png";
import viacaoGrajau from "@/assets/Nova pasta/viacao grajau.png";
import casaMulher from "@/assets/Nova pasta/casa da mulher.png";
import assistenciaSocial from "@/assets/Nova pasta/Assistencia e desenvolvimento.png";
import cmComandos from "@/assets/Nova pasta/CM Comandos Lineares.png";
import italoBrasileiro from "@/assets/Nova pasta/Italo Brasileiro.png";
import mapfre from "@/assets/Nova pasta/MAPFRE.png";
import maracatu from "@/assets/Nova pasta/MARACATU DESIGN.png";
import olymp from "@/assets/Nova pasta/OLYMP.png";
import reiDoPallet from "@/assets/Nova pasta/REI DO PALLET.png";
import unisa from "@/assets/Nova pasta/UNISA.png";

export interface Partner {
  name: string;
  logo: string;
}

export const PARTNERS: Partner[] = [
  { name: "Viação Grajaú", logo: viacaoGrajau },
  { name: "PWI Sistemas", logo: pwi },
  { name: "CM Comandos Lineares", logo: cmComandos },
  { name: "MWM", logo: mwm },
  { name: "Casa da Mulher Paulistana", logo: casaMulher },
  { name: "Cidade de São Paulo — Assistência Social", logo: assistenciaSocial },
  { name: "Ítalo Brasileiro", logo: italoBrasileiro },
  { name: "MAPFRE", logo: mapfre },
  { name: "Maracatu Design", logo: maracatu },
  { name: "OLYMP", logo: olymp },
  { name: "Rei do Pallet", logo: reiDoPallet },
  { name: "UNISA", logo: unisa },
];
