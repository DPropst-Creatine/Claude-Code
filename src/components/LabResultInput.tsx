import { useState } from 'react'
import { LabResult } from '../types'
import { Plus, Trash2, Upload, ChevronDown } from 'lucide-react'

interface Props {
  onSubmit: (results: LabResult[]) => void
}

const commonTests = [
  { name: 'Hemoglobin', unit: 'g/dL', range: '12-16 (women), 14-18 (men)' },
  { name: 'Glucose', unit: 'mg/dL', range: '70-100' },
  { name: 'HbA1c', unit: '%', range: '<5.7' },
  { name: 'Cholesterol', unit: 'mg/dL', range: '<200' },
  { name: 'HDL', unit: 'mg/dL', range: '>40 (men), >50 (women)' },
  { name: 'LDL', unit: 'mg/dL', range: '<100' },
  { name: 'Triglycerides', unit: 'mg/dL', range: '<150' },
  { name: 'Creatinine', unit: 'mg/dL', range: '0.6-1.3' },
  { name: 'eGFR', unit: 'mL/min/1.73m²', range: '>60' },
  { name: 'TSH', unit: 'mIU/L', range: '0.4-4.0' },
  { name: 'ALT', unit: 'units/L', range: '7-56' },
  { name: 'AST', unit: 'units/L', range: '10-40' },
]

export default function LabResultInput({ onSubmit }: Props) {
  const [results, setResults] = useState<LabResult[]>([
    { testName: '', value: '', unit: '', referenceRange: '' }
  ])
  const [showQuickSelect, setShowQuickSelect] = useState(false)

  const addResult = () => {
    setResults([...results, { testName: '', value: '', unit: '', referenceRange: '' }])
  }

  const removeResult = (index: number) => {
    setResults(results.filter((_, i) => i !== index))
  }

  const updateResult = (index: number, field: keyof LabResult, value: string) => {
    const newResults = [...results]
    newResults[index] = { ...newResults[index], [field]: value }
    setResults(newResults)
  }

  const selectQuickTest = (test: typeof commonTests[0], index: number) => {
    updateResult(index, 'testName', test.name)
    updateResult(index, 'unit', test.unit)
    updateResult(index, 'referenceRange', test.range)
    setShowQuickSelect(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validResults = results.filter(r => r.testName && r.value)
    if (validResults.length > 0) {
      onSubmit(validResults)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Enter Your Lab Results
        </h2>
        <p className="text-gray-600">
          Add your test results below. You can find these values on your lab report.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {results.map((result, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-900">Test #{index + 1}</h3>
              {results.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeResult(index)}
                  className="text-red-600 hover:text-red-700 transition-colors p-1"
                  title="Remove test"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Test Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={result.testName}
                    onChange={(e) => updateResult(index, 'testName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Hemoglobin A1c, Cholesterol, TSH"
                    required
                    list={`test-names-${index}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowQuickSelect(!showQuickSelect)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </button>
                  <datalist id={`test-names-${index}`}>
                    {commonTests.map((test) => (
                      <option key={test.name} value={test.name} />
                    ))}
                  </datalist>
                </div>

                {showQuickSelect && (
                  <div className="mt-2 border border-gray-200 rounded-lg bg-white shadow-lg max-h-48 overflow-y-auto">
                    <div className="p-2 text-xs font-medium text-gray-600 bg-gray-50 border-b">
                      Quick Select Common Tests
                    </div>
                    {commonTests.map((test) => (
                      <button
                        key={test.name}
                        type="button"
                        onClick={() => selectQuickTest(test, index)}
                        className="w-full text-left px-3 py-2 hover:bg-primary-50 text-sm transition-colors"
                      >
                        <div className="font-medium text-gray-900">{test.name}</div>
                        <div className="text-xs text-gray-500">
                          {test.unit} | Normal: {test.range}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Value *
                </label>
                <input
                  type="text"
                  value={result.value}
                  onChange={(e) => updateResult(index, 'value', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 5.8, 180"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <input
                  type="text"
                  value={result.unit}
                  onChange={(e) => updateResult(index, 'unit', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., mg/dL, %"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reference Range (Normal Range)
                </label>
                <input
                  type="text"
                  value={result.referenceRange}
                  onChange={(e) => updateResult(index, 'referenceRange', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 70-100, <5.7"
                />
                <p className="mt-1 text-xs text-gray-500">
                  You can find this on your lab report, usually next to your result
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={addResult}
            className="flex items-center gap-2 px-4 py-2 text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Add Another Test
          </button>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-sm flex items-center justify-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Analyze My Results
          </button>
        </div>
      </form>
    </div>
  )
}
