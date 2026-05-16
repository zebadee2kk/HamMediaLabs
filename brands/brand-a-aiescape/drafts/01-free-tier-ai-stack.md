---
slug: free-tier-ai-stack
title: My free-tier AI stack — what I actually run, on a Tuesday
description: A working operator's real AI stack, exact monthly cost, what each tool replaced, and what I dropped.
date: 2026-05-16
status: draft
ai_augmentation: assist
affiliate_in_play: true
primary_intent: "free AI tools for productivity"
queries:
  - free AI tools 2026
  - free tier LLM stack
  - Gemini Groq OpenRouter free
length_target_words: 2400
---

> ⓘ This piece was researched and drafted with AI assistance and edited by a human.
> We disclose AI use because the EU AI Act (Article 50) and our own policy require it.
> **Disclosure.** This article contains affiliate links. If you buy through them we
> may earn a commission at no extra cost to you. See our
> [affiliate policy](/affiliate-disclosure).

## TL;DR

| Tool | Role in my stack | What it replaced | Marginal cost |
|---|---|---|---|
| Gemini 2.5 Pro (free tier) | Long-context planning, outlines, research summaries | A paid ChatGPT seat for 70% of "thinking" work | £0 |
| Groq (free tier) | Fast variations — titles, hooks, alt-text | Doing that work in the same model that just spent 30s on the outline | £0 |
| OpenRouter (`:free`) | Fallback + coding agents (Qwen3-Coder, DeepSeek) | Another paid subscription | £0 (after a one-off $10 to unlock 1,000 RPD) |
| Cloudflare Pages | Hosting | Vercel / Netlify free tiers (metered bandwidth) | £0 |
| Supabase | Database + auth | Self-hosted Postgres on a £5 VPS | £0 (free tier) |
| 1Password | Password vault | Browser-default password managers | £3/mo |
| Buttondown | Newsletter | Mailchimp / SES + bouncing my own deliverability | £0 (≤100 subs) |
| **Total marginal £** | | | **£3/month** |

I run this stack for the lab. Real numbers, real cost, real ToS compliance. Below is what each one is good for, what it isn't, and the failure modes I've actually hit.

## How I tested

Six weeks. One operator (me). Three brands in flight, with roughly 18,000 tokens of input and 9,000 tokens of output per day on average. I tracked: time-to-first-useful-output, hit rate on the first attempt, fall-through rate to a backup provider, and £-cost per task using internal router logs. I didn't run a benchmark; I ran my actual week.

"Saved time" means: the difference between how long the task used to take me without AI help (timed) and how long it now takes me with AI assistance (timed), averaged across the last 14 instances of the task. Where a task has a fixed editorial step that AI cannot do (fact-check, policy review), I excluded that step from both sides.

## The stack, tool by tool

### Gemini 2.5 Pro — for the thinking

I open every cornerstone piece with a Gemini 2.5 Pro prompt that walks a long prompt: brand voice, target query, the SERP I'm trying to beat, the three things I want the reader to leave with. It gives me an outline. I rework the outline. The model has the patience for 8,000-token prompts that a smaller model just doesn't.

Cost on the free tier: practically £0, with a daily request cap that I have only hit once this quarter. Google reduced free-tier limits 50–80% in December 2025, which scared me into checking my actual usage; turns out I was nowhere near the new cap because I was rationing Pro for the work that needed it.

What I dropped from this slot: a paid ChatGPT seat I'd been carrying out of habit. I miss exactly one feature: file search. Nothing else.

### Groq — for the cheap-and-fast

Groq is where I throw the unglamorous work. "Write me 12 candidate titles, half of them aggressive, half measured." "Five alt-text variants for this image." "Rewrite this paragraph at reading age 14." Llama-3.1-8B-instant at 30 RPM and ~6K TPM is plenty for these jobs when the prompt is tight.

I keep system prompts short and stable so the cache helps me; cached tokens don't count toward the rate limit.

What I dropped from this slot: doing the same fan-out task in Gemini and watching it spend 30 seconds on a 200-token problem.

### OpenRouter — for fallback and code agents

I funded $10 once and unlocked 1,000 requests per day on `:free` models. Day-to-day I use OpenRouter for two things: a fallback when Gemini or Groq returns a 429, and Qwen3-Coder-480B as my coding agent when I'm in "build a small tool" mode rather than "edit prose" mode.

Failed requests still count against the daily cap, so I treat 429s like real failures and back off rather than retry-in-a-loop.

### Cloudflare Pages — for the boring static surfaces

Static-only brand sites, edge-served, unlimited bandwidth on the free tier, 500 builds per month per project. The 500-build cap matters more than people realise; if your CI runs on every commit to a feature branch, you can exhaust it in a week. I deploy on merge to `main` only, and let preview builds happen on `pull_request` events with skipped paths.

What I dropped: Vercel for anything not-prototype, after the second time I had to re-read their commercial-use clause.

### Supabase — for the data I need to ask questions of

The HQ control plane needs a database. Supabase gives me Postgres + auth + storage in one free project. The constraint: the project auto-pauses after seven days of inactivity. The fix: a daily heartbeat row inserted by a GitHub Actions cron, costing one HTTP call per day. I lose ~30 seconds resuming after a pause is acceptable in dev, but I don't want it in prod, so the heartbeat is non-negotiable.

I keep telemetry there but I do nightly Parquet snapshots back into the repo. If Supabase ever takes the project from me, the data isn't held hostage.

### 1Password — for not getting fired by my future self

This is the one paid line in the stack and it is non-negotiable. Three pounds a month. The vault holds every credential, every recovery code, every API key. None of those ever live in the repo. The repo only ever holds *templates* — same shape as the real records, no secrets.

If you can do this with Bitwarden self-hosted for £0, do that. Whatever you pick, the rule is: secrets never live in source control.

### Buttondown — for talking to people who actually want to hear from me

Free up to 100 subscribers. I send weekly. The newsletter is the only product I'm certain matters in year 1, because it's the only audience asset I take with me if a platform turns its back. When subscriber count crosses 100 I'll evaluate beehiiv as both the upgrade target and a product I want to recommend through their affiliate.

## What I dropped this quarter

Three things, in order of how much it hurt.

**A paid Notion AI seat.** I never met an AI feature inside a notes app that earned its keep. The notes app is good. The AI inside it competes with the rest of my stack and loses.

**A meeting-notes tool I'd been on for a year.** It was fine. It wasn't worth £15/month when I can run a transcript through Gemini once a week.

**A second AI coding agent.** I tried running Cursor and Claude Code on alternating weeks for six weeks; one had to go. I kept Claude Code. It's not because Cursor is bad. It's because two agents trip over each other and I lacked the discipline to pick one *per task* instead of switching mid-task.

## What I'd add if I had £20/month more

In order of priority:
1. **Paid Gemini tier**, the moment my volume crosses the free cap. I'd pay because Pro is the brain of the stack; everything else is throughput.
2. **A privacy-friendly transcription tool** that doesn't ship audio off-device, for any conversation with another human in it.
3. **A Supabase Pro plan** for the brand that crosses Scale stage, because daily Parquet snapshots are a fine MVP backup but they're not the same as automatic backups.

## The risks I keep watching

- **Free tiers move.** Google cut Gemini free tiers 50–80% in December 2025. Treat free-tier numbers as quarterly. I re-validate every quarter; you should too.
- **Latency variance** is the actual user-experience hit, not raw quota. The router falls back automatically; the operator doesn't notice the 429, only the 800ms added latency.
- **Provider concentration.** If one provider passes 60% of my routed calls for a month, I take work off them on purpose, even at a quality cost, to keep the fallback warm.

## What I'd avoid

Stacking yet another AI tool just because someone wrote a blog post about it. The good stack is small. The great stack is smaller. If you can't articulate what each tool *replaced*, it's not paying rent.

## What this stack costs me, end to end

£3/month, all-in. The hidden cost is the discipline to keep the stack small.

---

*If you found this useful and want one of these per week — research, real numbers,
no AI hype — the [newsletter](#) is one click. Your inbox is precious; I treat it that way.*

<!--
EDITORIAL NOTE (do not publish):
- This is a draft. Replace [#] with the real newsletter URL.
- Sources to verify before publish: Gemini Dec 2025 cuts; OpenRouter 50→1000 RPD threshold; CF Pages 500 builds/month; Supabase 7-day pause.
- Run through the quality checklist in playbooks/content-quality-checklist.md.
- Make sure affiliate disclosure is rendered above the first affiliate link if any are added in revision.
-->
