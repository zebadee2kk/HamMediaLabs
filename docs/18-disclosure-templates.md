# Disclosure Templates (canonical copy)

> Canonical wording for every disclosure surface across HamMediaLabs.
> If a template needs to change, edit it here and log a decision-log entry.
> Brand templates and the Astro starter import these strings; do not hand-edit on brand sites.

---

## 1. Site-wide footer block (every page on every brand)

```
This site uses AI-augmented production. Editorial decisions, fact-checks,
and final approvals are made by a human editor. See our AI use policy.
This site uses affiliate links. We may earn a commission from qualifying
purchases at no extra cost to you. See our affiliate disclosure.
Last reviewed: <YYYY-MM-DD>.
```

Required links from the footer: Privacy, Cookies, Terms, AI Use, Affiliate Disclosure, Contact.

---

## 2. First-affiliate-link inline disclosure (placed *above* the first affiliate link in every monetised piece)

> **Disclosure.** This article contains affiliate links. If you buy through them we may earn a commission at no extra cost to you. We only recommend products we believe are useful for the audience this piece is written for. Our [affiliate policy](/affiliate-disclosure) explains how we choose them.

Short form (acceptable in lists and comparison tables):

> *Affiliate link — we may earn a commission.*

---

## 3. AI-augmentation on-page label (above the byline on every page)

For informational / public-interest content (most blog pages, especially Brand A and C):

> ⓘ This piece was researched and drafted with AI assistance and edited by a human. We disclose AI use because the EU AI Act (Article 50) and our own policy require it.

For satire / artistic content (Brand B):

> ⓘ This is satire. Some imagery and dialogue are AI-generated. Don't mistake any of this for real corporate communications, real people, or real advice.

---

## 4. Social-post disclosure (every commercial / sponsored / affiliate post)

Universal format (works for FTC + UK ASA + EU AI Act deployer obligations):

```
#ad
<your post>
ℹ️ Affiliate link — we may earn a commission.
ℹ️ AI-assisted production. Edited by a human.
```

Notes:
- `#ad` must appear in the post body, **not the bio**.
- On TikTok/Instagram, also enable the platform's "Paid partnership" / "Branded content" toggle if applicable.
- On Reddit, place the disclosure as the first line of the post body; do **not** rely on flair alone.

---

## 5. Newsletter footer (every issue)

```
You're receiving this because you signed up at <brand>.<domain>.
We use affiliate links — we may earn a commission at no extra cost to you.
AI-assisted production, human-edited. Reply to this email to unsubscribe
or use the link below.

Operator: <full name>, <postal address>, <email>.
[Manage subscription] | [Unsubscribe] | [Privacy] | [AI use policy]
```

The postal address line is required for CAN-SPAM compliance on any US-bound subscribers.

---

## 6. AI use policy (full page — /ai-use)

```
We use AI to help research, outline, draft, and produce content. A human
editor — named below — is responsible for what is published. We do not
publish AI-generated text claiming to be human-authored, and we do not
synthesise the voice, likeness, or identity of any real person without
explicit permission.

What AI does here:
- Drafting and rewriting prose
- Generating outlines and research summaries
- Producing original illustrations and stock-style images
- Producing short-form video voiceovers (clearly labelled)

What AI does NOT do here:
- Issue financial, medical, or legal advice
- Make decisions about what we publish
- Speak as a real person without that person's consent

If you spot an error — factual, ethical, or otherwise — email <contact>.
We correct, date the correction, and keep the original visible.

Editor of record: <full name>, contactable at <email>.
This policy was last updated <YYYY-MM-DD>.
```

---

## 7. Affiliate disclosure (full page — /affiliate-disclosure)

```
We may earn commissions when you click on or buy through some of the links
on this site. We disclose this:
- in the footer of every page
- in plain language above the first affiliate link in every article
- with #ad on every commercial social post

We do not let affiliate relationships choose what we cover. We do let them
influence which products we *consider* — but a product only makes it into
a recommendation if it passes our internal editorial standard.

Specific programs we currently participate in are listed below. This list
is updated whenever we add or remove a program.

- <Program name> — <category> — last reviewed <date>
- ...

Questions: <contact>.
```

---

## 8. Privacy policy (skeleton — fill brand specifics)

```
This site is operated by <Operator name>, <address>, contactable at <email>.

We collect:
- Analytics events (page views, referrer, country, device class) via
  <Plausible / Cloudflare Web Analytics>. These do not use cookies and do
  not identify individual visitors.
- Newsletter subscriptions: your email address only. We store it with
  <Buttondown / Beehiiv> and never sell or share it.
- Contact emails: kept until the conversation is resolved, then deleted
  within 90 days unless we have a legal reason to keep them.

Lawful bases (UK GDPR / EU GDPR):
- Analytics: legitimate interest (running the site)
- Newsletter: consent (signup is opt-in)
- Contact: legitimate interest (responding to you)

Your rights: access, rectification, erasure, restriction, portability,
objection. Email <contact> and we'll respond within 30 days.

We do not knowingly collect data from anyone under 16.

Cookies: we use essential cookies only. If we ever set non-essential
cookies (we don't right now), we will show a banner first.

Last updated: <YYYY-MM-DD>.
```

---

## 9. Terms of service (skeleton)

```
By using this site you agree to these terms.

Content here is for general information. It is not financial, legal,
medical, or professional advice. We try to be accurate; we don't guarantee
it. Do your own research before acting on anything you read.

You may link to us. You may quote up to ~100 words with attribution. You
may not republish whole articles without permission.

We may change or remove content at any time. We may change these terms
at any time; the date below shows when.

Governing law: <England & Wales / your jurisdiction>.

Last updated: <YYYY-MM-DD>.
Operator: <name>, <contact>.
```

---

## 10. Cookie banner copy (only needed when non-essential cookies are set)

```
We use essential cookies to keep this site working. We do not use
advertising, tracking, or analytics cookies. Read more in our
[cookie policy].
```

If a brand introduces analytics/ad cookies, switch to a banner with explicit consent buttons (Accept / Reject / Settings) and update the policy.

---

## 11. Brand-C-specific (UK financial content) addendum

Required at the top of any page touching money advice on Brand C:

```
This is general information, not financial advice. We are not authorised
to give regulated financial advice in the UK. Before making decisions
about debt, credit, investments, insurance, or pensions, speak to a
qualified adviser. Free, impartial advice is available from MoneyHelper
(moneyhelper.org.uk), Citizens Advice, and StepChange (stepchange.org).
```

Hard rules for Brand C:
- **No** affiliate links to investment, credit, mortgage, insurance, claims-management, BNPL, or crypto products unless the affiliate programme is run by an FCA-authorised firm and has had its creatives approved by that firm.
- **No** "best loan" / "cheapest debt consolidation" / "investment tip" content — these are financial promotions.
- Allowed: energy switching (via approved comparison sites like Uswitch/MoneySavingExpert), supermarket savings, lifestyle optimisation, charity-led debt support links (no commission), price-cap journalism.
- For any borderline case, the default answer is "publish without an affiliate link", and log a decision-log entry.

---

## 12. Compliance audit trail (operator note)

Every change to this file must be paired with:
1. A decision-log entry naming the change, the regulator/policy it serves, and the effective date.
2. A pass through every brand template to ensure the new copy is reflected.
3. A snapshot of the rendered live page (per brand) saved into `compliance/snapshots/<YYYY-MM-DD>/`.
