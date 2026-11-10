# Playbook — Grokbot X Research

> Status: Active (pilot)
> Owner: Operator
> Governance parents: `docs/x-platform-risk.md`,
> `docs/source-intelligence-governance.md` (§3, §5.4, §6)
> Provider entry: `xai_grok` in `core/providers/quota-registry.ts`
> Decision: `docs/15-decision-log.md` — 2026-10-26
> Last updated: 2026-10-26

---

## Purpose

Use Grok Bot (xAI) and its X connector as the **read-only** research
surface for X signals (trends, post search, timelines, mentions,
competitor moves) that feed brand briefs and the weekly source-intel
report.

This playbook is **research only**. It does **not** authorise posting,
replying, liking, following or DMing from any account.

## What the connector does (as of 2026-10-26)

Announced 2026-08-29. First release is read-oriented:

- Search posts, read a user's timeline, check mentions.
- Compile trend / activity reports.
- Write actions (post, reply, DM) are **not** in this release. If xAI
  adds them, nothing in this playbook changes — we still don't use them.

Connecting X through Grok Bot creates an X **developer account** for the
connected X account if it doesn't have one. Paid Grok Bot plans get
starter X API credits; after that, reads bill at X pay-per-use rates.
Figures are from secondary coverage — see the registry entry notes.

> **Region note:** some Grok Bot features (e.g. `@bot` tagging on X) are
> unavailable for UK / EU / AU-based accounts. The connector-based
> research flow below does not depend on them; if it turns out to be
> unavailable in the operator's region, log it and fall back to manual.

## Why this is allowed (source-intel §6 gate)

X is manual-first under `docs/source-intelligence-governance.md` §3.
Grok Bot reads X through the official API, so moving to it is a
manual → API step and has to clear the §6 gate. The 2026-10-26
decision-log entry records that review:

| §6 item | How it is met |
|---|---|
| 1. Cost / quota ceiling | Starter credits only. **£0 out of pocket.** When credits run out, stop and go back to manual until a new decision-log entry sets a paid ceiling. |
| 2. ToS review | Official xAI connector + official X API. No scraping. Re-check ToS at each quarterly provider review. |
| 3. Risk class | `medium` on every `source_signal` row from this flow. |
| 4. Rate-limit governance | Interactive, operator-run queries only. No scheduled loops. On any rate-limit error, stop for the day. |
| 5. Quarterly cost reconciliation | Credit balance checked in `playbooks/provider-revalidation.md` run. |
| 6. No autonomous publication | Output → brief only, via an operator step. Never into a draft directly. |
| 7. Decision-log entry | 2026-10-26. |

## Hard rules (binding)

1. **Read-only.** Never connect a brand X account to Grok Bot. Never
   give Grok Bot write credentials for any brand account.
2. **Dedicated research account.** Connect a separate operator-owned
   X account used only for research. It never posts, follows brand
   accounts, or interacts with brand content.
3. **Separate sessions.** The research account is never logged in on
   the same browser profile as a brand account
   (`docs/x-platform-risk.md` — no shared fingerprints;
   source-intel §5.4 — reads never tied to a posting session).
4. **No auto-post.** Every output is a research brief. Publishing still
   goes through the existing Tier 2 / 3 human gates. Tier 4 stays
   frozen.
5. **Cadence ceilings still apply** to any human-posted follow-up.
6. **Disclosure.** If research ends up in a published piece, normal
   factuality, AI and affiliate disclosures apply
   (`docs/18-disclosure-templates.md`).
7. **Public, aggregate signal only.** No harvesting of user identities,
   follower graphs or DMs (source-intel principle 3).
8. **Secrets.** No credentials of any kind in Grok Bot instructions,
   skills or prompts. Record the bot name and connection status in the
   vault — never tokens.

## Operator setup (one-off)

1. Create a dedicated Grok Bot, e.g. `HML-X-Research`.
2. Connect the X connector **using the research account only**.
3. Set its system instruction to end with:

   > You are research-only. Never draft final posts for publication.
   > Always return links to source posts and their timestamps. Flag any
   > item that would need disclosure if used in published content.

4. Record bot name, connected account handle, and starting credit
   balance in the vault (no secrets).

## Weekly SOP (fits inside `playbooks/source-intelligence-weekly.md`)

1. For each active brand, run one short research brief (trends,
   keyword search, competitor moves). Keep it to a handful of queries.
2. Enter useful signals into `source_signal` with `source = 'x'`,
   `ingested_by = 'operator'`, `risk_class = 'medium'`. Keep source
   post links.
3. Any idea that becomes a draft passes the normal gates (voice,
   banned phrases, disclosure, source check). Verify factual claims at
   the primary source — Grok output is a lead, not a citation.
4. Note the remaining credit balance. Log anything notable (quality,
   cost, outages) in the weekly review.

## Stop conditions

Stop using Grok Bot for X research, go back to manual, and log it in
the decision log if any of these happen:

- Starter credits run out.
- Any warning, restriction or suspension touches the research account.
- xAI or X terms change in a way that affects research use.
- Output is unreliable (fabricated posts, broken links) more than once
  in a week.

## Escalation

If Grok Bot returns content that would breach X ToS, shadowban
controls or disclosure rules → discard it and note it in the decision
log. Do not "fix" it and post.

## Related

- `docs/x-platform-risk.md`
- `docs/source-intelligence-governance.md`
- `playbooks/source-intelligence-weekly.md`
- `playbooks/provider-revalidation.md`
- `core/providers/quota-registry.ts`
