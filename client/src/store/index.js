import { proxy } from "valtio";

const state = proxy({
    intro:true,
    color:"#EFBD48",
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './me.jpg',
    fullDecal:'./me.jpg'

});

export default state;