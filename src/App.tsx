import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import type { BFHLRequest, BFHLResponse, FilterOption } from './types';

const API_URL = 'https://testbfhl.herokuapp.com/bfhl';

const filterOptions: FilterOption[] = [
  { value: 'numbers', label: 'Numbers' },
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'highest_alphabet', label: 'Highest Alphabet' }
];

function App() {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<BFHLResponse | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Validate JSON input
      const parsedInput: BFHLRequest = JSON.parse(input);
      
      if (!Array.isArray(parsedInput.data)) {
        throw new Error('Input must contain a "data" array');
      }

      // Make API call
      const { data } = await axios.post<BFHLResponse>(API_URL, parsedInput);
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    const selectedKeys = selectedFilters.map(filter => filter.value);
    
    return (
      <div className="space-y-4">
        {selectedKeys.map(key => (
          <div key={key} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold capitalize mb-2">{key.replace('_', ' ')}</h3>
            <p className="font-mono">
              {JSON.stringify(response[key], null, 2)}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            BFHL API Tester
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="json-input" className="block text-sm font-medium text-gray-700">
                JSON Input
              </label>
              <textarea
                id="json-input"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder={'{ "data": ["M","1","334","4","B"] }'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isLoading
                  ? 'bg-indigo-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              }`}
            >
              {isLoading ? 'Processing...' : 'Submit'}
            </button>
          </form>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">{error}</div>
                </div>
              </div>
            </div>
          )}

          {response && !error && (
            <div className="mt-8 space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Success</h3>
                    <div className="mt-2 text-sm text-green-700">
                      Request processed successfully
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter Response
                </label>
                <Select
                  isMulti
                  options={filterOptions}
                  value={selectedFilters}
                  onChange={(selected) => setSelectedFilters(selected as FilterOption[])}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>

              {renderFilteredResponse()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;