---
name: asset-studio
description: Generates product photography, editorial imagery, CSS image frames, hover swap pairs, 360 spin sets, GIFs and short video loops for KINETIQ. Use whenever a page needs visual assets, a loader, a hover effect, or a hero film.
---

# Asset Studio

Every visual asset in this project is produced here. Goal: a consistent, art-directed
image system — not a pile of unrelated stock photos.

## 1. Global art direction for all generated imagery

Append these constraints to every image prompt:

```
Seamless studio or environmental setting, single dominant light source from upper-left,
soft falloff, subtle contact shadow grounding the subject, no text, no logos, no brand
marks, no watermarks, no visible props clutter. Palette limited to bone/off-white,
near-black, warm clay, and one acid-green highlight. Photographic, shallow but controlled
depth of field, 35–85mm lens feel, fine grain, no HDR halos.
```

Consistency rules across a set:

- Same light direction in every frame of the same product. If frame A lights from upper-left,
  frame B must too — otherwise the hover swap reads as a glitch.
- Same background family within a collection, not within the whole site. TERRA gets warm
  sand gradients, PULSE gets cool graphite, FORM gets flat bone.
- Same crop ratio. Cards are 4:5. Gallery is 1:1. Editorial hero is 3:4 or full-bleed 16:9.
- No shoe should be shown with a real competitor's silhouette, sole pattern, or logo position.

## 2. Asset recipes

### Product hero (card + gallery)
> Studio product photograph of a single [collection] sneaker, [colorway name], [material
> description], floating at a three-quarter angle, laces tied, seamless [background] backdrop,
> soft upper-left key light, subtle shadow beneath, ultra-sharp detail on stitching and
> midsole texture, centered with generous negative space.

Ratios: 4:5 for cards, 1:1 for gallery, 1:1 transparent PNG for spin frames.

### Hover swap pair
Same prompt, two angles: one profile three-quarter, one toe-forward slight low angle.
Identical lighting, identical shadow, identical background. Export as separate files.
The hover animation is a crossfade plus a 2% scale — it only works if the two frames
have the same framing.

### Editorial / lookbook
> Editorial fashion photograph, model mid-stride wearing [collection] sneakers, [environment],
> hard directional sunlight, long shadow, motion blur in the limbs, film grain, muted palette,
> cropped at the waist, no face visible, no visible logos.

Cropping at the waist avoids fabricated faces and keeps the focus on the product. This is
both an art choice and a practical one.

### Collection tile
> Overhead flat-lay of [collection] sneakers arranged on [surface], directional light,
> negative space in the upper third for typography, editorial composition, no text.

Upper-third negative space matters — the collection tile places type there.

### 360 spin set
24 frames, 15° increments, full rotation. Requirements for smoothness:

- Identical camera height, distance, focal length, and light on every frame.
- Subject rotates, camera stays fixed. Not the other way around.
- Transparent background (PNG with alpha) or a perfectly flat seamless backdrop.
- Consistent pivot: the shoe's center of mass stays at the same pixel position.
- Generate as one long contact sheet if the tool supports it, then slice — this guarantees
  frame consistency far better than 24 independent generations.
- Naming: `spin-00.png` through `spin-23.png`. Compress to AVIF, keep PNG masters in
  `/assets/spin-source/` (git-ignored).

If 24 consistent frames are not achievable, ship 12 frames and slow the rotation. Twelve
clean frames beat twenty-four jittery ones.

## 3. Image frames (code, not images)

Frames are CSS/SVG mask containers so they stay crisp at any size and can be animated.
Build in `components/motion/ImageFrame.tsx` with variants:

| Variant | Implementation | Use |
|---|---|---|
| `arch` | `border-radius: 999px 999px 0 0` | collection tiles, team portraits |
| `blob` | SVG path clip-path, organic edge | editorial callouts |
| `tear` | clip-path polygon with one ragged edge | lookbook panels |
| `strip` | fixed 3-up horizontal grid with 2px gaps | film-strip section |
| `duplicate` | two stacked images, one at 6% opacity offset 12px | product spotlight |
| `inset` | outer frame with a padded inner image | spec/detail shots |

Each frame accepts `radius`, `inset`, `caption`, and a `reveal` prop that clips from bottom
to top on scroll-enter. All frames must accept `prefers-reduced-motion` and render the
final state without a clip animation.

## 4. Motion assets: GIF vs video

Default to video. A 6-second 800px GIF is 3–6MB; the same loop as MP4/WebM is 300–600KB
and looks better.

**Hero loop** — MP4 + WebM, 1920×1080, 8–12s, 24fps, no audio, `<video autoplay muted loop
playsinline poster>`, `preload="none"` below the fold. Poster frame is a real frame, not a
black screen.

**Collection banner** — 1600×900, 6–8s loop, first and last frame visually identical so the
loop is seamless.

**Hover micro-loop** — only for 2–3 signature products. WebM, 640×800, 3s, under 400KB.
GIF acceptable only under 800KB and only as a fallback.

**Rules.** No audio track at all. No autoplaying video with motion that could discomfort
(no rapid flashing, no strobing). Pause on reduced-motion by showing the poster. Lazy-load
everything below the first viewport. Never let a video block LCP — hero video gets
`poster` + `<link rel="preload">` on the poster image, not the video.

**Loader animations.** Hand-built SVG/CSS, not Lottie files or GIFs. A shoe-sole outline
that draws itself in 900ms, or a marquee of the word KINETIQ. UI feedback should cost
0KB of extra payload.

## 5. Alt text and provenance

Every asset gets:

1. A committed prompt file in `assets/prompts/<slug>.txt` — the exact prompt used.
2. Alt text written for a screen-reader user, describing the product ("KINETIQ PULSE 3 in
   acid lime, three-quarter view, floating on graphite"), not the art direction.
3. Decorative images marked `alt=""` — especially frames and background textures.

## 6. Fallback when no image generation is available

Do not leave empty boxes. Build generated-looking art in code:

- Product placeholders: layered radial gradients in the collection palette, a subtle noise
  overlay via SVG feTurbulence, and a silhouette drawn as an SVG path. Looks deliberate.
- Editorial: oversized typographic compositions using the display font, tight leading,
  accent underline. Reads as intentional art direction.
- Frames and motion assets: unaffected — they are code already.

Ship placeholders that look designed, then swap real images in later without touching
component code (assets are referenced through a single `lib/assets.ts` map).
