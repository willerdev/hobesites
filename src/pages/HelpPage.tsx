import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HelpPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button onClick={() => navigate(-1)}>
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <h1 className="ml-4 text-xl font-semibold">Help Center</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">How do I create an account?</h3>
                <p className="text-gray-600">Click the profile icon in the top right corner and select "Sign up". Fill in your details to create an account.</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">How do I post an item for sale?</h3>
                <p className="text-gray-600">Click the "Sell" button in the top right corner. You'll need to be logged in to create a listing.</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Is it free to list items?</h3>
                <p className="text-gray-600">Yes, listing items is completely free. We don't charge any fees for basic listings.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Support</h2>
            <p className="text-gray-600 mb-4">Need more help? Our support team is here for you.</p>
            <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700">
              Contact Us
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}