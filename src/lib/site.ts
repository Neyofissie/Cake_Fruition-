export const SITE = {
  name: "Cake Fruition",
  tagline: "Creating Sweet Moments, One Cake at a Time",
  whatsappNumber: "447847996397",
  instagram: "https://www.instagram.com/cakefruition/",
  facebook: "https://www.facebook.com/profile.php?id=61573849115966",
};

export const WHATSAPP_URL = `https://wa.me/${SITE.whatsappNumber}`;

/** WhatsApp deep link, optionally with a pre-filled message. */
export function whatsappLink(message?: string) {
  return message ? `${WHATSAPP_URL}?text=${encodeURIComponent(message)}` : WHATSAPP_URL;
}

export const DEFAULT_ENQUIRY = "Hi Cake Fruition! I'd love to enquire about a custom cake.";

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Order", href: "#order" },
  { label: "Contact", href: "#contact" },
];
