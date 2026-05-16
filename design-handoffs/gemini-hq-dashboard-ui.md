# Gemini Brief — HQ Dashboard UI

> Copy this entire brief into Gemini Free. Operator-only surface
> behind Cloudflare Access. Run through
> `gemini-output-review-checklist.md` before committing any output.

---

## Role

You are a senior visual / UX designer producing the UI / interaction
design for the **HamMediaLabs HQ Dashboard** — an operator-only,
read-only Astro page that surfaces portfolio + brand + provider +
cost / profit signals from Supabase.

## Dashboard purpose

- **Audience:** one human operator.
- **Frequency:** glanced at daily; full review weekly.
- **Goal:** at a glance, the operator knows (a) which brands are
  alive / well / at risk, (b) what each is costing, (c) what the
  free-tier headroom looks like, (d) what experiments are open,
  (e) the kill / hold / scale state.
- **Static-rendered.** No client islands. Data fetched at build
  time (rebuild on demand via Cloudflare Pages deploy hook).
- **Auth:** Cloudflare Access at the perimeter. The dashboard
  itself does no auth.

Live behaviour reference: `dashboards/app/src/pages/index.astro`,
`dashboards/app/src/components/`, `dashboards/app/README.md`.
Schema reference: `core/db/schema.sql`.

## Operating-dashboard visual language

- **Quiet.** Operator dashboards do most of their work without
  shouting. No big animations, no flashy gradients.
- **Tabular numerics.** `font-variant-numeric: tabular-nums` on
  any cell containing a number.
- **Trust through alignment.** Right-align numbers; left-align
  text; consistent vertical rhythm.
- **Three colour cues, sparingly:**
  - Green / muted-green for "healthy / passed".
  - Amber for "watch / at threshold".
  - Red / muted-red for "exceeded / flagged".
  Use these as accent borders or pill backgrounds, not full-card
  fills.
- **No traffic-light overload.** A row never carries more than two
  coloured cues.

## Pages required

### 1. `/` (overview)

Cards (top):
- Active brands count.
- Hold brands count.
- Scale-candidate count.
- Killed brands count.
- Cost (this month, £).
- Revenue (this month, £).
- **Net** (positive = green border; negative = red border).
- Owned-audience share (%).

Sections (below cards):
- Brand table (slug / name / status pill / tier / cost / revenue /
  brand_score / verdict).
- 14-day provider health: per-provider rollup + 429-rate flag
  (>5% = amber background row).
- Recent decisions (last 7 days) from the `decision` table — slug
  / kind / one-line reason.

### 2. `/brand/[slug]` (brand detail)

- KPI strip: north-star metric, leading metrics, lagging metrics
  per `docs/measurement-framework.md` §2.
- Content output table (last 30 days).
- Channel rollup (per channel: posts / impressions / engagement /
  signups).
- Cost breakdown attributed to this brand.
- Open experiment block (per `playbooks/weekly-experiment.md`).
- Recent decisions tagged to this brand.

### 3. `/providers` (provider health)

- Per-provider 14-day rollup with quota-headroom indicator
  (per `core/providers/quota-registry.ts`).
- Per-provider daily rows.
- Last revalidation date (from quota registry).

### 4. `/cost` (cost & profit)

- Per-line monthly cost with attribution.
- Per-brand net (revenue − attributed cost).
- Scenario marker (Phase A / B / C / D per `docs/profit-model.md`).
- Free-tier headroom indicators (Gemini RPD, Groq TPM, OpenRouter
  RPD, Supabase MB, CF Pages builds, newsletter subs).

### 5. `/experiments` (open experiments)

- One row per open experiment.
- Hypothesis, success threshold, failure threshold, rollback
  trigger, days remaining.
- Verdict slot once the experiment closes.

### 6. `/decisions` (decision-log mirror)

- The HQ `decision` table rendered as a scrollable table.
- Filter by scope (portfolio / brand / provider / compliance /
  security).
- Click → expand to full record.

## Accessibility expectations

- ≥WCAG AA on every page (contrast, focus-visible, keyboard nav).
- Heading hierarchy correct on every page (one `H1`).
- Tables have `<caption>`; columns have explicit `<th>` scope.
- Skip-link to main content.
- No colour-only state encoding — every coloured pill also has a
  text label (e.g. "active" / "kill" / "hold").

## No fake data — label assumptions clearly

- Every metric carries a small `actual / estimate / target` tag
  inline.
- When the dashboard reads zero rows, render an `EmptyState`
  component (the existing one in
  `dashboards/app/src/components/EmptyState.astro`) with a helpful
  message — never silently render zeros.
- When the dashboard cannot connect to Supabase, render the
  existing `ConfigBanner` and continue rendering other widgets.

## Component suggestions

- `PortfolioCards.astro` (extend existing).
- `BrandTable.astro` (extend existing).
- `BrandKpiStrip.astro` (new; for `/brand/[slug]`).
- `ChannelRollupTable.astro` (new).
- `ProviderQuotaCard.astro` (new; reads `core/providers/quota-registry.ts`).
- `CostBreakdownTable.astro` (new).
- `ExperimentRow.astro` (new).
- `DecisionRow.astro` (new).
- `EmptyState.astro` / `ErrorPanel.astro` / `ConfigBanner.astro` —
  reuse existing.

## Astro / Tailwind constraints

- **Astro 4.x.** No client islands.
- **Tailwind** for styling; reuse the brand-site palette **as a
  starting point** but allow muted variants for dashboard cards.
- **Server-rendered only.** Data is fetched in page frontmatter at
  build time via `dashboards/app/src/lib/supabase.ts`.
- **No new client-side JS.** No charts library that ships JS to
  the browser; render charts as static SVG at build time if
  needed.

## Exact Gemini deliverables

1. **Visual design spec** (Markdown):
   - Colour palette (≤5 tokens for dashboard; can extend Brand A
     palette).
   - Type stack (≤2 families).
   - Spacing scale.
   - Component inventory (listed above) with size / state notes.
   - Six page layouts.
   - Accessibility checklist embedded in each component.
2. **Astro + Tailwind starter code** for each new component listed
   above. The page-level pages (`/brand/[slug]` etc.) can be
   sketched as Astro page-stubs that call the components.
3. **Mockup descriptions in prose** for the six pages (mobile +
   desktop).
4. **Empty-state and error-state inventory** — for each new
   component, what does it render when its query returns zero
   rows, or when Supabase is unreachable?

## Out of scope (Gemini does not produce)

- Strategic dashboard content choices (what counts as a metric).
- Real data; Gemini uses placeholders.
- Authentication UI.
- A different framework or stack.
- Animations beyond a hover state.
- Anything that ships client-side JS for data.

## Brand-A-specific items from `gemini-output-review-checklist.md`

- [ ] No client islands.
- [ ] No client-side data fetch.
- [ ] All numeric cells `font-variant-numeric: tabular-nums`.
- [ ] Every coloured state also has a text label.
- [ ] Empty / error states for every component.
- [ ] No PII renders in any state.
- [ ] Service-role-key handling is unchanged.
