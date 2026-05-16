# 07 — Risk and Rollback

> Things that can go wrong on launch day. What the operator does
> in each case.

---

## 1. Content correction needed (post-publish)

Per `brands/brand-a-aiescape/qa/factuality.md`:

1. Fix inline.
2. Add `Correction (YYYY-MM-DD):` line above the byline.
3. Keep original wording visible (struck-through / `<aside>`).
4. Log in `docs/15-decision-log.md` if the bug affected a claim
   other pieces rely on.

**Never silently re-edit.** Trust > convenience.

## 2. Disclosure block fails to render on the live URL

This is a **launch blocker** even after deploy.

1. Take the cornerstone offline immediately (rollback per §6).
2. Investigate the rendering bug — most likely the Astro
   component import or the site config.
3. Fix in the brand-site repo; ship as its own PR.
4. Re-verify the live URL renders the disclosure.
5. Re-publish.
6. Decision-log entry: incident, root cause, fix.

## 3. Platform issue (Cloudflare / GitHub / Plausible)

| Symptom | First response |
|---|---|
| Cloudflare Pages 5xx | Wait 5 min; check Cloudflare status; rollback if status page is clean and we're still seeing errors |
| GitHub push rejected | Check branch protection; investigate before forcing anything |
| Plausible analytics dropping events | Note in operator log; continue; capture metrics manually until restored |
| Newsletter provider down | Pause the launch send; resume when restored |

## 4. Site rollback

Per `04-technical-launch-pack.md` §6:

1. Cloudflare Pages → Deployments → Rollback.
2. If still broken: revert the merge commit on `main` and push.
3. If a credential leak is suspected: also run
   `playbooks/incident-credential.md`.
4. If the regression affects future brand sites: fix the
   template (`brands/templates/site/`) in a separate PR.

## 5. Account compromise (Tier-1 credential)

Per `playbooks/incident-credential.md`:

1. **LOCK** within 15 minutes: sign out everywhere, revoke
   sessions, set `HQ_PUBLISH_FREEZE=true`.
2. **ROTATE** credentials in the vault.
3. **ASSESS BLAST RADIUS** using the table in the IR playbook.
4. **AUDIT** connected systems.
5. **UPDATE REGISTRIES** (vault).
6. **POST-INCIDENT REVIEW** within 7 days.

Launch is paused until §6 of the IR playbook closes.

## 6. Platform strike on the X launch tweet

Per `docs/x-platform-risk.md` §10 and
`playbooks/platform-strike-response.md`:

1. **STOP** posting from the affected account for 7 days minimum.
2. **DIAGNOSE** the root cause from §3 / §5 / §6 of the X-risk doc.
3. **DECIDE** appeal vs absorb (single appeal max).
4. **COOLING-OFF** 7–14 days.
5. **SYSTEMIC FIX** within 14 days.

The cornerstone on the brand site **stays live**. Only the X
mirror is affected.

## 7. Newsletter deliverability incident

| Symptom | Response |
|---|---|
| Spam-complaint rate >0.1% on the launch send | Pause sends; investigate list quality; do not send again until resolved |
| Open rate <10% on the launch issue | Investigate (subject line / time of day / inbox-placement spot check); decision-log entry; next send adapted |
| Buttondown / provider account warning | Read the warning fully before acting; respond per their guidance; document |

## 8. Negative reader feedback

- Acknowledge within 24h if the feedback is substantive.
- Update the piece if the feedback is correct.
- Decision-log entry if the feedback identifies a process gap.
- Never delete a comment unless it's spam / abuse.

## 9. Cost-line surprise

If a paid line shows unexpected usage on launch day (e.g. an LLM
quota burns through):

1. Pause the workload using the quota.
2. Check `v_provider_daily` for the cause.
3. If it's a runaway loop (e.g. n8n stuck in retry), revoke the
   API key (rotation per `playbooks/incident-credential.md`).
4. Don't add a paid line in a panic; cost-control governance
   stays in force.

## 10. Operator unavailability

If the operator becomes unable to monitor on launch day (illness,
emergency):

1. The launch is **paused**, not abandoned.
2. The cornerstone stays in `staged`, not published.
3. No automation publishes the piece without the operator.
4. The launch reschedules for when the operator is available.

There is no "Tier 4" autonomous mode that fires the launch in the
operator's absence. By design.

## 11. Hard stops (re-iterated)

Any of these stops the launch on the spot:

- Disclosure block fails to render.
- `staged` markdown doesn't match live HTML.
- `PUBLIC_*` env value visible in rendered HTML.
- Tier-1 credential suspect.
- Operator illness / emergency.
- Cloudflare / GitHub / hosting provider in major incident.

## 12. Cross-references

- `playbooks/incident-credential.md` — credential IR.
- `playbooks/platform-strike-response.md` — platform-strike SOP.
- `brands/brand-a-aiescape/qa/factuality.md` — corrections protocol.
- `docs/x-platform-risk.md` — X-side governance.
- `docs/legal-and-resilience.md` — regulator-letter triggers.
