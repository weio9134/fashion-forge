import { proxy } from "valtio";

export type StateProp = {
  intro: boolean;
  color: string;
  isLogoTexture: boolean;
  isFullTexture: boolean;
  logoDecal: string;
  fullDecal: string;
}

const initValue: StateProp = {
  intro: true,
  color: '#4F7EC4',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: '/personal_logo.png',
  fullDecal: '/personal_logo.png',
}

const state = proxy(initValue)

export default state