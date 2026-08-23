export const phaseRoadmap = {
  1: {
    status: "Delivered",
    title: "Awareness Prototype",
    summary:
      "Static disease awareness assistant with curated content, safe escalation, and quick public health guidance."
  },
  2: {
    status: "Delivered",
    title: "AI Assistant and Governance",
    summary:
      "Local API-backed assistant grounded in reviewed public health content, source labels, and administrator approvals."
  },
  3: {
    status: "Delivered",
    title: "Public Health Intelligence",
    summary:
      "Anonymized query trends, coarse regional dashboards, and campaign insights for public health teams."
  },
  4: {
    status: "Current",
    title: "Deployment and Integrations",
    summary:
      "Installable offline shell, deployment packaging, official resource links, exports, and production readiness."
  }
};

export const quickPrompts = [
  "I have fever and body pain",
  "How can I prevent dengue?",
  "What are TB warning signs?",
  "Diarrhea after unsafe water",
  "When is fever urgent?",
  "Heat stroke symptoms"
];

export const emergencyKeywords = [
  "breathless",
  "can't breathe",
  "cant breathe",
  "cannot breathe",
  "can t breathe",
  "difficulty breathing",
  "chest pain",
  "confusion",
  "unconscious",
  "seizure",
  "blue lips",
  "severe bleeding",
  "stiff neck",
  "severe dehydration",
  "not passing urine",
  "very drowsy",
  "persistent vomiting",
  "blood in stool",
  "pregnant"
];

export const diseases = [
  {
    id: "dengue",
    name: "Dengue",
    category: "Vector-borne",
    keywords: ["dengue", "mosquito", "fever", "body pain", "joint pain", "rash", "platelet", "bleeding"],
    symptoms: ["Sudden high fever", "Severe headache", "Pain behind eyes", "Joint and muscle pain", "Skin rash"],
    prevention: ["Remove stagnant water", "Use mosquito nets or repellents", "Wear long sleeves", "Cover water containers"],
    care: "Drink fluids and consult a clinician if fever is high, persistent, or accompanied by weakness.",
    urgent: ["Bleeding from nose or gums", "Severe abdominal pain", "Repeated vomiting", "Extreme drowsiness or restlessness"],
    reviewStatus: "approved",
    reviewer: "Public health content lead",
    sources: [
      { id: "NVBDCP-DENGUE", label: "National vector-borne disease public guidance" },
      { id: "WHO-DENGUE", label: "WHO dengue fact guidance" }
    ],
    publicMessage:
      "Dengue awareness focuses on mosquito control, hydration, and early care for warning signs."
  },
  {
    id: "malaria",
    name: "Malaria",
    category: "Vector-borne",
    keywords: ["malaria", "mosquito", "chills", "sweating", "fever cycle", "fever"],
    symptoms: ["Fever with chills", "Sweating", "Headache", "Fatigue", "Body aches"],
    prevention: ["Use insecticide-treated nets", "Avoid mosquito bites", "Drain stagnant water", "Seek testing for fever in endemic areas"],
    care: "A fever with chills in a malaria-prone area needs testing and clinician-guided treatment.",
    urgent: ["Confusion", "Seizures", "Severe weakness", "Breathing difficulty", "Yellowing of eyes"],
    reviewStatus: "approved",
    reviewer: "Public health content lead",
    sources: [
      { id: "NVBDCP-MALARIA", label: "National malaria prevention guidance" },
      { id: "WHO-MALARIA", label: "WHO malaria fact guidance" }
    ],
    publicMessage:
      "Malaria is preventable and treatable, but fever with chills should be tested early in risk areas."
  },
  {
    id: "covid",
    name: "COVID-19 and Flu-like Illness",
    category: "Respiratory",
    keywords: ["covid", "corona", "flu", "cough", "cold", "sore throat", "loss of smell", "breathing"],
    symptoms: ["Fever", "Cough", "Sore throat", "Runny nose", "Fatigue", "Loss of smell or taste"],
    prevention: ["Stay home when ill", "Improve ventilation", "Wear a mask in crowded spaces when symptomatic", "Wash hands"],
    care: "Rest, fluids, and monitoring are important. Older adults and people with chronic illness should seek medical advice early.",
    urgent: ["Difficulty breathing", "Chest pain", "Blue lips", "Confusion", "Oxygen levels falling if measured"],
    reviewStatus: "approved",
    reviewer: "Respiratory illness reviewer",
    sources: [
      { id: "MOHFW-RESP", label: "Ministry respiratory illness advisories" },
      { id: "WHO-COVID", label: "WHO respiratory infection guidance" }
    ],
    publicMessage:
      "Respiratory illness awareness includes isolation when sick, ventilation, masking in risk settings, and urgent care for breathing difficulty."
  },
  {
    id: "tb",
    name: "Tuberculosis",
    category: "Respiratory",
    keywords: ["tb", "tuberculosis", "long cough", "coughing blood", "night sweats", "weight loss"],
    symptoms: ["Cough lasting more than two weeks", "Fever", "Night sweats", "Weight loss", "Coughing blood"],
    prevention: ["Cover coughs", "Improve ventilation", "Complete prescribed treatment", "Encourage close contacts to get screened"],
    care: "A cough lasting over two weeks should be evaluated by a health facility for TB screening.",
    urgent: ["Coughing blood", "Severe breathlessness", "Very high fever", "Severe weakness"],
    reviewStatus: "approved",
    reviewer: "Respiratory illness reviewer",
    sources: [
      { id: "NTEP-TB", label: "National TB elimination programme awareness guidance" },
      { id: "WHO-TB", label: "WHO tuberculosis fact guidance" }
    ],
    publicMessage:
      "TB can be cured with proper treatment. Early screening protects families and communities."
  },
  {
    id: "diarrhea",
    name: "Diarrheal Disease",
    category: "Water-borne",
    keywords: ["diarrhea", "loose motion", "vomiting", "unsafe water", "stomach", "dehydration", "cholera"],
    symptoms: ["Loose stools", "Vomiting", "Stomach cramps", "Thirst", "Weakness"],
    prevention: ["Drink safe water", "Wash hands with soap", "Eat freshly cooked food", "Use toilets safely"],
    care: "Use oral rehydration solution and seek care if dehydration signs appear, especially in children and older adults.",
    urgent: ["Blood in stool", "Severe dehydration", "Repeated vomiting", "No urine", "Lethargy in a child"],
    reviewStatus: "approved",
    reviewer: "Water and sanitation reviewer",
    sources: [
      { id: "WHO-DIARRHEA", label: "WHO diarrhoeal disease guidance" },
      { id: "UNICEF-ORS", label: "UNICEF oral rehydration awareness guidance" }
    ],
    publicMessage:
      "Diarrheal disease awareness centers on safe water, handwashing, food hygiene, and quick rehydration."
  },
  {
    id: "heatstroke",
    name: "Heat Exhaustion and Heat Stroke",
    category: "Heat-related",
    keywords: ["heat", "heat stroke", "sun", "dehydration", "dizzy", "faint", "summer"],
    symptoms: ["Heavy sweating", "Dizziness", "Headache", "Muscle cramps", "Nausea"],
    prevention: ["Drink water often", "Avoid peak afternoon heat", "Wear light clothing", "Check on children, older adults, and outdoor workers"],
    care: "Move to a cooler place, loosen clothing, sip water if awake, and cool the body with wet cloths.",
    urgent: ["Confusion", "Fainting", "Very high body temperature", "Not sweating despite heat", "Seizure"],
    reviewStatus: "approved",
    reviewer: "Climate health reviewer",
    sources: [
      { id: "NDMA-HEAT", label: "National heat action public guidance" },
      { id: "WHO-HEAT", label: "WHO heat-health awareness guidance" }
    ],
    publicMessage:
      "Heat illness can become dangerous quickly. Confusion or fainting during heat exposure is an emergency warning sign."
  }
];

export const fallbackAdvice = {
  en: {
    title: "I can help with disease awareness.",
    body:
      "Tell me about symptoms, prevention, warning signs, or a disease name such as dengue, malaria, TB, COVID, diarrhea, or heat stroke.",
    safety:
      "If the person has severe symptoms, worsening condition, or belongs to a high-risk group, seek medical care promptly."
  },
  hi: {
    title: "Main disease awareness me madad kar sakta hoon.",
    body:
      "Aap symptoms, prevention, warning signs, ya disease ka naam likh sakte hain, jaise dengue, malaria, TB, COVID, diarrhea, ya heat stroke.",
    safety:
      "Agar symptoms severe hain, condition bigad rahi hai, ya patient high-risk group me hai, turant medical care lein."
  }
};
