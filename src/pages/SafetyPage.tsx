import { ChevronLeft, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SafetyPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button onClick={() => navigate(-1)}>
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <h1 className="ml-4 text-xl font-semibold">Safety Center</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
          <div className="text-center mb-8">
            <Shield className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold">Your Safety is Our Priority</h2>
          </div>

          <section>
            <h3 className="text-xl font-semibold mb-4">Safety Tips</h3>
            <ul className="space-y-4 text-gray-600">
              <li>• Meet in public places for transactions</li>
              <li>• Don't share personal financial information</li>
              <li>• Use our in-app messaging system</li>
              <li>• Trust your instincts</li>
              <li>• Verify items before purchasing</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4">Report an Issue</h3>
            <p className="text-gray-600 mb-4">
              If you encounter any suspicious activity or have safety concerns, please report them immediately.
            </p>
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
              Report Issue
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}