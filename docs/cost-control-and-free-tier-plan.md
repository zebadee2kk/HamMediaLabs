# Cost Control, Spend Gates & Free-Tier Escape Plan

> Make HamMediaLabs **explicitly free-first**. Define exactly when and
> why paid services may be approved. Nothing becomes a silent
> dependency.
>
> **Posture:** zero standing cost where possible. Where unavoidable,
> small, named, reviewable, kill-switched.
>
> **Owner:** Operator. Reviewed monthly with the rest of the weekly /
> monthly review cycle.

---

## 1. The £0 MVP stack (approved by default)

Every component below has a working free tier today. No approval
required to use; defaults are documented in `docs/PROJECTHYDRA-MASTER-PLAN.md`
§4.2.

| Layer | Default | Paid trigger |
|---|---|---|
| Source hosting | GitHub | n/a — free for our usage shape |
| Brand site hosting | Cloudflare Pages | Custom domain on Cloudflare Registrar (at-cost) only; Pages tier stays free |
| HQ runtime | Cloudflare Workers + Pages | n/a |
| HQ DB | Supabase free tier (project #1) | §4 (Supabase) trigger |
| Auth (HQ dashboard) | Cloudflare Access free tier | n/a |
| Analytics | Plausible CE self-hosted OR Cloudflare Web Analytics | Plausible Cloud only if self-hosting is a real burden |
| AI router providers | Gemini free / Groq free / OpenRouter `:free` (post-$10 deposit) | §4 (LLM) trigger |
| Workflow orchestration | n8n free (self-host on a tiny VPS) OR GitHub Actions cron | n8n.cloud paid tier only on quota breach |
| Newsletter | Buttondown free (≤100 subs) | §4 (Newsletter) trigger |
| Vault | 1Password (Tier 1) | This is the **one allowed** standing paid line — see §3 |
| CI | GitHub Actions (public-repo allowance / private-repo free minutes) | n/a |

The lab can launch Brand A on this stack at **£0 standing cost** plus
the 1Password line and per-brand domains. See `docs/19-financial-model.md`
§1 for the worked monthly numbers.

## 2. The MVP ceiling (≤£50 / month, hard)

Total standing monthly spend across HamMediaLabs at MVP is **capped at
£50**. This is a hard ceiling — not aspirational. The ceiling stays
in place until aggregate brand revenue crosses £150/month run-rate
(per `docs/PROJECTHYDRA-MASTER-PLAN.md` §11.5 — already in effect).

Inside the £50:

- 1Password ≈ £3
- Domains amortised ≈ £4 (3 brand apexes + lab apex)
- n8n VPS ≈ £5 (if self-hosted; £0 on n8n.cloud free or GitHub Actions cron)
- LLM overage ≤ £15 (post free-tier breach; only if a workload demands it)
- Image / stock ≤ £10 (only when a piece genuinely needs licensed art)
- Headroom ≤ £13

Any month that projects above £50, even by a single line, triggers
the §5 paid-service approval process.

## 3. The one allowed standing paid line

**1Password** (or an equivalent vault). Reason: we do not roll
crypto, and a leaked master credential collapses the entire
portfolio. ~£3 / month is non-negotiable security spend.

Bitwarden self-hosted is an acceptable substitute at £0; the
operator's choice. The point is: a managed vault is mandatory,
the specific vendor is not.

## 4. Per-category paid triggers

A paid line in any of the categories below is allowed only when the
named trigger fires, after the §5 approval process.

### 4.1 Domains
- **Trigger:** brand goes from `planning` to `active`.
- **Cost ceiling:** ≤£12 / yr per apex on Cloudflare Registrar.
- **Approval level:** operator may approve in-line (Tier 0 expense).
- **Decision-log entry:** required, naming the apex and the brand.

### 4.2 LLM (paid tier on any provider)
- **Trigger:** any single workload hits the free-tier ceiling for 2
  consecutive weeks AND cannot be moved to another free-tier slot
  per the router policy.
- **Cost ceiling:** £15 / month aggregate across all paid LLM lines
  at MVP.
- **Approval level:** operator + decision-log entry naming the
  workload and the kill trigger.
- **Kill switch:** the operator can revoke the API key at any time;
  the router falls back automatically.
- **Local-LLM check first:** before paying, walk
  `docs/local-llm-plan.md` §6 evaluation rubric on whether the
  workload can move to local at lower marginal cost.

### 4.3 Supabase
- **Trigger:** any of (a) `brand` table exceeds 25 active rows,
  (b) HQ DB hits 80% of the 500 MB free-tier limit, (c) a Scale-
  stage brand needs automatic backups, or (d) the 7-day inactivity
  pause becomes operationally painful.
- **Cost ceiling:** £25 / month for Supabase Pro on the scaled
  brand's project (not HQ); HQ stays on free until (a) or (b).
- **Approval level:** operator + decision-log entry.

### 4.4 Newsletter
- **Trigger:** a brand crosses 100 subscribers (Buttondown's free
  ceiling) OR an export-to-deliverability problem emerges.
- **Cost ceiling:** £15 / month per brand (Buttondown / Beehiiv
  paid tier).
- **Approval level:** operator + decision-log entry; consider
  whether beehiiv's affiliate programme makes the cost net-neutral
  for Brand A's audience fit.

### 4.5 Video / image tooling
- **Trigger:** a content cadence requires a tool the free tier does
  not support (e.g. ElevenLabs paid voice, Topaz upscaling, Capcut
  Pro on commercial use).
- **Cost ceiling:** £10 / month at MVP.
- **Approval level:** operator + decision-log entry.

### 4.6 Hosting / build (Cloudflare, Vercel, Netlify)
- **Trigger:** Cloudflare Pages 500-builds/month ceiling is hit. If
  it is, the answer is usually "reduce build noise" (commit
  discipline), not pay.
- **Cost ceiling:** £0 at MVP — if Cloudflare paid tier is
  unavoidable, that's a structural change worth its own decision.

### 4.7 SEO / research tools
- **Trigger:** a launched brand crosses ≥2,000 sessions / month AND
  the operator cannot map its top-10 / top-3 queries from Google
  Search Console alone (per `docs/measurement-framework.md` §4.1).
- **Cost ceiling:** £30 / month at MVP (e.g. Ahrefs Lite alternative,
  Sistrix Lite).
- **Approval level:** operator + decision-log entry; subscription
  has a 30-day kill trigger if it doesn't earn its keep.

### 4.8 Stock / imagery licensing
- **Trigger:** a brand publishes a piece that requires a specific
  licensed asset and AI-generated imagery does not fit the editorial
  shape.
- **Cost ceiling:** £10 / month at MVP (single-image or small-pack
  purchase, not subscription).
- **Approval level:** operator can approve in-line per asset.

### 4.9 Accounting / professional services
- **Trigger:** the lab crosses any §6 of `docs/legal-and-resilience.md`
  threshold (regulator letter, law-firm letter, structural-upgrade,
  Brand C >£500 / mo for 3 months).
- **Cost ceiling:** not capped at MVP; this is mandatory professional
  spend when triggered.
- **Approval level:** automatic on trigger; operator engages and
  files decision-log entry.

### 4.10 X API (explicit avoidance policy)
- **Default:** **avoid**. Manual posting only per `docs/x-platform-risk.md`.
- **Trigger to revisit:** the lab has Tier-3 publishing live and a
  *measured* ROI case for moving to X API (e.g. data-pull for
  source-intelligence, where manual is impossible at the volume
  measured).
- **Cost ceiling:** if approved, smallest paid tier only.
- **Approval level:** operator + decision-log entry naming the
  measured ROI case — not a hypothesis, a measured case.

## 5. Paid-service approval process (universal)

Any paid-line addition follows the same five-step gate:

1. **Owner named.** Real human (operator at MVP) takes responsibility
   for the line.
2. **Use case stated.** One sentence. If you can't write the
   sentence, you can't approve the spend.
3. **Cost ceiling set.** Monthly £ figure. Hard cap.
4. **Cancellation trigger named.** "Kill this line if X" — must be a
   measurable condition (not "if it doesn't feel useful").
5. **Decision-log entry filed.** Date, owner, use case, ceiling,
   trigger.

A paid line that is in production without the above is a violation;
revoke immediately.

## 6. Per-brand cost attribution

Every paid line is tagged with a brand or `lab-wide`:

| Tag | Examples |
|---|---|
| `lab-wide` | 1Password, n8n VPS, HQ Supabase line |
| `aiescape` | Brand A's domain, Brand A's newsletter overage |
| `corpsatire` | Brand B's domain, video tooling (when Brand B is the only consumer) |
| `ukescape` | Brand C's domain, Brand C's newsletter overage |

Attribution lets the kill / hold / scale rubric in
`playbooks/kill-or-scale-review.md` cleanly account for "this brand
costs us £X". A brand that can't justify its attributed cost loses
its cost; if the loss is structural, the brand is killed.

## 7. Monthly cost review (operator playbook)

Slotted into the existing monthly review. Time budget ≤15 minutes.

- [ ] Sum of all active paid lines, per category and per brand.
- [ ] Any line approaching its ceiling?
- [ ] Any line above its ceiling? → revoke or write a new decision-
      log entry justifying the new ceiling.
- [ ] Any line silently used >30 days past its cancellation trigger?
      → revoke.
- [ ] Free-tier headroom (Gemini RPD, Groq TPM, OpenRouter RPD,
      Supabase DB MB, Cloudflare Pages builds-month, Buttondown subs):
      flag any at >70% utilisation.
- [ ] New paid services proposed this month: walk the §5 gate for
      each.

The output is one line per active paid service in the operator's
notes (kept off-repo) and a decision-log entry per change.

## 8. Tools that have not justified themselves — kill rules

A paid line is killed when **any** of:

- The cancellation trigger fired and we forgot.
- The line is unused for 30 consecutive days.
- The free-tier alternative we ruled out earlier has materially
  improved (e.g. Groq free tier grows; Gemini paid line shrinks).
- A cheaper alternative now exists.
- The brand the line is attributed to entered `kill`.

Kill steps:
1. Cancel the subscription.
2. Rotate any associated credential (per `playbooks/incident-credential.md`).
3. Remove from the cost-attribution list.
4. File decision-log entry: date, line, reason, lessons.

## 9. Anti-patterns this plan prevents

- Silent dependencies (a paid line nobody owns).
- "Free trial that converts" — every trial has a calendar reminder
  to cancel by day -1.
- Bundle subscriptions where most of the bundle is unused.
- "We need this tool to be serious" framing without a measured use case.
- Two tools that do the same job ("we'll evaluate both for a few
  months") — pick one, decision-log the choice.
- Paid lines added on a Friday and forgotten by Monday.

## 10. Cross-references

- `docs/19-financial-model.md` — the existing year-1 budget envelope
  and worked numbers per phase.
- `docs/PROJECTHYDRA-MASTER-PLAN.md` §11 — budget envelopes; §11.5
  the £75 cap rule already in effect.
- `docs/legal-and-resilience.md` §11 — tax baseline; the
  "single labelled bank account" rule supports clean cost
  attribution.
- `docs/local-llm-plan.md` §3 — local-first workload list reduces
  LLM paid spend.
- `playbooks/provider-revalidation.md` — quarterly review where
  paid-line costs are reconciled.
- `playbooks/kill-or-scale-review.md` — consumes the per-brand
  attribution in §6.
- `core/providers/quota-registry.ts` — free-tier ceilings used at §7.

## 11. Decision-log entry template (for any paid-service adoption)

```
### Date: YYYY-MM-DD
### Decision:
Adopt <service / tier> as a paid line.

### Reasoning:
Owner: <name>.
Use case (one sentence): <case>.
Why the free-tier alternative is insufficient: <reason>.
Local / free-tier alternatives considered: <list>.

### Alternatives considered:
- <alt 1>: rejected because <reason>.
- <alt 2>: rejected because <reason>.

### Cost ceiling:
£<N> / month, hard cap.

### Cancellation trigger:
<measurable condition>.

### Risks:
<silent-dependency risk; replacement-path risk; budget-creep risk>.

### Revisit date:
<+30 days minimum; +90 days for stable lines>.
```

## 12. Out of scope (per #43)

- Buying any domain (the trigger is launch-time, the buying is
  operator action).
- Subscribing to any service (same).
- Implementing billing integrations.
- A bespoke FinOps dashboard (premature; the manual monthly review
  is the right granularity at MVP).
