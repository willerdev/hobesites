import { ChevronLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const chats = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
    lastMessage: "Is this still available?",
    time: "2m ago",
    unread: 2
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100",
    lastMessage: "Great, I'll take it!",
    time: "1h ago",
    unread: 0
  },
  {
    id: 3,
    name: "Mike Johnson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100",
    lastMessage: "Can you do $450?",
    time: "3h ago",
    unread: 1
  }
];

export default function ChatPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button onClick={() => navigate(-1)}>
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <h1 className="ml-4 text-xl font-semibold">Messages</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="space-y-4">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900">{chat.name}</h3>
                  <span className="text-sm text-gray-500">{chat.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <span className="ml-2 bg-emerald-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                  {chat.unread}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}