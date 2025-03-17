import React, { useState } from "react";
import axios from "axios";
import UserSidebar from "../../Components/SidebarUser"; 
import "./userSearchBook.scss";

const SearchBooks = () => {
  const [searchParams, setSearchParams] = useState({
    title: "",
    author: "",
    publisher: "",
  });
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setSearched(false);
    setLoading(true);

    const token = localStorage.getItem("token"); // Get token from localStorage
    if (!token) {
      setError("No token found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      // Prepare query params: only include non-empty fields
      const params = {};
      if (searchParams.title) params.title = searchParams.title;
      if (searchParams.author) params.author = searchParams.author;
      if (searchParams.publisher) params.publisher = searchParams.publisher;

      // Ensure we have at least one search term to send
      if (Object.keys(params).length === 0) {
        setError("Please enter at least one search parameter.");
        setLoading(false);
        return;
      }

      // Send request to the API
      const response = await axios.get("http://localhost:8080/api/books/search", {
        params,
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
      });

      // Check if response data is present and set the books accordingly
      if (response.data && response.data.books) {
        setBooks(response.data.books);
        setSearched(true);
      } else {
        setError("No books found for the given search criteria.");
      }
    } catch (err) {
      setError("Failed to fetch books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-books-container">
      <UserSidebar />

      <div className="content">
        <h2>Search for Books</h2>

        <form className="search-form" onSubmit={handleSearch}>
          <div className="input-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={searchParams.title}
              onChange={handleChange}
              placeholder="Enter book title"
            />
          </div>

          <div className="input-group">
            <label>Author:</label>
            <input
              type="text"
              name="author"
              value={searchParams.author}
              onChange={handleChange}
              placeholder="Enter author's name"
            />
          </div>

          <div className="input-group">
            <label>Publisher:</label>
            <input
              type="text"
              name="publisher"
              value={searchParams.publisher}
              onChange={handleChange}
              placeholder="Enter publisher"
            />
          </div>

          <button type="submit" className="search-btn">Search</button>
        </form>

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}

        {searched && books.length === 0 && !loading && (
          <p className="no-results">No books found for the given search criteria.</p>
        )}

        {books.length > 0 && (
          <div className="results">
            <table>
              <thead>
                <tr>
                  <th>ISBN</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Publisher</th>
                  <th>Available Copies</th>
                  <th>Library ID</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.isbn}>
                    <td>{book.isbn}</td>
                    <td>{book.title}</td>
                    <td>{book.author || "Unknown"}</td>
                    <td>{book.publisher || "Unknown"}</td>
                    <td>
                      {book.available_copies > 0 ? (
                        <span className="available">{book.available_copies}</span>
                      ) : (
                        <span className="unavailable">Not Available</span>
                      )}
                    </td>
                    <td>{book.library_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBooks;
