# Ops VM — Claude Code Operating Rules

> Boundaries for Claude Code when it runs inside the Ops VM.
> These are stricter than the defaults because the VM holds a
> working repo clone, scoped tokens, and launch-evidence
> material.
>
> **Posture:** branch-only, PR-gated, no autonomous side
> effects beyond `~/HamMediaLabs/`.
>
> **Companion docs:** `CONTRIBUTING.md` (lab-wide PR rules —
> binding here exactly as elsewhere); `secrets-policy.md`,
> `security-baseline.md`; `claude-design-subagents.md` for the
> design pipeline.

---

## 1. The five hard rules

1. **No direct push to `main`.** Always branch, always PR.
2. **No publishing.** Tier 4 frozen; the VM does not bypass it.
3. **No DNS changes.** Operator-only via Cloudflare dashboard.
4. **No paid-service creation.** §5 cost gate is binding.
5. **No social posting.** Manual cadence per
   `docs/x-platform-risk.md`.

Plus the lab-wide rules that already bind Claude Code wherever
it runs:

- No bypassing gitleaks / hooks (`--no-verify` is forbidden).
- No bypassing signing (`--no-gpg-sign` is forbidden).
- No editing `.git/config`.
- No real-person likeness / voice / signature synthesis.

## 2. Branch-only work

Every Claude Code session on the VM:

```bash
git checkout main
git pull --ff-only origin main
git checkout -b claude/issue-NNN-<short-slug>
# ... work ...
git add -- <specific paths>      # never `git add .`
git commit -m "<message>"
git push -u origin claude/issue-NNN-<short-slug>
gh pr create ...                 # or via GitHub MCP
```

**One issue = one branch = one PR.** No bundled multi-issue
PRs. If a session needs to touch two issues, it opens two PRs.

## 3. Branch deletion

- Never delete a branch except on explicit operator command.
- The lab's `git push --delete` is blocked by the connector
  proxy in the current execution environment (HTTP 403);
  branch hygiene is an operator-runnable action per #56.
- On the VM, `git push --delete` may succeed because the VM
  uses direct GitHub credentials. **Still do not delete
  branches** unless the operator says so in-session.

## 4. PR summary requirements

Every PR opened from the VM includes:

- `Closes #N` (the originating issue).
- One-paragraph summary.
- Files changed.
- Tests run (with output line or pass count).
- Security notes.
- Out-of-scope notes.
- NotebookLM-Pack marker (`updated` + file list, or
  `not-needed` + reason — per
  `.github/workflows/notebooklm-pack-freshness.yml`).

## 5. NotebookLM freshness marker (binding)

The PR-time freshness gate is automatic. Claude:

- Always adds the marker to the PR body before pushing.
- When the PR touches `docs/**`, `ARCHITECTURE.md`,
  `brands/**`, `launch-packs/**`, `design-handoffs/**`,
  `dashboards/**`, `core/**`, `.github/workflows/**`, or any
  `package.json`, the marker must be `updated` plus a list of
  changed `notebooklm-pack/**` files, OR `not-needed` plus a
  `Reason:` line.

## 6. Security + gitleaks checks

Before any `git push`, Claude runs:

```bash
cd ~/HamMediaLabs
gitleaks detect --no-banner -s .
npm test
npm run typecheck
```

Any failure stops the push.

If a build artefact is involved:

```bash
cd brands/brand-a-aiescape/site && npm run build
find dist -type f -name '*.js' | wc -l   # expect 0
```

## 7. Secrets handling

- Claude **never** asks the operator to paste a secret into
  the session.
- Claude **never** echoes a secret in its output.
- If a script needs a secret, Claude writes the script to
  read from the operator's already-loaded env var
  (`$CLOUDFLARE_API_TOKEN`, etc.), and instructs the operator
  to run the script in a shell where the env var is sourced.
- See `secrets-policy.md` §8 for the AI-tool secret prohibition.

## 8. Decision-log discipline

For any strategic change (governance, brand posture, cost
gate, security posture), the PR includes a decision-log entry
appended to `docs/15-decision-log.md` in the standing format:

```
### Date: YYYY-MM-DD
### Decision:
### Reasoning:
### Alternatives considered:
### Risks:
### Revisit date:
```

Mechanical / engineering changes (a test, a typecheck fix, a
component refactor) don't require a decision-log entry unless
they materially change behaviour.

## 9. Permission posture

The lab does NOT give Claude blanket permission to:

- `rm -rf` anything outside `~/HamMediaLabs/dist/` and
  `~/HamMediaLabs/node_modules/`.
- Modify `~/.bashrc`, `~/.ssh/`, `~/.config/`.
- Run `sudo` commands.
- Install OS-level packages.
- Modify `iptables` / `ufw` / `tailscale` state.
- Restart any system service.

If a session needs any of the above, Claude proposes the
command, then waits for the operator to run it manually.

## 10. Suggested Claude profiles / subagents

These are *suggested* personas for repeated Claude Code work
on the VM. They are not file-on-disk subagents; they are
mental modes the operator can invoke (`/agent hydra-pm`, etc.)
once configured under the operator's Claude Code installation.

### `hydra-pm`

**Role:** project manager. Reads the open-issue list, proposes
the next issue to tackle, drafts PR summaries.

**Not allowed to:** close issues; merge PRs; modify governance
docs without an explicit operator instruction.

### `hydra-github`

**Role:** GitHub-mechanics specialist. Opens PRs, polls CI,
merges (only on explicit operator instruction).

**Not allowed to:** push to `main`; bypass CI; force-push;
disable required reviews.

### `hydra-security`

**Role:** runs gitleaks; reviews `.gitleaks.toml`; walks
`docs/dependabot-security-audit.md` §6b evidence on any new
Dependabot PR.

**Not allowed to:** dismiss security alerts; merge security-
related PRs without operator review; modify secrets.

### `hydra-launch`

**Role:** walks the launch pack (`launch-packs/brand-a-mvp/`)
with the operator. Captures launch evidence.

**Not allowed to:** click publish; toggle `affiliateInPlay`;
launch Brand B or Brand C.

### `hydra-docs`

**Role:** drafts and maintains documentation. Owns the
NotebookLM pack updates as a normal author would (with the
operator reviewing every PR).

**Not allowed to:** modify disclosure copy in
`docs/18-disclosure-templates.md` without an explicit operator
PR review.

### `hydra-design-brief`

**Role:** walks the pre-Gemini design-subagent pipeline
(`design-handoffs/claude-design-subagents.md`,
`claude-before-gemini-checklist.md`) before any design brief
leaves the lab.

**Not allowed to:** paste secrets into Gemini; bypass the
10-section pre-flight; bypass the 14-section post-Gemini
review.

## 11. Session-end discipline

At the end of every Claude Code session:

- Confirm no uncommitted changes (`git status` clean) or that
  uncommitted changes are intentional.
- Confirm the PR is opened (if work was meant to ship) or that
  the branch is parked deliberately.
- Confirm no secrets in `~/.bash_history`.
- Log the session into `~/launch-evidence/` only if it touched
  production or pre-launch work.

## 12. What Claude must escalate to the operator

- Any request that would require pushing to `main`.
- Any request that would require disabling CI.
- Any request that involves a paid service.
- Any request that involves DNS / Cloudflare account changes
  beyond the scoped Wrangler operations in
  `deployment-runbook.md` §3.
- Any request that would touch HamNet.
- Any request that asks Claude to ignore a `voice.md` §5
  anti-voice rule.
- Any request that asks Claude to rewrite disclosure copy in
  `docs/18-disclosure-templates.md`.
- Any request that asks Claude to launch Brand B or Brand C.
- Any request that asks Claude to enable autonomous publishing.

When Claude escalates, it stops, comments on the relevant
issue / PR, and waits for the operator.

## Cross-references

- `CONTRIBUTING.md` — lab-wide PR workflow.
- `secrets-policy.md` — secrets handling.
- `deployment-runbook.md` — Wrangler scope on the VM.
- `design-handoffs/claude-design-subagents.md` — pre-Gemini
  subagents.
- `design-handoffs/claude-before-gemini-checklist.md` —
  pre-flight.
- `notebooklm-pack/06-ai-workforce-and-tooling.md` — workforce
  boundaries.
- `docs/03-governance.md` — tiers (T4 frozen).
- `docs/15-decision-log.md` — decision discipline.
