export interface LabResult {
  testName: string
  value: string
  unit: string
  referenceRange: string
  status?: 'normal' | 'high' | 'low' | 'critical' | 'unknown'
}

export interface LabTestInfo {
  name: string
  commonNames: string[]
  description: string
  purpose: string
  normalRange: string
  highMeaning?: string
  lowMeaning?: string
  medlinePlusUrl: string
  category: 'blood' | 'metabolic' | 'kidney' | 'liver' | 'thyroid' | 'cardiac' | 'other'
}

export interface DoctorQuestion {
  question: string
  context: string
  relevantTests: string[]
}
