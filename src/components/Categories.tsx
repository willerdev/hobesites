import { useNavigate } from 'react-router-dom';
import { 
  Laptop, 
  Cat, 
  Briefcase, 
  Wrench, 
  Car, 
  Home, 
  ShoppingBag, 
  Baby, 
  Smartphone, 
  Utensils, 
  Dumbbell, 
  Book 
} from 'lucide-react';

// Add this type definition
type IconName = keyof typeof iconMap;

const categories = [
  { id: 'computers', name: 'Computers', icon: 'laptop' as IconName },
  { id: 'pets', name: 'Pets', icon: 'cat' as IconName },
  { id: 'jobs', name: 'Jobs', icon: 'briefcase' as IconName },
  { id: 'services', name: 'Services', icon: 'wrench' as IconName },
  { id: 'vehicles', name: 'Vehicles', icon: 'car' as IconName },
  { id: 'property', name: 'Property', icon: 'home' as IconName },
  { id: 'fashion', name: 'Fashion', icon: 'shoppingBag' as IconName },
  { id: 'baby', name: 'Baby Items', icon: 'baby' as IconName },
  { id: 'electronics', name: 'Electronics', icon: 'smartphone' as IconName },
  { id: 'food', name: 'Food', icon: 'utensils' as IconName },
  { id: 'sports', name: 'Sports', icon: 'dumbbell' as IconName },
  { id: 'education', name: 'Education', icon: 'book' as IconName },
] as const;

const iconMap = {
  laptop: Laptop,
  cat: Cat,
  briefcase: Briefcase,
  wrench: Wrench,
  car: Car,
  home: Home,
  shoppingBag: ShoppingBag,
  baby: Baby,
  smartphone: Smartphone,
  utensils: Utensils,
  dumbbell: Dumbbell,
  book: Book,
};

export default function Categories() {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
      <div className="grid gap-4 justify-center" style={{ 
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 100px))'
      }}>
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || ShoppingBag;
            return (
              <button
                key={category.id}
                onClick={() => navigate(`/categories/${category.id}`)}
                className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 hover:shadow-sm"
              >
                <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600 mb-2" />
                <span className="text-xs sm:text-sm text-gray-700 text-center font-medium">
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
