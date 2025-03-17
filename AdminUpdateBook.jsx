import React, { useState, useEffect } from "react";
import AdminSidebar from "../../Components/SidebarAdmin";
import axios from "axios";
import "./AdminUpdateBook.scss";  // Import your SCSS file

const AdminUpdateBook = () => {
  const [book, setBook] = useState({
    isbn: '',
    title: '',
    author: '',
    publisher: '',
    copies: 0,
  });
  
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/api/book/${book.isbn}`, book, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,  // Assuming token is saved in localStorage
        },
      });
      setMessage(response.data.message || "Book updated successfully!");
    } catch (error) {
      setMessage("Failed to update book.");
    }
  };

  useEffect(() => {
    // Fetch book details for the given ISBN if necessary
    // Here we can use axios to fetch data and populate the state
  }, []); // Add dependencies if you need to load data initially

  return (
    <div className="admin-update-book">
      <AdminSidebar />
      <div className="content">
        <h2>Update Book Information</h2>
        <form onSubmit={handleSubmit} className="update-book-form">
          <div className="form-group">
            <label htmlFor="isbn">ISBN</label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={book.isbn}
              onChange={handleInputChange}
              placeholder="Enter ISBN"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={book.title}
              onChange={handleInputChange}
              placeholder="Enter book title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={book.author}
              onChange={handleInputChange}
              placeholder="Enter author's name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="publisher">Publisher</label>
            <input
              type="text"
              id="publisher"
              name="publisher"
              value={book.publisher}
              onChange={handleInputChange}
              placeholder="Enter publisher name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="copies">Copies</label>
            <input
              type="number"
              id="copies"
              name="copies"
              value={book.copies}
              onChange={handleInputChange}
              placeholder="Enter number of copies"
              required
            />
          </div>

          <button type="submit" className="submit-button">Update Book</button>
        </form>

        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
};

export default AdminUpdateBook;
