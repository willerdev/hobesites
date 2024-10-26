import { Smartphone, Car, Home, Briefcase, ShoppingBag, Laptop, Sofa, Baby } from 'lucide-react';

const categories = [
  { name: 'Vehicles', icon: Car },
  { name: 'Electronics', icon: Smartphone },
  { name: 'Property', icon: Home },
  { name: 'Jobs', icon: Briefcase },
  { name: 'Fashion', icon: ShoppingBag },
  { name: 'Computing', icon: Laptop },
  { name: 'Furniture', icon: Sofa },
  { name: 'Baby Items', icon: Baby },
];

export default function Categories() {
  return (
    <div className="bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Icon className="h-6 w-6 text-emerald-600 mb-2" />
                <span className="text-sm text-gray-700">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}