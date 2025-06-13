const sampleTest = [
  { name: "Fasting Blood Sugar", relevance: "Diabetes", price: 60, popular: true },
  { name: "Post Lunch Blood Sugar", relevance: "Diabetes", price: 60 },
  { name: "Random Blood Sugar", relevance: "Diabetes", price: 60 },
  { name: "Erythrocyte Sedimentation Rate", relevance: "Blood", price: 110 },
  { name: "Antistreptolysin O", relevance: "Blood", price: 300 },
  { name: "Complete Blood Count", relevance: "Blood", price: 400, popular: true },
  { name: "C-Reactive Protein", relevance: "Blood", price: 450 },
  { name: "Typhoid Test", relevance: "Blood", price: 300 },
  { name: "Blood Group", relevance: "Blood", price: 100 },
  { name: "Blood Urea", relevance: "Kidney", price: 200 },
  { name: "Serum Creatinine", relevance: "Kidney", price: 200, popular: true },
  { name: "Electrolytes", relevance: "Kidney", price: 500 },
  { name: "SR Uric Acid ", relevance: "Kidney", price: 300 },
  { name: "SR Calcium", relevance: "Blood", price: 250 },
  { name: "Liver Function Tests (LFT)", relevance: "Liver", price: 550 },
  { name: "Lactate Dehydrogenase", relevance: "Liver", price: 500 },
  { name: "Lipid Profile", relevance: "Blood", price: 500, popular: true },
  { name: "TSH (Thyroid Stimulating Hormone)", relevance: "Thyroid", price: 300, popular: true },
  { name: "Thyroid Profile", relevance: "Thyroid", price: 550 },
  { name: "HIV", relevance: "Infection", price: 500 },
  { name: "Hepatitis B", relevance: "Infection", price: 450 },
  { name: "Syphilis", relevance: "Infection", price: 450 },
  { name: "Hepatitis C", relevance: "Infection", price: 550 },
  { name: "Complete Urine Examination", relevance: "Kidney", price: 100 },
  { name: "HB Electrophoresis", relevance: "Blood", price: 1200 },
  { name: "D-Dimer ", relevance: "Blood", price: 1500 },
  { name: "Ultrasound Abdomen", relevance: "Stomach", price: 1100 },
  { name: "Ferritin ", relevance: "Blood", price: 800 },
  { name: "Lactate Dehydrogenase", relevance: "Blood", price: 500 },
  { name: "Vitamin D3", relevance: "Blood", price: 600 }
];

const samplePack = [
  {
    name: "Surgical Profile (Minor)",
    relevance: ["blood", "kidney", "thyroid", "infection", "lungs"],
    price: 1850,
    popular: true,
    tests: [
      "Complete Blood Picture",
      "Erythrocyte Sedimentation Rate",
      "Bleeding Time Clotting Time",
      "Blood Grouping and RH Typing",
      "Complete Urine Examination",
      "Random Blood Sugar",
      "Blood Urea",
      "Serum Creatinine",
      "Thyroid Stimulating Hormone (TSH)",
      "HIV I & II",
      "HBsAg",
      "HCV",
      "VDRL",
      "ECG",
      "Chest X-Ray (PA View)"
    ]
  },
  {
    name: "Complete Cardiac Profile",
    relevance: ["heart", "blood", "kidney", "thyroid", "lungs"],
    price: 3300,
    popular: true,
    tests: [
      "CBP",
      "Urine Examination (CUE)",
      "Random Blood Sugar",
      "Blood Urea",
      "Serum Creatinine",
      "Lipid Profile",
      "SGOT",
      "Electrolytes",
      "LDH",
      "TSH",
      "CPK",
      "CPKMB",
      "CRP",
      "Chest X-Ray",
      "ECG",
      "2D Echo"
    ]
  },
  {
    name: "Fever Profile",
    relevance: ["infection", "blood"],
    price: 1000,
    tests: [
      "Complete Haemogram",
      "ESR",
      "Urine Examination",
      "Widal Test",
      "Blood Test for Parasite & P.V.",
      "CRP"
    ]
  },
  {
    name: "Diabetic Package",
    relevance: ["diabetes", "kidney", "blood"],
    price: 1400,
    popular: true,
    tests: [
      "Complete Blood Picture",
      "Complete Urine Examination",
      "Fasting Blood Sugar",
      "Post Lunch Blood Sugar",
      "HbA1c",
      "Lipid Profile",
      "Serum Creatinine"
    ]
  },
  {
    name: "Antenatal Profile",
    relevance: ["blood", "diabetes", "thyroid", "infection"],
    price: 1800,
    tests: [
      "Complete Blood Picture",
      "BT CT",
      "Urine Examination",
      "Blood Grouping and RH Typing",
      "Random Blood Sugar",
      "TSH",
      "HIV I & II",
      "HBsAg",
      "HCV",
      "VDRL"
    ]
  },
  {
    name: "Well Women Check-up",
    relevance: ["thyroid", "blood", "liver", "stomach", "lungs"],
    price: 1800,
    tests: [
      "Complete Haemogram",
      "ESR",
      "Urine Examination",
      "Stool Routine",
      "RBS",
      "Serum Creatinine",
      "TSH",
      "Chest X-Ray",
      "Ultrasound Abdomen & Pelvis",
      "Pap Smear"
    ]
  },
  {
    name: "Well Baby Checkup",
    relevance: ["thyroid", "infection", "blood", "kidney"],
    price: 800,
    tests: [
      "Haemogram",
      "Blood Grouping and RH Typing",
      "Urine Examination",
      "RBS",
      "Serum Creatinine",
      "TSH",
      "CRP"
    ]
  },
  {
    name: "Child Growth & Development Profile",
    relevance: ["thyroid", "kidney", "blood"],
    price: 1200,
    tests: [
      "Haemogram",
      "Blood Grouping and RH Typing",
      "Urine Examination",
      "RBS",
      "Serum Creatinine",
      "Vitamin D3",
      "Thyroid Profile"
    ]
  },
  {
    name: "Liver Checkup",
    relevance: ["liver", "infection"],
    price: 999,
    popular: true,
    tests: [
      "Ultrasound Abdomen",
      "Liver Function Test",
      "HBsAg",
      "HCV"
    ]
  },
  {
    name: "Executive Health Checkup",
    relevance: ["blood", "diabetes", "thyroid", "liver", "lungs", "kidney", "stomach"],
    price: 3500,
    popular: true,
    tests: [
      "Haemogram",
      "ESR",
      "Stool Routine",
      "Fasting Blood Sugar",
      "Post Lunch Blood Sugar",
      "Urine Examination",
      "Serum Creatinine",
      "Serum Electrolytes",
      "LFT",
      "Lipid Profile",
      "TSH",
      "Ultrasound Abdomen & Pelvis",
      "HBsAg",
      "HCV",
      "Chest X-Ray",
      "ECG",
      "PSA for Male"
    ]
  },
  {
    name: "Master Health Checkup",
    relevance: ["blood", "diabetes", "thyroid", "liver", "lungs", "stomach"],
    price: 2900,
    popular: true,
    tests: [
      "Haemogram",
      "ESR",
      "Urine Examination",
      "Stool Routine",
      "Fasting Blood Sugar",
      "Post Lunch Blood Sugar",
      "Serum Creatinine",
      "Uric Acid",
      "Lipid Profile",
      "LFT",
      "HbA1c",
      "TSH",
      "Chest X-Ray",
      "Ultrasound Abdomen & Pelvis",
      "PSA (Male)",
      "Pap Smear (Women)"
    ]
  },
  {
    name: "Health Checkup for Senior Citizens",
    relevance: ["blood", "diabetes", "thyroid", "kidney", "liver", "lungs", "stomach"],
    price: 3500,
    tests: [
      "Haemogram",
      "ESR",
      "Stool for Occult Blood",
      "Urine Examination",
      "Fasting Blood Sugar",
      "Post Lunch Blood Sugar",
      "Serum Creatinine",
      "Serum Calcium",
      "Lipid Profile",
      "LFT",
      "Electrolytes",
      "TSH",
      "X-Ray Chest",
      "PSA for Male",
      "Pap Smear for Female",
      "Ultrasound Abdomen & Pelvis"
    ]
  },
  {
    name: "Medical Profile (Major)",
    relevance: ["blood", "diabetes", "thyroid", "infection", "lungs"],
    price: 3300,
    tests: [
      "Complete Blood Picture",
      "ESR",
      "BT CT",
      "Blood Grouping and RH Typing",
      "Urine Examination",
      "Fasting Blood Sugar",
      "Post Lunch Blood Sugar",
      "Serum Creatinine",
      "TSH",
      "PTINR",
      "APTT",
      "HIV I & II",
      "HBsAg",
      "HCV",
      "VDRL",
      "ECG",
      "X-Ray Chest PA View"
    ]
  }
];



export { sampleTest, samplePack };
