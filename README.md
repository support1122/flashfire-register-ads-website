# flashfire-register-ads-website

Next.js registration landing for Flashfire (Calendly, geo, analytics, campaign tracking).

See `.env.example` for required environment variables.

## Deploy on Vercel

Import this repo in Vercel, add env vars from `.env.example`, and deploy. You get a production URL like `https://<project>.vercel.app` (paths `/register`, `/register/book-a-demo`, `/meeting-booked` work as built).

To use a **custom hostname** without changing the main marketing site repo, add a **subdomain** in your DNS (e.g. `register.flashfirejobs.com`) and assign it to this Vercel project under **Settings → Domains**. The exact path `www.flashfirejobs.com/register` on the same project as the main homepage would require that domain’s app to route `/register`—this project is intended to stay **standalone**.
