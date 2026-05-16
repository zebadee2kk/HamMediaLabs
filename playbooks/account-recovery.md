# Playbook — Account Recovery Matrix

> Walks each account class with its MFA factor, recovery path, owner,
> and last-tested date. **Tested annually.** No live credentials in
> this file — only the structure. Real values live in the password
> vault.
>
> Spec: `docs/legal-and-resilience.md` §4 and §8. Tier definitions:
> `docs/09-security-and-secrets.md`.

---

## 0. Annual recovery test

Once a year, the operator runs this drill:

1. Log out of one Tier 1 account.
2. Use the documented recovery path (recovery code, hardware key, or
   emergency-kit envelope as appropriate).
3. Log back in successfully.
4. Generate a fresh recovery batch; vault it; archive the old one
   off-repo.
5. Record the test in `docs/15-decision-log.md`.

If any step fails, treat it as an incident and run
`playbooks/incident-credential.md`.

## 1. The matrix

Maintain this matrix as a vault-side table (not committed). The
template below mirrors the columns; the operator copies it into the
vault and fills the redacted cells offline.

```
| Account class            | Specific service       | Owner   | Tier | MFA factor                | Recovery path                           | Backup contact email | Last tested  |
| ------------------------ | ---------------------- | ------- | ---- | ------------------------- | --------------------------------------- | -------------------- | ------------ |
| Master Gmail             | hammedialabs.master    | Op      | 1    | Hardware key + recovery   | Vaulted recovery codes                  | n/a                  | YYYY-MM-DD   |
| Backup Gmail             | hammedialabs.ops       | Op      | 1    | Hardware key + recovery   | Vaulted recovery codes                  | master Gmail         | YYYY-MM-DD   |
| Identity / vault         | 1Password (or alt)     | Op      | 1    | Hardware key + biometric  | Emergency-kit envelope (offline)        | n/a                  | YYYY-MM-DD   |
| Source hosting           | GitHub                 | Op      | 1    | Hardware key              | Vaulted recovery codes + Recover Account flow | master Gmail   | YYYY-MM-DD   |
| Infra / DNS              | Cloudflare             | Op      | 1    | Hardware key              | Vaulted recovery codes; account email   | master Gmail         | YYYY-MM-DD   |
| Domain registrar         | Cloudflare Registrar   | Op      | 1    | (inherits Cloudflare MFA) | Same as Cloudflare                      | master Gmail         | YYYY-MM-DD   |
| HQ data                  | Supabase               | Op      | 1    | Hardware key + TOTP       | Vaulted recovery codes                  | master Gmail         | YYYY-MM-DD   |
| LLM provider             | Gemini / Google AI     | Op      | 2    | Hardware key              | Google account recovery                 | master Gmail         | YYYY-MM-DD   |
| LLM provider             | Groq                   | Op      | 2    | TOTP (no HW key option)   | Provider account recovery flow          | master Gmail         | YYYY-MM-DD   |
| LLM provider             | OpenRouter             | Op      | 2    | TOTP                      | Provider account recovery flow          | master Gmail         | YYYY-MM-DD   |
| Newsletter               | Buttondown / Beehiiv   | Op      | 2    | TOTP                      | Provider account recovery flow          | brand alias          | YYYY-MM-DD   |
| Brand X account          | per-brand              | Op      | 2    | SMS (platform default)    | Vaulted recovery codes; SIM PIN on      | brand alias          | YYYY-MM-DD   |
| Brand TikTok / IG / YT   | per-brand              | Op      | 2    | Best available            | Provider flow                           | brand alias          | YYYY-MM-DD   |
| Brand Reddit             | operator persona       | Op      | 2    | TOTP                      | Provider flow                           | master Gmail         | YYYY-MM-DD   |
| Disposable / lab         | per-test               | Op      | 3    | TOTP                      | None (account is throwaway)             | n/a                  | n/a          |
```

## 2. Notes per row

### 2.1 Master Gmail
- Recovery email = backup Gmail; backup phone is operator's SIM (PIN-protected).
- Recovery codes vaulted. Annual test mandatory.

### 2.2 Backup Gmail
- Created **explicitly to serve as recovery**. Not used for any other purpose.
- No third-party app grants. Periodic OAuth audit (§3 of `docs/legal-and-resilience.md`).

### 2.3 Identity / vault
- Master password lives in the operator's head + the sealed
  emergency-kit envelope at a trusted offline address.
- Vault recovery secret (1Password Secret Key etc.) vaulted in the
  same envelope.
- Annual test = retrieve the envelope, log in, restore a test item, reseal.

### 2.4 GitHub
- SSH keys per machine, rotated when a machine is retired.
- Personal access tokens (PATs) scoped narrowly; expiry ≤90 days.
- Org-level audit log reviewed quarterly.

### 2.5 Cloudflare
- Account API tokens scoped per integration (n8n, GH Actions deploy).
- Tokens rotated on incident or every 180 days.

### 2.6 Supabase
- Service-role key is Tier 1 (`docs/09-security-and-secrets.md` §Tier 1).
- Anon key is Tier 2 (RLS-bound).
- Both rotated on incident or every 180 days.

### 2.7 Brand X (Twitter)
- Most fragile recovery in the matrix. SMS-only second factor on many
  legacy accounts; SIM is on a carrier with port-out PIN and a
  separate online-account PIN.
- Email = brand alias (so a Twitter recovery email leak doesn't reach
  the operator's primary inbox).

### 2.8 Brand TikTok / IG / YouTube
- Brand-account model for YouTube (not personal channel) so the
  account is transferable.
- TikTok and IG: best-available MFA today; revisit at next quarterly
  review for new options.

### 2.9 Disposable / lab
- No annual test. Account is destroyed after the test concludes.
- Never linked to brand or master accounts.

## 3. SMS hardening

For any account that requires SMS as a factor:

- Operator's SIM has a **port-out PIN** with the carrier (UK: call
  the carrier and confirm in writing).
- Operator's **online carrier account** has a separate password +
  MFA (not the same as the SIM PIN).
- The SMS-recovery number is **not** reused as the recovery for any
  Tier 1 account (those are hardware-key + recovery-code paths).

## 4. Lost-device drill

Annual, paired with the recovery test:

- Pretend the operator's primary phone is lost. Walk through which
  accounts are blocked and how to recover each.
- Pretend the operator's primary laptop is lost. Same.
- Update this playbook if any account's recovery path proved fragile.

## 5. Compromise drill

Separately, the operator runs `playbooks/incident-credential.md` end
to end at least once a year against a non-critical account (e.g. the
disposable lab account). Confirms the IR playbook still works.

## 6. Cross-references

- `docs/09-security-and-secrets.md` — Tier framework.
- `docs/legal-and-resilience.md` — surrounding governance.
- `playbooks/incident-credential.md` — IR when something goes wrong.
- `playbooks/platform-strike-response.md` — when the account is the
  problem, not the credential.
