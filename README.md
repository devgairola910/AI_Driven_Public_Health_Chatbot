# AI-Driven Public Health Chatbot for Disease Awareness

A phased Smart India Hackathon-style project that helps citizens understand common diseases, recognize warning signs, and find appropriate public health guidance without presenting itself as a diagnostic tool.

## Current Phase

Phase 4 is now the active local prototype. It includes:

- A disease awareness knowledge base.
- A local API-backed chatbot for public health education.
- Risk-aware escalation language for urgent symptoms.
- Community signal widgets and disease cards.
- A content governance review page.
- An anonymized public health signal dashboard.
- A deployment readiness page with health checks, official resources, channel plans, and production guardrails.
- An installable offline shell for low-bandwidth use after the first successful load.

## Run Locally

This project has no package installation step.

```powershell
npm start
```

Then open:

```text
http://localhost:5173
```

Admin content review:

```text
http://localhost:5173/admin.html
```

Public health intelligence dashboard:

```text
http://localhost:5173/analytics.html
```

Deployment readiness:

```text
http://localhost:5173/deployment.html
```

The Phase 1 static chatbot fallback still works if the API is unavailable.

## Project Structure

```text
.
├── index.html
├── admin.html
├── analytics.html
├── deployment.html
├── SIH.md
├── README.md
├── data/
│   └── implementation-plan.json
├── docs/
│   ├── PHASES.md
│   └── PRODUCT_SPEC.md
├── server.js
└── src/
    ├── admin.js
    ├── analytics.js
    ├── readiness.js
    ├── deployment.js
    ├── assets/
    │   └── community-health-map.svg
    ├── knowledgeBase.js
    ├── main.js
    └── styles.css
```

## Safety Positioning

The chatbot provides disease awareness, prevention guidance, and care-seeking prompts. It must not replace clinicians, emergency services, or official public health advisories.
