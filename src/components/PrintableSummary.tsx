import { LabResult } from '../types'
import { findLabTest } from '../data/labTestDatabase'
import { Printer } from 'lucide-react'

interface Props {
  results: LabResult[]
}

function determineStatus(result: LabResult): 'normal' | 'high' | 'low' | 'unknown' {
  if (!result.referenceRange || !result.value) return 'unknown'

  const value = parseFloat(result.value)
  if (isNaN(value)) return 'unknown'

  const range = result.referenceRange.toLowerCase()

  if (range.startsWith('<')) {
    const max = parseFloat(range.substring(1))
    return value > max ? 'high' : 'normal'
  }
  if (range.startsWith('>')) {
    const min = parseFloat(range.substring(1))
    return value < min ? 'low' : 'normal'
  }

  const rangeMatch = range.match(/(\d+\.?\d*)\s*-\s*(\d+\.?\d*)/)
  if (rangeMatch) {
    const min = parseFloat(rangeMatch[1])
    const max = parseFloat(rangeMatch[2])
    if (value < min) return 'low'
    if (value > max) return 'high'
    return 'normal'
  }

  return 'unknown'
}

export default function PrintableSummary({ results }: Props) {
  const handlePrint = () => {
    window.print()
  }

  const analyzedResults = results.map(result => ({
    ...result,
    status: determineStatus(result),
    testInfo: findLabTest(result.testName)
  }))

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Print Button - Hidden when printing */}
      <div className="flex items-center justify-between mb-6 no-print">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Printable Summary</h3>
          <p className="text-gray-600 mt-1">
            Take this summary to your doctor's appointment
          </p>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-sm"
        >
          <Printer className="w-5 h-5" />
          Print Summary
        </button>
      </div>

      {/* Printable Content */}
      <div className="print:p-8">
        {/* Header for print */}
        <div className="print-only mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lab Results Summary</h1>
          <p className="text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
          <div className="mt-4 p-4 bg-blue-50 border-l-4 border-primary-600 rounded-r">
            <p className="text-sm text-gray-700">
              <strong>Important:</strong> This is an educational summary only. Please discuss all results
              with your healthcare provider.
            </p>
          </div>
        </div>

        {/* Preview of printable content */}
        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 print:border-0 print:p-0 print:bg-white">
          {/* Results Table */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 print:text-2xl">Test Results</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 print:bg-gray-200">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Test Name
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Your Value
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Normal Range
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {analyzedResults.map((result, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">
                      {result.testInfo?.name || result.testName}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-900">
                      {result.value} {result.unit}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      {result.referenceRange} {result.unit}
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      <span className={`font-semibold ${
                        result.status === 'normal' ? 'text-green-700' :
                        result.status === 'high' ? 'text-red-700' :
                        result.status === 'low' ? 'text-blue-700' :
                        'text-gray-700'
                      }`}>
                        {result.status === 'normal' ? '✓ Normal' :
                         result.status === 'high' ? '↑ High' :
                         result.status === 'low' ? '↓ Low' :
                         'Unknown'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Test Explanations */}
          <div className="mb-8 page-break-before">
            <h2 className="text-xl font-bold text-gray-900 mb-4 print:text-2xl">Understanding Your Results</h2>
            <div className="space-y-6">
              {analyzedResults
                .filter(r => r.testInfo)
                .map((result, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {result.testInfo!.name}
                    </h3>

                    <div className="space-y-2 text-sm text-gray-700">
                      <div>
                        <strong className="text-gray-900">What it is:</strong>{' '}
                        {result.testInfo!.description}
                      </div>

                      <div>
                        <strong className="text-gray-900">Why it matters:</strong>{' '}
                        {result.testInfo!.purpose}
                      </div>

                      {result.status !== 'normal' && (
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-3 mt-2 print:bg-gray-100">
                          <strong className="text-gray-900">What {result.status} levels may mean:</strong>{' '}
                          {result.status === 'high' ? result.testInfo!.highMeaning : result.testInfo!.lowMeaning}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Questions Section */}
          <div className="page-break-before">
            <h2 className="text-xl font-bold text-gray-900 mb-4 print:text-2xl">
              Questions for Your Healthcare Provider
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold print:bg-gray-800">
                  1
                </div>
                <p className="text-gray-800 text-sm">
                  Can you help me understand what these lab results mean for my overall health?
                </p>
              </div>

              {analyzedResults
                .filter(r => r.status === 'high' || r.status === 'low')
                .slice(0, 3)
                .map((result, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold print:bg-gray-800">
                      {index + 2}
                    </div>
                    <p className="text-gray-800 text-sm">
                      My {result.testInfo?.name || result.testName} is{' '}
                      {result.status}. What could be causing this, and what should I do about it?
                    </p>
                  </div>
                ))}

              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold print:bg-gray-800">
                  {analyzedResults.filter(r => r.status === 'high' || r.status === 'low').length + 2}
                </div>
                <p className="text-gray-800 text-sm">
                  Are there any lifestyle or dietary changes you recommend based on these results?
                </p>
              </div>

              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold print:bg-gray-800">
                  {analyzedResults.filter(r => r.status === 'high' || r.status === 'low').length + 3}
                </div>
                <p className="text-gray-800 text-sm">
                  When should I have these tests done again to monitor my levels?
                </p>
              </div>
            </div>

            {/* Space for notes */}
            <div className="mt-8 print:mt-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Notes from Appointment:</h3>
              <div className="border border-gray-300 rounded p-4 min-h-32 print:min-h-48">
                <div className="text-gray-400 text-sm italic">
                  (Use this space to write notes during your appointment)
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-300 text-xs text-gray-600 print:text-sm">
            <p>
              <strong>Disclaimer:</strong> This summary is for educational purposes only and does not
              replace professional medical advice. Always consult with your healthcare provider about
              your lab results and health concerns.
            </p>
            <p className="mt-2">
              Generated by Lab Explainer on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
