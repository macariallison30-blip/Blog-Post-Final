import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const FEATURES = [
  {
    icon: '📖',
    title: 'Curated Stories',
    desc: 'Dive into thoughtfully written posts across technology, life, and ideas.',
  },
  {
    icon: '💬',
    title: 'Join the Conversation',
    desc: 'Leave comments, share reactions, and engage with the community.',
  },
  {
    icon: '🌙',
    title: 'Dark & Light Mode',
    desc: 'Read comfortably at any hour with a theme that suits your mood.',
  },
];

function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <main className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg-orb orb1" />
        <div className="hero-bg-orb orb2" />
        <div className="hero-content">
          <span className="hero-eyebrow">A space for ideas</span>
          <h1 className="hero-title">
            Stories that<br />
            <span className="hero-gradient-text">make you think</span>
          </h1>
          <p className="hero-sub">
            My Blog is a personal collection of essays, reflections, and curious
            explorations. Honest writing for curious minds.
          </p>
          <div className="hero-cta-row">
            {isAuthenticated ? (
              <Link to="/posts" className="btn btn-primary">
                Explore Posts →
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary">
                  Sign In
                </Link>
                <Link to="/posts" className="btn btn-ghost">
                  Browse as Guest
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="card-stack">
            <div className="fake-card fc1">
              <div className="fc-line long" />
              <div className="fc-line medium" />
              <div className="fc-line short" />
            </div>
            <div className="fake-card fc2">
              <div className="fc-line medium" />
              <div className="fc-line long" />
              <div className="fc-line short" />
            </div>
            <div className="fake-card fc3">
              <div className="fc-line short" />
              <div className="fc-line long" />
              <div className="fc-line medium" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="features-section">
        <h2 className="section-title">What you'll find here</h2>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="cta-inner">
          <h2>Ready to dive in?</h2>
          <p>Join the conversation and explore posts from the community.</p>
          <div className="hero-cta-row">
            {isAuthenticated ? (
              <Link to="/posts" className="btn btn-white">
                Read the Blog →
              </Link>
            ) : (
              <Link to="/login" className="btn btn-white">
                Get Started →
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
