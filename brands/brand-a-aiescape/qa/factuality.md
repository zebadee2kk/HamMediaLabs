# Brand A — Factuality protocol

> What "sourced" means here. Walk this when ticking the *Factuality* box on
> `qa/checklist.md`.

## What counts as a contestable claim

Anything a careful reader might reasonably want to verify. Examples:

- **Numbers and stats** — "Free tier offers X requests per minute."
- **Causal claims** — "Switching to Y saved me Z hours per week."
- **Comparative claims** — "Faster than", "cheaper than", "better than".
- **Quoted speech** — anything in quotation marks attributed to a person.
- **Policy / regulation references** — "Article 50 requires Z."
- **Tool capability claims** — "Tool X can do Y."

Not contestable, no source required:
- Statements of personal preference ("I prefer X").
- Direct first-person experience ("I tried Y on a Tuesday").
- Hyperbolic narrative scaffolding *clearly* labelled as such — but
  Brand A's voice avoids this anyway.

## Source ranking (prefer up the list)

1. The provider / regulator's own page (Google AI rate-limit page, FTC
   endorsement guides, etc.).
2. Primary documentation (Stripe docs for Stripe claims, Cloudflare docs
   for Cloudflare claims).
3. A peer-reviewed paper or canonical reference.
4. A reputable secondary source (Bloomberg, FT, Reuters, ICO guidance).
5. *Not acceptable*: round-up blogs, social media posts, LLM outputs.

## Date discipline

- All statistics carry a retrieval date in `sources:`.
- Stats older than 18 months are re-verified at publish time. Don't trust
  cached browsers.
- Provider quota / pricing claims are re-verified every quarter via
  `playbooks/provider-revalidation.md`.

## What to do when you can't verify

- If you can find no primary source, **soften the claim** to match what
  you actually know.
- If softening is not honest, **cut the claim**.
- Never substitute an LLM's confident assertion for a citation. The
  router is not a source.

## Quotes

- Only quote real, public statements. Cite the original speech, post, or
  article.
- Never paraphrase into a quoted form ("they said X" is paraphrase, not
  a quote).
- Never AI-synthesise a quote from a real person.

## Errors and corrections

- If we publish something inaccurate and a reader flags it, we:
  1. Correct the piece inline.
  2. Add a `Correction (YYYY-MM-DD):` line above the byline.
  3. Keep the original wording visible (struck-through or in an
     `<aside>`) so the correction is honest.
  4. Log the correction in `docs/15-decision-log.md` if it changed a
     factual claim that other pieces rely on.
