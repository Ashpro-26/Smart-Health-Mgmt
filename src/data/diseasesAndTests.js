const diseasesAndTests = {
  "Cardiovascular Diseases": {
    description: "Conditions affecting the heart and blood vessels, including heart attack, coronary artery disease, arrhythmia, and heart failure.",
    tests: [
      {
        name: "Electrocardiogram (ECG/EKG)",
        description: "Records the electrical activity of the heart",
        normalRange: "Normal sinus rhythm",
        frequency: "As needed for symptoms"
      },
      {
        name: "Echocardiogram",
        description: "Ultrasound of the heart to assess structure and function",
        normalRange: "Normal ejection fraction (55-70%)",
        frequency: "Annually for monitoring"
      },
      {
        name: "Stress Test (Treadmill Test)",
        description: "Evaluates heart function during exercise",
        normalRange: "No ischemic changes",
        frequency: "As needed for symptoms"
      },
      {
        name: "Holter Monitor (24-48hr ECG)",
        description: "Continuous heart rhythm monitoring",
        normalRange: "No significant arrhythmias",
        frequency: "As needed for symptoms"
      },
      {
        name: "Cardiac Enzymes (Troponin, CK-MB)",
        description: "Blood tests for heart muscle damage",
        normalRange: "Troponin < 0.04 ng/mL",
        frequency: "During suspected heart attack"
      },
      {
        name: "Lipid Profile",
        description: "Cholesterol and triglyceride levels",
        normalRange: "LDL < 100 mg/dL, HDL > 40 mg/dL",
        frequency: "Annually"
      },
      {
        name: "Chest X-ray",
        description: "Imaging of heart and lungs",
        normalRange: "Normal heart size and lung fields",
        frequency: "As needed"
      },
      {
        name: "Basic/Comprehensive Metabolic Panel",
        description: "General health assessment",
        normalRange: "Within reference ranges",
        frequency: "Annually"
      }
    ]
  },
  "Neurological Disorders": {
    description: "Conditions affecting the brain, spinal cord, and nerves, including stroke, epilepsy, brain tumor, multiple sclerosis, and meningitis.",
    tests: [
      {
        name: "MRI or CT Scan (Brain)",
        description: "Detailed brain imaging",
        normalRange: "No structural abnormalities",
        frequency: "As needed for symptoms"
      },
      {
        name: "Electroencephalogram (EEG)",
        description: "Brain wave activity recording",
        normalRange: "Normal brain wave patterns",
        frequency: "As needed for symptoms"
      },
      {
        name: "Lumbar Puncture (Spinal Tap)",
        description: "Cerebrospinal fluid analysis",
        normalRange: "Normal pressure and composition",
        frequency: "As needed for diagnosis"
      },
      {
        name: "Blood Tests (CBC, inflammatory markers)",
        description: "General health and inflammation markers",
        normalRange: "Within reference ranges",
        frequency: "As needed"
      }
    ]
  },
  "Respiratory Diseases": {
    description: "Conditions affecting the lungs and breathing, including pneumonia, tuberculosis, asthma, COPD, and lung cancer.",
    tests: [
      {
        name: "Chest X-ray",
        description: "Basic lung imaging",
        normalRange: "Clear lung fields",
        frequency: "As needed"
      },
      {
        name: "Pulmonary Function Test (PFT)",
        description: "Lung function assessment",
        normalRange: "FEV1/FVC > 0.7",
        frequency: "Annually for monitoring"
      },
      {
        name: "Arterial Blood Gas (ABG)",
        description: "Oxygen and carbon dioxide levels",
        normalRange: "pH 7.35-7.45, pO2 > 80 mmHg",
        frequency: "As needed"
      },
      {
        name: "Sputum Test / Culture",
        description: "Infection detection",
        normalRange: "No pathogens",
        frequency: "During infection"
      },
      {
        name: "Mantoux Test (for TB)",
        description: "Tuberculosis screening",
        normalRange: "Negative",
        frequency: "As needed"
      },
      {
        name: "CT Scan (Chest)",
        description: "Detailed lung imaging",
        normalRange: "No abnormalities",
        frequency: "As needed"
      }
    ]
  },
  "Diabetes": {
    description: "Metabolic disorder affecting blood sugar regulation.",
    tests: [
      {
        name: "HbA1c",
        description: "Average blood sugar over 3 months",
        normalRange: "< 5.7%",
        frequency: "Every 3-6 months"
      },
      {
        name: "Fasting Blood Sugar (Glucose)",
        description: "Blood sugar level after fasting",
        normalRange: "70-99 mg/dL",
        frequency: "Regularly"
      },
      {
        name: "Basic Metabolic Panel",
        description: "General health assessment",
        normalRange: "Within reference ranges",
        frequency: "Regularly"
      },
      {
        name: "Urine Microalbumin",
        description: "Kidney function in diabetics",
        normalRange: "< 30 mg/g",
        frequency: "Annually"
      }
    ]
  },
  "Cancer": {
    description: "Various types of cancer requiring specific diagnostic approaches.",
    tests: [
      {
        name: "CT Scan / MRI / PET Scan",
        description: "Tumor detection and staging",
        normalRange: "No suspicious masses",
        frequency: "As needed"
      },
      {
        name: "Biopsy",
        description: "Tissue confirmation",
        normalRange: "No malignant cells",
        frequency: "As needed"
      },
      {
        name: "Tumor Markers",
        description: "Blood tests for specific cancers",
        normalRange: "Within reference ranges",
        frequency: "As needed"
      },
      {
        name: "Mammogram",
        description: "Breast cancer screening",
        normalRange: "No suspicious findings",
        frequency: "Annually after 40"
      },
      {
        name: "BRCA1/2 Testing",
        description: "Genetic risk assessment",
        normalRange: "No mutations",
        frequency: "Once if indicated"
      }
    ]
  },
  "Liver Diseases": {
    description: "Conditions affecting the liver, including hepatitis, cirrhosis, and fatty liver disease.",
    tests: [
      {
        name: "Liver Function Tests (LFTs)",
        description: "Liver enzyme and protein levels",
        normalRange: "Within reference ranges",
        frequency: "Regularly"
      },
      {
        name: "Ultrasound (Abdomen)",
        description: "Liver imaging",
        normalRange: "Normal liver structure",
        frequency: "As needed"
      },
      {
        name: "Hepatitis B/C Tests",
        description: "Viral infection detection",
        normalRange: "Negative",
        frequency: "As needed"
      },
      {
        name: "CT or MRI (Liver)",
        description: "Detailed liver imaging",
        normalRange: "No abnormalities",
        frequency: "As needed"
      }
    ]
  },
  "Kidney Diseases": {
    description: "Conditions affecting kidney function, including acute or chronic kidney disease and kidney stones.",
    tests: [
      {
        name: "Kidney Function Tests",
        description: "BUN, Creatinine, eGFR",
        normalRange: "eGFR > 60 mL/min",
        frequency: "Regularly"
      },
      {
        name: "Urinalysis",
        description: "Urine composition analysis",
        normalRange: "No protein, blood, or infection",
        frequency: "Regularly"
      },
      {
        name: "Ultrasound (Kidneys)",
        description: "Kidney imaging",
        normalRange: "Normal size and structure",
        frequency: "As needed"
      },
      {
        name: "CT Scan (Abdomen)",
        description: "Detailed imaging for stones",
        normalRange: "No stones or abnormalities",
        frequency: "As needed"
      },
      {
        name: "Urine Microalbumin",
        description: "Early kidney damage detection",
        normalRange: "< 30 mg/g",
        frequency: "Regularly"
      }
    ]
  },
  "Thyroid Disorders": {
    description: "Conditions affecting thyroid function, including hypothyroidism, hyperthyroidism, and thyroid nodules.",
    tests: [
      {
        name: "Thyroid Function Tests",
        description: "TSH, T3, T4 levels",
        normalRange: "TSH 0.4-4.0 mIU/L",
        frequency: "Regularly"
      },
      {
        name: "Ultrasound (Neck)",
        description: "Thyroid imaging",
        normalRange: "Normal size and structure",
        frequency: "As needed"
      },
      {
        name: "Thyroid Antibodies",
        description: "Autoimmune thyroid disease markers",
        normalRange: "Negative",
        frequency: "Once if indicated"
      }
    ]
  },
  "Bone and Joint Diseases": {
    description: "Conditions affecting bones and joints, including osteoporosis, arthritis, and fractures.",
    tests: [
      {
        name: "DEXA Scan",
        description: "Bone density measurement",
        normalRange: "T-score > -1.0",
        frequency: "Every 2 years"
      },
      {
        name: "X-ray / MRI",
        description: "Joint and bone imaging",
        normalRange: "No fractures or abnormalities",
        frequency: "As needed"
      },
      {
        name: "CRP/ESR",
        description: "Inflammation markers",
        normalRange: "Within reference ranges",
        frequency: "As needed"
      },
      {
        name: "Rheumatoid Factor, ANA",
        description: "Autoimmune markers",
        normalRange: "Negative",
        frequency: "Once if indicated"
      }
    ]
  },
  "Infectious Diseases": {
    description: "Various infections including COVID-19, HIV, dengue, sepsis, etc.",
    tests: [
      {
        name: "CBC",
        description: "Complete blood count",
        normalRange: "Within reference ranges",
        frequency: "As needed"
      },
      {
        name: "Blood Culture",
        description: "Sepsis detection",
        normalRange: "No growth",
        frequency: "During suspected sepsis"
      },
      {
        name: "PCR Tests",
        description: "Viral detection",
        normalRange: "Negative",
        frequency: "As needed"
      },
      {
        name: "ELISA",
        description: "Antibody detection",
        normalRange: "Negative",
        frequency: "As needed"
      },
      {
        name: "Rapid Antigen/Antibody Tests",
        description: "Quick infection screening",
        normalRange: "Negative",
        frequency: "As needed"
      },
      {
        name: "CRP/ESR",
        description: "Inflammation markers",
        normalRange: "Within reference ranges",
        frequency: "As needed"
      }
    ]
  },
  "Prenatal & Genetic Disorders": {
    description: "Conditions affecting pregnancy and genetic health, including Down syndrome, neural tube defects, and inherited conditions.",
    tests: [
      {
        name: "Prenatal Screening",
        description: "Ultrasound and blood tests",
        normalRange: "Normal development",
        frequency: "Regularly during pregnancy"
      },
      {
        name: "Karyotyping",
        description: "Chromosomal analysis",
        normalRange: "Normal karyotype",
        frequency: "Once if indicated"
      },
      {
        name: "Non-Invasive Prenatal Testing",
        description: "Fetal DNA screening",
        normalRange: "Low risk",
        frequency: "Once during pregnancy"
      },
      {
        name: "Genetic Panel / BRCA Tests",
        description: "Inherited cancer risk assessment",
        normalRange: "No mutations",
        frequency: "Once if indicated"
      }
    ]
  }
};

export default diseasesAndTests; 