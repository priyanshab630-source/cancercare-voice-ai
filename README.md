# CancerCare Voice AI — interactive demo

A multilingual, voice-first cancer-support assistant for patients, caregivers and clinicians.
**Demo mode:** everything runs in the browser — no server, no build step, no API keys.

> ⚠️ Educational prototype. Uses synthetic data only (`DEMO-1001`…`DEMO-1006`).
> Not a medical device, not clinically validated, not for real clinical decisions.

## Project structure

```
cancercare-voice-ai/
├── index.html      # page structure + markup for every screen
├── styles.css      # design system and all styling (ivory / navy / teal theme)
├── app.js          # demo data + all application logic
├── README.md       # this file
└── .gitignore
```

Plain static site — no bundler, no dependencies, no framework. `index.html` at the repo root
is all a host needs.

## Run locally

Just open `index.html` in a browser — that's the whole app.

For the live microphone, use **Chrome or Edge** (Web Speech API). Other browsers work via the
text input.

Or serve it (recommended, so the linked files resolve cleanly):

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to Vercel

This repo is a plain static site, so Vercel needs **no build config**.

1. Push this repo to GitHub.
2. Go to <https://vercel.com/new> and sign in with GitHub.
3. **Import** this repository.
4. Framework Preset: **Other**. Build Command: leave empty. Output Directory: leave empty.
5. Click **Deploy**. You'll get a link like `https://cancercare-voice-ai.vercel.app`.

Every later `git push` to the default branch redeploys automatically.

### CLI alternative

```bash
npm i -g vercel
vercel --prod
```

## Deploy to Netlify

Drag-and-drop the repo folder at <https://app.netlify.com/drop>, or:

```bash
npm i -g netlify-cli
netlify deploy --prod --dir .
```

## What it does

- **Login & roles** — Patient, Caregiver, Doctor, Administrator, with role-filtered navigation
  and a persistent **DEMO DATA — NOT REAL PATIENTS** banner.
- **Patient dashboard** — greeting in the patient's language, big voice button, registration
  progress, diagnosis/treatment summary, medication cards, appointment, symptom tracker,
  body-map preview.
- **Voice consultation** — animated mic using the browser's speech recognition and speech
  synthesis, live transcript, language selector, typed input as fallback. Example prompts in
  Hindi, Hinglish and English.
- **Conversational registration wizard** — one question at a time, each confirmed answer saved
  immediately and marked *saved*; unknown fields stay explicitly unknown; live progress bar and
  saved-fields panel.
- **Cancer Information Center** — all **39 cancer categories**, each routed to one of the 12
  specialized support agents, with source-attributed plain-language education.
- **Interactive body map** — SVG front/back views, clickable regions, four toggleable layers
  (documented disease, patient-reported symptom, treatment target, possible medication effect),
  and a detail panel with provenance.
- **Medication dashboard** — active / historical / patient-reported / education / awaiting
  review, with dose, route, frequency, documented reason, common effects, warning signs,
  monitoring and source.
- **Medical records** — upload a file and see a structured extraction for confirmation; OCR
  output is flagged unverified and never auto-applied.
- **Patient report** — summary, clinical overview, missing information, timeline, medication
  education, body-map summary and next steps; printable / save-as-PDF.
- **Clinician dashboard** — authorized patient list, pending verifications, review requests,
  audit log.
- **Settings & privacy** — language, consent toggles, retention, data export, reset-demo.

Data persists in `localStorage`; **Reset demo data** restores the synthetic seed.

## The six synthetic demo patients

All records are fictional and labelled as such. No real patient data is used anywhere.

| ID | Name | Age | Language | Cancer type | Body map |
|----|------|-----|----------|-------------|----------|
| DEMO-1001 | Ananya Sharma | 48 | Hindi | Breast cancer | Breast region |
| DEMO-1002 | Ravi Verma | 62 | Hindi / Hinglish | Lung cancer | Lung region |
| DEMO-1003 | Meera Iyer | 54 | Tamil | Colorectal cancer | Intestinal region |
| DEMO-1004 | Arjun Singh | 35 | Punjabi | Hodgkin lymphoma | Lymphatic system |
| DEMO-1005 | Fatima Khan | 59 | Urdu / English | Ovarian cancer | Pelvic region |
| DEMO-1006 | Dev Patel | 16 | Gujarati | Acute lymphoblastic leukemia (ALL) | Bone marrow (pediatric) |

Illustrative starting records, **not treatment templates**.

## Safety behaviour (built in)

- **Emergency escalation** on severe breathing difficulty, chest pain, confusion, uncontrolled
  bleeding, seizures, severe allergic reactions and fever — in English and Hindi. It stops
  ordinary conversation, points to emergency services (108 / 112 in India) or the oncology team,
  and never reassures from AI analysis alone. Fever deliberately avoids a single universal
  threshold.
- **No prescribing.** Asking "which medicine should I take?" returns a refusal plus an offer to
  explain treatment categories and prepare questions for the oncologist.
- **No fabrication.** Unknown stays unknown; no diagnosis, stage, biomarker or dose is invented.
- **Body map is educational, not diagnostic.** Medication effects are labelled *possible* — a
  medicine name alone never implies organ damage.
- **No prescribing from documents.** An extracted medicine name never becomes a prescription.
- **Audit log** records logins, field saves, uploads, review requests and consent changes.

## Production wiring (this build is a demo adapter)

| Demo stand-in | Production component |
|---|---|
| Browser Web Speech API | Sarvam speech-to-text / text-to-speech / translation (server-side, `SARVAM_API_KEY`) |
| Rule-based intent + cancer-type routing | LangGraph supervisor + 12 specialized agents (LangChain) with a Postgres checkpointer |
| In-memory KB array | pgvector RAG over trusted cancer-education and medication collections |
| `localStorage` | PostgreSQL, Redis, encrypted object storage |
| Client-side upload extraction | FastAPI document endpoint + OCR + the Medical Document Agent |

Suggested stack: React + TypeScript + Vite + Tailwind + shadcn/ui (front end);
FastAPI + Pydantic + SQLModel + PostgreSQL + Redis (back end). Keep all keys server-side in
environment variables, e.g. `SARVAM_API_KEY`, `DATABASE_URL`, `REDIS_URL`, `AUTH_SECRET`,
`LANGSMITH_API_KEY`, `LANGSMITH_TRACING`, `DOCUMENT_STORAGE_CONFIG`,
`HEALTHCARE_INTEGRATION_CONFIG`.

## Licence

Add one if you plan to make this public (e.g. MIT).
