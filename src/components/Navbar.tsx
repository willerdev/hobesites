import { Search, ShoppingCart, Menu, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Menu className="h-6 w-6 text-gray-600 mr-4 cursor-pointer hover:text-gray-900" />
            <Link to="/" className="text-2xl font-bold text-emerald-600">Hobe</Link>
          </div>

          <div className="flex items-center space-x-4">
            {auth.currentUser ? (
              <button 
                onClick={() => navigate('/settings')}
                className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
              >
                <User className="h-5 w-5" />
              </button>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
              >
                <User className="h-5 w-5" />
              </button>
            )}
            
            <Link 
              to="/post"
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
            >
              Sell
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}