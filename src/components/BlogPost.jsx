function BlogPost({ title, content, author, date }) {
    return (
      <section className="blog-post">
        <h2>{title}</h2>
        <p className="post-content">{content}</p>
        <p><strong>Author:</strong> {author}</p>
        <p><strong>Date:</strong> {date}</p>
      </section>
    );
  }
  
  export default BlogPost;