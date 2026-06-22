# Branch Hygiene Policy

## Overview

This policy ensures the repository's branch namespace stays clean, reducing
cognitive load and CI waste. All contributors — human and automated — must
follow these rules.

## When to Delete Branches

| Trigger | Action |
|---|---|
| PR merged into `main` | Delete the head branch immediately (GitHub auto-delete is enabled). |
| PR closed without merge | Delete after confirming no work is salvageable. |
| Branch stale for >30 days | Ping the owner; delete if no response within 7 days. |
| Dependabot branch merged or superseded | Delete immediately. |

**Rule of thumb:** if the branch's work is in `main` or is no longer needed,
delete it. Branches are cheap; confusion is expensive.

## Naming Conventions

| Prefix | Use Example | Example |
|---|---|---|
| `claude/` | Claude Code agent sessions | `claude/hardening-vXlkp` |
| `feature/` | New features or enhancements | `feature/voice-authenticity-system` |
| `pm/` | Product management / launch work | `pm/brand-a-free-first-launch-checklist` |
| `dependabot/` | Automated dependency updates | `dependabot/npm_and_yarn/lodash-4.17.21` |
| `fix/` | Bug fixes | `fix/login-redirect-loop` |
| `chops/` | Tooling / maintenance | `chore/ci-add-gitleaks` |

- Use lowercase kebab-case after the prefix.
- Agent branches should include a session token suffix (e.g. `-vXlkp`) to
  distinguish concurrent sessions.
- Keep names short but descriptive (<60 chars total).

## Quarterly Cleanup Procedure

Every quarter (Jan, Apr, Jul, Oct), a maintainer runs:

```bash
# 1. Fetch and prune stale remote-tracking branches
git fetch --prune origin

# 2. List branches merged into main
git branch --merged origin/main --format='%(refname:short)'

# 3. Delete merged branches (excluding main, develop, release/*)
git branch --merged origin/main --format='%(refname:short)' \
  | grep -v -E '^(main|develop|release/)' \
  | xargs git branch -d

# 4. Push deletions to remote
git push origin --delete <branch1> <branch2> ...

# 5. Report: number of branches cleaned, any that need manual review
```

Any branch older than 90 days that is NOT merged and NOT actively in progress
should be flagged for review before deletion.

## Branch Protection Rules for `main`

The `main` branch is protected with the following settings (configured in
GitHub Settings > Branches > Branch protection rules):

| Rule | Setting |
|---|---|
| Require pull request reviews | Enabled — at least 1 approving review |
| Dismiss stale reviews when new commits are pushed | Enabled |
| Require status checks before merging | Enabled — `typecheck-and-test`, `gitleaks` |
| Require branches to be up to date | Enabled |
| Require conversation resolution before merging | Enabled |
| Restrict pushes to `main` | Administrators and CI only |
| Allow force pushes | Disabled |
| Allow deletions | Disabled |

## Enforcement

- GitHub branch protection rules enforce the above automatically.
- CI runs on every push to a feature branch; failures block merge.
- `gitleaks` blocks any commit containing secret-shaped strings.
- Automated agents must follow the same rules as human contributors.
