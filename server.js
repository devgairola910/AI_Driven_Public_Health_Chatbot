import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { diseases, emergencyKeywords, fallbackAdvice } from "./src/knowledgeBase.js";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT || 5173);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".md": "text/markdown; charset=utf-8"
};

const analytics = {
  totalQueries: 0,
  urgentSignals: 0,
  fallbackQueries: 0,
  byDisease: {},
  byCategory: {},
  byRegion: {},
  recentSignals: []
};

const allowedRegions = new Set(["Statewide", "North District", "Central District", "Coastal District", "Rural Block"]);
const integrationsPath = join(root, "data", "integrations.json");

function securityHeaders(extra = {}) {
  return {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
    "Cross-Origin-Resource-Policy": "same-origin",
    ...extra
  };
}

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function incrementCounter(target, key) {
  const safeKey = key || "Unmatched";
  target[safeKey] = (target[safeKey] || 0) + 1;
}

function sortedEntries(record) {
  return Object.entries(record)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

function safeRegion(region) {
  return allowedRegions.has(region) ? region : "Statewide";
}

function scoreDisease(message, disease) {
  const normalized = normalizeText(message);
  return disease.keywords.reduce((score, keyword) => {
    return normalized.includes(keyword) ? score + 1 : score;
  }, 0);
}

function retrieveDisease(message) {
  return diseases
    .map((disease) => ({ disease, score: scoreDisease(message, disease) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)[0]?.disease;
}

function hasEmergencySignal(message) {
  const normalized = normalizeText(message);
  const raw = String(message || "").toLowerCase();
  const extraSignals = ["can't breathe", "cant breathe", "cannot breathe", "can t breathe", "सांस", "साँस", "बेहोश"];
  return emergencyKeywords.some((keyword) => normalized.includes(keyword)) || extraSignals.some((keyword) => raw.includes(keyword));
}

function answerChat(message, language = "en") {
  const urgent = hasEmergencySignal(message);
  const disease = retrieveDisease(message);
  const safeLanguage = language === "hi" ? "hi" : "en";
  const normalized = normalizeText(message);

  if (urgent) {
    return {
      type: "emergency",
      urgent: true,
      title: safeLanguage === "hi" ? "कृपया तुरंत चिकित्सा सहायता लें" : "Please seek immediate medical help",
      summary:
        safeLanguage === "hi"
          ? "Yeh urgent medical attention require kar sakta hai."
          : "This may require urgent medical attention.",
      care:
        safeLanguage === "hi"
          ? "Local emergency services ya qualified clinician se turant contact karein."
          : "Contact local emergency services or a qualified clinician immediately.",
      sourceIds: [],
      disclaimer:
        safeLanguage === "hi"
          ? "Yeh diagnosis nahi hai. Severe symptoms me qualified doctor ya emergency service se contact karein."
          : "This is not a diagnosis. Severe or worsening symptoms need qualified medical care."
    };
  }

  if (disease) {
    return {
      type: "disease",
      urgent,
      diseaseId: disease.id,
      title: disease.name,
      category: disease.category,
      summary: disease.publicMessage,
      symptoms: disease.symptoms,
      prevention: disease.prevention,
      care: disease.care,
      warningSigns: disease.urgent,
      sourceIds: disease.sources.map((source) => source.id),
      sources: disease.sources,
      disclaimer:
        safeLanguage === "hi"
          ? "Yeh diagnosis nahi hai. Severe symptoms me qualified doctor ya emergency service se contact karein."
          : "This is not a diagnosis. Severe or worsening symptoms need qualified medical care."
    };
  }

  if (normalized.includes("vaccin") || normalized.includes("vaccine") || normalized.includes("immun")) {
    return {
      type: "awareness",
      urgent: false,
      title: safeLanguage === "hi" ? "टीकाकरण जागरूकता" : "Vaccination awareness",
      summary:
        safeLanguage === "hi"
          ? "Vaccines serious illness se bachav me madad karte hain. Timing age, pregnancy status, previous doses, aur local guidance par depend karti hai."
          : "Vaccines help prevent serious illness. Timing depends on age, pregnancy status, past doses, and local public-health guidance.",
      care:
        safeLanguage === "hi"
          ? "Personal recommendation ke liye health worker se confirm karein."
          : "Confirm personal recommendations with a health worker.",
      sourceIds: [],
      disclaimer:
        safeLanguage === "hi"
          ? "Yeh diagnosis nahi hai. Severe symptoms me qualified doctor ya emergency service se contact karein."
          : "This is not a diagnosis. Severe or worsening symptoms need qualified medical care."
    };
  }

  if (normalized.includes("prevention") || normalized.includes("prevent") || normalized.includes("protect")) {
    return {
      type: "awareness",
      urgent: false,
      title: safeLanguage === "hi" ? "बचाव छोटी आदतों से शुरू होता है" : "Prevention starts with simple habits",
      summary:
        safeLanguage === "hi"
          ? "Safe water, hand hygiene, mosquito control, ventilation, aur timely care family health protect karte hain."
          : "Safe water, hand hygiene, mosquito control, ventilation, and timely care help protect family health.",
      care:
        safeLanguage === "hi"
          ? "Symptoms severe, persistent, ya worsening hon to health worker se salah lein."
          : "Seek care when symptoms are severe, persistent, or worsening.",
      sourceIds: [],
      disclaimer:
        safeLanguage === "hi"
          ? "Yeh diagnosis nahi hai. Severe symptoms me qualified doctor ya emergency service se contact karein."
          : "This is not a diagnosis. Severe or worsening symptoms need qualified medical care."
    };
  }

  if (normalized.includes("warning") || normalized.includes("urgent") || normalized.includes("emergency")) {
    return {
      type: "awareness",
      urgent: false,
      title: safeLanguage === "hi" ? "चेतावनी संकेतों पर ध्यान दें" : "Warning signs need attention",
      summary:
        safeLanguage === "hi"
          ? "Breathing difficulty, chest pain, confusion, fainting, severe dehydration, seizures, bleeding, ya worsening symptoms me turant care lein."
          : "Seek care quickly for breathing difficulty, chest pain, confusion, fainting, severe dehydration, seizures, bleeding, or worsening symptoms.",
      care:
        safeLanguage === "hi"
          ? "Emergency signs ko ignore na karein."
          : "Do not ignore emergency warning signs.",
      sourceIds: [],
      disclaimer:
        safeLanguage === "hi"
          ? "Yeh diagnosis nahi hai. Severe symptoms me qualified doctor ya emergency service se contact karein."
          : "This is not a diagnosis. Severe or worsening symptoms need qualified medical care."
    };
  }

  if (!disease) {
    const copy = fallbackAdvice[safeLanguage];
    return {
      type: "fallback",
      urgent,
      title: copy.title,
      summary: copy.body,
      care: copy.safety,
      sourceIds: [],
      disclaimer:
        safeLanguage === "hi"
          ? "Yeh diagnosis nahi hai. Severe symptoms me qualified doctor ya emergency service se contact karein."
          : "This is not a diagnosis. Severe or worsening symptoms need qualified medical care."
    };
  }
}

function campaignInsightFromAnalytics() {
  const topDisease = sortedEntries(analytics.byDisease)[0];
  const topCategory = sortedEntries(analytics.byCategory)[0];
  const topRegion = sortedEntries(analytics.byRegion)[0];
  const urgentRate = analytics.totalQueries > 0 ? Math.round((analytics.urgentSignals / analytics.totalQueries) * 100) : 0;

  if (!analytics.totalQueries) {
    return [
      "No citizen queries have been recorded in this server session yet.",
      "Run a few chatbot questions to generate privacy-preserving public health signals."
    ];
  }

  return [
    topDisease ? `Prioritize awareness material for ${topDisease.label}; it is the most common matched topic.` : "Review unmatched queries to improve awareness coverage.",
    topCategory ? `Campaign category focus: ${topCategory.label}.` : "No category focus is available yet.",
    topRegion ? `Highest query volume is from ${topRegion.label}.` : "No regional query pattern is available yet.",
    urgentRate > 20
      ? `Urgent-signal rate is ${urgentRate}%, so emergency warning-sign messaging should be made more visible.`
      : `Urgent-signal rate is ${urgentRate}%, currently within the expected prototype range.`
  ];
}

function recordAnalytics(answer, region) {
  const signal = {
    disease: answer.title || "Unmatched",
    category: answer.category || "Unmatched",
    region: safeRegion(region),
    urgent: Boolean(answer.urgent),
    timestamp: new Date().toISOString()
  };

  analytics.totalQueries += 1;
  if (signal.urgent) analytics.urgentSignals += 1;
  if (answer.type === "fallback") analytics.fallbackQueries += 1;
  incrementCounter(analytics.byDisease, signal.disease);
  incrementCounter(analytics.byCategory, signal.category);
  incrementCounter(analytics.byRegion, signal.region);
  analytics.recentSignals.unshift(signal);
  analytics.recentSignals = analytics.recentSignals.slice(0, 8);
}

function analyticsSnapshot() {
  return {
    privacy: {
      storesRawText: false,
      storesPersonalIdentifiers: false,
      aggregation: "Counts are grouped by matched topic, category, urgency, and coarse selected region."
    },
    totals: {
      queries: analytics.totalQueries,
      urgentSignals: analytics.urgentSignals,
      fallbackQueries: analytics.fallbackQueries,
      matchedQueries: analytics.totalQueries - analytics.fallbackQueries
    },
    byDisease: sortedEntries(analytics.byDisease),
    byCategory: sortedEntries(analytics.byCategory),
    byRegion: sortedEntries(analytics.byRegion),
    recentSignals: analytics.recentSignals,
    campaignInsights: campaignInsightFromAnalytics()
  };
}

async function readBody(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

function sendJson(response, status, payload) {
  response.writeHead(
    status,
    securityHeaders({
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    })
  );
  response.end(JSON.stringify(payload, null, 2));
}

function sendText(response, status, text, filename) {
  response.writeHead(
    status,
    securityHeaders({
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store"
    })
  );
  response.end(text);
}

function analyticsReport() {
  const snapshot = analyticsSnapshot();
  const lines = [
    "Public Health Chatbot Analytics Export",
    `Generated: ${new Date().toISOString()}`,
    "",
    "Privacy",
    `Raw query text stored: ${snapshot.privacy.storesRawText}`,
    `Personal identifiers stored: ${snapshot.privacy.storesPersonalIdentifiers}`,
    snapshot.privacy.aggregation,
    "",
    "Totals",
    `Queries: ${snapshot.totals.queries}`,
    `Matched queries: ${snapshot.totals.matchedQueries}`,
    `Fallback queries: ${snapshot.totals.fallbackQueries}`,
    `Urgent signals: ${snapshot.totals.urgentSignals}`,
    "",
    "Topic Signals",
    ...snapshot.byDisease.map((item) => `${item.label}: ${item.count}`),
    "",
    "Region Signals",
    ...snapshot.byRegion.map((item) => `${item.label}: ${item.count}`),
    "",
    "Campaign Insights",
    ...snapshot.campaignInsights.map((insight) => `- ${insight}`)
  ];

  return lines.join("\n");
}

async function handleApi(request, response, url) {
  if (request.method === "GET" && url.pathname === "/api/health") {
    sendJson(response, 200, {
      ok: true,
      phase: 4,
      mode: "deployment-ready-local-api",
      modeLabel: process.env.NODE_ENV === "production" ? "Production" : "Local",
      timestamp: new Date().toISOString(),
      checks: {
        contentRegistry: diseases.length > 0,
        analyticsAggregation: true,
        officialResources: true,
        rawQueryStorage: false
      }
    });
    return true;
  }

  if (request.method === "GET" && url.pathname === "/api/analytics") {
    sendJson(response, 200, analyticsSnapshot());
    return true;
  }

  if (request.method === "GET" && url.pathname === "/api/analytics/export") {
    sendText(response, 200, analyticsReport(), "public-health-analytics-report.txt");
    return true;
  }

  if (request.method === "GET" && url.pathname === "/api/integrations") {
    try {
      sendJson(response, 200, JSON.parse(await readFile(integrationsPath, "utf8")));
    } catch {
      sendJson(response, 500, { error: "Integration registry unavailable." });
    }
    return true;
  }

  if (request.method === "GET" && url.pathname === "/api/content") {
    sendJson(response, 200, {
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
    return true;
  }

  if (request.method === "POST" && url.pathname === "/api/chat") {
    try {
      const body = JSON.parse(await readBody(request) || "{}");
      const message = String(body.message || "").trim();
      if (!message) {
        sendJson(response, 400, { error: "Message is required." });
        return true;
      }

      const answer = answerChat(message, body.language);
      recordAnalytics(answer, body.region);
      sendJson(response, 200, answer);
    } catch {
      sendJson(response, 400, { error: "Invalid JSON body." });
    }
    return true;
  }

  return false;
}

async function serveStatic(request, response, url) {
  const requestedPath = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  const safePath = normalize(requestedPath).replace(/^(\.\.[/\\])+/, "");
  const absolutePath = resolve(join(root, safePath));

  if (!absolutePath.startsWith(resolve(root))) {
    response.writeHead(403, securityHeaders());
    response.end("Forbidden");
    return;
  }

  try {
    const content = await readFile(absolutePath);
    response.writeHead(
      200,
      securityHeaders({
        "Content-Type": mimeTypes[extname(absolutePath)] || "application/octet-stream"
      })
    );
    response.end(content);
  } catch {
    response.writeHead(404, securityHeaders({ "Content-Type": "text/plain; charset=utf-8" }));
    response.end("Not found");
  }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);

  if (url.pathname.startsWith("/api/") && (await handleApi(request, response, url))) {
    return;
  }

  await serveStatic(request, response, url);
});

server.listen(port, () => {
  console.log(`Public health chatbot server running at http://localhost:${port}`);
});
