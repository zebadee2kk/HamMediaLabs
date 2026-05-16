# X (Twitter) — Platform Operations Risk & Scheduling Governance

> **Status:** Governance policy. No automation, no API integration, no
> scheduling engine — those land later, *and only behind every gate in this
> document.*
> **Posture:** Treat X as a hostile platform. Account loss is one bad week.
> **Owner:** Operator. Reviewed monthly.

---

## 0. Why this document exists

X is the highest-blast-radius distribution surface in the HamMediaLabs
portfolio:

- API access is metered, gated, and changes without notice.
- Trust signal degrades silently (shadowban, reach throttle) before any
  visible enforcement.
- Account suspensions are often opaque and slow to appeal.
- A suspended brand account on X cannot be replaced cheaply — followers,
  ranking, conversations are gone.

We accept these risks **only** under explicit, documented controls. This
policy is the single source of truth for those controls. Every X-facing
artefact in the repo — Playwright runbooks, scheduling design, n8n
workflows, prompts — must comply with it.

## 1. Threat model

| Vector | Failure mode | Mitigation |
|---|---|---|
| Automation detection | Account suspended on first strike | T2 manual posting only at MVP; conservative cadence ceiling; never reuse residential IP fingerprints across brand accounts |
| Spam classifier | Shadowban, reach throttle | Quality-first cadence; no repeated link-only posts; no follow-loops |
| Policy violation (ToS) | Suspension, often without appeal | Human review every post; no synthesised real-person content; respect platform's AI rules |
| Disclosure failure | FTC / ASA penalty + platform strike | `#ad` in body (not bio); AI label visible on commercial posts |
| Credential compromise | Account hostile-takeover | Hardware MFA; per-brand session isolation; recovery codes vaulted |
| Algorithmic deboost | Slow audience death | Quarterly content-mix review; kill on signal per `playbooks/kill-or-scale-review.md` |
| Mass-reporting / coordinated harassment | Account locked or restricted | Avoid call-out / dunking content; satire never targets identifiable individuals |
| Free-API tier removal | Pipeline breaks overnight | No production dependency on X API. Manual posting only. |

We do **not** trust automated appeal flows to recover a suspended account.

## 2. Rate-limit assumptions (May 2026)

These are floors. **Re-validate every quarter** (`playbooks/provider-revalidation.md`).

| Surface | Posts | Replies | Likes | Follows | Reads |
|---|---|---|---|---|---|
| **Operator policy ceiling (brand account)** | ≤3 / day | ≤20 / day | ≤50 / day | ≤10 / day | unrestricted |
| **Algorithm risk floor** *(below this is fine for any free-tier brand)* | ≤5 / day | ≤50 / day | ≤200 / day | ≤30 / day | n/a |
| **Platform ToS limit** *(point at which Twitter rate-limits or actions you)* | published thresholds are not public; treat any 429 / 503 burst as policy-relevant |

If posting at the platform's published API limit, expect throttling. If a
brand needs more than our operator ceiling, the answer is **another channel**,
not a higher ceiling.

We do not buy "boost" or "verified pro" tier capacity for unproven brands.

## 3. Shadowban & trust-risk controls

Shadowban is degraded reach without notification. We detect it indirectly.

### 3.1 Indicators

- Mean impressions on the brand account fall >40% week-over-week with
  unchanged content quality.
- Replies stop appearing under top tweets (third-party check).
- Search for the brand handle returns the profile but not recent tweets
  for non-followers.

### 3.2 Standing controls (every post)

- No URL in the body of a launch post; first reply only (see §4).
- Plain text first; rich media optional; never *only* an image or link.
- No newly-registered shortlinks (`bit.ly` / fresh custom domains posted on first day).
- No "follow me for more" / "RT and win" / engagement-baiting language.
- No copy-pasted thread structures across accounts.

### 3.3 Detection cadence

- Operator runs a manual shadowban check **once per week** as part of the
  weekly review.
- Any indicator triggers §10 escalation.

## 4. Link placement policy

**Binding rule:** the launch post never carries the external link. The
algorithm penalises off-platform redirects on the originating tweet.

| Content shape | Where the link goes |
|---|---|
| Single-post update with a CTA | First **reply** to the post, by the same account |
| Thread (2+ posts) | Final post of the thread, or pinned reply |
| Reply in a conversation | Acceptable inline if directly relevant to the asked question |
| Quote-tweet | No CTA link; the original post is the surface |
| Reply to a celebrity / large account | **No** affiliate link, **no** brand link unless invited |

We do not use link shorteners that are domain-rotated or known to be
flagged. We do use `brand.example/path` or platform-native rich previews.

## 5. Disclosure policy (binding)

All disclosures live canonically in `docs/18-disclosure-templates.md`.
On X specifically:

- **Commercial / affiliate posts:** `#ad` appears **in the post body**,
  not the bio. Repeat in any thread reply that carries the link.
- **AI augmentation:** `ℹ️ AI-assisted, edited by a human.` line in
  the body of any commercial post and in the bio for AI-heavy accounts
  (Brand B in particular).
- **Sponsored content (paid by a third party):** the canonical wording
  is `[#ad — sponsored by <X>]`; do not use platform's "branded content"
  toggle unless we have a written sponsorship agreement on file.
- **Satire / artistic (Brand B):** EU AI Act Article 50 carve-out applies,
  but disclosure of AI involvement remains required — in the bio, the
  pinned post, and the first 3 seconds of any video.

Disclosure must be unavoidable. `Doesn't count`:

- Disclosure hidden in a thread reply when the link is in the launch post.
- Disclosure in the bio only.
- Disclosure as a hashtag chain like `#sponsored #ad #ad2`.

## 6. Human review gates (codified)

Every post goes through these gates **before** publication. The X account
itself does no auto-publishing in year 1.

| Gate | Who | When | Blocking? |
|---|---|---|---|
| Brand-voice match | Editor | Pre-publish | Yes |
| Banned-phrase scan | Editor | Pre-publish | Yes |
| Disclosure presence | Editor | Pre-publish (commercial only) | Yes |
| Source check on factual claims | Editor | Pre-publish | Yes |
| Reply / quote-tweet target review | Operator | Pre-publish (any non-original post) | Yes |
| Image rights / AI labelling | Operator | Pre-publish (any media) | Yes |
| Cadence ceiling check | Operator | At schedule time | Yes |
| Shadowban indicator scan | Operator | Weekly | Block new posts only on indicator |

These map cleanly onto a future Playwright signup harness — the harness's
job is to pause at every gate that requires a human decision.

## 7. Brand-safe cadence ceilings

| Brand | Posts / week (ceiling) | Replies / day | Threads / week | Notes |
|---|---|---|---|---|
| Brand A — AI Escape | **≤7** (target 4–5) | ≤10 (high-signal subs only) | ≤2 | Long-form blog is the primary surface; X is distribution + commentary |
| Brand B — Corporate Satire | **≤4** (target 3) | ≤5 | ≤1 | TikTok primary; X mirror only. Highest ban risk in the portfolio — see §11 |
| Brand C — UK Escape | **≤3** (target 2) | ≤5 (charity / regulator threads only) | 0 | UK financial Twitter has poor signal-to-noise; X is **de-emphasised** for Brand C |

These ceilings are **per-brand**. Posting from the same fingerprint /
session under another brand counts against that brand's ceiling, never
combines.

### Time-of-day discipline

- No posting before 06:00 or after 23:00 brand-local time.
- No two posts within 90 minutes from the same account.
- No co-ordinated cross-brand posting (would look like a network).

## 8. Scheduling governance

> The scheduler does **not** exist yet. This section defines what the
> scheduler must enforce when it is built.

### 8.1 Max posts per day

- Per brand: ceiling above.
- Across all brands from the same operator session: hard cap **≤5** total
  per day (operator capacity + similarity-fingerprint avoidance).

### 8.2 Thread vs single — decision logic

Use a thread when **two or more** of the following are true:

- The point has more than one concrete sub-claim.
- A CTA / link is needed (must go in the last post — see §4).
- The brand voice rewards expansion (Brand B's "documentary absurdity"
  often does; Brand C rarely does).
- The piece would compress into a single tweet only by hedging.

Otherwise post a single tweet. Threads stitched together to game
engagement count as engagement-baiting (§3.2).

### 8.3 Reply strategy

- Reply only to:
  - On-topic conversations (within the brand's pillars).
  - Quotable original threads from accounts ≥3× brand size (commentary
    that adds value, not piggy-backing).
  - Direct mentions of the brand.
- Never reply to:
  - Layoff / death / harassment threads.
  - Political news cycles, unless the brand has a deliberate pillar.
  - Trending news with affiliate links (looks parasitic).
- Replies that lead to a sale or signup count as commercial; §5 disclosure
  applies.

### 8.4 Safe experimentation boundaries

Experiments allowed only under all of these:

- A pre-registered hypothesis written into a one-line note in the draft.
- A duration ≤14 days.
- A rollback trigger: e.g. "kill if mean impressions drop >30% over 2 weeks".
- No experiment touches disclosure, link placement, or cadence ceilings —
  those are not levers. Voice, format, time-of-day, and topic mix are.

### 8.5 What the scheduler must never do

- Auto-publish without a one-click operator approval (Tier 3) or full
  manual posting (Tier 2). **Tier 4 is frozen for year 1** — see governance.
- Schedule from a stale draft (>72h old) without re-running the human
  gates in §6.
- Bypass the cadence ceiling for any reason — including "the algorithm
  rewarded the last post". Especially that reason.

## 9. Compliance with X's AI / synthetic-media rules

- We **never** synthesise the voice, face, or named identity of a real
  person without explicit written permission. Especially public figures.
- AI-generated imagery used commercially is labelled in the post body and
  in alt text.
- We do not use AI to mass-generate replies that look human-authored.

## 10. Escalation triggers

Trigger one of these → stop posting from the affected account, run the
checks below, and write a decision-log entry.

| Trigger | Immediate action | Recovery checklist |
|---|---|---|
| Single post receives a strike / policy notice | Pause publishing for 7 days | Read the policy citation; rewrite policy section in `docs/18-disclosure-templates.md` if relevant; do not re-publish the offending content |
| Mean impressions drop >40% WoW | Pause for 7 days; run shadowban check | Audit last 14 days of content for §3.2 violations; rotate posting cadence; do not change link policy |
| Account locked / restricted | Pause indefinitely; route through `playbooks/incident-credential.md` if credential-related | Appeal once; if denied, the brand's X presence is killed and the loss is documented in the decision log |
| API access changes that affect a future automation | Re-read this policy; update `core/providers/quota-registry.ts` only after the change is confirmed on the official page; defer any automation work until the change is stable |
| Sustained reply harassment | Mute / block at scale; never engage; pause publishing if the harassment becomes search-visible |

## 11. Brand-specific notes

- **Brand A — AI Escape.** Threads excel here (workflow shapes are
  multi-claim). Hard ceiling 7/week; target 4–5. Engages with vendors
  rarely (commentary, not co-marketing). No replies to AI doom threads.
- **Brand B — Corporate Satire.** Highest ban risk in the portfolio.
  ≤4/week ceiling. Mirror-only — TikTok is primary. Punch up: executives,
  consultants, the operator themselves; never identifiable individuals,
  layoff victims, or specific company employees. EU AI Act Article 50
  disclosure required (see `brands/brand-b-corpsatire/profile.md` §5).
- **Brand C — UK Financial Escape.** X is **de-emphasised** for Brand C
  (poor signal-to-noise). ≤3/week. No financial-promotion content (FCA);
  every monetised reply passes the 3-line check in
  `docs/20-competitive-research.md` §3.3.

## 12. Anti-bot / fingerprint hygiene

When a Playwright runbook eventually drives an X account (future work):

- One residential profile per brand account; never share fingerprints.
- No mass cookie clears between sessions for the same brand.
- No headless-browser signatures; use a real browser binary with a
  persistent profile.
- Time-of-day jitter: never post exactly on the minute.
- Posting cadence ceiling enforced at the runbook level; the operator
  cannot raise it through the runbook UI.

The Playwright social runbook in
`automation/playwright/src/signup_social.ts` already codifies the X
cadence ceiling (`cadenceCeilingPerWeek: 21`). The 21/week was a Phase 4
placeholder; this policy supersedes it — see §13 follow-up.

## 13. Cross-references

Mandatory pre-publish reading for any X-facing PR:

- `brands/x-strategy-brand-playbooks.md` — positioning, content pillars,
  voice per brand. Aligns with this governance doc; if they conflict,
  governance wins.
- `prompt-library/general-secure-skeleton.md` — every X-facing prompt
  must wrap user data in the secure skeleton's `DATA SECTION:` block.
  No untrusted content reaches the model without that wrapper.
- `docs/18-disclosure-templates.md` — canonical disclosure copy.
- `docs/17-style-guide.md` — voice and editorial standards.
- `docs/voice-authenticity-system.md` — voice DNA + anti-AI-slop rules.
- `docs/10-legal-and-platform-risk.md` — lab-wide legal & platform
  posture; X-specific risk lives here.
- `playbooks/kill-or-scale-review.md` — uses §10 indicators as inputs.
- `playbooks/weekly-review.md` — adds the §3 shadowban check to the
  weekly cadence.
- `playbooks/incident-credential.md` — IR for any credential incident.
- `playbooks/provider-revalidation.md` — quarterly re-validation of
  this document's rate-limit assumptions.

### Follow-ups (separate PRs)

1. Bring the cadence ceiling in `automation/playwright/src/signup_social.ts`
   into line with §7 (X currently sits at `21/week`; per-brand ceilings
   are 7/4/3). Behaviour-changing — needs its own PR.
2. Build the scheduling engine described in §8 (engineering work, not
   governance). Must comply with this document on day one.
3. Add a `playbooks/x-incident.md` derived from §10 if X-specific
   incidents start recurring.

## 14. Review cadence

- **Monthly:** operator re-reads §2 (rate limits) and §7 (cadence
  ceilings) and confirms they still match observed reality.
- **Quarterly:** full document review as part of
  `playbooks/provider-revalidation.md`; update via PR.
- **Ad-hoc:** any escalation trigger in §10 forces a same-week edit.

## 15. Out of scope (per Issue #17)

- Posting bots.
- Scheduling engine.
- Analytics integrations.
- API-based publishing.
- DM automation of any kind.

This document is **governance**. The artefacts it governs are built later
in separate PRs.
