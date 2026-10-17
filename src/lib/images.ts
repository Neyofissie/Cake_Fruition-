// Every photo ships in two widths; `cake()` returns the props for a responsive <img>.
const files = import.meta.glob<string>("../assets/cakes/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});

export type CakeImage = { src: string; srcSet: string; large: string };

export function cake(name: string): CakeImage {
  const small = files[`../assets/cakes/${name}-640.webp`];
  const large = files[`../assets/cakes/${name}-1200.webp`];
  if (!small || !large) throw new Error(`Missing cake image: ${name}`);
  return { src: small, srcSet: `${small} 640w, ${large} 1200w`, large };
}
