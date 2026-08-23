const metricPhase = document.querySelector("#metricPhase");
const metricApi = document.querySelector("#metricApi");
const metricMode = document.querySelector("#metricMode");
const refreshButton = document.querySelector("#refreshReadiness");
const readinessChecklist = document.querySelector("#readinessChecklist");
const channelList = document.querySelector("#channelList");
const resourceList = document.querySelector("#resourceList");
const incidentSummary = document.querySelector("#incidentSummary");

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function statusText(ready) {
  return ready ? "Ready" : "Action needed";
}

function renderChecklist(items = []) {
  readinessChecklist.innerHTML = items
    .map(
      (item) => `
        <article class="checklist-item ${item.ready ? "ready" : "pending"}">
          <div>
            <h3>${escapeHtml(item.name)}</h3>
            <p>${escapeHtml(item.detail)}</p>
          </div>
          <strong>${statusText(item.ready)}</strong>
        </article>
      `
    )
    .join("");
}

function renderChannels(items = []) {
  channelList.innerHTML = items
    .map(
      (item) => `
        <article class="channel-item">
          <div>
            <span class="tag">${escapeHtml(item.status)}</span>
            <h3>${escapeHtml(item.name)}</h3>
            <p>${escapeHtml(item.use)}</p>
          </div>
          <strong>${escapeHtml(item.guardrail)}</strong>
        </article>
      `
    )
    .join("");
}

function renderResources(items = []) {
  resourceList.innerHTML = items
    .map(
      (resource) => `
        <article class="integration-item">
          <div>
            <h3>${escapeHtml(resource.name)}</h3>
            <p>${escapeHtml(resource.use)}</p>
          </div>
          <a href="${escapeHtml(resource.url)}" target="_blank" rel="noreferrer">Open</a>
        </article>
      `
    )
    .join("");
}

async function loadReadiness() {
  metricApi.textContent = "Checking";
  readinessChecklist.innerHTML = `<p class="fine-print">Loading deployment readiness...</p>`;

  try {
    const [healthResponse, integrationResponse] = await Promise.all([
      fetch("/api/health"),
      fetch("/api/integrations")
    ]);

    if (!healthResponse.ok || !integrationResponse.ok) {
      throw new Error("Readiness API unavailable");
    }

    const health = await healthResponse.json();
    const integrations = await integrationResponse.json();

    metricPhase.textContent = String(health.phase);
    metricApi.textContent = health.ok ? "Healthy" : "Down";
    metricMode.textContent = health.modeLabel || health.mode;
    incidentSummary.textContent = integrations.incidentResponse.summary;
    renderChecklist(integrations.deploymentReadiness);
    renderChannels(integrations.messagingChannels);
    renderResources(integrations.officialResources);
  } catch {
    metricApi.textContent = "Offline";
    readinessChecklist.innerHTML = `<p class="fine-print">Start the Swasthya Saathi server with npm start to load deployment readiness.</p>`;
    channelList.innerHTML = "";
    resourceList.innerHTML = "";
  }
}

refreshButton.addEventListener("click", loadReadiness);
loadReadiness();
