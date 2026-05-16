# Prompt Library – HamMediaLabs

Centralized secure prompts for all content generation.

Always use the secure skeleton + brand-specific templates.
Human review required before any publishing.

## Contents
- `general-secure-skeleton.md` — wrap all model calls; the `DATA SECTION:` block isolates untrusted input.
- `persona-first-generation.md` — four-stage pattern (draft → persona critique → revision → human QA) that produces drafts capable of passing `playbooks/voice-fidelity-checklist.md`.
- `codex-agent-instructions.md` — instructions for the Codex review agent.

## Spec
Voice-authenticity rules these prompts encode: `docs/voice-authenticity-system.md`.
Brand-specific voice files: `brands/<slug>/voice.md` (canonical spec: `brands/templates/voice-template.md`).
