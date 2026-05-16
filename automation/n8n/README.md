# n8n Orchestration Blueprint

## Purpose
n8n is the workflow and routing engine for HamMediaLabs.

## Responsibilities
- Scheduling
- Provider routing
- Content workflow sequencing
- Reporting
- Notifications
- Retry logic
- Human approval checkpoints

## Suggested core workflows
### Workflow 1:
Trend discovery → content brief → approval queue

### Workflow 2:
Approved brief → content generation → QA → publish staging

### Workflow 3:
Published asset → analytics pull → dashboard update

### Workflow 4:
Weekly KPI review → kill / hold / scale recommendation

## Safety defaults
- Approval before publish
- Provider fallback
- Failure notifications
- Logging mandatory
