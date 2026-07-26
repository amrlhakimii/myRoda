# myRoda

Track Every Service. Every Fuel. Every Journey.

A vehicle maintenance, fuel, and expense tracker built for Malaysian car and motorcycle owners. Register your vehicles, log every workshop visit and refuel, set maintenance/road tax/insurance reminders, and see your spending on a live dashboard — all synced in real time.

## Tech stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4
- **Routing:** React Router
- **Forms:** React Hook Form + Zod
- **Data:** TanStack Query (bridged to live Firestore subscriptions), Zustand for client state
- **Charts:** Recharts · **Calendar:** react-calendar · **Dates:** Day.js
- **Backend:** Firebase Authentication (email/password) + Cloud Firestore
- **Deployment:** Netlify

## 1. Set up Firebase

1. Go to the [Firebase console](https://console.firebase.google.com/) and create a new project (or use an existing one).
2. **Authentication** → Sign-in method → enable **Email/Password**.
3. **Firestore Database** → Create database → start in production mode, pick a region close to Malaysia (e.g. `asia-southeast1`).
4. Once created, go to **Project settings** → **Your apps** → add a **Web app**. Copy the `firebaseConfig` values shown.
5. In Firestore, publish the security rules in [`firestore.rules`](./firestore.rules) (Firestore → Rules tab, paste the contents, Publish). These rules make sure each user can only read/write their own vehicles, service records, fuel records, reminders, and notes.

## 2. Configure environment variables

Copy the example env file and fill in the values from step 1.4:

```bash
cp .env.example .env
```

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Until these are filled in, the app still runs — auth pages show a "Firebase isn't connected yet" banner instead of crashing, so you can preview the UI before wiring up a real project.

## 3. Run locally

```bash
npm install
npm run dev
```

Open the printed local URL. Register an account, then start adding vehicles.

Other scripts:

```bash
npm run build     # type-check + production build to dist/
npm run preview   # preview the production build locally
npm run lint      # eslint
```

## 4. Deploy to Netlify

This repo includes [`netlify.toml`](./netlify.toml) with the build command, publish directory, and SPA redirect already configured.

1. Push this repo to GitHub/GitLab/Bitbucket (or use `netlify deploy` from the CLI).
2. In Netlify, **Add new site → Import an existing project**, pick the repo. Build command and publish directory are picked up automatically from `netlify.toml`.
3. Under **Site settings → Environment variables**, add the same `VITE_FIREBASE_*` variables from your `.env`.
4. Deploy. Netlify handles the rest — every push rebuilds and redeploys.

In the Firebase console, add your Netlify domain (e.g. `your-site.netlify.app`) under **Authentication → Settings → Authorized domains** so sign-in works in production.

## Project structure

```
src/
├── assets/brand/        # logo SVGs
├── components/
│   ├── common/           # Button, Input, Modal, Card, Toast, ComingSoon…
│   ├── layout/            # AppShell, Sidebar, BottomNav, Topbar, AuthLayout
│   ├── forms/             # Vehicle/Service/Fuel/Reminder/Note forms
│   ├── vehicle/           # Vehicle detail tabs (Overview/Service/Fuel/Reminders/Notes)
│   ├── dashboard/         # Dashboard widgets
│   ├── fuel/              # Consumption stats
│   └── expenses/          # Recharts expense charts
├── pages/                # Route-level pages
├── hooks/                # Firestore-backed TanStack Query hooks
├── services/
│   ├── firebase/          # Firebase app/auth/firestore init
│   ├── auth/               # Auth actions (register/login/logout/reset)
│   └── firestore/          # Typed CRUD per collection
├── store/                # Zustand stores (auth, active vehicle, toasts)
├── types/                # Domain types (Vehicle, ServiceRecord, FuelRecord…)
├── lib/validation/       # Zod schemas
├── utils/                # Formatters, fuel/reminder/expense calculations
└── routes/               # React Router setup
```

## Feature scope

- **Phase 1 (MVP):** Auth, multi-vehicle management, service history with parts/components tracking, fuel tracker with consumption analysis, dashboard.
- **Phase 2:** Maintenance calendar, service/road tax/insurance reminders, expense analytics with charts.
- **Phase 3 (stubs):** AI maintenance assistant and PDF report export are shown as "Coming soon" — they need a backend (Cloud Functions / an LLM API) beyond Firebase Auth + Firestore.
