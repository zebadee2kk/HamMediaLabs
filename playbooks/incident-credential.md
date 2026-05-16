# Playbook — Credential Compromise

> Promoted from `docs/09-security-and-secrets.md` §Incident response.
> If you are reading this because an incident is in progress, follow the steps in
> order. Do **not** skip to "Rotate" without first locking.

---

## 0. Triggers

Any of the following starts this playbook:
- An unrecognised sign-in alert on a parent or brand account.
- A leaked credential warning from a vendor (Have I Been Pwned, GitHub secret scanning, gitleaks).
- An unexplained billing event or quota burst.
- A public message (DM, mention, email) claiming control of any account.
- A team member reports a lost / stolen device.

## 1. LOCK (within 15 minutes)

1. Open the password vault.
2. For the affected account:
   - Sign out all sessions from the provider's security page.
   - Revoke all active sessions, API keys, OAuth grants, and personal access tokens.
   - Disable the account if the provider allows it without losing recovery.
3. If the affected account is a **parent** account (master Gmail, GitHub, Cloudflare, password vault itself), also:
   - Sign out everywhere on the linked recovery email.
   - Rotate the vault master password immediately.
   - Re-enrol MFA on a fresh device if the previous MFA factor is suspect.
4. Set `HQ_PUBLISH_FREEZE=true` in the HQ environment variables (or equivalent kill-switch flag) to halt all automated writes/publishes until the incident is closed.
5. Take an evidence screenshot of the security/audit log for the affected account before any rotation.

## 2. ROTATE

1. Generate new credentials in the vault (random 24+ char password if password; new API key if API).
2. Update the credential on the provider.
3. Update the credential in the HQ environment store and any downstream config (Cloudflare env vars, GitHub Actions secrets, n8n credentials).
4. Verify the new credential works with a smoke test (e.g., the LLM router's per-provider smoke test for AI keys).
5. Log the rotation in `vault-template/api-key-registry-template.md` instance for that key.

## 3. ASSESS BLAST RADIUS

Build a quick blast-radius table. Stop reading credentials and *think*:

| Question | Yes → action |
|---|---|
| Was a payment method exposed? | Cancel card; notify bank; rotate any auto-billed services that used it |
| Was the email account exposed? | Audit "sent" folder for fraudulent emails; audit inbox rules for malicious forwarders; check connected apps |
| Was the GitHub account exposed? | Audit repo access; look for new SSH keys, deploy keys, OAuth apps; force re-auth of all collaborators; rotate all repo secrets |
| Was the Cloudflare account exposed? | Audit DNS records (look for added MX / TXT / subdomain hijacks); audit Workers / Pages projects; rotate API tokens |
| Was a brand social account exposed? | Sign out everywhere; rotate password; review post history for unauthorised posts; if posts went out, delete + post a brief correction |
| Was the password vault itself exposed? | This is "all hands on deck" — rotate **every** credential in the vault; treat anything stored as compromised |

## 4. AUDIT CONNECTED SYSTEMS

- Pull the last 14 days of:
  - Provider sign-in logs (where available)
  - Cloudflare audit log
  - GitHub audit log
  - Supabase logs (if HQ DB)
  - n8n execution log
- Look for: unfamiliar IPs, off-hours activity, unfamiliar user agents, new app installations, new webhooks, new repo collaborators.
- If anything looks suspicious that isn't already addressed, open a new sub-incident and treat that account as compromised.

## 5. UPDATE REGISTRIES

- Update the affected account's row in the vault registry (status, last-rotation date, incident reference).
- Update the API key registry (rotation date, kill-switch documented).
- File a decision-log entry: date, accounts affected, root cause hypothesis, blast radius, remediation, next-review date.

## 6. POST-INCIDENT REVIEW (within 7 days)

- Root cause: phishing? device loss? credential reuse? supply chain? hook missing?
- What detection failed? (Should we add an alert? A gitleaks rule? An MFA factor?)
- What's the systemic fix? (e.g., move all parent accounts to hardware keys.)
- Update `docs/09-security-and-secrets.md` if the policy needs to change.
- Record the systemic fix in the decision log with an owner and date.

## 7. CLOSURE CHECKLIST

- [ ] All rotations done and verified
- [ ] Blast-radius table walked end-to-end
- [ ] Registries updated
- [ ] Decision-log entry filed
- [ ] `HQ_PUBLISH_FREEZE` cleared
- [ ] Post-incident review scheduled (and held within 7 days)
- [ ] Systemic fix identified and assigned

## 8. Hard rules

- Never reuse a compromised credential, ever.
- Never recycle a compromised email alias for the same purpose.
- Never store recovery codes only inside the password vault that they recover.
- After any Tier-1 incident, the operator does a 30-day standdown on launching new brands.
