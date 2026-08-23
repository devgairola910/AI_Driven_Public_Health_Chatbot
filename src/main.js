import { diseases, emergencyKeywords, fallbackAdvice, quickPrompts } from "./knowledgeBase.js";

const views = [...document.querySelectorAll(".view")];
const desktopNav = document.querySelector("#desktopNav");
const mobileNav = document.querySelector("#mobileNav");
const floatingAsk = document.querySelector("#floatingAsk");
const viewTitle = document.querySelector("#viewTitle");
const viewEyebrow = document.querySelector("#viewEyebrow");
const regionSelect = document.querySelector("#regionSelect");

const state = {
  route: "home",
  language: "en",
  region: "Statewide",
  apiAvailable: false,
  selectedCategory: "All",
  selectedDiseaseId: "dengue",
  selectedVaccineGroup: "Infant",
  symptomQuery: "",
  chatStarted: false,
  messages: []
};

const navItems = [
  { id: "home", icon: "⌂", en: "Home", hi: "होम", title: "How can we help you today?", eyebrow: "Citizen Health Companion" },
  { id: "chat", icon: "💬", en: "Ask AI", hi: "AI से पूछें", title: "Ask Swasthya Saathi", eyebrow: "AI Health Assistant" },
  { id: "symptoms", icon: "🩺", en: "Symptoms", hi: "लक्षण", title: "Understand Your Symptoms", eyebrow: "Symptom Guide" },
  { id: "diseases", icon: "🦠", en: "Diseases", hi: "बीमारियां", title: "Disease Awareness", eyebrow: "Reviewed Health Topics" },
  { id: "vaccination", icon: "💉", en: "Vaccination", hi: "टीकाकरण", title: "Vaccination", eyebrow: "Preventive Care" },
  { id: "prevention", icon: "🛡️", en: "Prevention", hi: "बचाव", title: "Prevention Starts With Awareness", eyebrow: "Family Health Habits" },
  { id: "alerts", icon: "🚨", en: "Alerts", hi: "अलर्ट", title: "Health Alerts", eyebrow: "Awareness Signals" },
  { id: "coming-soon", icon: "✦", en: "Coming Soon", hi: "जल्द आएगा", title: "More Ways to Stay Connected", eyebrow: "Product Roadmap" },
  { id: "settings", icon: "⚙", en: "Settings", hi: "सेटिंग्स", title: "Preferences", eyebrow: "Your Experience" }
];

const homeActions = [
  { route: "symptoms", icon: "🩺", title: "Check Symptoms", hiTitle: "लक्षण देखें", text: "Understand common symptoms and warning signs.", hiText: "सामान्य लक्षण और चेतावनी संकेत समझें।" },
  { route: "diseases", icon: "🦠", title: "Disease Awareness", hiTitle: "बीमारी जागरूकता", text: "Learn about common diseases and how to prevent them.", hiText: "सामान्य बीमारियों और उनसे बचाव के बारे में जानें।" },
  { route: "vaccination", icon: "💉", title: "Vaccination", hiTitle: "टीकाकरण", text: "Explore vaccination information and schedules.", hiText: "टीकाकरण की जानकारी और समय-सारणी देखें।" },
  { route: "prevention", icon: "🛡️", title: "Preventive Care", hiTitle: "बचाव देखभाल", text: "Simple steps to protect yourself and your family.", hiText: "अपने और परिवार के लिए सरल सुरक्षा कदम।" },
  { route: "alerts", icon: "🚨", title: "Health Alerts", hiTitle: "स्वास्थ्य अलर्ट", text: "View important public-health awareness signals.", hiText: "महत्वपूर्ण सार्वजनिक-स्वास्थ्य जागरूकता संकेत देखें।" },
  { route: "chat", icon: "💬", title: "Ask AI", hiTitle: "AI से पूछें", text: "Ask a health question in Hindi or English.", hiText: "हिंदी या अंग्रेज़ी में स्वास्थ्य प्रश्न पूछें।" }
];

const symptoms = [
  { icon: "🌡️", nameEn: "Fever", nameHi: "बुखार", descriptionEn: "A raised temperature can occur in many infections or heat-related illness.", descriptionHi: "बुखार कई संक्रमण या गर्मी से संबंधित बीमारी में हो सकता है।", promptEn: "I have fever. What should I watch for?", promptHi: "मुझे बुखार है। मुझे किन बातों पर ध्यान देना चाहिए?" },
  { icon: "😷", nameEn: "Cough", nameHi: "खांसी", descriptionEn: "Cough may be linked to respiratory irritation, infection, allergy, or TB warning signs.", descriptionHi: "खांसी श्वसन संक्रमण, एलर्जी या टीबी के चेतावनी संकेत से जुड़ी हो सकती है।", promptEn: "I have cough. When should I seek care?", promptHi: "मुझे खांसी है। मुझे कब देखभाल लेनी चाहिए?" },
  { icon: "🧠", nameEn: "Headache", nameHi: "सिरदर्द", descriptionEn: "Headache can occur with fever, dehydration, stress, or other conditions.", descriptionHi: "सिरदर्द बुखार, निर्जलीकरण, तनाव या अन्य स्थितियों में हो सकता है।", promptEn: "What warning signs with headache need care?", promptHi: "सिरदर्द के साथ कौन से चेतावनी संकेतों में देखभाल जरूरी है?" },
  { icon: "💪", nameEn: "Body pain", nameHi: "शरीर दर्द", descriptionEn: "Body pain can occur with viral illness, dengue, malaria, flu, or exhaustion.", descriptionHi: "शरीर दर्द वायरल बीमारी, डेंगू, मलेरिया, फ्लू या थकान में हो सकता है।", promptEn: "I have fever and body pain", promptHi: "मुझे बुखार और शरीर में दर्द है" },
  { icon: "💧", nameEn: "Diarrhea", nameHi: "दस्त", descriptionEn: "Loose stools can cause dehydration, especially in children and older adults.", descriptionHi: "दस्त से निर्जलीकरण हो सकता है, खासकर बच्चों और बुजुर्गों में।", promptEn: "Diarrhea after unsafe water", promptHi: "असुरक्षित पानी के बाद दस्त" },
  { icon: "🤢", nameEn: "Vomiting", nameHi: "उल्टी", descriptionEn: "Vomiting can lead to dehydration and needs attention if repeated or severe.", descriptionHi: "उल्टी से निर्जलीकरण हो सकता है; बार-बार या गंभीर होने पर ध्यान दें।", promptEn: "When is vomiting urgent?", promptHi: "उल्टी कब तुरंत देखभाल मांगती है?" },
  { icon: "◌", nameEn: "Rash", nameHi: "चकत्ते", descriptionEn: "Rash can occur with infections, allergies, dengue, or skin irritation.", descriptionHi: "चकत्ते संक्रमण, एलर्जी, डेंगू या त्वचा जलन में हो सकते हैं।", promptEn: "I have fever and rash. What should I know?", promptHi: "मुझे बुखार और चकत्ते हैं। मुझे क्या जानना चाहिए?" },
  { icon: "🫁", nameEn: "Difficulty breathing", nameHi: "सांस लेने में कठिनाई", descriptionEn: "Breathing difficulty is a high-risk warning sign and may need urgent care.", descriptionHi: "सांस लेने में कठिनाई HIGH RISK चेतावनी संकेत है और तुरंत देखभाल चाहिए।", promptEn: "I can't breathe", promptHi: "मुझे सांस नहीं आ रही" }
];

const diseaseCategories = ["All", "Vector-borne", "Respiratory", "Water-borne", "Heat-related"];

const vaccineGroups = ["Infant", "Child", "Adolescent", "Adult", "Pregnancy"];

const vaccines = {
  Infant: [
    { name: "BCG", stage: "At birth", note: "Helps protect against severe forms of childhood tuberculosis." },
    { name: "OPV", stage: "Birth and early infancy", note: "Supports protection against polio as per national schedule." },
    { name: "Pentavalent", stage: "Early infancy", note: "Combines protection against multiple serious childhood diseases." }
  ],
  Child: [
    { name: "MR", stage: "9 months and later", note: "Helps protect against measles and rubella." },
    { name: "DPT Booster", stage: "Early childhood", note: "Boosts protection against diphtheria, pertussis, and tetanus." },
    { name: "JE in eligible areas", stage: "As advised locally", note: "Used in areas where Japanese encephalitis vaccination is recommended." }
  ],
  Adolescent: [
    { name: "Td", stage: "10 and 16 years", note: "Helps maintain protection against tetanus and diphtheria." },
    { name: "HPV awareness", stage: "As advised", note: "Discuss eligibility and local availability with a health professional." }
  ],
  Adult: [
    { name: "Tetanus-containing vaccine", stage: "After injury or as advised", note: "May be recommended after certain wounds or missed boosters." },
    { name: "Influenza awareness", stage: "Seasonal or high-risk groups", note: "Older adults and high-risk groups should ask a clinician." }
  ],
  Pregnancy: [
    { name: "Td during pregnancy", stage: "As advised in antenatal care", note: "Protects mother and newborn from tetanus risk." },
    { name: "Antenatal care guidance", stage: "Regular visits", note: "Follow health worker advice for locally recommended preventive care." }
  ]
};

const preventionCards = [
  { icon: "🦟", title: "Mosquito Protection", text: "Prevent mosquito breeding and use appropriate protection." },
  { icon: "💧", title: "Safe Water", text: "Use safe drinking water and maintain water hygiene." },
  { icon: "🧼", title: "Hygiene", text: "Practice regular hand and personal hygiene." },
  { icon: "🥗", title: "Healthy Nutrition", text: "Follow balanced nutrition guidance." },
  { icon: "🌡️", title: "Seasonal Care", text: "Learn about seasonal health risks." },
  { icon: "🏥", title: "Know When To Seek Help", text: "Understand important warning signs." }
];

const alerts = [
  { title: "Increased Fever Queries", district: "District X", change: "+32%", period: "Last 24 hours", text: "Fever-related questions have increased compared with the recent baseline." },
  { title: "Mosquito Prevention Interest", district: "Coastal District", change: "+18%", period: "Last 7 days", text: "More families are asking about dengue and malaria prevention steps." },
  { title: "Cough Awareness Questions", district: "Central District", change: "+14%", period: "Last 48 hours", text: "Respiratory illness and TB warning-sign questions are trending upward." }
];

const chatQuickActions = [
  { icon: "🩺", en: "Symptoms", hi: "लक्षण", promptEn: "I have fever and body pain", promptHi: "मुझे बुखार और शरीर में दर्द है" },
  { icon: "🦟", en: "Dengue", hi: "डेंगू", promptEn: "Tell me about dengue", promptHi: "डेंगू के बारे में बताएं" },
  { icon: "💉", en: "Vaccination", hi: "टीकाकरण", promptEn: "Vaccination schedule for child", promptHi: "बच्चे के लिए टीकाकरण" },
  { icon: "🛡️", en: "Prevention", hi: "बचाव", promptEn: "How can I prevent mosquito diseases?", promptHi: "मच्छर जनित बीमारियों से कैसे बचें?" },
  { icon: "🚨", en: "Warning Signs", hi: "चेतावनी संकेत", promptEn: "What are warning signs I should not ignore?", promptHi: "कौन से चेतावनी संकेत नज़रअंदाज़ न करें?" }
];

const suggestedFollowUps = [
  { en: "Could this be dengue?", hi: "क्या यह डेंगू हो सकता है?" },
  { en: "What should I watch for?", hi: "मुझे किन बातों पर नज़र रखनी चाहिए?" },
  { en: "How can I prevent it?", hi: "मैं इससे कैसे बच सकता/सकती हूं?" },
  { en: "When should I see a doctor?", hi: "डॉक्टर को कब दिखाना चाहिए?" }
];

const comingSoon = [
  { icon: "🎙️", title: "Voice Assistant", text: "Ask questions using your voice." },
  { icon: "📱", title: "WhatsApp", text: "Access Swasthya Saathi through WhatsApp." },
  { icon: "✉️", title: "SMS Support", text: "Receive health information without internet access." },
  { icon: "🗣️", title: "More Indian Languages", text: "Bengali, Tamil, Telugu, Marathi and more." },
  { icon: "📍", title: "Location-Based Alerts", text: "Receive relevant alerts for your area." },
  { icon: "👨‍⚕️", title: "Health Worker Connect", text: "Connect with verified health workers." },
  { icon: "🔔", title: "Vaccination Reminders", text: "Never forget an important vaccination milestone." },
  { icon: "🏛️", title: "Government Health Data", text: "Connect with verified public-health data sources." }
];

function t(en, hi) {
  return state.language === "hi" ? hi : en;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function listItems(items) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isEmergency(input) {
  const normalized = normalize(input);
  const raw = String(input || "").toLowerCase();
  const emergencyPhrases = ["can't breathe", "cant breathe", "cannot breathe", "can t breathe", "सांस", "साँस", "बेहोश"];
  return emergencyKeywords.some((keyword) => normalized.includes(keyword)) || emergencyPhrases.some((phrase) => raw.includes(phrase));
}

function matchDiseases(input) {
  const normalized = normalize(input);
  return diseases
    .map((disease) => ({
      disease,
      score: disease.keywords.reduce((total, keyword) => (normalized.includes(keyword) ? total + 1 : total), 0)
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.disease);
}

function routeLabel(item) {
  return state.language === "hi" ? item.hi : item.en;
}

function renderNavigation() {
  const navHtml = navItems
    .map(
      (item) => `
        <button class="nav-item ${state.route === item.id ? "active" : ""}" data-route="${item.id}" type="button">
          <span aria-hidden="true">${item.icon}</span>
          <strong>${routeLabel(item)}</strong>
        </button>
      `
    )
    .join("");

  desktopNav.innerHTML = navHtml;
  mobileNav.innerHTML = navItems
    .slice(0, 7)
    .map(
      (item) => `
        <button class="mobile-nav-item ${state.route === item.id ? "active" : ""}" data-route="${item.id}" type="button">
          <span aria-hidden="true">${item.icon}</span>
          <strong>${routeLabel(item)}</strong>
        </button>
      `
    )
    .join("");
}

function setRoute(route) {
  state.route = route;
  const current = navItems.find((item) => item.id === route) || navItems[0];
  viewTitle.textContent = state.language === "hi" ? hindiTitle(route) : current.title;
  viewEyebrow.textContent = state.language === "hi" ? hindiEyebrow(route) : current.eyebrow;

  views.forEach((view) => view.classList.toggle("active", view.dataset.view === route));
  renderNavigation();

  if (route === "chat" && !state.chatStarted) {
    startChat();
  }
}

function hindiTitle(route) {
  const titles = {
    home: "आज हम आपकी कैसे मदद कर सकते हैं?",
    chat: "Swasthya Saathi से पूछें",
    symptoms: "अपने लक्षणों को समझें",
    diseases: "बीमारी जागरूकता",
    vaccination: "टीकाकरण",
    prevention: "जागरूकता से बचाव शुरू होता है",
    alerts: "स्वास्थ्य अलर्ट",
    "coming-soon": "जुड़े रहने के और तरीके",
    settings: "प्राथमिकताएं"
  };
  return titles[route] || titles.home;
}

function hindiEyebrow(route) {
  const labels = {
    home: "नागरिक स्वास्थ्य साथी",
    chat: "AI स्वास्थ्य सहायक",
    symptoms: "लक्षण गाइड",
    diseases: "समीक्षित स्वास्थ्य विषय",
    vaccination: "बचाव देखभाल",
    prevention: "परिवार स्वास्थ्य आदतें",
    alerts: "जागरूकता संकेत",
    "coming-soon": "आने वाली सुविधाएं",
    settings: "आपका अनुभव"
  };
  return labels[route] || labels.home;
}

function renderSideCard() {
  const eyebrow = document.querySelector("#sideCardEyebrow");
  const title = document.querySelector("#sideCardTitle");
  const text = document.querySelector("#sideCardText");
  const authorityLink = document.querySelector("#authorityLink");
  if (!eyebrow) return;

  eyebrow.textContent = t("For Families", "परिवारों के लिए");
  title.textContent = t("Reliable health information, simply explained.", "भरोसेमंद स्वास्थ्य जानकारी, सरल भाषा में।");
  text.textContent = t(
    "Use Swasthya Saathi for awareness, prevention, warning signs, and care-seeking prompts.",
    "जागरूकता, बचाव, चेतावनी संकेत और देखभाल के लिए Swasthya Saathi का उपयोग करें।"
  );
  if (authorityLink) {
    authorityLink.textContent = t("Health Authority Dashboard", "स्वास्थ्य प्राधिकरण डैशबोर्ड");
  }

  const regionLabel = document.querySelector("#regionLabel");
  if (regionLabel) {
    regionLabel.textContent = t("Region", "क्षेत्र");
  }
}

function renderHome() {
  document.querySelector("#view-home").innerHTML = `
    <section class="hero-panel">
      <div>
        <p class="eyebrow">${t("Swasthya Saathi", "स्वास्थ्य साथी")}</p>
        <h2>${t("How can we help you today?", "आज हम आपकी कैसे मदद कर सकते हैं?")}</h2>
        <p>${t("Get simple, reliable health-awareness information in your language.", "अपनी भाषा में सरल और भरोसेमंद स्वास्थ्य जागरूकता जानकारी पाएं।")}</p>
        <div class="hero-actions">
          <button class="primary-action" data-route="chat" type="button">💬 ${t("Ask AI", "AI से पूछें")}</button>
          <button class="secondary-action" data-route="symptoms" type="button">🩺 ${t("Check Symptoms", "लक्षण देखें")}</button>
        </div>
      </div>
      <aside class="hero-visual" aria-label="Swasthya Saathi health support">
        <div class="assistant-orbit">
          <span class="assistant-avatar">+</span>
          <div>
            <strong>${t("AI Health Assistant", "AI स्वास्थ्य सहायक")}</strong>
            <p>${t("Awareness, prevention, warning signs, and safe next steps.", "जागरूकता, बचाव, चेतावनी संकेत और सुरक्षित अगले कदम।")}</p>
          </div>
        </div>
        <img class="health-map" src="./src/assets/community-health-map.svg" alt="${t("Community health awareness map", "सामुदायिक स्वास्थ्य जागरूकता मानचित्र")}" />
        <div class="trust-badges">
          <span>🌐 ${t("English & Hindi", "अंग्रेज़ी और हिंदी")}</span>
          <span>🛡️ ${t("Awareness only", "केवल जागरूकता")}</span>
          <span>🤝 ${t("Trusted guidance", "भरोसेमंद मार्गदर्शन")}</span>
        </div>
      </aside>
    </section>

    <section class="action-grid">
      ${homeActions
        .map(
          (card) => `
            <button class="action-card" data-route="${card.route}" type="button">
              <span class="card-icon" aria-hidden="true">${card.icon}</span>
              <strong>${t(card.title, card.hiTitle)}</strong>
              <span>${t(card.text, card.hiText)}</span>
            </button>
          `
        )
        .join("")}
    </section>

    <section class="principle-grid" aria-label="Who Swasthya Saathi helps">
      <article><span>👤</span><h3>${t("For Citizens", "नागरिकों के लिए")}</h3><p>${t("Get reliable health information.", "भरोसेमंद स्वास्थ्य जानकारी पाएं।")}</p></article>
      <article><span>👨‍👩‍👧</span><h3>${t("For Families", "परिवारों के लिए")}</h3><p>${t("Learn prevention and vaccination awareness.", "बचाव और टीकाकरण जागरूकता सीखें।")}</p></article>
      <article><span>🏥</span><h3>${t("For Public Health Authorities", "सार्वजनिक स्वास्थ्य प्राधिकरणों के लिए")}</h3><p>${t("See aggregated community health-awareness signals.", "समेकित सामुदायिक स्वास्थ्य-जागरूकता संकेत देखें।")}</p></article>
    </section>
  `;
}

function welcomeMessage() {
  if (state.language === "hi") {
    return `
      <h3>Namaste! 👋</h3>
      <p>मैं Swasthya Saathi हूं, आपका health-awareness assistant.</p>
      <p>आप symptoms, diseases, prevention, vaccination या warning signs के बारे में पूछ सकते हैं.</p>
    `;
  }

  return `
    <h3>Namaste! 👋</h3>
    <p>I'm Swasthya Saathi, your health-awareness assistant.</p>
    <p>Ask me about symptoms, diseases, prevention, vaccination, or warning signs.</p>
  `;
}

function renderChat() {
  document.querySelector("#view-chat").innerHTML = `
    <section class="chat-layout">
      <div class="assistant-header">
        <span class="assistant-dot" aria-hidden="true"></span>
        <div>
          <strong>Swasthya Saathi</strong>
          <p>${t("AI Health Assistant", "AI स्वास्थ्य सहायक")}</p>
        </div>
      </div>

      <div class="chat-messages" id="messages" aria-live="polite"></div>

      <div class="suggestion-row" aria-label="${t("Suggested questions", "सुझाए गए प्रश्न")}">
        ${chatQuickActions
          .map((action) => {
            const label = t(action.en, action.hi);
            const prompt = t(action.promptEn, action.promptHi);
            return `<button class="prompt-chip" data-prompt="${escapeHtml(prompt)}" type="button">${action.icon} ${escapeHtml(label)}</button>`;
          })
          .join("")}
      </div>

      <form class="composer" id="chatForm">
        <button class="icon-button" id="voiceButton" type="button" aria-label="${t("Voice support", "वॉइस सहायता")}">🎙️</button>
        <button class="icon-button" id="attachButton" type="button" aria-label="${t("Attachment support", "अटैचमेंट सहायता")}">＋</button>
        <input id="chatInput" type="text" autocomplete="off" placeholder="${t("Ask a health question...", "स्वास्थ्य प्रश्न पूछें...")}" aria-label="${t("Health awareness question", "स्वास्थ्य जागरूकता प्रश्न")}" />
        <button class="send-button" type="submit">${t("Send", "भेजें")}</button>
      </form>
      <p class="disclaimer">⚠️ ${t("For health awareness only — not a medical diagnosis.", "केवल स्वास्थ्य जागरूकता के लिए — यह medical diagnosis नहीं है।")}</p>
    </section>
  `;

  document.querySelector("#chatForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.querySelector("#chatInput");
    handleUserInput(input.value);
    input.value = "";
    input.focus();
  });

  document.querySelector("#voiceButton").addEventListener("click", () => showToast(t("Voice support coming soon", "वॉइस सहायता जल्द आएगी")));
  document.querySelector("#attachButton").addEventListener("click", () => showToast(t("Attachment support coming soon", "अटैचमेंट सहायता जल्द आएगी")));

  if (!state.chatStarted) {
    startChat();
  } else {
    paintMessages();
  }
}

function demoChatMessages() {
  if (state.language === "hi") {
    return [
      { role: "assistant", html: welcomeMessage() },
      { role: "user example", html: `<p>मुझे बुखार और शरीर में दर्द है।</p>` },
      {
        role: "assistant",
        html: `
          <p>आपके बताए लक्षण कई अलग-अलग स्थितियों में दिखाई दे सकते हैं। केवल इन लक्षणों से किसी बीमारी का निदान नहीं किया जा सकता।</p>
          <p><strong>अभी के लिए:</strong></p>
          <ul>
            <li>पर्याप्त पानी पिएं</li>
            <li>आराम करें</li>
            <li>अपने तापमान पर नज़र रखें</li>
            <li>यदि लक्षण बने रहें या बढ़ें, तो स्वास्थ्यकर्मी से सलाह लें</li>
          </ul>
          <p class="warning-copy">HIGH RISK: यदि सांस लेने में गंभीर कठिनाई, बेहोशी या अन्य गंभीर लक्षण हों, तो तुरंत चिकित्सा सहायता लें।</p>
          <div class="suggested-questions">
            ${suggestedFollowUps.map((item) => `<button data-prompt="${escapeHtml(item.hi)}" type="button">${escapeHtml(item.hi)}</button>`).join("")}
          </div>
        `
      }
    ];
  }

  return [
    { role: "assistant", html: welcomeMessage() },
    { role: "user example", html: `<p>I have fever and body pain.</p>` },
    {
      role: "assistant",
      html: `
        <p>These symptoms can occur in several different conditions. Symptoms alone cannot confirm a specific disease.</p>
        <p><strong>For now:</strong></p>
        <ul>
          <li>Drink enough fluids</li>
          <li>Rest</li>
          <li>Monitor your temperature</li>
          <li>If symptoms persist or worsen, seek advice from a health worker</li>
        </ul>
        <p class="warning-copy">HIGH RISK: Seek immediate medical help for severe breathing difficulty, fainting, or other serious warning signs.</p>
        <div class="suggested-questions">
          ${suggestedFollowUps.map((item) => `<button data-prompt="${escapeHtml(item.en)}" type="button">${escapeHtml(item.en)}</button>`).join("")}
        </div>
      `
    }
  ];
}

function startChat() {
  state.chatStarted = true;
  if (!state.messages.length) {
    state.messages = demoChatMessages();
  }
  paintMessages();
}

function paintMessages() {
  const messagesEl = document.querySelector("#messages");
  if (!messagesEl) return;
  messagesEl.innerHTML = state.messages
    .map((message) => `<article class="message ${message.role.replace(/\s+/g, "-")}">${message.html}</article>`)
    .join("");
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function createMessage(role, html) {
  state.messages.push({ role, html });
  paintMessages();
}

function showToast(text) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = text;
  document.body.append(toast);
  setTimeout(() => toast.remove(), 2200);
}

function emergencyCard() {
  return `
    <div class="emergency-card">
      <h3>🚨 ${t("Please Seek Immediate Medical Help", "कृपया तुरंत चिकित्सा सहायता लें")}</h3>
      <p>${t("This may require urgent medical attention.", "इसके लिए तुरंत medical attention की जरूरत हो सकती है।")}</p>
      <div class="emergency-actions">
        <button type="button" data-demo-action="care">Find Emergency Care</button>
        <button type="button" data-demo-action="call">Call Emergency Services</button>
      </div>
    </div>
  `;
}

function localAnswer(input) {
  const urgent = isEmergency(input);
  const normalized = normalize(input);
  const matched = matchDiseases(input)[0];

  if (urgent) {
    return emergencyCard();
  }

  if (matched) {
    return diseaseResponse(matched, urgent);
  }

  if (normalized.includes("vaccin") || normalized.includes("vaccine") || normalized.includes("immun")) {
    return `
      <h3>${t("Vaccination awareness", "टीकाकरण जागरूकता")}</h3>
      <p>${t("Vaccines help prevent serious illness. The right vaccine and timing depend on age, pregnancy status, past doses, and local public-health guidance.", "Vaccines गंभीर बीमारी से बचाव में मदद करते हैं। सही vaccine और समय उम्र, pregnancy status, पहले के doses और local guidance पर निर्भर करता है।")}</p>
      <p>${t("Use the Vaccination page to view demo schedule information, and confirm personal recommendations with a health worker.", "Demo schedule देखने के लिए Vaccination page खोलें और personal recommendation के लिए health worker से पुष्टि करें।")}</p>
      <button class="primary-action" data-route="vaccination" type="button">${t("Open Vaccination", "टीकाकरण खोलें")}</button>
    `;
  }

  if (normalized.includes("prevention") || normalized.includes("prevent") || normalized.includes("protect")) {
    return `
      <h3>${t("Prevention starts with simple habits", "बचाव छोटी आदतों से शुरू होता है")}</h3>
      <ul>
        <li>${t("Use safe drinking water and wash hands regularly.", "Safe drinking water इस्तेमाल करें और हाथ नियमित रूप से धोएं।")}</li>
        <li>${t("Prevent mosquito breeding by removing stagnant water.", "ठहरे हुए पानी को हटाकर mosquito breeding रोकें।")}</li>
        <li>${t("Stay home when ill and improve ventilation for respiratory symptoms.", "बीमार होने पर घर पर रहें और respiratory symptoms में ventilation बेहतर रखें।")}</li>
        <li>${t("Seek care when symptoms are severe, persistent, or worsening.", "Symptoms severe, persistent या worsening हों तो care लें।")}</li>
      </ul>
      <button class="primary-action" data-route="prevention" type="button">${t("Open Prevention", "बचाव खोलें")}</button>
    `;
  }

  if (normalized.includes("warning") || normalized.includes("urgent") || normalized.includes("emergency")) {
    return `
      <h3>${t("Warning signs need attention", "चेतावनी संकेतों पर ध्यान दें")}</h3>
      <p>${t("Seek professional medical care quickly if symptoms are severe, worsening, or include breathing difficulty, chest pain, confusion, fainting, severe dehydration, seizures, or bleeding.", "Breathing difficulty, chest pain, confusion, fainting, severe dehydration, seizures, bleeding या worsening symptoms में तुरंत professional medical care लें।")}</p>
      <p class="fine-print">${t("This is awareness guidance, not a diagnosis.", "यह awareness guidance है, diagnosis नहीं।")}</p>
    `;
  }

  if (!matched) {
    const copy = fallbackAdvice[state.language];
    return `
      <h3>${escapeHtml(copy.title)}</h3>
      <p>${escapeHtml(copy.body)}</p>
      <p>${escapeHtml(copy.safety)}</p>
      <div class="suggested-questions">
        ${quickPrompts.slice(0, 4).map((prompt) => `<button data-prompt="${escapeHtml(prompt)}" type="button">${escapeHtml(prompt)}</button>`).join("")}
      </div>
    `;
  }
}

function diseaseResponse(disease, urgent) {
  const safetyLead = urgent ? emergencyCard() : "";
  return `
    ${safetyLead}
    <h3>${escapeHtml(disease.name)}</h3>
    <p>${escapeHtml(disease.publicMessage)}</p>
    <div class="response-grid">
      <div><strong>${t("Common symptoms", "सामान्य लक्षण")}</strong><ul>${listItems(disease.symptoms)}</ul></div>
      <div><strong>${t("Prevention", "बचाव")}</strong><ul>${listItems(disease.prevention)}</ul></div>
    </div>
    <p><strong>${t("Care guidance", "देखभाल सुझाव")}:</strong> ${escapeHtml(disease.care)}</p>
    <p><strong>${t("Warning signs", "चेतावनी संकेत")}:</strong> ${escapeHtml(disease.urgent.join(", "))}.</p>
    <p class="fine-print">${t("This is not a diagnosis. Severe or worsening symptoms need qualified medical care.", "यह diagnosis नहीं है। गंभीर या बढ़ते symptoms में qualified medical care लें।")}</p>
    <div class="suggested-questions">
      ${suggestedFollowUps
        .map((item) => {
          const prompt = t(item.en, item.hi);
          return `<button data-prompt="${escapeHtml(prompt)}" type="button">${escapeHtml(prompt)}</button>`;
        })
        .join("")}
    </div>
  `;
}

function responseFromApi(payload) {
  if (payload.urgent) return emergencyCard();
  if (payload.type === "disease") {
    return diseaseResponse(
      {
        name: payload.title,
        publicMessage: payload.summary,
        symptoms: payload.symptoms || [],
        prevention: payload.prevention || [],
        care: payload.care || "",
        urgent: payload.warningSigns || []
      },
      false
    );
  }

  return `
    <h3>${escapeHtml(payload.title)}</h3>
    <p>${escapeHtml(payload.summary)}</p>
    <p>${escapeHtml(payload.care)}</p>
    <p class="fine-print">${escapeHtml(payload.disclaimer)}</p>
  `;
}

async function answerWithApi(input) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input, language: state.language, region: state.region })
  });

  if (!response.ok) throw new Error("Chat API unavailable");
  return responseFromApi(await response.json());
}

async function handleUserInput(input) {
  const trimmed = input.trim();
  if (!trimmed) return;

  createMessage("user", `<p>${escapeHtml(trimmed)}</p>`);
  createMessage("assistant loading", `<p>${t("Swasthya Saathi is checking verified health information...", "Swasthya Saathi verified health information जांच रहा है...")}</p>`);

  try {
    const answer = state.apiAvailable ? await answerWithApi(trimmed) : localAnswer(trimmed);
    state.messages.pop();
    createMessage("assistant", answer);
  } catch {
    state.apiAvailable = false;
    state.messages.pop();
    createMessage("assistant", localAnswer(trimmed));
  }
}

function renderSymptoms() {
  const query = state.symptomQuery.toLowerCase();
  const filtered = symptoms.filter((item) => {
    const name = t(item.nameEn, item.nameHi).toLowerCase();
    return name.includes(query) || item.nameEn.toLowerCase().includes(query);
  });
  document.querySelector("#view-symptoms").innerHTML = `
    <section class="section-intro">
      <h2>${t("Understand Your Symptoms", "अपने लक्षणों को समझें")}</h2>
      <p>${t("Learn about common symptoms and when professional care may be needed.", "सामान्य लक्षणों और कब professional care की जरूरत हो सकती है, यह जानें।")}</p>
      <p class="fine-print">${t("This symptom can occur in several conditions — not a diagnostic test.", "यह लक्षण कई स्थितियों में हो सकता है — यह निदान परीक्षण नहीं है।")}</p>
      <input class="search-input" id="symptomSearch" type="search" value="${escapeHtml(state.symptomQuery)}" placeholder="${t("Search symptoms", "लक्षण खोजें")}" aria-label="${t("Search symptoms", "लक्षण खोजें")}" />
    </section>
    <section class="info-grid">
      ${filtered
        .map(
          (symptom) => `
            <article class="info-card">
              <span class="card-icon">${symptom.icon}</span>
              <h3>${escapeHtml(t(symptom.nameEn, symptom.nameHi))}</h3>
              <p>${escapeHtml(t(symptom.descriptionEn, symptom.descriptionHi))}</p>
              <button class="text-action" data-prompt="${escapeHtml(t(symptom.promptEn, symptom.promptHi))}" type="button">${t("Learn more →", "और जानें →")}</button>
            </article>
          `
        )
        .join("")}
    </section>
  `;
  document.querySelector("#symptomSearch").addEventListener("input", (event) => {
    state.symptomQuery = event.target.value;
    renderSymptoms();
  });
}

function categoryForDisease(disease) {
  if (disease.category === "Vector-borne") return "Mosquito-borne";
  return disease.category;
}

function renderDiseases() {
  const activeCategory = state.selectedCategory;
  const filtered =
    activeCategory === "All"
      ? diseases
      : diseases.filter((disease) => disease.category === activeCategory || categoryForDisease(disease) === activeCategory);
  const selected = diseases.find((disease) => disease.id === state.selectedDiseaseId) || diseases[0];

  document.querySelector("#view-diseases").innerHTML = `
    <section class="section-intro">
      <h2>${t("Disease Awareness", "बीमारी जागरूकता")}</h2>
      <p>${t("Learn how common diseases spread, what symptoms to watch for, and how to protect yourself.", "सामान्य बीमारियों, उनके लक्षणों और बचाव के बारे में जानें।")}</p>
      <div class="chip-row">
        ${["All", "Mosquito-borne", "Respiratory", "Water-borne", "Heat-related"]
          .map((category) => `<button class="filter-chip ${activeCategory === category ? "active" : ""}" data-category="${category}" type="button">${category}</button>`)
          .join("")}
      </div>
    </section>
    <section class="disease-layout">
      <div class="disease-card-grid">
        ${filtered
          .map(
            (disease) => `
              <article class="disease-product-card ${selected.id === disease.id ? "active" : ""}">
                <span class="tag">${categoryForDisease(disease)}</span>
                <h3>${escapeHtml(disease.name)}</h3>
                <p>${escapeHtml(disease.publicMessage)}</p>
                <div class="mini-list">
                  <strong>${t("Symptoms", "लक्षण")}</strong>
                  <span>${escapeHtml(disease.symptoms.slice(0, 3).join(", "))}</span>
                </div>
                <div class="card-actions">
                  <button data-disease="${disease.id}" type="button">${t("View details", "विवरण देखें")}</button>
                  <button data-prompt="Tell me about ${escapeHtml(disease.name)}" type="button">${t("Ask AI", "AI से पूछें")}</button>
                </div>
              </article>
            `
          )
          .join("")}
      </div>
      <aside class="detail-panel">
        <p class="eyebrow">${categoryForDisease(selected)}</p>
        <h2>${escapeHtml(selected.name)}</h2>
        <p><strong>${t("Know the signs. Prevent the risk.", "संकेत पहचानें। जोखिम रोकें।")}</strong></p>
        <div class="compact-card-list">
          <h3>${t("Common Symptoms", "सामान्य लक्षण")}</h3>
          ${selected.symptoms.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
        </div>
        <div class="compact-card-list">
          <h3>${t("Prevention", "बचाव")}</h3>
          ${selected.prevention.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
        </div>
        <div class="warning-panel">
          <h3>⚠️ ${t("Warning Signs", "चेतावनी संकेत")}</h3>
          <p>${escapeHtml(selected.urgent.join(", "))}</p>
          <strong>${t("Seek professional medical care if serious or worsening symptoms occur.", "गंभीर या बढ़ते लक्षणों में professional medical care लें।")}</strong>
        </div>
        <button class="primary-action full" data-prompt="Tell me about ${escapeHtml(selected.name)}" type="button">${t(`Ask AI about ${selected.name} →`, `${selected.name} के बारे में AI से पूछें →`)}</button>
      </aside>
    </section>
  `;
}

function renderVaccination() {
  document.querySelector("#view-vaccination").innerHTML = `
    <section class="section-intro">
      <h2>${t("Vaccination", "टीकाकरण")}</h2>
      <p>${t("Stay informed about recommended vaccines and preventive care.", "Recommended vaccines और preventive care के बारे में जानकारी रखें।")}</p>
      <h3>${t("Who are you checking for?", "आप किसके लिए देख रहे हैं?")}</h3>
      <div class="persona-grid">
        ${vaccineGroups
          .map(
            (group) => `
              <button class="persona-card ${state.selectedVaccineGroup === group ? "active" : ""}" data-vaccine-group="${group}" type="button">
                <span>${groupIcon(group)}</span>
                <strong>${group}</strong>
              </button>
            `
          )
          .join("")}
      </div>
    </section>
    <section class="table-panel">
      ${(vaccines[state.selectedVaccineGroup] || [])
        .map(
          (vaccine) => `
            <article class="vaccine-row">
              <div>
                <h3>${escapeHtml(vaccine.name)}</h3>
                <p>${escapeHtml(vaccine.note)}</p>
              </div>
              <strong>${escapeHtml(vaccine.stage)}</strong>
              <button data-demo-action="vaccine" type="button">View details</button>
            </article>
          `
        )
        .join("")}
      <button class="secondary-action reminder" data-demo-action="reminder" type="button">🔔 Set Reminder <span>Coming Soon</span></button>
    </section>
  `;
}

function groupIcon(group) {
  return { Infant: "👶", Child: "🧒", Adolescent: "🧑", Adult: "👨", Pregnancy: "🤰" }[group] || "👤";
}

function renderPrevention() {
  document.querySelector("#view-prevention").innerHTML = `
    <section class="section-intro">
      <h2>${t("Prevention Starts With Awareness", "जागरूकता से बचाव शुरू होता है")}</h2>
      <p>${t("Small daily habits can protect families and communities.", "छोटी रोजमर्रा की आदतें परिवार और समुदाय को सुरक्षित रख सकती हैं।")}</p>
    </section>
    <section class="visual-grid">
      ${preventionCards
        .map(
          (card) => `
            <article class="visual-card">
              <span class="card-icon">${card.icon}</span>
              <h3>${escapeHtml(t(card.titleEn, card.titleHi))}</h3>
              <p>${escapeHtml(t(card.textEn, card.textHi))}</p>
            </article>
          `
        )
        .join("")}
    </section>
  `;
}

function renderAlerts() {
  const visibleAlerts = alerts.filter(
    (alert) => state.region === "Statewide" || alert.region === state.region || alert.district === state.region
  );

  document.querySelector("#view-alerts").innerHTML = `
    <section class="section-intro">
      <h2>${t("Health Alerts", "स्वास्थ्य अलर्ट")}</h2>
      <p>${t("Important health-awareness signals from your region.", "आपके क्षेत्र से महत्वपूर्ण health-awareness signals.")}</p>
      <p class="region-label">${t("Region", "क्षेत्र")}: <strong>${escapeHtml(state.region)}</strong></p>
      <p class="demo-note">${t("Demo Data", "डेमो डेटा")} · ${t("These signals are based on aggregated chatbot activity and do not confirm a disease outbreak.", "ये संकेत aggregated chatbot activity पर आधारित हैं और disease outbreak की पुष्टि नहीं करते।")}</p>
    </section>
    ${
      visibleAlerts.length
        ? `<section class="alert-grid">
            ${visibleAlerts
              .map(
                (alert) => `
                  <article class="alert-card">
                    <span class="tag warning">${t("Awareness Signal", "जागरूकता संकेत")}</span>
                    <h3>⚠️ ${escapeHtml(t(alert.title, alert.titleHi))}</h3>
                    <div class="alert-meta">
                      <span>${escapeHtml(alert.district)}</span>
                      <strong>${escapeHtml(alert.change)}</strong>
                      <span>${escapeHtml(alert.period)}</span>
                    </div>
                    <p>${escapeHtml(t(alert.text, alert.textHi))}</p>
                    <button data-demo-action="alert" type="button">${t("View Details →", "विवरण देखें →")}</button>
                  </article>
                `
              )
              .join("")}
          </section>`
        : `<section class="empty-state">
            <h3>${t("You're all caught up", "आप अपडेट हैं")}</h3>
            <p>${t("No active awareness signals for this region.", "इस क्षेत्र के लिए कोई सक्रिय जागरूकता संकेत नहीं है।")}</p>
          </section>`
    }
  `;
}

function renderComingSoon() {
  document.querySelector("#view-coming-soon").innerHTML = `
    <section class="section-intro centered">
      <h2>${t("More Ways to Stay Connected", "जुड़े रहने के और तरीके")}</h2>
      <p>${t("We're working on additional ways to make health information more accessible.", "हम health information को और accessible बनाने के नए तरीकों पर काम कर रहे हैं।")}</p>
    </section>
    <section class="coming-grid">
      ${comingSoon
        .map(
          (item) => `
            <article class="coming-card">
              <span class="card-icon">${item.icon}</span>
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.text)}</p>
              <strong>${t("Coming Soon", "जल्द आएगा")}</strong>
            </article>
          `
        )
        .join("")}
    </section>
  `;
}

function renderSettings() {
  document.querySelector("#view-settings").innerHTML = `
    <section class="settings-panel">
      <h2>${t("Preferences", "प्राथमिकताएं")}</h2>
      <article class="setting-row">
        <div><strong>${t("Language", "भाषा")}</strong><p>${state.language === "hi" ? "हिन्दी" : "English"}</p></div>
        <span>EN | हिन्दी</span>
      </article>
      <article class="setting-row">
        <div><strong>${t("Region", "क्षेत्र")}</strong><p>${escapeHtml(state.region)}</p></div>
        <span>${escapeHtml(state.region)}</span>
      </article>
      <article class="setting-row disabled"><div><strong>${t("Notifications", "सूचनाएं")}</strong><p>${t("Coming Soon", "जल्द आएगा")}</p></div><span>${t("Off", "बंद")}</span></article>
      <article class="setting-row disabled"><div><strong>${t("Voice", "वॉइस")}</strong><p>${t("Coming Soon", "जल्द आएगा")}</p></div><span>${t("Off", "बंद")}</span></article>
      <article class="setting-row">
        <div>
          <strong>${t("Privacy", "गोपनीयता")}</strong>
          <p>${t("This application provides health-awareness information and does not replace professional medical advice.", "यह ऐप health-awareness जानकारी देता है और professional medical advice का विकल्प नहीं है।")}</p>
        </div>
      </article>
      <article class="setting-row">
        <div>
          <strong>${t("About Swasthya Saathi", "Swasthya Saathi के बारे में")}</strong>
          <p>${t("A multilingual public-health awareness assistant for citizens, families, and health authorities.", "नागरिकों, परिवारों और स्वास्थ्य प्राधिकरणों के लिए बहुभाषी public-health awareness assistant।")}</p>
        </div>
      </article>
    </section>
  `;
}

function renderAll() {
  renderNavigation();
  renderSideCard();
  renderHome();
  renderChat();
  renderSymptoms();
  renderDiseases();
  renderVaccination();
  renderPrevention();
  renderAlerts();
  renderComingSoon();
  renderSettings();
  floatingAsk.textContent = t("Ask AI", "AI से पूछें");
  setRoute(state.route);
}

function bindGlobalEvents() {
  document.addEventListener("click", (event) => {
    const routeButton = event.target.closest("[data-route]");
    if (routeButton) {
      event.preventDefault();
      setRoute(routeButton.dataset.route);
      return;
    }

    const promptButton = event.target.closest("[data-prompt]");
    if (promptButton) {
      event.preventDefault();
      setRoute("chat");
      handleUserInput(promptButton.dataset.prompt);
      return;
    }

    const diseaseButton = event.target.closest("[data-disease]");
    if (diseaseButton) {
      state.selectedDiseaseId = diseaseButton.dataset.disease;
      renderDiseases();
      return;
    }

    const categoryButton = event.target.closest("[data-category]");
    if (categoryButton) {
      state.selectedCategory = categoryButton.dataset.category;
      renderDiseases();
      return;
    }

    const vaccineButton = event.target.closest("[data-vaccine-group]");
    if (vaccineButton) {
      state.selectedVaccineGroup = vaccineButton.dataset.vaccineGroup;
      renderVaccination();
      return;
    }

    const demoButton = event.target.closest("[data-demo-action]");
    if (demoButton) {
      showToast(t("This feature is coming soon in the prototype", "यह सुविधा prototype में जल्द आएगी"));
    }
  });

  document.querySelectorAll(".language-btn").forEach((button) => {
    button.addEventListener("click", () => {
      state.language = button.dataset.language;
      document.querySelectorAll(".language-btn").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      state.messages = [];
      state.chatStarted = false;
      renderAll();
    });
  });

  regionSelect.addEventListener("change", (event) => {
    state.region = event.target.value;
    renderSettings();
    renderAlerts();
  });

  floatingAsk.addEventListener("click", () => setRoute("chat"));
}

async function checkApi() {
  try {
    const response = await fetch("/api/health");
    state.apiAvailable = response.ok;
  } catch {
    state.apiAvailable = false;
  }
}

bindGlobalEvents();
renderAll();
checkApi();
