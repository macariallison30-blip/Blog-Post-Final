import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import BlogPostsPage from './pages/BlogPostsPage';
import IndividualPostPage from './pages/IndividualPostPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/posts" element={<BlogPostsPage />} />
        <Route path="/post/:id" element={<IndividualPostPage />} />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <ContactPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
