# Hero start and finish frames

The hero scrubs between two images as the visitor scrolls: a **start frame** (the cake in pieces,
floating) and a **finish frame** (the same cake fully assembled). Generate both with the prompts below,
send them over, and they replace the two stand-in cake photos in `HERO_FRAMES` (`src/lib/content.ts`,
set `fullBleed: true`).

Both frames must share the exact same camera, lighting, background and cake stand, or the crossfade
will jump. Generate the finish frame first, then use it as the reference image for the start frame
(most tools call this "image reference", "structure reference" or "keep composition").

## Settings for both

- **Desktop:** 16:9, at least 2560 × 1440
- **Phone (optional):** 9:16, at least 1440 × 2560. Use the same prompt, but put the cake in the centre of
  the upper 60% of the frame instead of on the right.
- **Negative prompt:** text, letters, logo, watermark, people, hands, extra cakes, clutter, props on the
  left side, harsh shadows, oversaturated colours, cartoon, 3D render look, warped or leaning tiers,
  melting cream, blur on the cake

## Finish frame (generate first)

> Luxury editorial product photograph of a tall two-tier celebration cake standing on a black marble cake
> stand, placed on the right third of the frame. Top tier: smooth ivory fondant with a fine gold-leaf
> edge. Bottom tier: matte black textured fondant with a subtle quilted pattern. A cascade of hand-made
> sugar flowers (ivory peonies, blush roses and deep burgundy ranunculus with a few dark green leaves)
> flows from the top tier down the right side. A small gold acrylic star topper. Seamless soft
> ivory-to-dove-grey studio backdrop with a gentle radial glow behind the cake and a faint thin circular
> light ring echoing the cake's outline. Soft diffused key light from the upper left, delicate shadow
> falling to the right, crisp detail on the sugar petals. Camera at cake height, 50 mm lens, f/5.6, the
> whole cake and stand in focus. The left 45% of the frame is calm, empty, softly lit backdrop with
> space for a headline. A few tiny gold flakes and two or three loose petals floating in the air near the
> cake. Monochrome palette of ivory, black and gold with restrained floral colour. Photorealistic,
> high-end bakery campaign, 8K detail.

## Start frame (use the finish frame as reference)

> Same scene, camera, lighting, backdrop and black marble cake stand as the reference image, unchanged.
> The cake is shown deconstructed, as an exploded view floating in mid-air in a vertical column directly
> above the empty cake stand, in the same position the finished cake occupies. From bottom to top, with
> clear gaps of air between each piece: a round black-fondant cake board edge, two thick golden vanilla
> sponge layers, a smooth disc of white cream filling between them, a third sponge layer, the ivory
> fondant top tier floating separately, then the sugar flowers (ivory peonies, blush roses, burgundy
> ranunculus) hovering loosely around the column, with gold-leaf flakes and the gold star topper drifting
> at the top. Every element sharp, lit like the reference, casting soft shadows downward. The left 45% of
> the frame stays calm, empty backdrop. Photorealistic, high-end bakery campaign, 8K detail.

## Optional: a video between the two frames

For a smoother scroll, make a short clip with a first-frame/last-frame video model (for example Kling,
Veo or Seedance), using the start frame as the first frame and the finish frame as the last. Send me the
clip and I'll turn it into an image sequence that plays frame by frame as the visitor scrolls.

> Locked-off camera, no camera movement. The floating cake pieces descend slowly and stack in order onto
> the black marble stand: sponge layers settle, the cream disc presses in, the ivory top tier lowers into
> place, then the sugar flowers glide in and attach in a cascade down the right side, and the gold star
> topper lands last. Gold flakes keep drifting gently. Smooth, elegant, weightless motion, 5 seconds,
> soft studio light unchanged throughout.
