# Ops VM — Security Baseline

> The minimum security floor for the HamMediaLabs Ops VM.
> Tighter than a typical developer workstation because the VM
> holds a working repo clone, scoped Cloudflare tokens, and
> launch-evidence material.
>
> **Posture:** least-privilege, Tailscale-fronted, no public
> attack surface, no browser-stored secrets, no shell-history
> secrets.
>
> **Companion docs:** `docs/09-security-and-secrets.md` (the
> lab's canonical secrets framework — binding here too);
> `playbooks/incident-credential.md` (incident response);
> `secrets-policy.md` (this folder, scoped tokens).

---

## 1. SSH

### 1.1 Key-only, no password

- `PasswordAuthentication no` in `/etc/ssh/sshd_config`.
- `PermitRootLogin no`.
- Public key in `~/.ssh/authorized_keys` is **only** the
  operator's 1Password-vaulted key. Installer-injected keys
  removed.
- Operator's private key never leaves their personal device or
  hardware key (YubiKey if used).

Verify:

```bash
sudo grep -E '^(PasswordAuthentication|PermitRootLogin)' /etc/ssh/sshd_config
# expected:
# PasswordAuthentication no
# PermitRootLogin no

ssh -o PreferredAuthentications=password richard@hydra-ops-vm true
# expected: permission denied (no fallback to password)
```

### 1.2 SSH only over Tailscale

- UFW restricts inbound port 22 to the `tailscale0` interface.
- Cloud-provider firewall (if VPS): port 22 blocked from
  internet; only the Tailscale UDP port (41641) open.

```bash
sudo ufw status numbered
# expected: Allow on tailscale0 to any port 22 (and nothing else inbound)
```

### 1.3 SSH session limits

- `ClientAliveInterval 300` and `ClientAliveCountMax 2` in
  `sshd_config` to drop dead sessions.
- No persistent multiplexing on the operator side (avoids
  stale connections holding tokens in memory).

## 2. Firewall (UFW)

| Direction | Default | Exception | Reason |
|---|---|---|---|
| Incoming | deny | SSH on tailscale0 only | No public surface |
| Outgoing | allow | none | Operator runs npm install, git fetch, gh / Wrangler API calls |
| Forwarding | deny | none | Not a router |

`fail2ban` runs even though SSH is Tailscale-only — defence in
depth.

## 3. Tailscale (preferred ingress)

- Operator's Tailscale account is the only Tailscale tailnet
  with access. No "Shared with me" nodes.
- `tailscale up --ssh` enables Tailscale SSH (key-rotated by
  Tailscale, scoped to tailnet) **in addition to** OpenSSH;
  both terminate at port 22 inside the Tailscale interface.
- ACL on the tailnet: only the operator's identity reaches
  `hydra-ops-vm`.
- MagicDNS: `hydra-ops-vm` resolves inside the tailnet only.

Verify:

```bash
tailscale status
# expected: only operator's nodes listed; no unknown peers
```

## 4. Unattended security updates

```bash
sudo dpkg-reconfigure -plow unattended-upgrades  # yes
sudo systemctl status unattended-upgrades         # active
cat /etc/apt/apt.conf.d/50unattended-upgrades \
  | grep -E 'security|reboot'
```

Reboot policy: install security updates immediately; reboot at
04:00 local **only if no active SSH session**. (Operator can
toggle this with `Unattended-Upgrade::Automatic-Reboot-Time
"04:00"` if needed.)

## 5. Least privilege

| Account | Purpose | Sudo |
|---|---|---|
| `root` | system | disabled for interactive login |
| `richard` | operator | sudo via password (not NOPASSWD) |

- No service accounts beyond what packages create.
- Cloudflare Wrangler runs as `richard`, not via sudo.
- Docker (if installed) runs rootless or `richard` is in the
  `docker` group — never run `sudo docker ...` for daily work.

## 6. Browser / secrets handling

- **No browser installed on the VM.** Operator browses
  Cloudflare dashboard, Gemini, NotebookLM, GitHub Web UI from
  their personal device.
- **No password manager on the VM.** 1Password lives on the
  operator's personal device only; secrets enter the VM through
  documented copy-paste flows (see `secrets-policy.md`).
- **No SSH agent forwarding** by default. If forwarding is
  ever needed for a one-shot git push from inside a container,
  it's enabled per-command and torn down immediately.

## 7. Shell history hygiene

- Bash `HISTCONTROL=ignoreboth:erasedups` in `~/.bashrc`.
- Commands beginning with a space (`export TOKEN=...`) are not
  recorded.
- Operator habit: any command that includes a token uses
  `read -sp` to prompt + a temp env var, never an inline
  argument.
- `~/.bash_history` reviewed before any VM snapshot is
  exported.

## 8. Local backups / snapshots

- Hypervisor or VPS provider snapshots every 24h (operator
  configures at the VM-creation layer).
- Snapshots stored encrypted at the provider; passphrase in
  1Password.
- Snapshot retention: 7 daily + 4 weekly. Beyond that, the repo
  + Supabase + Cloudflare are the canonical state — snapshots
  are convenience, not durable storage.
- The operator does **not** rely on the VM as the only place
  any data lives. Repo is on GitHub; launch evidence is PR'd
  into the repo; secrets are in 1Password.

See `recovery-and-backup.md` for the full posture.

## 9. Recovery plan (summary; full in `recovery-and-backup.md`)

1. VM is unrecoverable → rebuild per `build-guide.md` §1–§8.
2. SSH key compromised → rotate per
   `playbooks/incident-credential.md`; remove key from VM and
   GitHub; issue new key.
3. Cloudflare token suspected leaked → revoke immediately in
   the Cloudflare dashboard; rotate; document per
   `playbooks/incident-credential.md`; decision-log entry.
4. Supabase service-role key suspected leaked → Tier 1 incident.
   Revoke + rotate + audit per `docs/09-security-and-secrets.md`
   immediately.

## 10. What must NOT be exposed publicly

- Port 22 (SSH) on the public internet (only Tailscale).
- The Cloudflare API token (file mode 600; `~/.config/cloudflare/`
  in user home).
- `~/.ssh/` (default 700 / 600 modes; never globally readable).
- `~/.config/gh/` (GitHub CLI auth state).
- `~/.config/wrangler/` (Wrangler auth state).
- `~/HamMediaLabs/.env*` — the lab template forbids `.env`
  files in the repo; if any local-only `.env` is created for
  ad-hoc scripts, mode 600 and gitignored.
- `~/launch-evidence/` — local until PR'd; mode 700 on the
  directory.

## 11. Patching / upgrade discipline

- OS security updates: automatic via `unattended-upgrades`.
- Node 20 LTS: stays pinned; upgrade only when the lab's CI
  upgrades.
- Wrangler / gitleaks / gh: upgrade when a real reason exists
  (CVE in the tool, new required feature) — not on schedule.
- Astro / TypeScript / `@types/node`: pinned at repo level; no
  manual override on the VM.

## 12. Audit trail

- Shell history (`~/.bash_history`) is part of the audit trail
  for incident response.
- Wrangler deploy logs print deployment IDs; capture them into
  `~/launch-evidence/<YYYY-MM-DD>/` per
  `launch-evidence-template.md`.
- Git config carries the operator identity so every commit is
  attributable.

## 13. What this baseline does NOT cover

- HamNet / consulting business security — strictly separate
  (`docs/legal-and-resilience.md`).
- Cloudflare Account 2FA / SSO — owned at the Cloudflare layer.
- GitHub Account 2FA / SSO — owned at the GitHub layer.
- 1Password vault posture — covered by the operator's personal
  policy.

## 14. Quarterly review

The VM is re-audited at the quarterly platform refresh
(`playbooks/quarterly-platform-refresh.md`). Anything in §1–§12
that has drifted is corrected with a decision-log entry.

## Cross-references

- `build-guide.md` — install + first-boot commands.
- `secrets-policy.md` — scoped tokens, gitleaks usage.
- `docs/09-security-and-secrets.md` — lab-wide secrets framework.
- `playbooks/incident-credential.md` — incident response.
- `playbooks/account-recovery.md` — account-locked recovery.
- `recovery-and-backup.md` — backup + restore.
