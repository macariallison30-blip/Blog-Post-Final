import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'white' }}>
          My Blog
        </Link>

        <nav>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/posts">Posts</Link></li>
            {isAuthenticated && <li><Link to="/contact">Contact</Link></li>}

            <li>
              <button onClick={toggleTheme} className="theme-btn">
                {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
              </button>
            </li>

            {isAuthenticated ? (
              <>
                <li className="nav-user">
                  <span className="nav-avatar">{user.displayName.charAt(0)}</span>
                  <span className="nav-display-name">{user.displayName}</span>
                </li>
                <li>
                  <button onClick={handleLogout} className="logout-btn">
                    Log Out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="nav-login-btn">Sign In</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
