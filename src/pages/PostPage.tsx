import { ChevronLeft, Image, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PostPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button onClick={() => navigate(-1)}>
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </button>
              <h1 className="ml-4 text-xl font-semibold">Create Post</h1>
            </div>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
              Post
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="What are you selling?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Enter price"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
              <option>Select category</option>
              <option>Electronics</option>
              <option>Vehicles</option>
              <option>Property</option>
              <option>Fashion</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Describe what you're selling"
            />
          </div>

          <div>
            <button className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-500 transition-colors">
              <Image className="h-6 w-6 text-gray-400 mr-2" />
              <span className="text-gray-600">Add Photos</span>
            </button>
          </div>

          <div>
            <button className="flex items-center text-gray-700 hover:text-emerald-600">
              <MapPin className="h-5 w-5 mr-2" />
              <span>Add Location</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}