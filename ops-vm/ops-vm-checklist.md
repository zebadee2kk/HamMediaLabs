# Ops VM — Build & Acceptance Checklist

> Single checklist for building and accepting the HamMediaLabs
> Ops VM. The VM is ready for operator use only when **every
> box below is ticked**.
>
> **Walk top-to-bottom.** A box that fails stops the walk.

---

## 1. VM created

- [ ] VM provisioned at chosen hypervisor / VPS provider.
- [ ] Spec matches `build-guide.md` §0 defaults (Ubuntu Server 24.04 LTS, 4 vCPU, 8–16 GB RAM, 120–200 GB SSD, no GPU).
- [ ] Disk full-disk-encrypted (LUKS); passphrase in 1Password under `ops-vm / luks`.
- [ ] Provider snapshots scheduled (daily; 7 daily + 4 weekly retention).
- [ ] Provider firewall allows only port 22 SSH (pre-Tailscale) and the Tailscale UDP port.

## 2. OS install

- [ ] Ubuntu Server 24.04 LTS installed.
- [ ] Locale: `en_GB.UTF-8`.
- [ ] Timezone: `Europe/London`.
- [ ] Hostname: `hydra-ops-vm`.
- [ ] User: `richard` (or operator-named), with sudo via password (not NOPASSWD).
- [ ] SSH server installed; operator public key imported (from GitHub `.keys` or 1Password).
- [ ] No featured snaps installed.
- [ ] Latest `apt update && apt -y full-upgrade` run.

## 3. SSH hardened

- [ ] `/etc/ssh/sshd_config` carries `PasswordAuthentication no`.
- [ ] `/etc/ssh/sshd_config` carries `PermitRootLogin no`.
- [ ] Operator's public key is the **only** entry in `~/.ssh/authorized_keys`.
- [ ] Installer-injected default keys removed.
- [ ] `sudo systemctl restart ssh` succeeded.
- [ ] Verified: `ssh -o PreferredAuthentications=password richard@hydra-ops-vm true` returns "permission denied".
- [ ] Verified: `ssh richard@hydra-ops-vm "echo OK"` returns `OK`.

## 4. Tailscale working

- [ ] Tailscale installed via official installer.
- [ ] `sudo tailscale up --hostname=hydra-ops-vm --ssh` succeeded.
- [ ] `tailscale status` shows the operator's tailnet; no unknown peers.
- [ ] MagicDNS resolves `hydra-ops-vm` from the operator's laptop inside the tailnet.
- [ ] UFW now restricts inbound port 22 to `tailscale0` only (verified via `sudo ufw status numbered`).
- [ ] `unattended-upgrades` enabled and active.
- [ ] `fail2ban` active.

## 5. Repo cloned

- [ ] `gh repo clone zebadee2kk/HamMediaLabs` succeeded into `~/HamMediaLabs`.
- [ ] `git status` clean.
- [ ] `git log -1 --oneline` matches the latest `origin/main`.
- [ ] `git config --global user.name` set to operator's identity.
- [ ] `git config --global user.email` set to the operator's vault-stored email.

## 6. GitHub auth working

- [ ] `gh auth status` reports operator login + correct GitHub host.
- [ ] `gh repo view zebadee2kk/HamMediaLabs --json name` returns the repo metadata.
- [ ] `gh pr list --limit 1` returns recent PR metadata (or empty, with no auth error).

## 7. Toolchain installed

- [ ] `node --version` → `v20.x.x`.
- [ ] `npm --version` reports a recent npm.
- [ ] `git --version` reports a recent git.
- [ ] `gh --version` reports a recent gh.
- [ ] `gitleaks version` reports a recent gitleaks.
- [ ] `wrangler --version` reports a recent Wrangler.

## 8. Tests passing

- [ ] `cd ~/HamMediaLabs && npm install --no-audit --no-fund` succeeded.
- [ ] `npm test` reports **38 / 38 passing** (or current count per `docs/launch-readiness-closeout-2026-05-16.md` §12).
- [ ] `npm run typecheck` reports zero errors.

## 9. Brand A build passing

- [ ] `cd ~/HamMediaLabs/brands/brand-a-aiescape/site && npm install --no-audit --no-fund && npm run build` succeeded.
- [ ] Output reports **8 page(s) built** in sub-second.
- [ ] `find dist -type f -name '*.js' | wc -l` returns **0** (no JS bundles → no client islands).
- [ ] `grep -c "AI-augmented production" dist/ai-use/index.html dist/index.html` returns `1` on each.
- [ ] `grep -rE "(sk-or-[A-Za-z0-9_-]{20}|gsk_[A-Za-z0-9]{20}|AIza[0-9A-Za-z_-]{30}|PUBLIC_SUPABASE)" dist/` returns no matches.

## 10. Dashboard + template build passing

- [ ] `cd ~/HamMediaLabs/dashboards/app && npm install --no-audit --no-fund && npm run build` succeeded.
- [ ] `cd ~/HamMediaLabs/brands/templates/site && npm install --no-audit --no-fund && npm run build` succeeded.

## 11. gitleaks passing

- [ ] `cd ~/HamMediaLabs && gitleaks detect --no-banner -s .` reports **0 leaks**.
- [ ] `.gitleaks.toml` patterns untouched (no operator-side custom suppressions).

## 12. Wrangler authenticated

- [ ] Scoped Cloudflare API token created in Cloudflare dashboard with **only** `Account → Cloudflare Pages: Edit` and `Account → Account Settings: Read` (and `Zone → DNS: Edit` only if explicitly needed; default: not granted).
- [ ] Token stored in 1Password under `ops-vm / cloudflare-api-token`.
- [ ] `~/.config/cloudflare/wrangler.env` exists with `export CLOUDFLARE_API_TOKEN=...` and `chmod 600`.
- [ ] `~/.bashrc` sources `~/.config/cloudflare/wrangler.env`.
- [ ] `source ~/.config/cloudflare/wrangler.env && wrangler whoami` returns the operator's Cloudflare account email.

## 13. Cloudflare preview deploy tested (optional pre-launch dry run)

- [ ] `cd ~/HamMediaLabs/brands/brand-a-aiescape/site && wrangler pages deploy dist --project-name=<project> --branch=preview-$(git rev-parse --short HEAD)` succeeded.
- [ ] Preview URL accessible from the operator's laptop.
- [ ] Smoke tests from `launch-evidence-template.md` "Smoke tests" pass on the preview.
- [ ] **Note:** this does NOT publish to production; production deploys still go through merge-to-`main`.

## 14. Secrets policy understood

- [ ] Operator has read `secrets-policy.md` end-to-end.
- [ ] Operator has confirmed `HISTCONTROL=ignoreboth:erasedups` in `~/.bashrc`.
- [ ] Operator has confirmed no `.env` file inside `~/HamMediaLabs/` (only templates per `vault-template/account-registry-template.md`).
- [ ] Operator has confirmed no GitHub PAT stored on disk (only the gh CLI session token).
- [ ] Operator has confirmed Tier-1 `SUPABASE_SERVICE_ROLE_KEY` is **not** present on the VM by default (set per-session if a one-off needs it).

## 15. Claude Code rules installed / read

- [ ] Operator has read `claude-code-operating-rules.md` end-to-end.
- [ ] Operator confirms Claude Code's working directory is `~/HamMediaLabs` (not `~`).
- [ ] Operator confirms the five hard rules are understood:
  - No direct push to `main`.
  - No publishing.
  - No DNS changes.
  - No paid-service creation.
  - No social posting.
- [ ] Operator confirms the suggested subagent profiles (`hydra-pm` / `hydra-github` / `hydra-security` / `hydra-launch` / `hydra-docs` / `hydra-design-brief`) are understood; configuration is optional but documented in the operator's Claude Code installation.

## 16. Launch-evidence workflow ready

- [ ] `~/launch-evidence/` exists with mode 700.
- [ ] Operator has copied `launch-evidence-template.md` into a draft folder to confirm the workflow.
- [ ] Operator has practised the evidence-PR flow once on a no-op change.

## 17. Recovery & backup understood

- [ ] Operator has read `recovery-and-backup.md` end-to-end.
- [ ] Snapshot schedule confirmed at the hypervisor / VPS layer.
- [ ] Operator can SSH in to a snapshot-restored VM and reach `git status` clean within 15 minutes.

## 18. Build log filed

- [ ] `~/launch-evidence/ops-vm-build-<YYYY-MM-DD>/build-log.md` filed with the §8–§13 command outputs.
- [ ] Scoped PR opened into the repo: `Build evidence: ops-vm build <YYYY-MM-DD>` (optional; doc-only).
- [ ] Operator sign-off on this checklist documented in the build-log.

---

## Acceptance verdict

The Ops VM is accepted for operator use only when **every box
in §1–§17 is ticked** and §18 has been filed. A single
unchecked box defers acceptance until it can be ticked.

If a box cannot be ticked at first walk, document why in
`build-log.md` and either fix it or open an issue in the repo
(only if it's a real repo-side blocker; otherwise it's an
operator-side environmental issue and stays off the issue
tracker).

## Re-acceptance triggers

The VM is re-walked through this checklist on:

- Any rebuild from scratch.
- Any kernel / major OS upgrade.
- Any Tailscale ACL change that affects this node.
- The quarterly platform refresh
  (`playbooks/quarterly-platform-refresh.md`).
- Any security incident traced to the VM
  (`playbooks/incident-credential.md`).

## Cross-references

- `README.md` — what the VM is + governance fit.
- `build-guide.md` — install steps.
- `security-baseline.md` — security floor.
- `secrets-policy.md` — token handling.
- `deployment-runbook.md` — deploy flow.
- `claude-code-operating-rules.md` — Claude Code boundaries.
- `launch-evidence-template.md` — evidence record.
- `recovery-and-backup.md` — recovery posture.
- `tooling-manifest.md` — pinned versions inventory.
