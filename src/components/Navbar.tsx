import { Search, ShoppingCart, Menu, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Menu className="h-6 w-6 text-gray-600 mr-4 cursor-pointer hover:text-gray-900" />
            <span className="text-2xl font-bold text-emerald-600">Hobe</span>
          </div>
          
    

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
              <User className="h-5 w-5" />
            
            </button>
            
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
              Sell
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}