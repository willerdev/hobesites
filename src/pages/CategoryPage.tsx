import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';

export default function CategoryPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button 
              onClick={() => navigate(-1)}
              className="mr-4"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold">Electronics</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {['All', 'Phones', 'Laptops', 'Tablets', 'Accessories'].map((filter) => (
            <button
              key={filter}
              className="px-4 py-2 rounded-full bg-white shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 whitespace-nowrap"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <ProductGrid />
    </div>
  );
}