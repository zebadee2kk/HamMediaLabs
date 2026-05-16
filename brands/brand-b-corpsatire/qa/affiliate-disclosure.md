# Brand B — Affiliate / Sponsorship Disclosure

> Canonical templates live in `docs/18-disclosure-templates.md`. Brand B
> specifics are below. Posture: **Brand B does not actively monetise in
> year 1.** Sponsorship is inbound only; merch is post-validation. This
> doc exists so that when those revenue surfaces eventually arrive,
> they comply with disclosure rules from day one.

## Frontmatter switches

```yaml
affiliate_in_play: false   # always false at MVP
sponsor_in_play: false     # true only if a written agreement is on file AND Tier-3 approval obtained
```

Both flags default to `false`. Flipping either to `true` is a Tier-3
operation; the QA checklist surfaces this in §1.

## What Brand B does **not** do

- **No outbound sponsorship pitching.** All sponsorship is inbound,
  on documented brand-fit grounds. We don't chase.
- **No affiliate links** at MVP. Brand B is validation-only.
- **No paid-promotion of regulated products.** That includes financial
  promotions (FCA), supplements, prescription medicines, gambling, BNPL,
  crypto.
- **No "boost" or platform-paid amplification** of unproven posts.
- **No use of platform "Branded Content" / "Paid Partnership" toggles**
  unless we have a written sponsorship agreement on file. Toggling
  these without an agreement misleads the platform and the audience.

## When a sponsored clip actually ships (future state)

When (and only when) the brand has validated and a real sponsorship
is signed, the following are binding **before** the clip is recorded:

1. **Written agreement** on file. Sets the disclosure wording the
   sponsor requires; we adopt the stricter of theirs and ours.
2. **Tier-3 approval** by the operator (one-click approve, recorded in
   the decision log).
3. **Frontmatter:** `sponsor_in_play: true`.
4. **In-clip disclosure** in the first 3 seconds of the cut: `#ad —
   sponsored by <X>.` Visible on screen, not just spoken. AI-assist
   disclosure (satire variant) appears alongside, not instead of.
5. **Caption / post body:** `#ad` on its own line, sponsor named in
   plain language. AI-assist line below.
6. **Platform tools:** enable the platform's native sponsored-content
   toggle (TikTok Branded Content, Meta Paid Partnership label, X
   `#ad` already in body — not the bio).
7. **No editorial overreach.** The sponsor may approve the disclosure
   wording; they do not approve the joke. Editorial control stays with
   the brand.
8. **Bio + pinned post** updated with the running disclosure for the
   campaign duration.

## When merch ships (future state)

Merch is `sponsor_in_play: false` because we are the seller. Merch
posts still require:

- Plain-language disclosure in the post body that the merch is sold
  by the operator.
- Clear pricing visible before checkout.
- A link in the **first reply** on X (per `docs/x-platform-risk.md` §4),
  not in the launch tweet.
- A return / refund policy on the merch site.

## Comment & DM discipline

- Replies that pitch a product (theirs or anyone's) get muted, not
  engaged.
- DMs are turned off or filtered to known-collaborators only.
- Inbound sponsorship inquiries go to a single inbox; replies are
  signed by the operator's real name.

## Disclosure placement (binding mechanics)

When sponsorship eventually appears, the canonical placement is:

| Surface | Where the disclosure goes |
|---|---|
| TikTok / Reels / Shorts | (a) on-screen in the first 3 seconds, (b) in the post body, (c) in bio for the campaign duration, (d) platform native toggle on |
| X mirror | `#ad` in the launch tweet **body** (not the bio); AI-assist line on its own line in the same tweet |
| Brand B website (if it exists) | Footer disclosure block + `/affiliate-disclosure` page updated to list the campaign |

## What "doesn't count"

- Disclosure that appears only in the bio.
- Disclosure that appears only in the platform's auto-banner.
- Disclosure that requires the viewer to expand a "more" / "see more"
  toggle.
- Disclosure hidden in a hashtag chain (`#ad #ad2 #ad3`).
- Disclosure in the comments rather than the post body.

## Audit trail

- Every active programme / sponsor is logged in the brand site's
  `/affiliate-disclosure` page (or equivalent on whatever surface
  Brand B uses).
- The operator keeps a per-campaign folder with: agreement, briefing
  notes, the staged script, the published clip URL, the disclosure
  evidence (screenshot of bio + post + native toggle), and the
  decision-log entry approving the sponsorship.

## Cross-references

- `docs/18-disclosure-templates.md` — canonical disclosure copy.
- `docs/x-platform-risk.md` §5 — X disclosure mechanics.
- `docs/10-legal-and-platform-risk.md` — lab-wide legal posture.
- `qa/defamation.md` — Brand B's separate legal-safety doc; relevant
  if a sponsor's positioning relies on naming competitors.
