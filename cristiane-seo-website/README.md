# Cristiane Abreu — Local SEO & Digital Marketing Website

> ## Deploying from this monorepo
> This project lives in the `cristiane-seo-website/` folder of the `Cristiane11/web` repo (the old site stays untouched in `portfolio/`).
> - **Vercel:** Add New Project → import `Cristiane11/web` → set **Root Directory = `cristiane-seo-website`** → add the environment variables listed below → Deploy.
> - **Local:** `git pull` → `cd cristiane-seo-website` → `npm install` → copy `.env.example` to `.env` and fill in your keys → `npm run dev`.
> - **Booking link:** the "Book time with me" button opens https://calendly.com/cristiane-abreu/seo-project-meeting (configurable via `VITE_BOOKING_URL`).

React + TypeScript (Vite), Tailwind CSS, Redux Toolkit, Firebase (Auth, Firestore, Storage), FullCalendar, TipTap, Sentry, and Vercel serverless functions.

## Features
- **Public pages:** Home, About (with Experience & Skills), Projects, Education, Blog (list + `/blog/:slug`), Contact (message form + "Book time with me" Calendly button). Each page has its own SEO tags, Open Graph tags and JSON-LD (Person, ProfessionalService, BlogPosting). A sitemap and robots.txt are included.
- **Auth:** email/password sign-up, Google sign-in, forgot password, and email verification (a verified email is required to book). Blocked users are signed out.
- **Client area (`/account`):** profile (name, phone, contact email, business name/type/location), a calendar of open slots to book, edit/reschedule/cancel your own appointments, and a message form to the manager.
- **Admin (`/admin`, manager only):** dashboard, calendar manager (create/drag/delete slots, manage bookings), users table (sorted alphabetically, with search, view/edit, block/unblock, delete), bookings table (CSV download and Google Sheets export), messages inbox, blog posts, and a site content & SEO editor.
- **Blog manager:** rich text editor with image upload, cover image, slug, excerpt, tags, SEO title/description, and three statuses (Draft, Scheduled, Published). Social share buttons for Facebook, LinkedIn, X and WhatsApp, plus copy link.
- **Email notification** to `cristipiane@gmail.com` whenever a booking is created, updated or cancelled.

## Colors
| Swatch | Hex | Tailwind class | Used for |
|---|---|---|---|
| Lightest | `#cde7ca` | `brand-lightest` | page/section backgrounds, soft cards |
| Light | `#b2d4b6` | `brand-light` | borders, hover backgrounds, secondary surfaces |
| Medium | `#90b493` | `brand-medium` | accents, highlights, icons, focus rings |
| Muted | `#728370` | `brand-muted` | secondary buttons and borders |
| Darkest | `#4b514a` | `brand-darkest` | headings, body text, primary buttons, header/footer |

**Where to change them:** edit the RGB values of the CSS variables at the top of `src/index.css`. `tailwind.config.ts` maps them to the `brand-*` classes and to the older aliases (`primary`, `accent`, `ink`). If you change colors, also update `theme-color` in `index.html` and `public/favicon.svg`.
**Readability:** use `#4b514a` text on light backgrounds. On `#4b514a` backgrounds use white or `#cde7ca` text. Never put white text on `#90b493` or `#b2d4b6`.

## Run locally
```bash
npm install
cp .env.example .env    # fill in the values (see below)
npm run dev             # http://localhost:5173
npm run build           # production build (type-checks first)
```
The public pages work even without Firebase variables; they use the built-in fallback content.
The `/api/*` functions only run on Vercel. To test them locally, use `npx vercel dev`.

## Firebase setup (project `fir-firstproject-b14ad`)
1. **Web app config:** Firebase console → Project settings → General → *Your apps* → add or select a Web app → copy the values into the `VITE_FIREBASE_*` variables.
2. **Authentication** → Sign-in method → enable **Email/Password** and **Google**.
3. **Authentication → Settings → Authorized domains:** add your Vercel domain (e.g. `your-project.vercel.app`) and your custom domain.
4. **Firestore Database:** create it in production mode.
5. **Storage:** click *Get started*.
6. **Deploy rules and indexes** (Firebase CLI):
   ```bash
   npm i -g firebase-tools && firebase login
   firebase deploy --only firestore:rules,firestore:indexes,storage
   ```
   If Firestore shows a "requires an index" link in the browser console, click it to create that index.
7. **Service account (for the serverless functions):** Project settings → Service accounts → *Generate new private key*. Put `client_email` in `FIREBASE_CLIENT_EMAIL` and `private_key` in `FIREBASE_PRIVATE_KEY`. **Never commit this file.**

### How the manager role works
A user is the manager if either of these is true:
- they log in with a **verified** email listed in `VITE_MANAGER_EMAIL` / `MANAGER_EMAIL` **and** in the list inside `firestore.rules` and `storage.rules` (currently `cristipiane@gmail.com`). Signing in with Google counts as verified.
- their `users/{uid}` document has `role: "manager"` (the admin can set this in the Users table).

Everyone else is a `client`. Clients cannot change their own `role` or `blocked` fields; the security rules enforce this.

## Environment variables (Vercel → Project → Settings → Environment Variables)
| Variable | Where | Purpose |
|---|---|---|
| `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID` | browser | Firebase web config |
| `VITE_MANAGER_EMAIL` | browser | manager email(s), comma separated |
| `VITE_BOOKING_URL` | browser | Calendly link |
| `VITE_SITE_URL` | browser | canonical/share URLs |
| `VITE_SENTRY_DSN` | browser (optional) | production error tracking |
| `VITE_GA_MEASUREMENT_ID` | browser (optional) | Google Analytics 4 |
| `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` | server | Firebase Admin SDK |
| `MANAGER_EMAIL`, `NOTIFY_EMAIL`, `SITE_URL` | server | manager check, notification recipient, links |
| `RESEND_API_KEY`, `RESEND_FROM` | server | booking emails (preferred) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` | server | email fallback (e.g. Gmail + App Password) |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID` | server (optional) | Export to Google Sheet |
| `CRON_SECRET` | server | protects the scheduled-publishing cron |

## Email notifications (Resend)
1. Create an account at resend.com → API Keys → create a key and save it as `RESEND_API_KEY`.
2. Until you verify your own domain, keep `RESEND_FROM="Website Bookings <onboarding@resend.dev>"`. In that test mode Resend only delivers to the email address your Resend account was created with, so sign up with `cristipiane@gmail.com`.
3. **Alternative:** Gmail SMTP. Use `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`, `SMTP_USER=cristipiane@gmail.com`, and set `SMTP_PASS` to a [Google App Password](https://myaccount.google.com/apppasswords).

## Google Sheets export
1. In Google Cloud (same project as Firebase works), enable the **Google Sheets API**.
2. Create a service account → Keys → add a JSON key. Use its `client_email` and `private_key` for `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `GOOGLE_PRIVATE_KEY`.
3. Create a Google Sheet and **share it (Editor)** with the service account email. Copy the sheet ID from its URL into `GOOGLE_SHEET_ID`.
4. Admin → Bookings → **Export to Google Sheet** rewrites the "Bookings" tab. If export isn't configured, a CSV downloads instead; open it with Google Sheets → File → Import.

## Scheduled posts
A Vercel Cron job (`vercel.json`) calls `/api/publish-scheduled` daily at 08:00 UTC. Vercel sends `CRON_SECRET` automatically. Opening the admin dashboard also publishes any scheduled posts that are due. Daily is the limit on the Vercel Hobby plan; on Pro you can change the schedule to hourly.

## Deploy: GitHub → Vercel
1. Push this folder to its own GitHub repository (separate from the old `web` repo).
2. On vercel.com → **Add New Project** → import the repo. The framework should be detected as Vite (build `npm run build`, output `dist`).
3. Add the environment variables above, then deploy.
4. Add the Vercel domain to Firebase **Authorized domains**.
5. Optional: create a Sentry project (React), set `VITE_SENTRY_DSN` and redeploy so production errors are captured.

## Project structure
```
src/
  components/   Layout, Seo, ShareButtons, SlotCalendar, RichEditor, ProtectedRoute
  pages/        public pages, auth pages, client Account
  admin/        admin dashboard pages
  store/        Redux Toolkit slices (auth, posts, appointments, users, availability)
  lib/          firebase, config, api client, helpers, hooks
  data/         static fallback content (text from the previous site)
api/            Vercel serverless functions (firebase-admin)
```

## Ideas to improve
- Two-way **Google Calendar sync** for bookings (Google Calendar API) and `.ics` invites in the confirmation email.
- Send a **confirmation email to the client** too, plus reminders 24 hours before the meeting.
- **Pre-rendering / SSR** (e.g. vite-plugin-prerender or a move to Next.js) for even stronger SEO on blog posts.
- **AI writing helper** in the blog editor (outline, meta description and title suggestions).
- Comments or reactions on posts, a newsletter signup, and automated Lighthouse checks in CI.
