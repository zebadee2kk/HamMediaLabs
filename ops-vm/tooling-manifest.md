# Ops VM — Tooling Manifest

> Pinned-version inventory of every tool the Ops VM installs.
> Re-audit at every quarterly platform refresh
> (`playbooks/quarterly-platform-refresh.md`).
>
> **Posture:** versions track CI (`.github/workflows/ci.yml`)
> where applicable. Drift between the VM and CI is treated as
> a bug.

---

## Pinned versions

| Tool | Version posture | Where pinned | Rationale |
|---|---|---|---|
| Ubuntu Server | 24.04 LTS | OS install | Matches CI's `ubuntu-latest` Ubuntu lineage; long-term security support. |
| OpenSSH server | distro default | apt | Receives security updates via `unattended-upgrades`. |
| UFW | distro default | apt | Same. |
| `fail2ban` | distro default | apt | Same. |
| Tailscale | latest stable | tailscale.com installer | Tailscale's installer always pulls the latest stable; auto-updates enabled. |
| Node.js | **20.x LTS** | NodeSource `setup_20.x` | Matches `.github/workflows/ci.yml` `node-version: '20'`. |
| npm | bundled with Node 20 | n/a | Bundled. |
| git | distro default | apt | Receives updates. |
| GitHub CLI (`gh`) | distro default | apt | Updates via apt; CLI stays compatible across minor versions. |
| gitleaks | latest stable | GitHub Releases | Manual upgrade; reviewed at quarterly refresh. |
| Wrangler | latest stable | `npm install -g` | Cloudflare's CLI evolves quickly; latest is safest. |
| Docker (optional) | distro default | apt / Docker convenience script | Default: not installed. |
| Playwright (optional) | tracked by repo's `package.json` if ever added | n/a (not in repo today) | Manual signups at MVP. |

## NOT installed by default

- GUI / desktop environment.
- Browser (Chromium / Firefox).
- Local LLM runtime (Ollama / llama.cpp / vLLM).
- VS Code Server / Code-server.
- Slack / Discord / Telegram CLI.
- Direnv (the VM uses explicit `source ~/.config/.../*.env`
  patterns).
- nvm (Node is installed via NodeSource only; one Node version
  per VM).

If the operator wants any of the above, install per their own
choice but document it in `build-log.md` for that build.

## Repo-pinned versions (referenced for parity)

These live in the repo and govern build behaviour; the VM
inherits them via `npm install`:

| Surface | Package | Pin |
|---|---|---|
| Root | `typescript` | `^5.9.3` |
| Root | `tsx` | latest in `^x` |
| Root | `@types/node` | `^20.x` (matches Node 20 runtime) |
| Dashboard | `astro` | `^4.16.0` |
| Brand template | `astro` | `^4.16.0` |
| Brand A site | `astro` | `^4.16.0` |

Per `docs/dependabot-security-audit.md` §6b, Astro is staged
4 → 5 → 6 at the Q3 platform refresh. TypeScript / `@types/node`
majors are batched into the same refresh.

## Re-audit checklist (quarterly)

- [ ] `node --version` still on 20.x LTS.
- [ ] CI's `node-version` still on `'20'` (`.github/workflows/ci.yml`).
- [ ] `wrangler --version` not behind Cloudflare's published latest by more than one minor.
- [ ] `gitleaks version` not behind GitHub Releases latest by more than one minor.
- [ ] `gh --version` recent (distro default acceptable).
- [ ] Astro pin still aligned with `docs/astro-security-upgrade-plan.md` stage.
- [ ] No drift between VM-installed Node major and repo's `engines` if ever set.

## Cross-references

- `build-guide.md` — install commands.
- `docs/dependabot-security-audit.md` — version posture.
- `docs/astro-security-upgrade-plan.md` — staged Astro
  migration.
- `playbooks/quarterly-platform-refresh.md` — refresh
  cadence.
- `playbooks/package-hygiene.md` — Dependabot triage.
