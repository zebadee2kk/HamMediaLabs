# Ops VM — Recovery & Backup

> Backup posture, recovery scenarios, and rebuild path for the
> HamMediaLabs Ops VM.
>
> **Posture:** the VM is a **convenience workstation**, not a
> source of truth. Repo is on GitHub; secrets are in 1Password;
> production lives on Cloudflare Pages + Supabase. Snapshots
> save time; they do not save irreplaceable data.

---

## 1. What lives on the VM (and what doesn't)

| Asset | Lives on VM? | Canonical source |
|---|---|---|
| Repo clone | Yes (working copy) | GitHub `zebadee2kk/HamMediaLabs` |
| Working branches not yet pushed | Yes | Should never sit unpushed > 1 day; push to `origin` |
| Built artefacts (`dist/`) | Yes (regenerable) | Re-build from source |
| Cloudflare scoped API token | Yes (`~/.config/cloudflare/wrangler.env`) | 1Password |
| GitHub CLI auth state | Yes (`~/.config/gh/`) | Regenerable via `gh auth login` |
| Launch evidence | Yes (`~/launch-evidence/`) | PR'd into the repo per launch |
| Tailscale node identity | Yes | Re-issue via `tailscale up` after rebuild |
| OS configuration | Yes | Rebuildable from `build-guide.md` |
| Operator's SSH private key | **No** | Operator's personal device / hardware key only |
| Supabase service-role key | **No (default)** | Cloudflare Pages env var (production); 1Password |
| 1Password vault | **No** | Operator's 1Password account |
| HamNet credentials | **Never** | Strictly separate |

**Rule:** anything that is not on this VM should be on the
canonical source. Anything that *is* only on the VM is either
regenerable (artefacts) or actively being PR'd (evidence).

## 2. Snapshot policy

| Cadence | Source | Retention | Encryption |
|---|---|---|---|
| Daily | Hypervisor / VPS provider | 7 days | Provider-side encryption; passphrase in 1Password |
| Weekly | Hypervisor / VPS provider | 4 weeks | Same |
| On-demand | Operator-triggered before risky operations | until manually deleted | Same |

**Snapshots are convenience.** A snapshot lets the operator
recover to a known-good state quickly. Snapshots are not the
backup of record for the repo or for secrets.

## 3. Backup the repo (already handled)

- `origin` (GitHub) is the canonical repo state.
- Every commit pushed to `origin` is durable.
- The VM does not host the only copy of any code that matters.

If the VM dies with unpushed commits:

- Recover via the hypervisor snapshot.
- If snapshot unavailable: the unpushed work is lost.
  Mitigation: push branches the same day they are created
  (`claude-code-operating-rules.md` §2).

## 4. Backup secrets (already handled)

- 1Password is the canonical secrets store.
- The VM holds *active* tokens (Cloudflare scoped, gh CLI),
  not their authoritative copy.
- Loss of the VM does not lose any secret — the operator
  re-issues a new scoped Cloudflare token, re-runs `gh auth
  login`, and re-issues a new Tailscale node identity.

## 5. Backup launch evidence (PR'd into the repo)

- Launch evidence lives at `~/launch-evidence/<YYYY-MM-DD>/`
  until PR'd.
- The same-day PR rule applies: evidence does not sit on the
  VM uncommitted.

## 6. Recovery scenarios

### 6.1 The VM is unreachable but otherwise healthy

Likely cause: Tailscale, network, or provider blip.

Steps:

1. Operator checks Tailscale admin console for last-seen.
2. If the VM is online but unreachable: provider-side console
   restart.
3. If the provider's web console password was disabled per
   `security-baseline.md` §0, use the snapshot-restore path
   instead (§6.3).
4. Decision-log entry only if the outage exceeds 2 hours or
   if the cause is unknown.

### 6.2 The VM is responsive but a tool is broken

Likely cause: a `npm install` corrupted `node_modules`,
gitleaks self-update broke, etc.

Steps:

1. Identify the broken tool.
2. Re-run the corresponding §4 step from `build-guide.md`.
3. Re-walk the relevant section of `ops-vm-checklist.md`.
4. If still broken: revert to the last snapshot (§6.3).

### 6.3 Restore from a snapshot

1. Operator opens the hypervisor / VPS dashboard.
2. Selects the most recent known-good snapshot.
3. Restores. The VM comes up at the snapshot's state.
4. Operator SSHs in over Tailscale.
5. `cd ~/HamMediaLabs && git fetch && git status` — confirm
   no drift vs `origin`.
6. If any post-snapshot work was unpushed: it is lost. The
   same-day-push rule prevents this from being common.
7. Re-walk `ops-vm-checklist.md` §1–§17 to re-accept the VM.

Target: restore + reach `git status` clean within **15
minutes**.

### 6.4 Rebuild from scratch

For when no snapshot is salvageable:

1. Capture any latest evidence via the provider console (if
   accessible).
2. Re-issue the Cloudflare scoped token (revoke the old one).
3. Destroy the VM.
4. Build a fresh VM per `build-guide.md` §1–§8.
5. Re-walk `ops-vm-checklist.md` end-to-end.
6. Tailscale: `tailscale up` issues a new node identity; the
   old identity is removed from the tailnet ACL.
7. gh: `gh auth login` on the new VM.
8. Wrangler: source the new scoped token.
9. Decision-log entry capturing the rebuild + reason.

Target: rebuild complete + accepted within **2 hours** from
scratch.

### 6.5 SSH key compromise

Run `playbooks/incident-credential.md`:

1. Lock — remove the operator's public key from
   `~/.ssh/authorized_keys` on the VM; access remains via
   Tailscale SSH if Tailscale identity is intact.
2. Rotate — operator issues a new SSH key locally; uploads
   public key to GitHub; pushes to VM via Tailscale.
3. Blast radius — audit GitHub for new SSH-key additions;
   audit Cloudflare for new API tokens.
4. Audit — `last`, `lastb`, `journalctl -u ssh` review.
5. Registry update — record the new key fingerprint in
   1Password.

### 6.6 Cloudflare scoped token compromise

1. Revoke immediately in the Cloudflare dashboard.
2. Create a fresh scoped token per `secrets-policy.md` §3.
3. Update 1Password.
4. Update `~/.config/cloudflare/wrangler.env`.
5. `wrangler whoami` to verify.
6. Decision-log entry.

### 6.7 Supabase service-role key compromise

**Tier 1 incident.** Run `docs/09-security-and-secrets.md`
incident response immediately. The VM is **not** the primary
storage location for this key (Cloudflare Pages env var is);
but if it was ever exported into a VM shell, treat as
compromised. Rotation cascades:

1. Cloudflare Pages env var rotated.
2. Any active Cloudflare Pages deployment redeployed against
   the new key.
3. Supabase logs reviewed for any unexpected use of the old
   key.
4. Decision-log entry.
5. Post-mortem in the next weekly review.

## 7. Decommissioning

When the VM is retired:

- See `secrets-policy.md` §11 for the secrets-side
  decommissioning steps.
- After decommissioning, this folder's documentation **stays
  in the repo** — it is the operating manual for the *next* VM
  build.

## 8. Quarterly review

At every quarterly platform refresh
(`playbooks/quarterly-platform-refresh.md`):

- Snapshot retention policy reviewed.
- Restore-from-snapshot drill: actually do the 15-minute
  restore drill once a year (capture in build-log evidence).
- §1 inventory re-walked to confirm nothing unexpected has
  accumulated on the VM.
- §6.3 timing verified (15-min target still met).

## Cross-references

- `build-guide.md` — rebuild from scratch.
- `ops-vm-checklist.md` — acceptance.
- `security-baseline.md` — security floor (includes snapshot
  encryption posture).
- `secrets-policy.md` — token rotation.
- `playbooks/incident-credential.md` — credential incident
  response.
- `playbooks/quarterly-platform-refresh.md` — quarterly
  cadence.
- `docs/09-security-and-secrets.md` — lab-wide secrets
  framework.
