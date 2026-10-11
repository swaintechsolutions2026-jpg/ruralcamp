import koraputRoad from "@/assets/koraput-road.asset.json";
import deomaliClouds from "@/assets/deomali-clouds.asset.json";
import rural from "@/assets/rural.asset.json";
import kanta from "@/assets/kanta_bhasuni_temple.asset.json";
import sabara from "@/assets/sabara_temple.asset.json";
import kolab from "@/assets/kolab_dam.asset.json";
import gupteswar from "@/assets/gupteswar_temple.asset.json";
import duduma from "@/assets/duduma_waterfall.asset.json";
import talamali from "@/assets/talamali1.asset.json";

export const CONTACT = {
  phone: "+91 6371211372",
  tel: "tel:+916371211372",
  whatsapp: "https://wa.me/916371211372",
  instagram: "https://www.instagram.com/rural__camps/",
  facebook: "https://www.facebook.com/ruralcamps/",
  address: ["L-213, Phase-3, Dumuduma,", "Bhubaneswar, Odisha – 751019, India"],
};

export const IMG = {
  koraputRoad: koraputRoad.url,
  deomali: deomaliClouds.url,
  rural: rural.url,
  kanta: kanta.url,
  sabara: sabara.url,
  kolab: kolab.url,
  gupteswar: gupteswar.url,
  duduma: duduma.url,
  talamali: talamali.url,
};

export const whatsappLink = (text: string) =>
  `${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
