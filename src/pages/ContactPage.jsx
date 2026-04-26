import { useState } from 'react';

function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert('Message submitted!');
    setForm({ name: '', email: '', message: '' });
  }

  return (
    <main className="main-content">
      <div className="post-wrapper">
        <h2>Contact Us</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label><br />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <br />

          <div>
            <label>Email:</label><br />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <br />

          <div>
            <label>Message:</label><br />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <br />

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}

export default ContactPage;