import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from '../components/CommentSection';

function IndividualPostPage() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPostData() {
      try {
        setLoading(true);
        setError('');

        const postResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );

        if (!postResponse.ok) {
          throw new Error('Failed to fetch post.');
        }

        const postData = await postResponse.json();
        setPost(postData);

        const userResponse = await fetch(
          `https://jsonplaceholder.typicode.com/users/${postData.userId}`
        );

        if (!userResponse.ok) {
          throw new Error('Failed to fetch author.');
        }

        const userData = await userResponse.json();
        setUser(userData);

        const commentsResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        );

        if (!commentsResponse.ok) {
          throw new Error('Failed to fetch comments.');
        }

        const commentsData = await commentsResponse.json();
        setComments(commentsData);

        setLoading(false);
      } catch (err) {
        setError('Unable to load this post right now.');
        setLoading(false);
      }
    }

    fetchPostData();
  }, [id]);

  if (loading) {
    return (
      <main className="main-content">
        <p>Loading post...</p>
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

  if (!post) {
    return (
      <main className="main-content">
        <p>Post not found.</p>
      </main>
    );
  }

  return (
    <main className="main-content">
      <div className="post-wrapper">
        <h2>{post.title}</h2>
        <p className="post-content">{post.body}</p>

        {user && (
          <div className="author-box">
            <p><strong>Author:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        )}

        <CommentSection
        postId={post?.id}
        comments={comments}
        setComments={setComments}
        />
      </div>
    </main>
  );
}

export default IndividualPostPage;