# Playwright Module — signup_core

## Purpose
Shared onboarding utilities for all Playwright signup flows.

## Responsibilities
- Browser profile management
- Human pause gates
- Screenshot capture
- Step logging
- Form field abstraction
- Error capture
- Retry handling

## Human gates
Pause for:
- CAPTCHA
- MFA
- SMS
- Payment
- Identity checks

## Inputs
- Provider name
- Signup URL
- Account registry template
- Browser profile

## Outputs
- Signup status
- Required manual steps
- Account registry draft
- Evidence screenshots where appropriate

## Safety
Do not store credentials in repo output.
