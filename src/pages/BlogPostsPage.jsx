import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function BlogPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch posts.');
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Unable to load blog posts right now.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="main-content">
        <p>Loading blog posts...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="main-content">
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="main-content">
      <h2>All Blog Posts</h2>

      {posts.map((post) => (
        <div key={post.id} className="post-wrapper">
          <h3>{post.title}</h3>
          <p>{post.body.substring(0, 100)}...</p>

          <Link to={`/post/${post.id}`}>Read More</Link>
        </div>
      ))}
    </main>
  );
}

export default BlogPostsPage;