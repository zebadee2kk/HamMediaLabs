# X Platform Brand Playbooks + Operations Handbook (Mid-2026 Edition)

**Last Updated:** 2026-05-16  
**Status:** Comprehensive – Ready for Codex/Claude/Grok automation  
**Research Basis:** Full conversation history, X signals, prompt engineering & security.

## X Algorithm Realities (May 2026)
- Threads outperform singles.
- Early engagement (first 30 min) is critical.
- Replies are heavily weighted.
- Put external links in the first reply, not main post.
- Consistency + quality beats volume.
- Polls and rich media are favored.

**Posting Cadence:** 4–7 high-quality posts per week.

## Brand A: AI Escape
**Positioning:** Battle-tested power-user workflows, command patterns, and stacks that deliver measurable time savings and leverage — no hype.

**Content Pillars:** Claude Code commands, Grok patterns, multi-model chains, cost optimization, niche role workflows.

**Voice:** Canonical in `brands/brand-a-aiescape/voice.md` — battle-tested practitioner, measurable time savings, no fluff. (Note: "leverage" as a verb is on that brand's banned list; positioning may use it as a noun only.)

## Brand B: Corporate Satire
**Positioning:** Corporate Theatre 2026 — when the satire became the actual job description.

**Content Pillars:** Buzzword roasts, meeting absurdity, burnout bingo, translation guides.

**Voice:** Deadpan, documentary-level absurdity, quietly unhinged, punch-up only.

## Brand C: UK Financial Escape
**Positioning:** Brutal, transparent UK math on real take-home pay, bills, and controllable levers — no advice, just lived breakdowns.

**Content Pillars:** Salary vs reality math, hidden costs, regional comparisons, anonymous tactics.

**Voice:** Brutal math, lived reality, controllable levers, no-BS, sources shown.

## Advanced Prompt Engineering & Security
(See prompt-library/ folder for full templates)

**Secure Skeleton** must be used on every generation.
**Mandatory:** Human review before publishing. All AI content disclosed.

## Cross-Brand Flywheels
- Brand A workflows → power Brand C trackers + Brand B satire.
- Brand B pain points → feed Brand A solutions and Brand C levers.

Canonical brand voice lives in each brand's `brands/<slug>/voice.md` (extending
`docs/17-style-guide.md`); this file is the **X-channel playbook** layered on top —
positioning summaries, pillars, and channel mechanics. Where a voice summary here
conflicts with a brand's `voice.md`, the `voice.md` wins.

## Governance
Operational risk, cadence ceilings, link placement, disclosure mechanics, shadowban controls, scheduling rules, and escalation triggers are governed by **`docs/x-platform-risk.md`**. When this strategy file and the governance doc conflict, **governance wins**. Re-read the governance doc before any X-facing PR.
