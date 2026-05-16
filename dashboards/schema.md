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

## Dashboard outputs
- Portfolio score
- Brand score
- Content score
- Provider health
- Weekly decision queue
