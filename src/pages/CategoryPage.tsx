import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductGrid from '../components/ProductGrid';

// Import categories from Categories component
const categories = [
  { id: 'electronics', name: 'Electronics', subcategories: ['All', 'Phones', 'Laptops', 'Tablets', 'Accessories'] },
  { id: 'vehicles', name: 'Vehicles', subcategories: ['All', 'Cars', 'Motorcycles', 'Bicycles', 'Parts'] },
  { id: 'property', name: 'Property', subcategories: ['All', 'Houses', 'Apartments', 'Land', 'Commercial'] },
  // Add other categories as needed
];

export default function CategoryPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [categoryName, setCategoryName] = useState('');
  const [subcategories, setSubcategories] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      const category = categories.find(cat => cat.id === id);
      if (category) {
        setCategoryName(category.name);
        setSubcategories(category.subcategories);
      }
    }
  }, [id]);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

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
            <h1 className="text-xl font-semibold">{categoryName}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {subcategories.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedFilter === filter
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } shadow-sm`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <ProductGrid 
        category={id || ''} 
        subcategory={selectedFilter !== 'All' ? selectedFilter : ''} 
      />
    </div>
  );
}
