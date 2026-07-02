# Brand Naming Sprint (one working session per brand)

> All three brand names are working titles ("AI Escape", "Corporate
> Satire", "UK Financial Escape") pending trademark + domain checks —
> flagged in every `profile.md` and in the creative-director review
> (F6). Unnamed brands block domains, social handles, logos, and OG
> art. This playbook closes one brand's name in a single ≤2h operator
> session. Output: a decision-log entry and updated `profile.md`.

## 0. Inputs

- `brands/<slug>/profile.md` (positioning, audience, core promise)
- `brands/<slug>/voice.md` §1 (the persona the name has to sound like)
- `docs/account-naming-convention.md` (handle/alias patterns downstream)

## 1. Shortlist (30 min)

Generate 10–15 candidates (persona-first pattern works: "what would
this persona call their own site?"). Keep only candidates that are:

- [ ] Sayable — survives being spoken aloud on a podcast once.
- [ ] Spellable — a listener can type it after hearing it.
- [ ] Not a pun that expires (the joke wears off; the domain doesn't).
- [ ] Meaning-adjacent to the core promise, not a literal description.
- [ ] Not locked to a feature that might die (a name with "AI" in it
      ages with the hype cycle — Brand A note).

Cut to 3–5.

## 2. Collision checks (45 min, per surviving candidate)

Work through in this order — cheapest check first:

- [ ] **Search:** first 2 pages of Google for the exact name and
      obvious variants. Existing business in an adjacent niche = cut.
- [ ] **Domain:** apex availability (.com / .co.uk / .io as relevant
      per brand jurisdiction). Premium-priced domain = treat as
      unavailable (cost gate, `docs/cost-control-and-free-tier-plan.md`).
- [ ] **Handles:** X, TikTok, Instagram, YouTube, Reddit availability
      per the brand's channel plan. Pattern per
      `docs/account-naming-convention.md`. Near-miss variants
      acceptable on mirror channels only, never on the primary.
- [ ] **Trademark:** UK IPO search (all brands) + EUIPO/USPTO quick
      search for A (US audience). Same/similar class (Class 41 media,
      Class 35 advertising) live mark = cut. This is a screen, not
      legal advice — a registrable-in-principle survivor still gets a
      professional check before any paid spend on the name.
- [ ] **Meaning check:** the name in the other markets the brand
      reaches (slang, unfortunate readings).

## 3. Decide (15 min)

- [ ] Rank survivors against the brand's voice doc — which name would
      the persona actually put on their own work?
- [ ] Operator picks one (plus one backup, recorded but not registered).
- [ ] Decision-log entry: candidates considered, checks run, pick,
      backup, and the "no paid spend before professional trademark
      check" condition.

## 4. Execute (same day)

- [ ] Register the domain (Cloudflare Registrar / Porkbun per master
      plan §4.2). Domain cost lands in the month's budget envelope.
- [ ] Reserve handles on primary + mirror channels (registration only —
      no posting; account registry entries per `vault-template/`).
- [ ] Update `brands/<slug>/profile.md` identity block and
      `site.config.ts` `brandName` (+ decision-log cross-reference).
- [ ] Queue logo/OG work: the name unblocks
      `design-handoffs/gemini-*` visual-identity briefs; tokens
      already have `logoPath` / `ogImagePath` slots waiting.

## Anti-patterns

- Naming by committee across weeks. One session, one decision-log entry.
- Registering ten domains "to be safe". One pick + one recorded backup.
- Letting the working title calcify by shipping social handles under it
  "temporarily".
