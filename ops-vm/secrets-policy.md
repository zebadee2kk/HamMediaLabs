# Ops VM — Secrets Policy

> Binding rules for how secrets enter, live on, and leave the
> HamMediaLabs Ops VM.
>
> **Posture:** least-scope, vault-first, never in repo, never in
> shell history, never pasted into Claude or Gemini.
>
> **Companion docs:** `docs/09-security-and-secrets.md` (lab
> canonical secrets framework — **binding here too; this file
> does not override it, it specialises it to the VM**);
> `security-baseline.md` (this folder); `playbooks/incident-credential.md`
> (incident response).

---

## 1. Secret tiers (mirrored from `docs/09-security-and-secrets.md`)

| Tier | Examples | VM handling |
|---|---|---|
| **Tier 1 — critical** | `SUPABASE_SERVICE_ROLE_KEY` | **Never on the VM unless required for a specific approved operator command.** Default: not present. If used: env-var only, cleared after the command, never in shell history. |
| **Tier 2 — important** | Cloudflare API token (scoped), Gemini / Groq / OpenRouter keys, GitHub PAT | In `~/.config/<service>/` env files, mode 600. Loaded by shell on demand, not at every login. |
| **Tier 3 — operational** | Account recovery codes, MFA seeds | **Never on the VM.** 1Password only. |

The Tier-1 handling for `SUPABASE_SERVICE_ROLE_KEY` is
explicitly preserved: it is server-side only (the lab's
production runtime is Cloudflare Pages + GitHub Actions; the
Ops VM is not production). If the operator ever needs to run a
local script that uses it (e.g. a one-shot migration), the key
is exported into the shell *for that session only* and the
shell is exited immediately after.

## 2. GitHub token scopes

Two token shapes are used:

### 2.1 GitHub CLI (default for daily work)

- Auth via `gh auth login` → choose **HTTPS** + **device flow**;
  this stores a per-machine token in `~/.config/gh/hosts.yml`
  scoped to the operator's account.
- The token is bound to GitHub's session policies and can be
  revoked from the operator's GitHub settings.

### 2.2 Personal Access Token (PAT) — only if a workflow needs it

If a one-off script needs API access outside `gh`:

- Create a **fine-grained** PAT (not a classic PAT).
- Scope to **`zebadee2kk/hammedialabs`** only.
- Minimum permissions:
  - `Contents: Read and write` (only if scripts push).
  - `Pull requests: Read and write` (only if scripts open PRs).
  - `Issues: Read and write` (only if scripts open issues).
- Expiry: 30 days; rotate.
- Store: 1Password under `ops-vm / github-pat`; load into VM
  via `read -sp` into a session env var, never into a file by
  default.

## 3. Cloudflare API token scopes

The Cloudflare token used for Wrangler from the VM is **always
scoped**, never the global API key:

| Permission | Why | Notes |
|---|---|---|
| `Account → Cloudflare Pages: Edit` | Preview deploys | Mandatory |
| `Account → Account Settings: Read` | Wrangler bootstrap | Mandatory |
| `Zone → DNS: Edit` | DNS changes | **Not granted by default.** DNS changes are operator-only via the Cloudflare web dashboard. Grant only if a documented automation step needs it. |
| `Zone → Workers Routes: Edit` | Workers routes | Not granted (lab does not use Workers routes today). |
| `Account → Workers Scripts: Edit` | Workers scripts | Not granted. |
| Global API key | — | **Forbidden on this VM.** |

Storage on VM:

- `~/.config/cloudflare/wrangler.env` (mode 600).
- Sourced via `~/.bashrc`.
- Never echoed; never committed.

Rotation: every 90 days, or immediately on any suspected
exposure. Rotation procedure:

1. Create new token in Cloudflare dashboard.
2. Update 1Password.
3. Update `~/.config/cloudflare/wrangler.env`.
4. Revoke old token in Cloudflare dashboard.
5. `wrangler whoami` to verify the new token.
6. Decision-log entry per `docs/15-decision-log.md` if rotation
   was triggered by an incident.

## 4. Supabase — anon key vs service-role key

The lab has two Supabase keys:

| Key | Purpose | Where it may live on the Ops VM |
|---|---|---|
| `SUPABASE_ANON_KEY` (PUBLIC_*) | Client-side reads (not currently used in our static sites; placeholder for future) | Fine to live in `~/.config/supabase/anon.env` mode 600 |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side admin | **Tier 1.** Not present by default. If needed for a one-shot, exported per-session and cleared. |

The Cloudflare Pages production environment is where the
service-role key lives in production (set via Cloudflare's env
var UI). The Ops VM does not duplicate it.

## 5. `.env` rules

The repo enforces (`.gitignore` + `.gitleaks.toml`):

- No `.env` file is committed.
- Templates only (`.env.example`, `vault-template/account-registry-template.md`).

On the VM:

- Repo-local `.env` files (if ever needed) live at
  `~/HamMediaLabs/.env.local` with mode 600.
- They are git-ignored by the repo's `.gitignore`.
- Operator runs `gitleaks detect --no-banner -s .` before any
  PR push if a local `.env` exists.

## 6. Shell history precautions

Defaults set in `~/.bashrc`:

```bash
export HISTCONTROL=ignoreboth:erasedups
export HISTSIZE=10000
export HISTFILESIZE=20000
```

Habit:

- Any command involving a secret begins with a space (so
  `HISTCONTROL=ignoreboth` keeps it out of history).
- Inline tokens are forbidden — use `read -sp`:

```bash
# Wrong (token enters history):
TOKEN=ghp_xxx... gh api repos/...

# Right:
read -sp "GitHub token: " TOKEN; echo
TOKEN="$TOKEN" gh api repos/...
unset TOKEN
```

Before any VM snapshot is exported off-host, `~/.bash_history`
is reviewed. Suspicious entries → `history -c && history -w`.

## 7. GitHub Actions secrets

Repository secrets (used by `.github/workflows/`) are managed
**from the GitHub web UI**, not from the VM. The Ops VM never
sets repository secrets directly.

If an Actions secret rotation is needed:

1. Operator opens GitHub → repo → Settings → Secrets and
   variables → Actions in their browser.
2. Updates the secret.
3. Re-runs the failed workflow.
4. Decision-log entry if the rotation was triggered by an
   incident.

The `GITHUB_TOKEN` used in `.github/workflows/ci.yml` is
GitHub-managed and not stored anywhere by the lab.

## 8. No secrets pasted into AI tools

**Hard rule.** Secrets never enter:

- A Claude Code prompt or session.
- A Gemini prompt.
- A ChatGPT / Codex prompt.
- A NotebookLM document.
- Any LLM tool's context.

Why: free-tier inputs to Gemini are used for training
(documented in `docs/PROJECTHYDRA-MASTER-PLAN.md` §3.1).
Anthropic / OpenAI free / paid tiers carry their own
data-handling postures; the lab's defence is "secrets never
leave the operator's vault into any AI tool".

If a session needs to reference a secret, the operator pastes a
placeholder (`<CLOUDFLARE_TOKEN>`) and replaces it at runtime
on the VM.

## 9. gitleaks usage

`gitleaks` is installed per `build-guide.md` §4.3 and run:

- **Before every PR push** from the VM:

```bash
cd ~/HamMediaLabs
gitleaks detect --no-banner -s .
```

- **As part of CI** (`.github/workflows/ci.yml`) on every push
  and PR.

The `.gitleaks.toml` config carries the provider-specific
patterns (Supabase service-role key shape, Gemini, Groq,
OpenRouter, Cloudflare). Operator never disables a pattern; if
a false positive blocks a PR, the PR description must explain
the false positive.

## 10. Evidence capture without secret leakage

When capturing launch evidence per
`launch-evidence-template.md`:

- **Screenshots:** crop out any secrets, account emails, or
  PII before saving. Use the VM's `gnome-screenshot --area` or
  the operator's laptop and `scp` the cropped version onto the
  VM.
- **Wrangler output:** Wrangler's deploy logs do not include
  tokens by default; they print a deployment ID + URL. Capture
  those; redact any environment-banner that contains the
  account email.
- **gh CLI output:** review before saving; some commands print
  the auth token shape in verbose mode.
- **Supabase responses:** never capture raw service-role
  responses; capture the operation outcome only.

Every evidence file is reviewed by the operator before the PR
that brings it into the repo lands.

## 11. Decommissioning

When the VM is retired:

1. `gh auth logout`.
2. `tailscale logout` and `tailscale down`.
3. Revoke Cloudflare API token in Cloudflare dashboard.
4. Delete the VM and its snapshots.
5. Confirm the LUKS disk has been destroyed (host-level
   delete + scrub, not just OS-level `rm`).
6. Update 1Password: archive the entries that referenced this
   VM; do not re-use the same token for the next VM.

## 12. Quarterly review

At every quarterly platform refresh
(`playbooks/quarterly-platform-refresh.md`):

- Re-list tokens stored on the VM.
- Re-confirm scope minimality.
- Rotate any token > 90 days old.
- Walk §5 and §10 to confirm no `.env` drift and no evidence
  drift.

## Cross-references

- `docs/09-security-and-secrets.md` — canonical secrets
  framework.
- `security-baseline.md` — VM-level firewall + SSH + browser
  posture.
- `build-guide.md` — Wrangler + gh setup with secret-loading
  pattern.
- `playbooks/incident-credential.md` — incident response.
- `playbooks/package-hygiene.md` — Dependabot triage (touches
  some tooling).
- `.gitleaks.toml` — provider-specific patterns.
