# Dashboard and KPI Specification

## Purpose
The dashboard is the single operating view for HamMediaLabs. It should show account status, infrastructure health, brand performance, agent activity, and scale/kill recommendations.

## Dashboard modules

### 1. Portfolio overview
- Active brands
- Paused brands
- Killed brands
- Brands ready to scale
- Total monthly cost
- Total estimated revenue

### 2. Brand performance
Per brand:
- Sessions
- Page views
- Returning visitors
- Email signups
- Social followers
- Social impressions
- Affiliate clicks
- Revenue
- Cost
- ROI estimate

### 3. Content performance
Per content asset:
- URL
- Publish date
- Topic
- Format
- Impressions
- Clicks
- CTR
- Engagement
- Conversion
- Revenue attribution

### 4. Agent performance
Per agent:
- Tasks completed
- Tasks failed
- Human approvals required
- Provider used
- Tokens used
- Estimated cost
- Error rate

### 5. Provider usage
Per provider:
- Quota used
- Quota remaining
- Failure rate
- Latency
- Cost
- Recommended routing status

## Scoring model

### Brand Score
Weighted view of:
- Traffic growth
- Engagement quality
- Monetization potential
- Operational burden
- Platform risk

### Content Score
Weighted view of:
- Reach
- Engagement
- Conversion
- Production cost
- Reusability

### Kill / hold / scale status
- Kill: weak performance, high risk, poor monetization path
- Hold: inconclusive data, low cost, possible upside
- Scale: strong signal, repeatable content, monetization path

## Review cadence
- Daily: infrastructure and account health
- Weekly: brand and content performance
- Monthly: scale / kill decisions
