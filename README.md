# cybersage-works

Selected work of Abakwe Carrington (Cybersage), a portfolio for hiring managers and recruiters. It is served at **https://works.cybersage.dev**.

| Route | Page |
| --- | --- |
| `/` | Proof of Work + From the Studio |
| `/testimonials` | Testimonials, each backed by a screenshot of the original |

## How it is deployed

This site is its own Vercel project (`cybersage-works`) on the subdomain `works.cybersage.dev`. It is separate from the main site ([Donrington/TheCybersage](https://github.com/Donrington/TheCybersage), https://cybersage.dev). DNS for `cybersage.dev` is at Namecheap, where `works` is a CNAME to the target Vercel shows under Project → Settings → Domains.

## Content

- `src/data/projects.ts` holds the 24 projects. Every `link` was checked live on 2026-09-30. A project without a `link` has no public deployment, so don't make one up.
- `src/data/studio.ts` holds the 36 interface screenshots.
- `src/data/testimonials.ts` holds 6 testimonials, each with its proof screenshot.
- Images are pre-optimized WebP in `public/shots` and `public/testimonials`. They are capped at 2400px wide, and `next/image` resizes them further per device.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```
