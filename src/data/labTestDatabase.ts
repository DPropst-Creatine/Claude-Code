import { LabTestInfo } from '../types'

export const labTestDatabase: Record<string, LabTestInfo> = {
  // Complete Blood Count (CBC)
  'hemoglobin': {
    name: 'Hemoglobin',
    commonNames: ['Hgb', 'Hb'],
    description: 'Hemoglobin is a protein in red blood cells that carries oxygen throughout your body.',
    purpose: 'This test measures how well your blood can carry oxygen to your organs and tissues.',
    normalRange: '12-16 g/dL (women), 14-18 g/dL (men)',
    highMeaning: 'Higher levels may indicate dehydration, lung disease, or living at high altitude.',
    lowMeaning: 'Lower levels may indicate anemia, meaning your body may not be getting enough oxygen.',
    medlinePlusUrl: 'https://medlineplus.gov/lab-tests/hemoglobin-test/',
    category: 'blood'
  },
  'hematocrit': {
    name: 'Hematocrit',
    commonNames: ['Hct', 'HCT'],
    description: 'Hematocrit measures the percentage of your blood that is made up of red blood cells.',
    purpose: 'This shows how much of your blood is red blood cells versus the liquid part (plasma).',
    normalRange: '36-44% (women), 41-50% (men)',
    highMeaning: 'Higher levels may indicate dehydration or certain lung or heart conditions.',
    lowMeaning: 'Lower levels may suggest anemia or that your body is not making enough red blood cells.',
    medlinePlusUrl: 'https://medlineplus.gov/lab-tests/hematocrit-test/',
    category: 'blood'
  },
  'wbc': {
    name: 'White Blood Cell Count',
    commonNames: ['WBC', 'Leukocytes'],
    description: 'White blood cells are part of your immune system and help fight infections.',
    purpose: 'This test measures how many white blood cells you have to help detect infections or immune problems.',
    normalRange: '4,000-11,000 cells/mcL',
    highMeaning: 'Higher levels may indicate an infection, inflammation, or stress on your body.',
    lowMeaning: 'Lower levels may suggest a weakened immune system or certain medical conditions.',
    medlinePlusUrl: 'https://medlineplus.gov/lab-tests/white-blood-count-wbc/',
    category: 'blood'
  },
  'platelets': {
    name: 'Platelet Count',
    commonNames: ['PLT', 'Thrombocytes'],
    description: 'Platelets are tiny blood cells that help your blood clot to stop bleeding.',
    purpose: 'This measures if you have enough platelets to prevent excessive bleeding or too many that could cause clots.',
    normalRange: '150,000-400,000 per mcL',
    highMeaning: 'Higher levels may increase the risk of blood clots.',
    lowMeaning: 'Lower levels may lead to easy bruising or bleeding problems.',
    medlinePlusUrl: 'https://medlineplus.gov/lab-tests/platelet-tests/',
    category: 'blood'
  },

  // Metabolic Panel
  'glucose': {
    name: 'Blood Glucose',
    commonNames: ['Blood Sugar', 'Fasting Glucose'],
    description: 'Glucose is sugar in your blood that your body uses for energy.',
    purpose: 'This test measures blood sugar levels to screen for diabetes or monitor how well diabetes is controlled.',
    normalRange: '70-100 mg/dL (fasting)',
    highMeaning: 'Higher levels may indicate diabetes or pre-diabetes, meaning your body has trouble regulating blood sugar.',
    lowMeaning: 'Lower levels (hypoglycemia) can cause dizziness, confusion, or fainting.',
    medlinePlusUrl: 'https://medlineplus.gov/lab-tests/blood-glucose-test/',
    category: 'metabolic'
  },
  'hba1c': {
    name: 'Hemoglobin A1c',
    commonNames: ['HbA1c', 'A1C', 'Glycated Hemoglobin'],
    description: 'HbA1c shows your average blood sugar level over the past 2-3 months.',
    purpose: 'This test helps diagnose diabetes and monitor how well blood sugar has been controlled over time.',
    normalRange: 'Below 5.7%',
    highMeaning: '5.7-6.4% suggests pre-diabetes; 6.5% or higher indicates diabetes. Higher levels mean poorer blood sugar control.',
    lowMeaning: 'Very low levels are uncommon but may occur with certain blood disorders.',
    medlinePlusUrl: 'https://medlineplus.gov/lab-tests/hemoglobin-a1c-hba1c-test/',
    category: 'metabolic'
  },
  'sodium': {
    name: 'Sodium',
    commonNames: ['Na', 'Na+'],
    description: 'Sodium is an electrolyte that helps control the amount of water in your body and supports nerve and muscle function.',
    purpose: 'This test checks if your sodium levels are balanced, which is important for many body functions.',
    normalRange: '136-145 mEq/L',
    highMeaning: 'Higher levels may indicate dehydration or kidney problems.',
    lowMeaning: 'Lower levels may be caused by drinking too much water, certain medications, or health conditions.',
    medlinePlusUrl: 'https://medlineplus.gov/lab-tests/sodium-blood-test/',
    category: 'metabolic'
  },
  'potassium': {
    name: 'Potassium',
    commonNames: ['K', 'K+'],
    description: 'Potassium is an electrolyte essential for heart rhythm, muscle function, and nerve signals.',
    purpose: 'This test ensures your potassium is at safe levels, which is critical for your heart health.',
    normalRange: '3.5-5.0 mEq/L',
    highMeaning: 'Higher levels can be dangerous and may affect your heart rhythm.',
    lowMeaning: 'Lower levels can cause muscle weakness, cramps, or irregular heartbeat.',
    medlinePlusUrl: 'https://medlineplus.gov/lab-tests/potassium-test/',
    category: 'metabolic'
  },

  // Kidney Function
  'creatinine': {
    name: 'Creatinine',
    commonNames: ['Creat', 'Serum Creatinine'],
    description: 'Creatinine is a waste product from muscle activity that your kidneys normally filter out.',
    purpose: 'This test measures how well your kidneys are working to remove waste from your blood.',
    normalRange: '0.7-1.3 mg/dL (men), 0.6-1.1 mg/dL (women)',
    highMeaning: 'Higher levels may indicate that your kidneys are not filtering waste as effectively as they should.',
    lowMeaning: 'Lower levels are usually not concerning but may relate to low muscle mass.',
    medlinePlusUrl: 'https://medlineplus.gov/lab-tests/creatinine-test/',
    category: 'kidney'
  },
  'bun': {
    name: 'Blood Urea Nitrogen',
    commonNames: ['BUN', 'Urea Nitrogen'],
    description: 'BUN measures the amount of nitrogen in your blood from the waste product urea.',
    purpose: 'This test checks how well your kidneys are removing waste and can also indicate hydration status.',
    normalRange: '7-20 mg/dL',
    highMeaning: 'Higher levels may suggest kidney problems, dehydration, or a high-protein diet.',
    lowMeaning: 'Lower levels are usually not concerning but may indicate liver problems or malnutrition.',
    medlinePlusUrl: 'https://medlineplus.gov/lab-tests/bun-blood-urea-nitrogen/',
    category: 'kidney'
  },
  'egfr': {
    name: 'Estimated Glomerular Filtration Rate',
    commonNames: ['eGFR', 'GFR'],
    description: 'eGFR estimates how much blood your kidneys filter each minute.',
    purpose: 'This is the best overall measure of kidney function and helps detect kidney disease early.',
    normalRange: 'Above 60 mL/min/1.73m²',
    highMeaning: 'Higher values indicate better kidney function.',
    lowMeaning: 'Lower values may indicate chronic kidney disease. Below 60 suggests kidney damage; below 15 is kidney failure.',
    medlinePlusUrl: 'https://medlineplus.gov/lab-tests/egfr-test/',
    category: 'kidney'
  },

  // Liver Function
  'alt': {
    name: 'Alanine Aminotransferase',
    commonNames: ['ALT', 'SGPT'],
    description: 'ALT is an enzyme found mainly in the liver that helps process proteins.',
    purpose: 'This test detects liver damage or inflammation. Elevated levels indicate liver cells are damaged.',
    normalRange: '7-56 units/L',
    highMeaning: 'Higher levels may indicate liver damage from hepatitis, medications, alcohol, or fatty liver disease.',
    lowMeaning: 'Lower levels are usually not concerning.',
    medlinePlusUrl: 'https://medlineplus.gov/lab-tests/alt-blood-test/',
    category: 'liver'
  },
  'ast': {
    name: 'Aspartate Aminotransferase',
    commonNames: ['AST', 'SGOT'],
    description: 'AST is an enzyme found in the liver, heart, and muscles.',
    purpose: 'This test helps detect liver or heart damage. It is often checked alongside ALT.',
    normalRange: '10-40 units/L',
    highMeaning: 'Higher levels may indicate liver damage, heart problems, or muscle injury.',
    lowMeaning: 'Lower levels are usually not concerning.',
    medlinePlusUrl: 'https://medlineplus.gov/lab-tests/ast-test/',
    category: 'liver'
  },
  'bilirubin': {
    name: 'Bilirubin',
    commonNames: ['Total Bilirubin', 'TBIL'],
    description: 'Bilirubin is a yellow substance produced when red blood cells break down.',
    purpose: 'This test checks how well your liver is processing and removing bilirubin. High levels can cause jaundice (yellowing of skin/eyes).',
    normalRange: '0.1-1.2 mg/dL',
    highMeaning: 'Higher levels may indicate liver disease, bile duct blockage, or excessive red blood cell breakdown.',
    lowMeaning: 'Lower levels are usually not concerning.',
    medlinePlusUrl: 'https://medlineplus.gov/lab-tests/bilirubin-blood-test/',
    category: 'liver'
  },

  // Lipid Panel
  'cholesterol': {
    name: 'Total Cholesterol',
    commonNames: ['Total Chol', 'TC'],
    description: 'Cholesterol is a waxy substance your body needs, but too much can clog arteries.',
    purpose: 'This test measures all the cholesterol in your blood to assess heart disease risk.',
    normalRange: 'Below 200 mg/dL',
    highMeaning: 'Higher levels increase your risk of heart disease and stroke.',
    lowMeaning: 'Lower levels are generally good, though very low levels may indicate malnutrition or other conditions.',
    medlinePlusUrl: 'https://medlineplus.gov/lab-tests/cholesterol-levels/',
    category: 'cardiac'
  },
  'hdl': {
    name: 'HDL Cholesterol',
    commonNames: ['HDL', 'Good Cholesterol'],
    description: 'HDL is "good" cholesterol that helps remove other forms of cholesterol from your bloodstream.',
    purpose: 'Higher HDL levels are protective against heart disease.',
    normalRange: 'Above 40 mg/dL (men), above 50 mg/dL (women)',
    highMeaning: 'Higher levels are beneficial and protective for your heart.',
    lowMeaning: 'Lower levels increase your risk of heart disease.',
    medlinePlusUrl: 'https://medlineplus.gov/hdlthegoodcholesterol.html',
    category: 'cardiac'
  },
  'ldl': {
    name: 'LDL Cholesterol',
    commonNames: ['LDL', 'Bad Cholesterol'],
    description: 'LDL is "bad" cholesterol that can build up in artery walls and increase heart disease risk.',
    purpose: 'Lower LDL levels reduce your risk of heart attack and stroke.',
    normalRange: 'Below 100 mg/dL (optimal)',
    highMeaning: 'Higher levels increase your risk of heart disease and may require lifestyle changes or medication.',
    lowMeaning: 'Lower levels are generally beneficial for heart health.',
    medlinePlusUrl: 'https://medlineplus.gov/ldlthebadcholesterol.html',
    category: 'cardiac'
  },
  'triglycerides': {
    name: 'Triglycerides',
    commonNames: ['Trigs', 'TG'],
    description: 'Triglycerides are a type of fat in your blood that your body uses for energy.',
    purpose: 'High levels can increase your risk of heart disease, especially when combined with other risk factors.',
    normalRange: 'Below 150 mg/dL',
    highMeaning: 'Higher levels may increase heart disease risk and can be lowered through diet, exercise, and weight loss.',
    lowMeaning: 'Lower levels are generally good.',
    medlinePlusUrl: 'https://medlineplus.gov/triglycerides.html',
    category: 'cardiac'
  },

  // Thyroid
  'tsh': {
    name: 'Thyroid Stimulating Hormone',
    commonNames: ['TSH'],
    description: 'TSH is a hormone that tells your thyroid gland how much thyroid hormone to make.',
    purpose: 'This test checks if your thyroid is working properly. The thyroid controls metabolism and energy.',
    normalRange: '0.4-4.0 mIU/L',
    highMeaning: 'Higher levels may indicate an underactive thyroid (hypothyroidism), causing fatigue, weight gain, or feeling cold.',
    lowMeaning: 'Lower levels may indicate an overactive thyroid (hyperthyroidism), causing anxiety, weight loss, or rapid heartbeat.',
    medlinePlusUrl: 'https://medlineplus.gov/lab-tests/tsh-thyroid-stimulating-hormone-test/',
    category: 'thyroid'
  },
  't4': {
    name: 'Thyroxine',
    commonNames: ['T4', 'Free T4', 'Total T4'],
    description: 'T4 is the main hormone produced by your thyroid gland.',
    purpose: 'This test helps diagnose thyroid problems and monitor thyroid medication.',
    normalRange: '0.8-1.8 ng/dL (Free T4)',
    highMeaning: 'Higher levels may indicate an overactive thyroid.',
    lowMeaning: 'Lower levels may indicate an underactive thyroid.',
    medlinePlusUrl: 'https://medlineplus.gov/lab-tests/t4-thyroxine-test/',
    category: 'thyroid'
  },

  // Vitamin D
  'vitamin d': {
    name: 'Vitamin D',
    commonNames: ['25-OH Vitamin D', '25-Hydroxyvitamin D'],
    description: 'Vitamin D helps your body absorb calcium and is important for bone health and immune function.',
    purpose: 'This test checks if you have enough vitamin D, which is essential for strong bones and overall health.',
    normalRange: '30-100 ng/mL',
    highMeaning: 'Very high levels (above 100) may cause calcium buildup, but this is rare.',
    lowMeaning: 'Lower levels can lead to weak bones, fatigue, and increased infection risk. Often improved with supplements.',
    medlinePlusUrl: 'https://medlineplus.gov/lab-tests/vitamin-d-test/',
    category: 'other'
  },
}

// Fuzzy matching function to find tests
export function findLabTest(testName: string): LabTestInfo | undefined {
  const normalized = testName.toLowerCase().trim()

  // Try exact match first
  if (labTestDatabase[normalized]) {
    return labTestDatabase[normalized]
  }

  // Try common names
  for (const [key, info] of Object.entries(labTestDatabase)) {
    if (info.commonNames.some(name => name.toLowerCase() === normalized)) {
      return info
    }
  }

  // Try partial match
  for (const [key, info] of Object.entries(labTestDatabase)) {
    if (key.includes(normalized) || normalized.includes(key)) {
      return info
    }
    if (info.commonNames.some(name =>
      name.toLowerCase().includes(normalized) || normalized.includes(name.toLowerCase())
    )) {
      return info
    }
  }

  return undefined
}
