# MASTER UI PROMPT — SWASTHYA SAATHI

Redesign the existing prototype into a **premium, modern, trustworthy public-health AI application** called:

# **Swasthya Saathi**

### *AI-Powered Public Health Awareness Assistant*

The product is designed for **rural and semi-urban Indian users**, including first-time users who may not be comfortable with complicated technology.

The goal is NOT to make this look like a developer dashboard, admin panel, SaaS analytics tool, or generic ChatGPT clone.

The goal is to make it feel like a **real, polished healthcare product that could be launched to the public**.

---

# 1. CORE DESIGN DIRECTION

Create a visual style that feels:

* Trustworthy
* Calm
* Human
* Accessible
* Modern
* Premium
* Healthcare-focused
* AI-powered without looking overly futuristic

Use a **soft light healthcare theme** as the primary interface.

### Color direction

Use:

* Deep teal / emerald as the primary brand color
* Soft mint/green for positive states
* Warm amber for warnings
* Muted red for emergency states
* White / very light neutral backgrounds
* Dark navy/charcoal for primary text

Avoid:

* Neon colors
* Excessive gradients
* Cyberpunk styling
* Excessive glassmorphism
* Very dark backgrounds
* Overly saturated medical green
* Generic blue SaaS styling

The interface should feel **warm and trustworthy rather than clinical or corporate**.

---

# 2. BRANDING

Use the product name prominently:

**Swasthya Saathi**

Subtitle:

**Your AI Health Awareness Assistant**

Use a simple healthcare-inspired logo such as:

**medical cross + speech bubble**

Do NOT use a complicated logo.

The brand should be recognizable throughout the application.

---

# 3. IMPORTANT — REMOVE THE CURRENT DEVELOPER-STYLE UI

Do NOT show these on the main user interface:

* Phase 1
* Phase 2
* Phase 3
* Phase 4
* Delivered
* Prototype status
* Deploy
* API status
* Developer controls
* Technical implementation labels
* Technical architecture diagrams
* Debug information

The user should never feel like they are using a hackathon development dashboard.

Technical/admin information can exist inside a **separate Admin Dashboard**.

---

# 4. GLOBAL APP STRUCTURE

Create a clean application shell.

### Desktop

Use:

* Left navigation sidebar
* Main content area
* Optional contextual right panel

### Mobile

Use:

* Bottom navigation
* Full-width content
* Floating Ask AI button

Navigation:

1. 🏠 Home
2. 💬 Ask AI
3. 🩺 Symptoms
4. 🦠 Diseases
5. 💉 Vaccination
6. 🛡️ Prevention
7. 🚨 Alerts

Keep navigation visually simple.

---

# 5. HOME PAGE

The home page should immediately explain the product.

Hero section:

### **How can we help you today?**

Supporting text:

> Get simple, reliable health-awareness information in your language.

Then display six large, attractive action cards:

### 🩺 Check Symptoms

Understand common symptoms and warning signs.

### 🦠 Disease Awareness

Learn about common diseases and how to prevent them.

### 💉 Vaccination

Explore vaccination information and schedules.

### 🛡️ Preventive Care

Simple steps to protect yourself and your family.

### 🚨 Health Alerts

View important public-health awareness signals.

### 💬 Ask AI

Ask a health question in Hindi or English.

Cards should have:

* Large icon
* Short title
* One-line explanation
* Subtle hover animation
* Clear click affordance

Do not make them look like boring dashboard widgets.

---

# 6. MAIN AI CHAT PAGE

This is the most important screen.

Make it feel like a **dedicated healthcare assistant**, not ChatGPT.

Header:

**Swasthya Saathi**

Status:

**● AI Health Assistant**

Language selector:

**English | हिन्दी**

---

### Welcome message

Show:

> **Namaste! 👋**
>
> I'm Swasthya Saathi, your health-awareness assistant.
>
> Ask me about symptoms, diseases, prevention, vaccination, or warning signs.

Then provide quick actions:

`🩺 Symptoms`

`🦟 Dengue`

`💉 Vaccination`

`🛡️ Prevention`

`🚨 Warning Signs`

---

# 7. CHAT UI

Use a clean conversational layout.

User messages:

* Right aligned
* Soft teal background
* White text

Assistant messages:

* Left aligned
* White background
* Thin border
* Dark text
* Small AI icon/avatar

Messages should have generous spacing.

Do not make chat bubbles excessively rounded.

---

# 8. EXAMPLE CHAT

Show a realistic example:

### User

> मुझे बुखार और शरीर में दर्द है।

### Assistant

> आपके बताए लक्षण कई अलग-अलग स्थितियों में दिखाई दे सकते हैं। केवल इन लक्षणों से किसी बीमारी का निदान नहीं किया जा सकता।
>
> **अभी के लिए:**
>
> • पर्याप्त पानी पिएं
> • आराम करें
> • अपने तापमान पर नज़र रखें
> • यदि लक्षण बने रहें या बढ़ें, तो स्वास्थ्यकर्मी से सलाह लें
>
> ⚠️ यदि आपको सांस लेने में गंभीर कठिनाई, बेहोशी या अन्य गंभीर लक्षण हों, तो तुरंत चिकित्सा सहायता लें।

Below the answer:

### Suggested questions

`Could this be dengue?`

`What should I watch for?`

`How can I prevent it?`

`When should I see a doctor?`

---

# 9. CHAT INPUT

Bottom-fixed input:

**Ask a health question...**

Include:

* Microphone icon
* Attachment icon
* Send button

Microphone should be visually present but can display:

**Voice support coming soon**

when clicked.

Add a subtle disclaimer below:

> ⚠️ For health awareness only — not a medical diagnosis.

---

# 10. SYMPTOMS PAGE

Create a dedicated **Symptom Guide**.

Header:

### **Understand Your Symptoms**

Subtitle:

> Learn about common symptoms and when professional care may be needed.

Show searchable symptom cards:

* Fever
* Cough
* Headache
* Body pain
* Diarrhea
* Vomiting
* Rash
* Difficulty breathing

Each symptom card contains:

* Icon
* Symptom name
* Short description
* "Learn more →"

Do NOT present this as a diagnostic test.

Never show:

> "You have dengue."

Instead show:

> "This symptom can occur in several conditions."

---

# 11. DISEASE AWARENESS PAGE

Header:

### **Disease Awareness**

Subtitle:

> Learn how common diseases spread, what symptoms to watch for, and how to protect yourself.

Create beautiful cards:

### Dengue

Mosquito-borne disease awareness.

### Malaria

Prevention and warning signs.

### Tuberculosis

Symptoms and prevention.

### Diarrheal Diseases

Safe water and hygiene.

### Respiratory Illnesses

Prevention and warning signs.

Each card should have:

* Minimal illustration/icon
* Disease name
* Short description
* Symptoms
* Prevention
* Warning signs
* "Ask AI about this"

Use category chips:

`All`

`Mosquito-borne`

`Respiratory`

`Water-borne`

---

# 12. DISEASE DETAIL PAGE

When opening Dengue, create:

### Dengue

**Know the signs. Prevent the risk.**

Sections:

### Common Symptoms

Use compact cards:

* Fever
* Headache
* Body aches
* Joint/muscle pain
* Rash

### Prevention

* Remove stagnant water
* Use mosquito protection
* Cover water containers
* Follow local public-health guidance

### ⚠️ Warning Signs

Use a subtle amber/red warning panel.

Clearly state:

> Seek professional medical care if serious or worsening symptoms occur.

Add:

**Ask AI about Dengue →**

---

# 13. VACCINATION PAGE

Header:

### **Vaccination**

Subtitle:

> Stay informed about recommended vaccines and preventive care.

Start with:

### Who are you checking for?

Cards:

`👶 Infant`

`🧒 Child`

`🧑 Adolescent`

`👨 Adult`

`🤰 Pregnancy`

Then show vaccination information.

Each vaccine row:

**Vaccine Name**

Recommended stage

Short explanation

`View details`

Add:

### 🔔 Set Reminder

Show the button but mark it:

**Coming Soon**

Do not pretend reminders are already functional.

---

# 14. PREVENTIVE CARE PAGE

Header:

### **Prevention Starts With Awareness**

Create visual cards:

### 🦟 Mosquito Protection

Prevent mosquito breeding and use appropriate protection.

### 💧 Safe Water

Use safe drinking water and maintain water hygiene.

### 🧼 Hygiene

Practice regular hand and personal hygiene.

### 🥗 Healthy Nutrition

Follow balanced nutrition guidance.

### 🌡️ Seasonal Care

Learn about seasonal health risks.

### 🏥 Know When To Seek Help

Understand important warning signs.

Make this page highly visual.

---

# 15. HEALTH ALERTS PAGE

Create a dedicated public-health awareness page.

Header:

### **Health Alerts**

Subtitle:

> Important health-awareness signals from your region.

Top selector:

**Region: Statewide ▼**

Show alert cards.

Example:

### ⚠️ Increased Fever Queries

**District X**

`+32%`

Last 24 hours

**Awareness Signal**

Description:

> Fever-related questions have increased compared with the recent baseline.

CTA:

**View Details →**

IMPORTANT:

Always label these as:

**Awareness Signal**

NOT:

**Confirmed Outbreak**

Add:

> These signals are based on aggregated chatbot activity and do not confirm a disease outbreak.

---

# 16. ADMIN / HEALTH AUTHORITY DASHBOARD

Keep this completely separate from the normal user experience.

Navigation:

**Admin Dashboard**

Show:

### Public Health Overview

Cards:

**1,248**
Queries Today

**324**
Fever Queries

**187**
Cough Queries

**3**
Awareness Signals

Then:

### Query Trends

Line chart.

### Trending Symptoms

Horizontal bar chart.

### Regional Activity

Map or district cards.

### Active Awareness Signals

Alert list.

Use clean data visualization.

Do NOT make this dashboard overly complex.

---

# 17. COMING SOON SECTION

This is VERY important.

Create a beautiful section titled:

# **More Ways to Stay Connected**

Subtitle:

> We're working on additional ways to make health information more accessible.

Create cards marked:

### 🎙️ Voice Assistant

Ask questions using your voice.

**Coming Soon**

### 📱 WhatsApp

Access Swasthya Saathi through WhatsApp.

**Coming Soon**

### ✉️ SMS Support

Receive health information without internet access.

**Coming Soon**

### 🗣️ More Indian Languages

Bengali, Tamil, Telugu, Marathi and more.

**Coming Soon**

### 📍 Location-Based Alerts

Receive relevant alerts for your area.

**Coming Soon**

### 👨‍⚕️ Health Worker Connect

Connect with verified health workers.

**Coming Soon**

### 🔔 Vaccination Reminders

Never forget an important vaccination milestone.

**Coming Soon**

### 🏛️ Government Health Data

Connect with verified public-health data sources.

**Coming Soon**

These should look intentionally disabled/future-facing, but polished.

---

# 18. LANGUAGE EXPERIENCE

Language switching should be obvious.

Top right:

**EN | हिन्दी**

When Hindi is selected:

* Navigation labels can switch
* Chat examples switch
* Suggested questions switch
* AI response switches

Do not make the entire UI depend on perfect translation for the prototype.

English and Hindi are enough for the first version.

---

# 19. EMERGENCY UX

Create a distinct but calm emergency treatment.

If the user enters:

> "I can't breathe"

or another clearly defined emergency phrase:

Show a prominent warning card:

### 🚨 Please Seek Immediate Medical Help

> This may require urgent medical attention.

Buttons:

**Find Emergency Care**

**Call Emergency Services**

For the prototype these can be non-functional/demo buttons.

Do NOT make the interface alarmist.

---

# 20. PROFILE / SETTINGS

Add a simple settings screen.

### Preferences

Language
`English`

Region
`Statewide`

Notifications
`Coming Soon`

Voice
`Coming Soon`

Privacy

About Swasthya Saathi

Include:

> This application provides health-awareness information and does not replace professional medical advice.

---

# 21. VISUAL DESIGN SYSTEM

Use:

### Typography

Use a modern, highly readable font such as:

* Inter
* Manrope
* DM Sans

Headings should be bold but not huge.

Body text should be highly readable.

---

### Spacing

Use generous whitespace.

Cards should not be cramped.

Use:

* 8px base spacing system
* 16–24px card padding
* 24–40px section spacing

---

### Cards

Use:

* White surfaces
* Very subtle borders
* Small shadows
* 12–18px radius

Avoid giant rounded cards everywhere.

---

# 22. ACCESSIBILITY

This is especially important because the target audience includes users with lower digital literacy.

Use:

* Large readable text
* High contrast
* Clear icons
* Short sentences
* Simple terminology
* Large tap targets
* Obvious buttons
* No information overload

Never rely only on color to communicate meaning.

For example:

Do not use only:

🔴 Red = danger

Also include:

**HIGH RISK**

---

# 23. RESPONSIVE DESIGN

The UI must work on:

* Desktop
* Tablet
* Mobile

On mobile:

* Use bottom navigation
* Stack cards
* Keep chatbot input fixed at bottom
* Avoid horizontal scrolling
* Make buttons easy to tap

---

# 24. MICROINTERACTIONS

Use subtle animations:

* Card hover
* Button press
* Chat message appearance
* Loading indicator
* Page transitions
* Alert appearance

Do NOT use excessive animations.

Healthcare should feel calm.

---

# 25. EMPTY / LOADING / ERROR STATES

Every major section should have polished states.

Example:

### AI Loading

> Swasthya Saathi is checking verified health information...

### No alerts

> You're all caught up. No active awareness signals for this region.

### Knowledge unavailable

> I don't have enough verified information to answer that safely.

### Translation unavailable

> We couldn't translate this message right now. Try English or Hindi.

---

# 26. DEMO DATA

Use realistic but clearly fictional/demo data.

Example:

**1,248 queries**

**324 fever queries**

**+32%**

**District X**

Do not use real patient data.

Label dashboard data:

**Demo Data**

when appropriate.

---

# 27. IMPORTANT PRODUCT PRINCIPLE

The product must communicate three layers:

### 👤 For Citizens

**Get reliable health information.**

### 👨‍👩‍👧 For Families

**Learn prevention and vaccination awareness.**

### 🏥 For Public Health Authorities

**See aggregated community health-awareness signals.**

This is what differentiates the product from a generic AI chatbot.

---

# 28. DO NOT OVERBUILD

The current prototype only needs the following functionality to actually work:

1. Navigation
2. Home
3. AI chat simulation / basic chatbot
4. Hindi/English toggle
5. Disease information
6. Symptom information
7. Prevention information
8. Vaccination information
9. Health alerts
10. Basic admin dashboard

Everything else can be:

**Coming Soon**

Do NOT spend time implementing:

* Real WhatsApp
* Real SMS
* Real government APIs
* Advanced outbreak prediction
* Voice AI
* Health-worker networking
* Complex authentication

unless the core UI is already excellent.

---

# 29. FINAL VISUAL GOAL

The finished application should look like a combination of:

**Modern healthcare app + multilingual AI assistant + public-health awareness platform**

NOT:

**Hackathon dashboard + developer control panel + generic ChatGPT clone**

The first impression should be:

> "This looks like a real healthcare product."

Not:

> "This looks like a technical prototype."

---

# 30. FINAL SCREEN HIERARCHY

Prioritize the screens in this order:

1. **Home**
2. **Ask AI**
3. **Symptoms**
4. **Disease Awareness**
5. **Vaccination**
6. **Preventive Care**
7. **Health Alerts**
8. **Coming Soon**
9. **Admin Dashboard**
10. **Settings**

Make the first 7 feel completely polished.

The Admin Dashboard should feel like a separate professional workspace.

---

# FINAL INSTRUCTION TO THE UI GENERATOR

**Redesign the existing application rather than simply adding more cards to the current layout.**

Remove the developer/hackathon appearance.

Do not use "Phase 1 / Phase 2 / Phase 3 / Phase 4" as primary navigation.

Do not make the architecture or implementation status visible to normal users.

Build a cohesive healthcare product around the **Swasthya Saathi** brand.

Prioritize:

**clarity → trust → accessibility → visual polish → useful information → AI interaction**

Keep the prototype functional but simple.

Use realistic demo content.

Make advanced capabilities visible through a polished **Coming Soon** section rather than pretending they are implemented.

The final result should be **attractive enough for a hackathon presentation, simple enough for rural/semi-urban users, and credible enough to look like the foundation of a real public-health product.**
