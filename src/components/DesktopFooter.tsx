import { Link } from 'react-router-dom';

export default function DesktopFooter() {
  return (
    <footer className="hidden lg:block bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-500 mb-4">Karrots</h3>
          <p className="text-gray-600 dark:text-gray-400">Buy and sell anything in your community</p>
        </div>
        
        <div>
          <h4 className="font-medium mb-4">Categories</h4>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li><Link to="/categories/vehicles">Vehicles</Link></li>
            <li><Link to="/categories/electronics">Electronics</Link></li>
            <li><Link to="/categories/property">Property</Link></li>
            <li><Link to="/categories/fashion">Fashion</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium mb-4">Support</h4>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li><Link to="/help">Help Center</Link></li>
            <li><Link to="/safety">Safety Center</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium mb-4">Legal</h4>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/cookies">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}