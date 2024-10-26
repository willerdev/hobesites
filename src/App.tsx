import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import PostPage from './pages/PostPage';
import ChatPage from './pages/ChatPage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SettingsPage from './pages/SettingsPage';
import Footer from './components/Footer';
import DesktopFooter from './components/DesktopFooter';

function App() {
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
        {isDesktop ? <DesktopFooter /> : <Footer />}
      </div>
    </Router>
  );
}

export default App;
