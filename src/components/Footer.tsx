import { Home, MessageSquare, PlusSquare, LayoutGrid, Settings } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: LayoutGrid, label: 'Categories', path: '/categories' },
    { icon: PlusSquare, label: 'Post', path: '/post' },
    { icon: MessageSquare, label: 'Chat', path: '/chat' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 px-4 py-2">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {navItems.map(({ icon: Icon, label, path }) => (
            <Link
              key={label}
              to={path}
              className={`flex flex-col items-center p-2 ${
                location.pathname === path ? 'text-emerald-600' : 'text-gray-600'
              }`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}