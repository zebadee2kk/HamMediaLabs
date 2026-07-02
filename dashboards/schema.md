# Dashboard Schema

## Core entities
### Brand
- id
- name
- niche
- status
- cost
- revenue
- KPI score

### Content Asset
- id
- brand_id
- title
- type
- publish_date
- impressions
- clicks
- conversions

### Provider
- id
- name
- category
- quota
- cost
- status

### Agent Task
- id
- agent_name
- task_type
- provider
- status
- duration
- estimated_cost

### QA Event (creative-quality instrumentation)
- id
- asset_id
- gate (persona_critique / voice_fidelity / content_quality / brand_specific)
- source (model / human)
- verdict (pass / fail / needs_revision / persona_approves)
- ai_tells
- reviewer

## Dashboard outputs
- Portfolio score
- Brand score
- Content score
- Provider health
- Content pipeline queue (draft → qa → staged, with voice sign-off state)
- Voice QA pass-rate per brand/week (`v_qa_weekly`; <80% human pass-rate = risk trigger)
- Weekly decision queue
