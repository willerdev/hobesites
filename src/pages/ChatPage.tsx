import { useState, useEffect } from 'react';
import { ChevronLeft, Search, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth, getChatsByUser, getMessages, sendMessage } from '../lib/firebase';

export default function ChatPage() {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/login');
      return;
    }

    const fetchChats = async () => {
      try {
        const chatsData = await getChatsByUser(auth.currentUser.uid);
        setChats(chatsData);
      } catch (error) {
        console.error('Error fetching chats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [navigate]);

  useEffect(() => {
    if (selectedChat) {
      const fetchMessages = async () => {
        const messagesData = await getMessages(selectedChat.id);
        setMessages(messagesData);
      };
      fetchMessages();
    }
  }, [selectedChat]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    try {
      await sendMessage(selectedChat.id, auth.currentUser.uid, newMessage.trim());
      setNewMessage('');
      // Refresh messages
      const messagesData = await getMessages(selectedChat.id);
      setMessages(messagesData);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading) {
    return <div className="p-4">Loading chats...</div>;
  }

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
              onClick={() => setSelectedChat(chat)}
              className={`flex items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
                selectedChat?.id === chat.id ? 'ring-2 ring-emerald-500' : ''
              }`}
            >
              <img
                src={chat.productImage || "https://via.placeholder.com/100"}
                alt="Product"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900">{chat.productTitle}</h3>
                  <span className="text-sm text-gray-500">
                    {new Date(chat.lastMessageTime?.toDate()).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{chat.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedChat && (
          <div className="fixed bottom-20 left-0 right-0 bg-white border-t">
            <div className="max-w-2xl mx-auto p-4">
              <div className="h-48 overflow-y-auto mb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-2 ${
                      message.senderId === auth.currentUser.uid
                        ? 'text-right'
                        : 'text-left'
                    }`}
                  >
                    <span
                      className={`inline-block px-4 py-2 rounded-lg ${
                        message.senderId === auth.currentUser.uid
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {message.content}
                    </span>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}