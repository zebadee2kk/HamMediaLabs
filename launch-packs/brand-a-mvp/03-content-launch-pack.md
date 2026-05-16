# 03 — Content Launch Pack

> The first piece. What it is, what status it must be in, and what
> the operator does with it on launch day.

---

## 1. The piece

- **Slug:** `free-tier-ai-stack`
- **File:** `brands/brand-a-aiescape/drafts/01-free-tier-ai-stack.md`
- **Title:** "My free-tier AI stack — what I actually run, on a Tuesday"
- **Length target:** ~2,400 words
- **Format:** longform blog cornerstone
- **Primary intent:** "free AI tools for productivity"

## 2. Required QA status (pre-launch)

The piece must carry `status: staged` and have walked, in order:

1. `brands/brand-a-aiescape/prompts/04-qa-pass.md` (AI QA pass).
2. `brands/brand-a-aiescape/qa/checklist.md` (human gate).
3. `playbooks/voice-fidelity-checklist.md` (lab-wide voice gate
   with read-aloud).

If any gate has an open issue, the piece is not ready and launch
does not proceed today.

## 3. Source / citation checks

For the piece's `sources[]` entries:

- [ ] Each URL resolves (HTTP 200 spot-check).
- [ ] Each entry has a retrieval date in `YYYY-MM-DD` format.
- [ ] Provider quota / pricing claims are within the last
      quarter's `playbooks/provider-revalidation.md` window
      (re-verify Gemini Dec 2025 cut, OpenRouter $10 threshold,
      CF Pages 500-build cap, Supabase 7-day pause).
- [ ] No "studies show" claim without an inline link.

## 4. Voice-fidelity checks (operator reads aloud)

Operator reads the **opening 200 words + the "What I dropped"
section** aloud, at normal pace, alone in the room.

- [ ] Sentences land in the persona's rhythm (Brand A is
      first-person, specific, opinionated).
- [ ] No banned phrases from `voice.md` §5.
- [ ] No exclamation marks in body copy.
- [ ] At least 2 of `voice.md` §3 favourite phrases appear
      naturally.
- [ ] No paragraphs feel rushed past or boring.

If anything feels off, the operator fixes it before launch.

## 5. AI-use disclosure checks (live URL)

- [ ] AI-augmentation label renders above the byline.
- [ ] `/ai-use` page is reachable from the footer.
- [ ] Site-wide footer disclosure block visible.
- [ ] On any commercial social post (launch day: none —
      `affiliate_in_play: false`), `#ad` is NOT applied because
      the piece is not commercial yet.

## 6. Draft → staged → live process

```
draft   (today)
  └─► run prompts/04-qa-pass.md → AI report
      └─► walk qa/checklist.md (human) → green
          └─► walk voice-fidelity-checklist.md (human, read-aloud)
              └─► set status: staged in frontmatter
                  set reviewed_at: <ISO timestamp>
                  └─► launch day:
                      - move file from drafts/ to posts/
                      - open PR on brand-site repo
                      - CI green, merge
                      - Cloudflare Pages auto-deploys
                      - verify live URL renders cornerstone + disclosure
                      - UPDATE content_asset.status = 'live' in HQ
                      - UPDATE brand.status = 'active' for aiescape
```

## 7. Internal links

The cornerstone must contain at least 3 internal links to **future**
support pieces or cornerstones (which won't exist on launch day —
these are forward links that 404 until those pieces ship).

Acceptable approach: link to the slugs we know we'll ship in
weeks 2 and 3 (cornerstones 2 and 3 from `first-three.md`). The
404s are acceptable for the first 14 days; before day 14 either
the pieces are live or the links are removed.

Alternative approach: replace forward links with citations to
primary sources only, defer internal-linking until cornerstone 2
ships.

The operator picks one approach and documents it in the
decision-log entry.

## 8. Image plan

- 1 stack-diagram image (AI-generated, alt text includes "AI-generated"
  label per `docs/voice-authenticity-system.md`).
- 3 screenshot crops (operator's own screenshots of the tools
  named).

Each image:

- ≤200 KB after compression.
- Alt text describes the image content honestly.
- AI-generated images carry "AI-generated" in alt text.

## 9. What happens if the piece needs a correction post-launch

Per `brands/brand-a-aiescape/qa/factuality.md`:

1. Correct inline.
2. Add a `Correction (YYYY-MM-DD):` line above the byline.
3. Keep original wording visible (struck-through or in an
   `<aside>`).
4. Log in `docs/15-decision-log.md` if the bug touched a claim
   other pieces rely on.

Operator does NOT silently re-edit.

## 10. What the cornerstone does **not** include at launch

- Affiliate links.
- Sponsored mentions.
- Lead magnets ("download my prompts").
- Pop-ups, exit-intent modals, scroll-triggered overlays.
- "Subscribe" CTAs above the fold.
- Cross-brand references.
- Real-person endorsements.

These remain out of scope until each is independently approved.
