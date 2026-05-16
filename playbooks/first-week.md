# Playbook — First Week (operator runbook)

> Concrete, day-by-day actions to take this repo from "planning" to "running".
> Time budget: ~10–12 hours across 7 days. Each item ships its own decision-log entry
> on completion.

---

## Day 1 — Identity & vault (2h)

- [ ] Install 1Password (or Bitwarden), enable hardware-key MFA.
- [ ] Create the parent Gmail accounts following `docs/account-naming-convention.md`:
      `hammedialabs.master`, `hammedialabs.ops`, `hammedialabs.finance`, `hammedialabs.security`.
- [ ] Enable MFA on every parent account, generate + vault recovery codes.
- [ ] Create instances of `vault-template/account-registry-template.md` for each parent account
      **inside the vault**, not in the repo.

**Exit:** every parent account exists, MFA on, recovery codes vaulted.

## Day 2 — GitHub + Cloudflare (1.5h)

- [ ] Sign up GitHub with `hammedialabs.master`; enable Sigstore + 2FA.
- [ ] Create the `HamMediaLabs` private repo (already done).
- [ ] In repo settings: branch protection on `main` (require PR, require CI, require admin review).
- [ ] Sign up Cloudflare with `hammedialabs.master`; enable hardware MFA.
- [ ] In Cloudflare Registrar: reserve the apex(es) per the §3 decision (4 apexes if per-brand path is chosen).
- [ ] Set up `bash` repo-side: `npm install && npm run typecheck && npm test` should all be green.

**Exit:** repo CI green; Cloudflare ready to host.

## Day 3 — Providers (1.5h)

- [ ] Gemini: sign up at `aistudio.google.com`, create an API key, vault it.
- [ ] Groq: sign up at `console.groq.com`, create an API key, vault it.
- [ ] OpenRouter: sign up, deposit $10 to unlock 1,000 RPD on `:free` models, vault key.
- [ ] Populate three instances of `providers/quota-tracker-template.md` (one per provider) in `providers/instances/` (gitignored if needed, or just metadata).
- [ ] Run the smoke test: `GEMINI_API_KEY=… GROQ_API_KEY=… OPENROUTER_API_KEY=… npm run hml -- router-smoke`.

**Exit:** all three providers route a "router ok" response.

## Day 4 — HQ data + heartbeat (1h)

- [ ] Sign up Supabase, create project #1 ("HQ"). Vault the URL + service-role key.
- [ ] In Supabase SQL editor: paste `core/db/schema.sql` and run.
- [ ] Add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` as GitHub Actions secrets on the repo.
- [ ] Trigger `.github/workflows/heartbeat.yml` manually; verify a row appears in `heartbeat`.
- [ ] Seed the `brand` table with the three pilots (status='planning', tier=0):
      ```sql
      insert into brand (slug, name, niche, status, tier)
      values
        ('aiescape',    'AI Escape',           'AI productivity',        'planning', 0),
        ('corpsatire',  'Corporate Theatre',   'Corporate satire',       'planning', 0),
        ('ukescape',    'Escape the Bill',     'UK cost of living',      'planning', 0);
      ```

**Exit:** HQ DB schema live; heartbeat running daily; three brand rows present.

## Day 5 — Dashboard (1.5h)

- [ ] `cd dashboards/app && npm install`.
- [ ] `SUPABASE_URL=… SUPABASE_SERVICE_ROLE_KEY=… npm run dev`; confirm the three planning brands render.
- [ ] Deploy to a Cloudflare Pages project named `hml-dashboard`.
- [ ] Put it behind Cloudflare Access; allow only the operator email.

**Exit:** dashboard rendering portfolio totals + brand table; operator-only auth.

## Day 6 — Compliance baselines (1h)

- [ ] Read `docs/18-disclosure-templates.md` end to end.
- [ ] Decide the operator postal address that will appear in newsletter footers; update `brands/templates/site/src/site.config.ts`.
- [ ] Decide the operator legal entity (sole trader vs. limited co) per the open decision-log entry; log the decision.
- [ ] Resolve the open n8n hosting question; log the decision.
- [ ] Set a calendar reminder for the next quarterly provider re-validation (`playbooks/provider-revalidation.md`).

**Exit:** four open-question decisions resolved; brand site template carries real operator details.

## Day 7 — First brand site live (3h)

- [ ] `cp -R brands/templates/site brands/brand-a-aiescape/site`.
- [ ] Edit `brands/brand-a-aiescape/site/src/site.config.ts` with Brand A's identity.
- [ ] Create a Cloudflare Pages project pointing at this folder.
- [ ] Deploy: index, about, privacy, terms, AI-use, affiliate disclosure, contact — all render.
- [ ] Schedule the cornerstone draft `brands/brand-a-aiescape/drafts/01-free-tier-ai-stack.md` for editorial review.
- [ ] Move Brand A's status from `planning` to `active` in `brand`; tier remains 0.

**Exit:** Brand A site is live (with no content yet) at its apex; ready for cornerstone #1 publish in week 2.

---

## Standing rules for the first 30 days

- One decision-log entry per non-trivial choice.
- Nothing published live without a human pass through `playbooks/content-quality-checklist.md`.
- Weekly review (Saturday morning) is non-negotiable.
- If anything in this runbook takes >2× the budgeted time, stop and log it as a decision/issue rather than push through.
