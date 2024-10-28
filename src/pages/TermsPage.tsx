import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TermsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button onClick={() => navigate(-1)}>
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <h1 className="ml-4 text-xl font-semibold">Terms of Service</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>
            <p className="text-gray-600 mb-4">Last updated: March 15, 2024</p>
            <div className="space-y-4 text-gray-600">
              <p>By using our service, you agree to these terms. Please read them carefully.</p>
              <h3 className="font-semibold text-gray-800">1. Acceptance of Terms</h3>
              <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
              <h3 className="font-semibold text-gray-800">2. User Responsibilities</h3>
              <p>You are responsible for maintaining the confidentiality of your account and password.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}