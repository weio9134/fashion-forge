import { proxy } from "valtio";

const state = proxy({
  intro: true,
  color: '#4F7EC4',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: '/threejs.png',
  fullDecal: '/threejs.png',
})

export default state