import { useState } from 'react'
import LabResultInput from './components/LabResultInput'
import LabResultAnalysis from './components/LabResultAnalysis'
import PrintableSummary from './components/PrintableSummary'
import { LabResult } from './types'
import { FileText, Heart } from 'lucide-react'

function App() {
  const [labResults, setLabResults] = useState<LabResult[]>([])
  const [showAnalysis, setShowAnalysis] = useState(false)

  const handleLabResultsSubmit = (results: LabResult[]) => {
    setLabResults(results)
    setShowAnalysis(true)
  }

  const handleReset = () => {
    setLabResults([])
    setShowAnalysis(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Heart className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Lab Explainer</h1>
              <p className="text-sm text-gray-600 mt-1">
                Understanding your health, one result at a time
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showAnalysis ? (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <FileText className="w-8 h-8 text-primary-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                    Welcome to Lab Explainer
                  </h2>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Lab results can be confusing and overwhelming. We're here to help you understand
                    what they mean in plain language, so you can have more informed conversations
                    with your healthcare provider.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-primary-500 p-4 rounded-r">
                    <p className="text-sm text-gray-700">
                      <strong className="text-gray-900">Important:</strong> This tool is for educational
                      purposes only and does not replace professional medical advice. Always consult with
                      your healthcare provider about your results.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Component */}
            <LabResultInput onSubmit={handleLabResultsSubmit} />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Analysis */}
            <LabResultAnalysis results={labResults} onReset={handleReset} />

            {/* Printable Summary */}
            <PrintableSummary results={labResults} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            Lab Explainer &copy; {new Date().getFullYear()} | Empowering patients through understanding
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
