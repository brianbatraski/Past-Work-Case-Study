# Deploying to Cloudflare Pages (free) via GitHub

This is the recommended path: push the project to a GitHub repo, connect it to Cloudflare Pages,
and every future `git push` redeploys automatically.

Estimated time: ~10 minutes.

---

## 0. One-time local check (optional but recommended)

```bash
npm install
npm run build      # should finish with a ./dist folder and no errors
```

If that succeeds, you're ready to deploy.

---

## 1. Put the project on GitHub

From the project folder:

```bash
git init
git add .
git commit -m "Waiting Room case study"
git branch -M main
```

Create an empty repo on GitHub (no README/license), then connect and push. Replace the URL with
your repo:

```bash
git remote add origin https://github.com/<your-username>/waiting-room-case-study.git
git push -u origin main
```

> Tip: if you have the GitHub CLI installed, you can do it in one step:
> `gh repo create waiting-room-case-study --public --source=. --push`

---

## 2. Connect the repo to Cloudflare Pages

1. Go to the **Cloudflare dashboard** → left sidebar → **Workers & Pages**.
2. Click **Create application** → **Pages** tab → **Connect to Git**.
3. Authorize Cloudflare to access GitHub (first time only) and **select your repository**.
4. On the **Set up builds and deployments** screen, enter:

   | Setting | Value |
   | --- | --- |
   | **Framework preset** | `Vite` |
   | **Build command** | `npm run build` |
   | **Build output directory** | `dist` |
   | **Root directory** | *(leave blank)* |

5. Expand **Environment variables** and add one (recommended for a clean build):

   | Variable | Value |
   | --- | --- |
   | `NODE_VERSION` | `20` |

6. Click **Save and Deploy**.

Cloudflare installs dependencies, runs `npm run build`, and publishes `dist`. When it finishes
you'll get a live URL like `https://waiting-room-case-study.pages.dev`.

---

## 3. (Optional) Custom domain

In your new Pages project → **Custom domains** → **Set up a custom domain** → enter your domain and
follow the DNS prompts. If the domain is already on Cloudflare, it's essentially one click.

---

## 4. Updating the site

Just push to `main`:

```bash
git add .
git commit -m "Update copy"
git push
```

Cloudflare auto-builds and redeploys. Pull requests get their own preview URLs automatically.

---

## Alternative: deploy straight from your machine (no GitHub)

If you'd rather skip GitHub, you can upload the built site directly with Wrangler:

```bash
npm install
npm run build
npx wrangler pages deploy dist --project-name waiting-room-case-study
```

This prompts you to log in to Cloudflare the first time, then publishes `./dist`.

---

## Troubleshooting

- **Build fails on Cloudflare** — confirm `NODE_VERSION` is set to `20`, and that `package.json`,
  `package-lock.json` (if present), and the `src/` folder were all committed and pushed.
- **Blank page after deploy** — this is a root-level single-page app, so no special base path is
  needed. Hard-refresh to clear cache; check the browser console for the failing asset.
- **Want to change the build output** — Vite outputs to `dist` by default; keep the Pages "Build
  output directory" set to `dist` to match.
