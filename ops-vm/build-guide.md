# Ops VM — Build Guide

> Concrete steps to build the HamMediaLabs Ops VM from a blank
> Ubuntu Server image to a working operator workstation.
>
> **Posture:** explicit commands, no guesswork. Every package
> pinned to a known good major. Each step ends with a one-line
> verification.
>
> Walk `ops-vm-checklist.md` end-to-end as the final acceptance
> gate.

---

## 0. VM creation assumptions

The lab does not mandate a specific hypervisor / cloud. The VM
can sit on Proxmox, VMware Workstation, UTM (macOS), Hyper-V,
or a small VPS (Hetzner CX22 is a good cost-friendly default).

**Default spec (binding):**

| Resource | Value | Notes |
|---|---|---|
| OS | Ubuntu Server 24.04 LTS | Long-term support; matches CI's Ubuntu lineage |
| vCPU | 4 | Headroom for parallel Node tests + Astro build |
| RAM | 8–16 GB | 8 GB minimum; 16 GB if running Codex / Playwright concurrently |
| Disk | 120–200 GB SSD | Node `node_modules`, multiple repo clones, launch evidence |
| GPU | None | No local LLM until `docs/local-llm-plan.md` re-activated |
| Network | Outbound internet only | Inbound via Tailscale only |
| Auth | SSH key-only | No password SSH |
| User | `richard` (non-root) | Sudo through password-less only for documented commands |
| Hostname | `hydra-ops-vm` | Recognisable in logs |
| Timezone | `Europe/London` | Matches operator + the lab's UK posture |

If running on a public VPS, **disable the provider's web
console password** and verify SSH-key-only enforcement
post-build (`security-baseline.md` §1.2).

## 1. OS install

1. Boot the Ubuntu Server 24.04 installer.
2. Choose **English (UK)** locale; **Europe/London** timezone.
3. Disk: full disk, encrypted (LUKS). Operator stores the LUKS
   passphrase in 1Password under "ops-vm / luks".
4. Profile: name `Richard`, username `richard`, hostname
   `hydra-ops-vm`. **Set a strong password** even though SSH
   will be key-only — it's the sudo password.
5. SSH: **enable** OpenSSH server. **Import** the operator's
   public key from GitHub (`https://github.com/<operator>.keys`)
   so password SSH is never enabled by default.
6. Snaps: **uncheck** all featured snaps. The lab installs
   tools deliberately.

After reboot, verify:

```bash
ssh richard@hydra-ops-vm uname -a   # from operator's laptop
```

Expected: `Linux hydra-ops-vm 6.x ... x86_64 GNU/Linux`.

## 2. First-boot hardening

```bash
sudo apt update && sudo apt -y full-upgrade
sudo apt -y install ufw fail2ban unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades   # enable
sudo systemctl enable --now fail2ban
```

UFW defaults:

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp comment 'SSH (pre-Tailscale)'
sudo ufw enable
```

Tailscale (preferred ingress; install before tightening UFW):

```bash
curl -fsSL https://tailscale.com/install.sh | sudo sh
sudo tailscale up --hostname=hydra-ops-vm --ssh
```

After Tailscale is up, lock SSH to Tailscale only:

```bash
sudo ufw delete allow 22/tcp
sudo ufw allow in on tailscale0 to any port 22 proto tcp \
  comment 'SSH (Tailscale only)'
sudo ufw status numbered
```

Full security baseline is in `security-baseline.md`. Run that
walk after this section.

## 3. Operator user setup

```bash
# already on the richard user; verify:
whoami    # richard
groups    # adm cdrom sudo dip plugdev lxd
```

Add an `.ssh/authorized_keys` entry **only** from the operator's
1Password-vaulted key. Remove any installer-injected key that is
not the operator's.

Disable password SSH (idempotent):

```bash
sudo sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
sudo systemctl restart ssh
```

Verify:

```bash
ssh richard@hydra-ops-vm "echo OK"  # from operator's laptop
```

## 4. Core toolchain

The Ops VM mirrors CI: Node 20 LTS, `tsx`, npm, git, gh, gitleaks,
Cloudflare Wrangler, Docker.

### 4.1 Node.js LTS (matches `.github/workflows/ci.yml` `node-version: '20'`)

```bash
# NodeSource 20.x repo
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt -y install nodejs

node --version  # v20.x.x
npm --version
```

Pin npm cache out of the home root:

```bash
mkdir -p ~/.cache/npm
npm config set cache ~/.cache/npm
```

### 4.2 git + GitHub CLI

```bash
sudo apt -y install git gh

# Sign git operations to operator identity
git config --global user.name "Richard"
git config --global user.email "<operator-email-from-vault>"

# Auth GitHub CLI (operator interactive — choose SSH; HTTPS over Tailscale also fine)
gh auth login
```

Verify:

```bash
gh auth status
```

### 4.3 gitleaks

```bash
GL_VER=$(curl -fsSL https://api.github.com/repos/gitleaks/gitleaks/releases/latest \
  | grep -oP '"tag_name": "v\K[^"]+')
curl -fsSLo /tmp/gitleaks.tar.gz \
  "https://github.com/gitleaks/gitleaks/releases/download/v${GL_VER}/gitleaks_${GL_VER}_linux_x64.tar.gz"
tar -C /tmp -xzf /tmp/gitleaks.tar.gz gitleaks
sudo mv /tmp/gitleaks /usr/local/bin/gitleaks
gitleaks version
```

### 4.4 Cloudflare Wrangler (for preview deploys)

```bash
sudo npm install -g wrangler@latest
wrangler --version
```

Auth happens later (see §6) and uses a **scoped** Cloudflare
API token, not the global one (`secrets-policy.md` §2).

### 4.5 Docker (optional but documented)

Only install if the operator wants to run Playwright in a
container or self-host n8n later. Default for the Ops VM: skip.

```bash
# Optional — uncomment only if needed
# curl -fsSL https://get.docker.com | sudo sh
# sudo usermod -aG docker richard
# newgrp docker
```

### 4.6 Playwright dependencies (optional)

Brand A launch does not require Playwright. The lab's Playwright
modules are skeletons (manual signups at MVP). If the operator
chooses to run them, install browser deps after a `gh repo clone`:

```bash
# Only if Playwright is actually used
# cd HamMediaLabs && npx playwright install --with-deps
```

## 5. Clone the repository

```bash
cd ~
gh repo clone zebadee2kk/HamMediaLabs
cd HamMediaLabs
npm install --no-audit --no-fund
npm test          # expect 38/38 passing
npm run typecheck # expect zero errors
```

Build the Astro consumers to verify they cleanly compile on the
fresh toolchain:

```bash
cd ~/HamMediaLabs/dashboards/app && npm install --no-audit --no-fund && npm run build
cd ~/HamMediaLabs/brands/templates/site && npm install --no-audit --no-fund && npm run build
cd ~/HamMediaLabs/brands/brand-a-aiescape/site && npm install --no-audit --no-fund && npm run build
```

Brand A site should report **8 pages built**, sub-second.

## 6. Cloudflare Wrangler authentication

The Ops VM authenticates Wrangler with a **scoped** Cloudflare
API token (not the global API key), per `secrets-policy.md` §2.

1. Operator creates the token in Cloudflare dashboard with
   only:
   - `Account → Cloudflare Pages: Edit`
   - `Account → Account Settings: Read`
   - Zone permissions only if DNS changes are needed (default:
     no).
2. Token stored in 1Password under `ops-vm / cloudflare-api-token`.
3. On the VM:

```bash
mkdir -p ~/.config/cloudflare
# operator pastes the token interactively; never echo
read -sp "Cloudflare API token: " CF_TOKEN
echo "export CLOUDFLARE_API_TOKEN='$CF_TOKEN'" > ~/.config/cloudflare/wrangler.env
chmod 600 ~/.config/cloudflare/wrangler.env
unset CF_TOKEN
```

Then in `~/.bashrc`:

```bash
[ -f ~/.config/cloudflare/wrangler.env ] && source ~/.config/cloudflare/wrangler.env
```

Verify:

```bash
source ~/.config/cloudflare/wrangler.env
wrangler whoami  # expect the operator's Cloudflare account email
```

**Never commit `~/.config/cloudflare/` to git. Never put the
token in repo `.env` files.**

## 7. Optional: Claude Code CLI

If the operator runs Claude Code on the VM (recommended for
audit-trail consolidation):

1. Install per the operator's existing Claude Code
   installation flow.
2. Point Claude Code's working directory at `~/HamMediaLabs`.
3. Read `claude-code-operating-rules.md` end-to-end before any
   first session.

## 8. Initial validation

Walk these final checks; record outputs in
`~/launch-evidence/ops-vm-build-<YYYY-MM-DD>/build-log.md`:

```bash
cd ~/HamMediaLabs
git status                       # clean
git log -1 --oneline             # latest main commit
npm test                         # 38/38
gitleaks detect --no-banner -s . # 0 leaks
( cd brands/brand-a-aiescape/site && npm run build && find dist -name '*.js' | wc -l )  # expect 0
( cd dashboards/app && npm run build )
wrangler whoami                  # operator account
gh auth status                   # operator login
sudo ufw status | head -5        # default deny incoming + tailscale-only 22
sudo systemctl is-active fail2ban  # active
```

All green → VM is build-accepted. File the build log via the
launch-evidence flow (`launch-evidence-template.md`).

## 9. What is NOT installed by default

- No GUI / desktop environment.
- No browser (the VM is headless; operator browses Gemini /
  Cloudflare dashboard from their laptop).
- No local LLM runtime (Ollama / llama.cpp).
- No paid SaaS clients.
- No Slack / Discord / Telegram CLI.
- No HamNet credentials, configs, or paths.

## 10. Re-build / rebuild policy

If the VM needs a wipe-and-rebuild:

1. Capture the latest launch-evidence into the repo (PR).
2. `tailscale down && tailscale logout`.
3. Destroy the VM.
4. Re-run §1–§8.
5. Walk `ops-vm-checklist.md` again from scratch — the
   checklist is the acceptance gate, not §1–§8.

## Cross-references

- `security-baseline.md` — full security walk (§2 here is the
  minimum).
- `secrets-policy.md` — scoped tokens, gitleaks, `.env` rules.
- `deployment-runbook.md` — preview-deploy + launch-day flow.
- `claude-code-operating-rules.md` — Claude Code boundaries on
  the VM.
- `ops-vm-checklist.md` — single acceptance checklist.
- `recovery-and-backup.md` — snapshot + recovery posture.
- `tooling-manifest.md` — pinned versions inventory.
