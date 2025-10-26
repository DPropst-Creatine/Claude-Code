import { LabResult } from '../types'
import { findLabTest } from '../data/labTestDatabase'
import { AlertCircle, CheckCircle, TrendingUp, TrendingDown, ExternalLink, ArrowLeft, MessageCircle } from 'lucide-react'
import DoctorQuestions from './DoctorQuestions'

interface Props {
  results: LabResult[]
  onReset: () => void
}

function determineStatus(result: LabResult): 'normal' | 'high' | 'low' | 'unknown' {
  if (!result.referenceRange || !result.value) return 'unknown'

  const value = parseFloat(result.value)
  if (isNaN(value)) return 'unknown'

  const range = result.referenceRange.toLowerCase()

  // Handle < or > format
  if (range.startsWith('<')) {
    const max = parseFloat(range.substring(1))
    return value > max ? 'high' : 'normal'
  }
  if (range.startsWith('>')) {
    const min = parseFloat(range.substring(1))
    return value < min ? 'low' : 'normal'
  }

  // Handle range format (e.g., "70-100")
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

export default function LabResultAnalysis({ results, onReset }: Props) {
  const analyzedResults = results.map(result => ({
    ...result,
    status: determineStatus(result),
    testInfo: findLabTest(result.testName)
  }))

  const abnormalResults = analyzedResults.filter(r => r.status === 'high' || r.status === 'low')
  const normalResults = analyzedResults.filter(r => r.status === 'normal')

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Your Lab Results Analysis</h2>
          <p className="text-gray-600 mt-1">
            Here's what your results mean in plain language
          </p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium no-print"
        >
          <ArrowLeft className="w-5 h-5" />
          Start Over
        </button>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-br from-primary-50 to-indigo-50 rounded-xl shadow-sm border border-primary-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-gray-900">{results.length}</div>
            <div className="text-sm text-gray-600">Total Tests</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-green-600">{normalResults.length}</div>
            <div className="text-sm text-gray-600">In Normal Range</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-amber-600">{abnormalResults.length}</div>
            <div className="text-sm text-gray-600">Need Attention</div>
          </div>
        </div>
      </div>

      {/* Results That Need Attention */}
      {abnormalResults.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-amber-200 p-6">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Results Outside Normal Range
              </h3>
              <p className="text-gray-600 mt-1">
                These results may warrant discussion with your healthcare provider.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {abnormalResults.map((result, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {result.testInfo?.name || result.testName}
                    </h4>
                    {result.testInfo?.commonNames && result.testInfo.commonNames.length > 0 && (
                      <p className="text-sm text-gray-500">
                        Also known as: {result.testInfo.commonNames.join(', ')}
                      </p>
                    )}
                  </div>
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                    result.status === 'high'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {result.status === 'high' ? (
                      <>
                        <TrendingUp className="w-4 h-4" />
                        High
                      </>
                    ) : (
                      <>
                        <TrendingDown className="w-4 h-4" />
                        Low
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4 text-sm">
                  <div>
                    <span className="text-gray-600">Your Value:</span>
                    <div className="font-semibold text-gray-900">
                      {result.value} {result.unit}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Normal Range:</span>
                    <div className="font-semibold text-gray-900">
                      {result.referenceRange} {result.unit}
                    </div>
                  </div>
                </div>

                {result.testInfo && (
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h5 className="font-semibold text-gray-900 mb-2">What is this test?</h5>
                      <p className="text-gray-700">{result.testInfo.description}</p>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h5 className="font-semibold text-gray-900 mb-2">Why it matters:</h5>
                      <p className="text-gray-700">{result.testInfo.purpose}</p>
                    </div>

                    <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                      <h5 className="font-semibold text-gray-900 mb-2">
                        What {result.status} levels may mean:
                      </h5>
                      <p className="text-gray-700">
                        {result.status === 'high' ? result.testInfo.highMeaning : result.testInfo.lowMeaning}
                      </p>
                    </div>

                    <a
                      href={result.testInfo.medlinePlusUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                    >
                      Learn more on MedlinePlus
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Normal Results */}
      {normalResults.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-green-200 p-6">
          <div className="flex items-start gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Results in Normal Range
              </h3>
              <p className="text-gray-600 mt-1">
                These results are within the expected healthy range.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {normalResults.map((result, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {result.testInfo?.name || result.testName}
                    </h4>
                    {result.testInfo?.commonNames && result.testInfo.commonNames.length > 0 && (
                      <p className="text-sm text-gray-500">
                        Also known as: {result.testInfo.commonNames.join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <CheckCircle className="w-4 h-4" />
                    Normal
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3 text-sm">
                  <div>
                    <span className="text-gray-600">Your Value:</span>
                    <div className="font-semibold text-gray-900">
                      {result.value} {result.unit}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Normal Range:</span>
                    <div className="font-semibold text-gray-900">
                      {result.referenceRange} {result.unit}
                    </div>
                  </div>
                </div>

                {result.testInfo && (
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h5 className="font-semibold text-gray-900 mb-2">What this test measures:</h5>
                      <p className="text-gray-700">{result.testInfo.description}</p>
                    </div>

                    <a
                      href={result.testInfo.medlinePlusUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                    >
                      Learn more on MedlinePlus
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Doctor Questions Component */}
      <DoctorQuestions results={analyzedResults} />

      {/* Important Disclaimer */}
      <div className="bg-blue-50 border-l-4 border-primary-600 p-5 rounded-r-lg">
        <div className="flex items-start gap-3">
          <MessageCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Important Reminder</h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              This analysis is for educational purposes only and does not constitute medical advice.
              Lab results should always be interpreted by a qualified healthcare provider who knows your
              complete medical history. Some results may be affected by medications, recent meals, or other
              factors. Always discuss your results with your doctor, even if they appear normal.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
