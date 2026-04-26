import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function CommentSection({ postId, comments, setComments }) {
  const { isAuthenticated, user } = useAuth();
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!name.trim() || !comment.trim()) {
      setError('Both fields are required.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            postId: Number(postId),
            name: name,
            email: `${name}@example.com`,
            body: comment,
          }),
        }
      );

      if (!response.ok) throw new Error('Failed to post comment.');

      const newComment = await response.json();
      setComments((prev) => [newComment, ...(prev || [])]);
      setName('');
      setComment('');
      setSuccess(true);
    } catch {
      setError('Unable to submit comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="comments-section">
      <h3>Comments</h3>

      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="comment-form">
          <p className="commenting-as">
            Commenting as <strong>{user.displayName}</strong>
          </p>
          <input
            type="text"
            placeholder="Your display name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Share your thoughts…"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {error && <p className="error-text" role="alert"><span>⚠</span> {error}</p>}
          {success && <p className="success-text">✓ Comment posted!</p>}
          <div className="button-row">
            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? 'Posting…' : 'Post Comment'}
            </button>
          </div>
        </form>
      ) : (
        <div className="login-prompt">
          <p>
            <span className="lock-icon">🔒</span>
            Want to join the conversation?{' '}
            <Link to="/login" className="login-prompt-link">Sign in</Link>{' '}
            to leave a comment.
          </p>
        </div>
      )}

      <div className="existing-comments">
        <h4>Comment List:</h4>
        {!comments || comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          <ul>
            {comments.map((item) => (
              <li key={item.id}>
                <strong>{item.name}:</strong> {item.body}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default CommentSection;
