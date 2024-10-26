import { useState } from 'react';
import { ChevronLeft, User, Bell, Shield, Moon, HelpCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { useTheme } from '../hooks/useTheme';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const settingsSections = [
    {
      icon: User,
      title: 'Account',
      description: 'Manage your account settings and preferences',
      action: () => navigate('/settings/account')
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Control your notification preferences',
      toggle: true,
      value: notifications,
      onChange: setNotifications
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Manage your privacy and security settings',
      action: () => navigate('/settings/privacy')
    },
    {
      icon: Moon,
      title: 'Dark Mode',
      description: 'Toggle dark mode on or off',
      toggle: true,
      value: isDark,
      onChange: toggleTheme
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      description: 'Get help with using Karrots',
      action: () => navigate('/help')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 lg:pb-0">
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button onClick={() => navigate(-1)}>
              <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </button>
            <h1 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">Settings</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {settingsSections.map(({ icon: Icon, title, description, action, toggle, value, onChange }) => (
            <div
              key={title}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-center justify-between cursor-pointer"
              onClick={action}
            >
              <div className="flex items-center">
                <Icon className="h-6 w-6 text-orange-600 dark:text-orange-500" />
                <div className="ml-4">
                  <h3 className="text-gray-900 dark:text-white font-medium">{title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
                </div>
              </div>
              {toggle && (
                <button
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    value ? 'bg-orange-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(!value);
                  }}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      value ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              )}
            </div>
          ))}

          <button
            onClick={handleLogout}
            className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-center text-red-600 dark:text-red-500"
          >
            <LogOut className="h-6 w-6" />
            <span className="ml-4 font-medium">Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
}