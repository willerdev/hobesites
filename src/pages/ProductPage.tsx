import { ChevronLeft, Heart, Share2, Flag, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProductPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 lg:pb-0">
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button onClick={() => navigate(-1)}>
              <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </button>
            <div className="ml-auto flex space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <Share2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <Flag className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=800"
              alt="Product"
              className="w-full h-96 object-cover"
            />
            <button className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md">
              <Heart className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">iPhone 13 Pro Max</h1>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-500">$899</p>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Perfect condition, barely used. Comes with original box and accessories. Battery health at 98%.
            </p>

            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
              <span>Posted 2 days ago</span>
              <span className="mx-2">•</span>
              <span>New York, NY</span>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Make an Offer
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"
                alt="Seller"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ml-4">
                <h3 className="font-medium text-gray-900 dark:text-white">John Doe</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Member since 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}