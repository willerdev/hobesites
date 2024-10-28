import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PrivacyPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button onClick={() => navigate(-1)}>
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <h1 className="ml-4 text-xl font-semibold">Privacy Policy</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
            <p className="text-gray-600 mb-4">Last updated: March 15, 2024</p>
            <div className="space-y-4 text-gray-600">
              <p>We take your privacy seriously. This policy describes what personal information we collect and how we use it.</p>
              <h3 className="font-semibold text-gray-800">Information We Collect</h3>
              <p>We collect information you provide directly to us, including:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Name and contact information</li>
                <li>Account credentials</li>
                <li>Transaction information</li>
                <li>Communications with other users</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}