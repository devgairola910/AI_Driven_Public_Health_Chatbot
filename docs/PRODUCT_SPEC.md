# Product Specification

## Product Vision

Make reliable disease awareness feel as easy as asking a careful community health worker: clear, calm, localized, and safe.

## Primary Workflows

1. A citizen asks a symptom or disease question.
2. The chatbot identifies related public health topics.
3. The response explains awareness information, prevention, warning signs, and next steps.
4. If urgent symptoms appear, the chatbot advises immediate medical care.
5. The user can open a disease card for more structured guidance.

## Current Prototype Scope

Included:

- Static web application.
- Local knowledge base.
- Keyword-based matching with a local API route.
- Quick prompts.
- Disease library.
- Admin content review screen.
- Source labels in API-backed answers.
- Aggregated public health intelligence dashboard.
- Coarse region selector for anonymized trend grouping.
- Phase roadmap visible in the app.
- Deployment readiness dashboard with health checks, official resources, channel plans, and incident response guidance.
- Installable app shell with offline fallback after first load.

Not included yet:

- External AI model calls.
- User accounts.
- Personal medical record storage.
- Live outbreak data.
- Persistent analytics database.
- Production role-based access control.
- Diagnosis or treatment planning.

## Safety Model

The assistant uses three response tiers:

- Awareness: general education and prevention.
- Care seeking: consult a qualified health worker or clinician.
- Urgent escalation: seek emergency care for severe warning signs.

## Future Architecture

```text
Client UI
  -> Chat API
  -> Safety classifier
  -> Retrieval layer
  -> Approved public health knowledge base
  -> AI response generator
  -> Response verifier
  -> Analytics event collector
```

## Suggested Tech Stack For Later Phases

- Frontend: React or Vue, depending on team preference.
- Backend: Node.js/Express or Python/FastAPI.
- Retrieval: PostgreSQL with pgvector, OpenSearch, or a managed vector database.
- Content workflow: Admin dashboard with role-based review.
- Deployment: Docker-based cloud deployment.
