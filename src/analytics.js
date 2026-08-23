const metricQueries = document.querySelector("#metricQueries");
const metricFever = document.querySelector("#metricFever");
const metricCough = document.querySelector("#metricCough");
const metricSignals = document.querySelector("#metricSignals");
const queryTrendChart = document.querySelector("#queryTrendChart");
const symptomTrends = document.querySelector("#symptomTrends");
const regionActivity = document.querySelector("#regionActivity");
const activeSignals = document.querySelector("#activeSignals");
const privacySummary = document.querySelector("#privacySummary");
const refreshButton = document.querySelector("#refreshAnalytics");

const demoOverview = {
  queriesToday: 1248,
  feverQueries: 324,
  coughQueries: 187,
  awarenessSignals: 3,
  queryTrend: [
    { label: "Mon", value: 820 },
    { label: "Tue", value: 910 },
    { label: "Wed", value: 980 },
    { label: "Thu", value: 1050 },
    { label: "Fri", value: 1120 },
    { label: "Sat", value: 1180 },
    { label: "Sun", value: 1248 }
  ],
  symptomTrends: [
    { label: "Fever", count: 324 },
    { label: "Cough", count: 187 },
    { label: "Body pain", count: 142 },
    { label: "Headache", count: 98 },
    { label: "Diarrhea", count: 76 }
  ],
  regions: [
    { label: "District X", queries: 412, change: "+32%" },
    { label: "Central District", queries: 318, change: "+14%" },
    { label: "Coastal District", queries: 276, change: "+18%" },
    { label: "North District", queries: 142, change: "+6%" },
    { label: "Rural Block", queries: 100, change: "+4%" }
  ],
  signals: [
    {
      title: "Increased Fever Queries",
      district: "District X",
      change: "+32%",
      period: "Last 24 hours",
      text: "Fever-related questions have increased compared with the recent baseline."
    },
    {
      title: "Mosquito Prevention Interest",
      district: "Coastal District",
      change: "+18%",
      period: "Last 7 days",
      text: "More families are asking about dengue and malaria prevention steps."
    },
    {
      title: "Cough Awareness Questions",
      district: "Central District",
      change: "+14%",
      period: "Last 48 hours",
      text: "Respiratory illness and TB warning-sign questions are trending upward."
    }
  ]
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatCount(value) {
  return Number(value).toLocaleString("en-IN");
}

function renderLineChart(container, points) {
  const width = 520;
  const height = 180;
  const padding = 24;
  const max = Math.max(...points.map((point) => point.value), 1);
  const stepX = (width - padding * 2) / Math.max(points.length - 1, 1);
  const coords = points.map((point, index) => {
    const x = padding + index * stepX;
    const y = height - padding - (point.value / max) * (height - padding * 2);
    return { x, y, ...point };
  });
  const polyline = coords.map((point) => `${point.x},${point.y}`).join(" ");

  container.innerHTML = `
    <svg class="line-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Query trend over the last seven days">
      <polyline points="${polyline}" fill="none" stroke="#176f65" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></polyline>
      ${coords
        .map(
          (point) => `
            <circle cx="${point.x}" cy="${point.y}" r="4.5" fill="#176f65"></circle>
            <text x="${point.x}" y="${height - 6}" text-anchor="middle" font-size="11" fill="#60767d">${escapeHtml(point.label)}</text>
          `
        )
        .join("")}
    </svg>
  `;
}

function renderBars(container, items, emptyLabel) {
  if (!items.length) {
    container.innerHTML = `<p class="fine-print">${emptyLabel}</p>`;
    return;
  }

  const max = Math.max(...items.map((item) => item.count), 1);
  container.innerHTML = items
    .map((item) => {
      const width = Math.max(8, Math.round((item.count / max) * 100));
      return `
        <div class="signal-bar">
          <div>
            <strong>${escapeHtml(item.label)}</strong>
            <span>${formatCount(item.count)} queries</span>
          </div>
          <div class="bar-track" aria-hidden="true">
            <span style="width: ${width}%"></span>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderRegions(container, items) {
  container.innerHTML = items
    .map(
      (item) => `
        <article class="region-card">
          <strong>${escapeHtml(item.label)}</strong>
          <span>${formatCount(item.queries)} queries</span>
          <em>${escapeHtml(item.change)}</em>
        </article>
      `
    )
    .join("");
}

function renderSignals(container, items) {
  container.innerHTML = items
    .map(
      (item) => `
        <article class="alert-card compact">
          <span class="tag warning">Awareness Signal</span>
          <h3>⚠️ ${escapeHtml(item.title)}</h3>
          <div class="alert-meta">
            <span>${escapeHtml(item.district)}</span>
            <strong>${escapeHtml(item.change)}</strong>
            <span>${escapeHtml(item.period)}</span>
          </div>
          <p>${escapeHtml(item.text)}</p>
        </article>
      `
    )
    .join("");
}

function mergeWithLiveData(payload) {
  const overview = { ...demoOverview };

  if (!payload?.totals?.queries) {
    return overview;
  }

  overview.queriesToday = demoOverview.queriesToday + payload.totals.queries;
  overview.awarenessSignals = demoOverview.awarenessSignals;

  const liveSymptoms = (payload.byDisease || []).slice(0, 5).map((item) => ({
    label: item.label,
    count: item.count
  }));

  if (liveSymptoms.length) {
    overview.symptomTrends = liveSymptoms;
    overview.feverQueries = liveSymptoms.find((item) => /fever/i.test(item.label))?.count || demoOverview.feverQueries;
    overview.coughQueries = liveSymptoms.find((item) => /cough|respiratory|tb/i.test(item.label))?.count || demoOverview.coughQueries;
  }

  if (payload.byRegion?.length) {
    overview.regions = payload.byRegion.slice(0, 5).map((item, index) => ({
      label: item.label,
      queries: item.count,
      change: demoOverview.regions[index]?.change || "+0%"
    }));
  }

  return overview;
}

function renderDashboard(payload) {
  const overview = mergeWithLiveData(payload);

  metricQueries.textContent = formatCount(overview.queriesToday);
  metricFever.textContent = formatCount(overview.feverQueries);
  metricCough.textContent = formatCount(overview.coughQueries);
  metricSignals.textContent = formatCount(overview.awarenessSignals);

  if (payload?.privacy?.aggregation) {
    privacySummary.textContent = payload.privacy.aggregation;
  }

  renderLineChart(queryTrendChart, overview.queryTrend);
  renderBars(symptomTrends, overview.symptomTrends, "No symptom trends available yet.");
  renderRegions(regionActivity, overview.regions);
  renderSignals(activeSignals, overview.signals);
}

async function loadAnalytics() {
  queryTrendChart.innerHTML = `<p class="fine-print">Loading analytics...</p>`;

  try {
    const response = await fetch("/api/analytics");
    if (!response.ok) throw new Error("Analytics API unavailable");
    renderDashboard(await response.json());
  } catch {
    renderDashboard(null);
  }
}

refreshButton.addEventListener("click", loadAnalytics);
loadAnalytics();
