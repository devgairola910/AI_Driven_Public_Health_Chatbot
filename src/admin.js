const reviewTable = document.querySelector("#reviewTable");
const refreshButton = document.querySelector("#refreshContent");
const metricEntries = document.querySelector("#metricEntries");
const metricSources = document.querySelector("#metricSources");
const metricPending = document.querySelector("#metricPending");

function statusLabel(status) {
  return status === "approved" ? "Approved" : "Needs review";
}

function renderQueue(payload) {
  const queue = payload.reviewQueue || [];
  const approved = queue.filter((item) => item.status === "approved").length;
  const sourceCount = queue.reduce((total, item) => total + item.sourceCount, 0);

  metricEntries.textContent = String(approved);
  metricSources.textContent = String(sourceCount);
  metricPending.textContent = String(queue.length - approved);

  reviewTable.innerHTML = queue
    .map(
      (item) => `
        <article class="review-row">
          <div>
            <span class="tag">${item.category}</span>
            <h3>${item.title}</h3>
            <p>Reviewer: ${item.reviewer}</p>
          </div>
          <div>
            <strong>${item.sourceCount}</strong>
            <span>sources</span>
          </div>
          <div>
            <strong class="status-${item.status}">${statusLabel(item.status)}</strong>
            <span>content status</span>
          </div>
        </article>
      `
    )
    .join("");
}

async function loadContent() {
  reviewTable.innerHTML = `<p class="fine-print">Loading content review queue...</p>`;

  try {
    const response = await fetch("/api/content");
    if (!response.ok) throw new Error("Content API unavailable");
    renderQueue(await response.json());
  } catch {
    reviewTable.innerHTML = `
      <article class="review-row">
        <div>
          <h3>Backend API unavailable</h3>
          <p>Start the Swasthya Saathi server with npm start to review governed content.</p>
        </div>
      </article>
    `;
  }
}

refreshButton.addEventListener("click", loadContent);
loadContent();
