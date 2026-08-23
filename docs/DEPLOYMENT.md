# Deployment and Integration Guide

## Local Production Run

```powershell
npm start
```

The server uses `PORT` when provided:

```powershell
$env:PORT=8080; npm start
```

## Docker Deployment

```powershell
docker build -t public-health-chatbot .
docker run --rm -p 5173:5173 public-health-chatbot
```

## Available Routes

- `/` citizen chatbot.
- `/admin.html` content governance.
- `/analytics.html` public health signal dashboard.
- `/deployment.html` deployment readiness and integration dashboard.
- `/offline.html` offline fallback.
- `/api/health` deployment health check.
- `/api/chat` awareness response API.
- `/api/content` reviewed content registry.
- `/api/analytics` aggregated dashboard data.
- `/api/analytics/export` downloadable analytics report.
- `/api/integrations` official resource and future channel registry.

## Production Readiness Checklist

- Place behind HTTPS before using service worker features in production.
- Replace in-memory analytics with a privacy-reviewed database.
- Add role-based access control for admin, analytics, and deployment pages.
- Connect official public health content feeds only after approval.
- Add rate limiting and server-side logging that excludes raw health questions.
- Monitor `/api/health` for uptime and readiness signals.
- Roll back to the last approved container image and content bundle if safety, source integrity, or urgent-care escalation behavior is questioned.
- Run accessibility checks on mobile and low-bandwidth devices.
