# SBN207 Liquid Cooling Tracker — PWA

Standalone, offline-capable PWA for tracking SBN207 liquid-cooling equipment
inventory (per unit) and electrical-room MSDB verification. Touch-optimized for
the Zebra (Windows) tablet. No dependencies — pure HTML/CSS/JS + SVG.

## Files
- `index.html` — the app (self-contained)
- `manifest.json` — PWA manifest (installable, standalone)
- `sw.js` — service worker (offline app-shell cache: `sbn207-lc-v1`)
- `icon-192.png`, `icon-512.png` — app icons

## Deploy to GitHub Pages (same workflow as SBN Daily Rounds)
1. Create a new repo (e.g. `sbn207-lc-tracker`) under your GitHub account.
2. Copy all files in this folder to the repo root.
3. Commit + push:
   ```
   git add .
   git commit -m "SBN207 Liquid Cooling Tracker PWA"
   git push
   ```
4. In the repo: **Settings → Pages → Build & deployment → Source: Deploy from a branch**,
   branch `main` (or `master`), folder `/ (root)`. Save.
5. Wait ~1 min. Your app is live at:
   `https://<your-username>.github.io/sbn207-lc-tracker/`

## Install on the Zebra tablet
1. Open the GitHub Pages URL in **Chrome/Edge** on the tablet.
2. Browser menu → **Install app** (or "Add to Home screen").
3. Launches full-screen (standalone), works offline after first load.

## Updating later
- Edit `index.html`, bump the `CACHE` version in `sw.js` (e.g. `sbn207-lc-v2`),
  commit + push. The new service worker will replace the old cache on next load.
- If git won't detect a changed PNG icon: `git rm --cached icon-512.png` then re-add.

## Notes
- Inventory state is stored in the browser's localStorage, per device.
- The in-app **Export / Import Backup (JSON)** buttons move state between devices.
- Touch best practices applied (no `disabled` buttons, no auto window.open).
