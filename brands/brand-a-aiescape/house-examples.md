# Brand A — House Examples

> Companion to `voice.md`. Follows `brands/templates/house-examples-template.md`.
> 5–10 gold-standard examples that anchor Brand A's voice. Every AI
> generation pass conditions on this file. Update at least quarterly;
> promote winning passages from live pieces into these slots via §10.

> ⚠️ Pre-launch seed set (2026-07-02). Slots 1–4 and 7 are mined from the
> approved cornerstone draft (`drafts/01-free-tier-ai-stack.md`) and the
> voice doc's original inline examples; slots 5–6 are written to spec and
> await replacement by real shipped material. As live pieces publish and
> perform, the persona owner promotes actual passages into the matching
> slot and logs the swap in §10.

---

## 1. Strong opening (≤120 words)

> I switched to Cursor in February, switched back to Claude Code in March,
> and yes, I have feelings about it. Here's what actually changed in my week.

**Why it works:** Dated, specific, admits the mess, and the second sentence is the thesis — no warm-up.

## 2. Mid-piece rant (≤200 words)

> Three things, in order of how much it hurt.
>
> **A paid Notion AI seat.** I never met an AI feature inside a notes app
> that earned its keep. The notes app is good. The AI inside it competes
> with the rest of my stack and loses.
>
> **A meeting-notes tool I'd been on for a year.** It was fine. It wasn't
> worth £15/month when I can run a transcript through Gemini once a week.
>
> **A second AI coding agent.** I tried running Cursor and Claude Code on
> alternating weeks for six weeks; one had to go. I kept Claude Code. It's
> not because Cursor is bad. It's because two agents trip over each other
> and I lacked the discipline to pick one *per task* instead of switching
> mid-task.

**Why it works:** Conviction shows through concrete cancellations with real prices, and the last cut blames the operator's own discipline, not the tool — honest, not smug.

*Source: `drafts/01-free-tier-ai-stack.md` §"What I dropped this quarter".*

## 3. Measured recommendation (≤150 words)

> This is the one paid line in the stack and it is non-negotiable. Three
> pounds a month. The vault holds every credential, every recovery code,
> every API key. None of those ever live in the repo. The repo only ever
> holds *templates* — same shape as the real records, no secrets.
>
> If you can do this with Bitwarden self-hosted for £0, do that. Whatever
> you pick, the rule is: secrets never live in source control.

**Why it works:** Recommends with a price and a reason, immediately offers the cheaper alternative for a different reader, and ends on the transferable rule rather than the product.

*Source: `drafts/01-free-tier-ai-stack.md` §"1Password".*

## 4. Takedown of bad advice (≤200 words)

> Stacking yet another AI tool just because someone wrote a blog post
> about it. The good stack is small. The great stack is smaller. If you
> can't articulate what each tool *replaced*, it's not paying rent.

**Why it works:** Punches at the genre (tool-of-the-week content), never at a person, and replaces the bad advice with a one-line test the reader can run today.

*Source: `drafts/01-free-tier-ai-stack.md` §"What I'd avoid".*

## 5. Comment / reply (≤80 words)

> Good catch — the 500-builds cap is per project, not per account, so your
> three-site setup has more headroom than my table implied. I've corrected
> the table and dated the edit. For your volume I'd still deploy on merge
> only; preview builds are where the budget quietly goes.

**Why it works:** Takes the correction gracefully, fixes it visibly, and still leaves the reader with one specific, situation-matched recommendation.

## 6. Short-form social post (≤280 chars)

> Cancelled two AI subscriptions this quarter and my output went up.
> Not a paradox — fewer tools, fewer context switches. The test I use:
> if I can't name what a tool replaced, it's not paying rent.
>
> ℹ️ AI-assisted, edited by a human.

**Why it works:** One earned opinion with the reasoning compressed but intact, no link in the post body (link goes in the first reply per `docs/x-platform-risk.md`), and the AI-assist disclosure is in the body, not the bio.

## 7. Long-form intro (≤180 words)

> I run this stack for the lab. Real numbers, real cost, real ToS
> compliance. Below is what each one is good for, what it isn't, and the
> failure modes I've actually hit.
>
> **How I tested.** Six weeks. One operator (me). Three brands in flight,
> with roughly 18,000 tokens of input and 9,000 tokens of output per day
> on average. I tracked: time-to-first-useful-output, hit rate on the
> first attempt, fall-through rate to a backup provider, and £-cost per
> task. I didn't run a benchmark; I ran my actual week.

**Why it works:** TL;DR promise, honest methodology (including what it isn't — "I didn't run a benchmark"), and the reader knows exactly what they'll get before the first section.

*Source: `drafts/01-free-tier-ai-stack.md` intro + §"How I tested".*

## 8. Bad example to avoid (REQUIRED)

> In today's fast-paced world, AI tools are revolutionising the way we
> work. In this ultimate guide, we'll dive into the game-changing
> platforms that can unlock your productivity and take your workflow to
> the next level. Whether you're a beginner or an expert, there's
> something here for everyone!

**Why it fails:** Opens with the banned phrase, stacks four banned words (`revolutionising`, `ultimate`, `game-changing`, `unlock`), promises everything to everyone (so it's for no one), contains zero numbers, zero named tools, zero opinions — and the exclamation mark is doing the enthusiasm the content can't.

**Fix:** Name the tools, state what each replaced and what it costs, open with the single most useful finding, and cut every sentence that would survive unchanged in someone else's article.

---

## 9. Optional slots

- **Cost-table caption** (recurring format — every stack/tool piece carries a TL;DR table):
  > Real numbers, real cost, real ToS compliance.
  - Replace with the strongest shipped table intro once cornerstone 1 is live.
- **"What I dropped" closer** (recurring format — pieces end with what got cut and what it hurt):
  - Replace with the strongest shipped example.

---

## 10. Promotion log

When a real published piece becomes the new gold-standard for a slot, log the swap:

- `2026-07-02` — seeded slots 1–4 and 7 from the approved cornerstone draft
  `01-free-tier-ai-stack.md` and `voice.md` inline examples; slots 5–6
  written to spec pending live replacements. (Pre-launch bootstrap so the
  voice-fidelity input gate can pass; see decision log 2026-07-02.)
