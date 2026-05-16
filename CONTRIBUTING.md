# Contributing

## Workflow

This repo follows a **branch + pull request** model. The default branch is
`main`; direct commits to `main` are not permitted.

### For human contributors

1. Branch from an up-to-date `main`:
   ```bash
   git fetch origin
   git switch -c <prefix>/<short-description> origin/main
   ```
2. Make changes in small, reviewable commits.
3. Push the branch and open a PR against `main`.
4. CI (typecheck, tests, gitleaks) must be green before merge.
5. Squash or rebase as appropriate; keep commit messages focused on the *why*.

### For Claude Code (and any other automated agent)

Claude Code **must** follow the same workflow as humans:

- Develop on a feature branch named `claude/<short-description>-<token>`.
- Never `git push` to `main` directly. Never `git commit` while `HEAD` is on `main`.
- Open a PR for every change set. Even a one-file fix goes through a PR.
- If a session was authorised once to land work on `main`, that authorisation
  does **not** carry to the next session. The default is always: branch + PR.
- The agent must verify CI passes before reporting the work as complete.

Branch protection on `main` should be configured (in GitHub settings) to:
- Require pull request reviews before merging.
- Require status checks: `typecheck-and-test`, `gitleaks`.
- Restrict pushes to `main` to administrators only.

## Commit messages

- One-line subject in the imperative ("Add X", "Fix Y", "Tighten Z").
- Wrap body at 72 chars; explain *why*, not *what*.
- Reference decision-log entries when applicable.

## Decision log

Every non-trivial choice gets an entry in `docs/15-decision-log.md` with:
date, decision, reasoning, alternatives, risks, revisit date.

## Secrets

- Real secrets never enter this repo. `.env.example` is the only `.env*` file
  that may be tracked.
- API keys and JWTs are vaulted in 1Password and surfaced to runtimes via
  GitHub Actions secrets (CI), Cloudflare env vars (HQ runtime), or local
  `.env` (gitignored).
- `gitleaks` runs in CI on every push; secret-shaped strings are blocked.
- See `docs/09-security-and-secrets.md` for credential tiers and the
  Supabase service-role classification.

## Style

- TypeScript: see `tsconfig.json`. `noImplicitAny`, `noUnusedLocals`,
  `noUnusedParameters` are all on.
- Markdown: see `docs/17-style-guide.md` for editorial standards.
- No emoji in code or commits unless the user explicitly requests it.
