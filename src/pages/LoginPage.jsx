import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Already logged in
  if (isAuthenticated) {
    navigate('/posts');
    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Username is required.');
      return;
    }
    if (!password.trim()) {
      setError('Password is required.');
      return;
    }

    setLoading(true);
    // slight delay
    setTimeout(() => {
      const result = login(username.trim(), password);
      if (result.success) {
        navigate('/posts');
      } else {
        setError(result.error);
        setLoading(false);
      }
    }, 400);
  }

  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">✦</div>
          <h1>Welcome back</h1>
          <p>Sign in to your account to continue reading</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="field-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
            />
          </div>

          <div className="field-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-pw"
                onClick={() => setShowPassword((s) => !s)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {error && (
            <div className="login-error" role="alert">
              <span>⚠</span> {error}
            </div>
          )}

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-text">Signing in…</span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p className="demo-hint">
            Demo credentials: <code>demo</code> / <code>demo123</code>
          </p>
          <p>
            <Link to="/" className="back-link">← Back to home</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
