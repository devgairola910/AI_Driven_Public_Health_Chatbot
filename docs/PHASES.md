# Phased Delivery Plan

## Phase 1: Static Awareness Prototype

Goal: Demonstrate the citizen-facing disease awareness experience.

Deliverables:

- Public health chatbot UI.
- Curated disease awareness knowledge base.
- Symptom keyword matching.
- Emergency escalation rules.
- Disease awareness cards.
- Community signal dashboard mock.
- Product documentation and implementation roadmap.

Acceptance criteria:

- User can ask about fever, cough, diarrhea, mosquito-borne symptoms, or emergency warning signs.
- Responses clearly avoid diagnosis.
- Each disease entry includes symptoms, prevention, care-seeking advice, and urgent warning signs.
- App works as a static website.

## Phase 2: AI Assistant and Content Governance

Goal: Move from rule-guided prototype to reviewed AI assistant.

Deliverables:

- Local backend API for chat requests.
- Retrieval-style matching over verified health content.
- Admin review workflow for disease pages and response templates.
- Source labels for public health claims.
- Multilingual response templates.
- Abuse prevention and medical-safety guardrails.

Acceptance criteria:

- Chat answers are grounded in approved knowledge entries.
- Unsupported medical questions receive safe fallback guidance.
- Admins can update content without redeploying the frontend.
- Language selection persists across sessions.

Current implementation:

- `server.js` serves the frontend and exposes `/api/chat`, `/api/health`, and `/api/content`.
- `admin.html` displays content review status and source coverage.
- The chatbot automatically uses the local API when available and falls back to Phase 1 local matching when it is not.

## Phase 3: Public Health Intelligence

Goal: Help public health teams understand awareness needs and potential emerging trends.

Deliverables:

- Anonymized query analytics.
- District or region-level signal dashboard.
- Campaign recommendation summaries.
- Data retention and privacy controls.
- Exportable reports for local health teams.

Acceptance criteria:

- No personally identifiable data is required for the core chatbot.
- Trends are aggregated before display.
- Admins can identify top queried topics, symptoms, and regions.

Current implementation:

- `/api/chat` records only aggregate signal fields: matched disease, category, urgent flag, selected broad region, and timestamp.
- `/api/analytics` returns totals, topic counts, category counts, region counts, recent aggregated signals, and campaign insight summaries.
- `analytics.html` displays the public health intelligence dashboard.
- Raw citizen messages are not stored in analytics.

## Phase 4: Deployment and Ecosystem Integrations

Goal: Prepare for production use across channels.

Deliverables:

- Cloud deployment pipeline.
- SMS or messaging-channel integration.
- Accessibility and low-bandwidth mode.
- Integration links to official health portals and helplines.
- Security review, monitoring, and incident response plan.

Acceptance criteria:

- App is mobile-first, accessible, and performant.
- Production deployment has monitoring and rollback.
- Integrations use approved public health content only.

Current implementation:

- `deployment.html` displays deployment readiness, official resource links, messaging-channel plans, and incident response guidance.
- `/api/health` returns Phase 4 health, mode, timestamp, and readiness checks for uptime monitoring.
- `/api/integrations` exposes approved official resources, pilot channel plans, deployment checklist items, and incident response notes.
- `Dockerfile`, `manifest.webmanifest`, `sw.js`, and `offline.html` support container deployment and low-bandwidth installable use.
- Remaining production gaps are explicit: role-based access control and a persistent privacy-reviewed analytics store.
