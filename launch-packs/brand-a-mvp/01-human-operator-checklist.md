# 01 — Human Operator Checklist

> Every step here is **human-only**. No agent assist.
>
> **Workstation note.** The recommended workstation for walking
> this checklist is the dedicated Ops VM documented in
> `ops-vm/` (`hydra-ops-vm`). Using it consolidates secrets,
> evidence capture, and environment-parity with CI. The
> launch can also be run from the operator's personal machine
> — the steps below are identical either way. If you are on
> the Ops VM, walk `ops-vm/ops-vm-checklist.md` to acceptance
> before starting this checklist.

---

## 1. Accounts (verify, do not create today)

- [ ] Vault unlocks; recovery codes accessible.
- [ ] Master Gmail signed in and reachable.
- [ ] Backup Gmail signed in and reachable.
- [ ] GitHub signed in; SSH key works.
- [ ] Cloudflare signed in (account + Pages project pre-created).
- [ ] Buttondown signed in; opt-in form embed URL on hand.
- [ ] Brand A editorial Gmail alias is forwarding correctly.

If anything in this list is "no", **stop** and reschedule.

## 2. GitHub state

- [ ] `main` is clean and up to date.
- [ ] CI is green on `main` (`typecheck-and-test` + `gitleaks`).
- [ ] The Brand A site folder (`brands/brand-a-aiescape/site/`)
      exists, built from the template.
- [ ] No `PUBLIC_*` env vars referenced in the Cloudflare Pages
      project (per `docs/cost-control-and-free-tier-plan.md`).
- [ ] No `.env` file accidentally tracked
      (`git ls-files | grep -i env` returns only `.env.example`).

## 3. Cloudflare / hosting decision

- [ ] Cloudflare Pages project for Brand A exists.
- [ ] If using a custom domain: domain is registered, DNS is set,
      and the operator has filed the §4.1 decision-log entry per
      `docs/cost-control-and-free-tier-plan.md`.
- [ ] If using a free Cloudflare Pages subdomain
      (e.g. `<brand>.pages.dev`): document the URL in
      `04-technical-launch-pack.md`.
- [ ] The site has been deployed at least once to a preview
      environment.

## 4. Content review

- [ ] Cornerstone 1 (`drafts/01-free-tier-ai-stack.md`) status is
      `staged`.
- [ ] `author:` and `editor:` are real human names.
- [ ] `reviewed_at` set to the ISO timestamp of QA approval.
- [ ] Sources cited inline; `sources[]` populated with retrieval
      dates.
- [ ] AI-augmentation label renders above the byline (verify on
      the staging URL, not just localhost).
- [ ] `affiliate_in_play: false` (no affiliate links at launch).
- [ ] Read the piece aloud once, end to end, on the staging URL.

## 5. Disclosure review (live URL)

- [ ] AI-use disclosure block renders site-wide (footer).
- [ ] AI-augmentation label renders on the cornerstone above the
      byline.
- [ ] `/ai-use` page renders.
- [ ] `/affiliate-disclosure` page renders with the (empty
      placeholder) programmes list.
- [ ] `/privacy` page renders with operator name + postal address.
- [ ] `/terms` page renders.
- [ ] `/contact` page renders; the email link works.
- [ ] No `PUBLIC_*` env values appear in the rendered HTML
      (`grep` against the live HTML).

## 6. Measurement setup

- [ ] Plausible CE self-hosted OR Cloudflare Web Analytics is
      installed on the Brand A site (cookieless).
- [ ] First page-view event has been recorded (operator visits
      the live URL).
- [ ] Newsletter opt-in works (operator submits a test signup
      and confirms).
- [ ] HQ `brand` table has a row for Brand A; will flip to
      `active` after launch.

## 7. Decision-log entries

- [ ] A decision-log entry has been prepared (not yet committed)
      naming the launch day, the first piece, and the kill
      criteria.
- [ ] Any open Brand-A-specific decisions from
      `docs/15-decision-log.md` §14.3 (apex strategy, etc.) have
      been resolved.

## 8. Manual publish steps (the only steps that flip live)

- [ ] Move `01-free-tier-ai-stack.md` from `drafts/` to `posts/`
      in the brand site repo.
- [ ] Open a PR; CI green; merge.
- [ ] Cloudflare Pages auto-deploys; verify the piece resolves
      at its slug.
- [ ] Update `content_asset.status` to `live` in HQ
      (`UPDATE content_asset SET status='live', publish_date=CURRENT_DATE
      WHERE url='/free-tier-ai-stack'`).
- [ ] Flip `brand.status` from `planning` to `active`.

## 9. Communication

- [ ] Operator's own X account: post a single sentence about
      "first piece is live", link in the **first reply** per
      `docs/x-platform-risk.md` §4. **#ad NOT applicable** (not
      commercial at launch).
- [ ] Reddit: do **not** post the link to any subreddit on launch
      day. Comment-first discipline remains.
- [ ] Newsletter: send the announcement issue with a single CTA
      (read the cornerstone). Subject line per the brand voice;
      no exclamation marks.

## 10. End-of-day

- [ ] Decision-log entry filed with the launch date, the piece,
      and the URL.
- [ ] Operator's notes capture anything unusual that happened.
- [ ] Tomorrow's `05-measurement-and-review.md` 24h check is on
      the calendar.

## Hard stops

Any of these stops the launch on the spot:

- A disclosure block fails to render on the live URL.
- The piece's `staged` markdown does not match the live HTML
  (rendering bug).
- A `PUBLIC_*` env value appears in the rendered HTML.
- A Tier-1 credential is suspect (see
  `playbooks/incident-credential.md`).
- The piece needs an inline correction the operator cannot make
  within 30 minutes.
