# Framer Motion–style Business Website for Elementor / WordPress

A modern, animated business/SaaS landing page designed to feel like a
[Framer Motion](https://www.framer.com/motion/) site — smooth scroll-triggered
reveals, staggered fades, parallax depth, and springy hover effects — but built
entirely with **Elementor** so you can edit it visually inside WordPress.

![sections](https://img.shields.io/badge/sections-7-blue) ![elementor](https://img.shields.io/badge/Elementor-Free%20or%20Pro-92003B) ![wordpress](https://img.shields.io/badge/WordPress-6.x-21759B)

---

## What's in this repo

| File | What it is | Where it goes |
|------|-----------|---------------|
| `elementor/framer-motion-business-template.json` | Importable Elementor **page template** with all 7 sections | WP Admin → Templates → Saved Templates → Import |
| `assets/css/framer-animations.css` | Extra motion polish (smooth easing, hover spring, gradient text, blob) | Elementor → Site Settings → Custom CSS |
| `assets/js/framer-scroll.js` | IntersectionObserver scroll-reveal + parallax + count-up | Elementor → Custom Code (or theme footer) |
| `preview/index.html` | Standalone HTML/CSS preview — open in any browser to see the design **without WordPress** | Double-click to open |

> **Tip:** Want to see it *right now* with no setup? Just open `preview/index.html`
> in your browser. It's a faithful static mockup of what the Elementor page builds.

---

## The page sections

1. **Hero** — full-height gradient, headline that fades up word-by-word, dual CTA, animated scroll cue
2. **Trust bar** — "trusted by" logo strip that fades in
3. **Features** — 3 icon cards with staggered entrance + spring hover lift
4. **Showcase** — image/text split with scroll parallax
5. **Stats** — animated count-up numbers
6. **Testimonials** — quote cards that slide in
7. **CTA + Footer** — gradient call-to-action with floating blob

---

## How to use it in WordPress (5 steps)

### Requirements
- WordPress 6.x
- **Elementor** (free works; the JSON uses only free widgets + CSS/JS for motion)
- A theme that works with Elementor (Hello Elementor recommended)

### 1. Import the template
WP Admin → **Templates → Saved Templates** → **Import Templates** →
upload `elementor/framer-motion-business-template.json` → **Import Now**.

### 2. Apply it to a page
Create a new Page → edit with Elementor → folder icon (**Add Template**) →
**My Templates** → **Insert** the imported template.
Set the page to **Elementor Canvas** or **Full Width** under Page Attributes / Page Settings.

### 3. Add the motion CSS
Elementor → **Site Settings** (top-left hamburger) → **Custom CSS** →
paste the contents of `assets/css/framer-animations.css`.
*(Free Elementor: paste it into your theme's Additional CSS at
Appearance → Customize → Additional CSS instead.)*

### 4. Add the scroll JavaScript
**Easiest (no plugin):** install the free *WPCode* or *Insert Headers and Footers*
plugin → add a new **Footer** snippet → paste `assets/js/framer-scroll.js`
wrapped in `<script> ... </script>`.
**Elementor Pro:** Elementor → **Custom Code** → Add New → Location: *End of `<body>`*.

### 5. Tweak content
Open the page in Elementor and replace headings, text, images, and links with your own.
All animations are already wired — they'll just work on your new content.

---

## Customizing the motion

- **Entrance animations** are set per-widget in Elementor under
  **Advanced → Motion Effects → Entrance Animation** (e.g. `fadeInUp`) and
  **Animation Delay** for staggering.
- **Scroll/parallax** comes from `framer-scroll.js` — elements with the class
  `fm-reveal`, `fm-parallax`, or `fm-count` are animated automatically.
- **Easing & hover spring** live in `framer-animations.css` — adjust the
  `cubic-bezier` values to make motion snappier or softer.

See `assets/` files for inline comments documenting every knob.

---

## License

MIT — use it for client work, resell, or learn from it. No attribution required.
