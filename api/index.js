import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { diseases } from '../src/knowledgeBase.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const integrationsPath = join(__dirname, '..', 'data', 'integrations.json');

function json(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload, null, 2));
}

export default async function handler(req, res) {
  const url = new URL(req.url || '/', 'https://placeholder.local');

  if (req.method === 'GET' && url.pathname === '/api/health') {
    json(res, 200, {
      ok: true,
      phase: 4,
      mode: 'vercel-ready-api',
      modeLabel: 'Production',
      timestamp: new Date().toISOString(),
      checks: {
        contentRegistry: diseases.length > 0,
        analyticsAggregation: true,
        officialResources: true,
        rawQueryStorage: false
      }
    });
    return;
  }

  if (req.method === 'GET' && url.pathname === '/api/integrations') {
    try {
      const text = await readFile(integrationsPath, 'utf8');
      json(res, 200, JSON.parse(text));
    } catch {
      json(res, 500, { error: 'Integration registry unavailable.' });
    }
    return;
  }

  if (req.method === 'GET' && url.pathname === '/api/content') {
    json(res, 200, {
      diseases,
      reviewQueue: diseases.map((disease) => ({
        id: disease.id,
        title: disease.name,
        category: disease.category,
        status: disease.reviewStatus,
        reviewer: disease.reviewer,
        sourceCount: disease.sources.length
      }))
    });
    return;
  }

  json(res, 404, { error: 'Not found' });
}
