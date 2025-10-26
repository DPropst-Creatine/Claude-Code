import { LabResult } from '../types'
import { LabTestInfo } from '../types'
import { Stethoscope, Clipboard } from 'lucide-react'

interface AnalyzedResult extends LabResult {
  status: 'normal' | 'high' | 'low' | 'unknown'
  testInfo?: LabTestInfo
}

interface Props {
  results: AnalyzedResult[]
}

function generateQuestions(results: AnalyzedResult[]): string[] {
  const questions: string[] = []
  const abnormalResults = results.filter(r => r.status === 'high' || r.status === 'low')

  // General opening question
  if (results.length > 0) {
    questions.push("Can you help me understand what these lab results mean for my overall health?")
  }

  // Questions for abnormal results
  abnormalResults.forEach(result => {
    const testName = result.testInfo?.name || result.testName
    const direction = result.status === 'high' ? 'elevated' : 'low'

    questions.push(`My ${testName} is ${direction}. What could be causing this, and what should I do about it?`)

    // Specific follow-ups based on test type
    if (result.testInfo?.category === 'cardiac') {
      questions.push(`How does this affect my heart health risk? Are there lifestyle changes I should make?`)
    }

    if (result.testInfo?.category === 'kidney') {
      questions.push(`What does this mean for my kidney function? Should I be concerned?`)
    }

    if (result.testInfo?.category === 'metabolic' && result.testName.toLowerCase().includes('glucose')) {
      questions.push(`Am I at risk for diabetes? Should I be tested again or monitor my blood sugar?`)
    }

    if (result.testInfo?.category === 'liver') {
      questions.push(`Could any of my medications be affecting my liver function?`)
    }

    if (result.testInfo?.category === 'thyroid') {
      questions.push(`How might this be affecting my energy levels and metabolism? Do I need medication?`)
    }
  })

  // Questions about treatment and monitoring
  if (abnormalResults.length > 0) {
    questions.push("Do I need any treatment or medication changes based on these results?")
    questions.push("How soon should I have these tests done again to monitor my levels?")
    questions.push("Are there any dietary or lifestyle changes you recommend?")
  }

  // Questions about interactions
  if (results.length > 1) {
    questions.push("Do any of these results relate to each other or indicate a pattern?")
  }

  // Follow-up testing
  const hasAbnormal = abnormalResults.length > 0
  if (hasAbnormal) {
    questions.push("Are there any additional tests I should have based on these results?")
  }

  // Lifestyle and prevention
  questions.push("What can I do at home to improve these numbers?")

  // Medication questions
  questions.push("Could any of my current medications be affecting these results?")

  // Future monitoring
  questions.push("What warning signs should I watch for that would mean I need to contact you before my next appointment?")

  // Remove duplicates and limit to most relevant
  return Array.from(new Set(questions)).slice(0, 10)
}

export default function DoctorQuestions({ results }: Props) {
  const questions = generateQuestions(results)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-primary-200 p-6">
      <div className="flex items-start gap-3 mb-5">
        <div className="p-2 bg-primary-100 rounded-lg">
          <Stethoscope className="w-6 h-6 text-primary-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            Questions to Ask Your Doctor
          </h3>
          <p className="text-gray-600 mt-1">
            Use these questions to have a more productive conversation about your results
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-primary-50 to-indigo-50 rounded-lg p-5 mb-5">
        <div className="flex items-start gap-2 mb-3">
          <Clipboard className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700">
            <strong>Tip:</strong> Write down your questions before your appointment and bring this list with you.
            Don't hesitate to ask for clarification if something is unclear.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {questions.map((question, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <div className="flex-shrink-0 w-7 h-7 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              {index + 1}
            </div>
            <p className="text-gray-800 leading-relaxed pt-0.5">{question}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong className="text-gray-900">Remember:</strong> There are no "silly" questions when it comes
          to your health. Your doctor wants you to understand your results and feel comfortable with your care plan.
        </p>
      </div>
    </div>
  )
}
