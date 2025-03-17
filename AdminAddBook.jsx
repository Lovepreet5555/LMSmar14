import React, { useState } from "react";
import AdminSidebar from "../../Components/SidebarAdmin"; // Import the sidebar component
import axios from "axios";
import "./AdminAddBook.scss"; // You can add styles for the add book page

const AdminAddBook = () => {
  // State variables for form fields and handling loading/error
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [publisher, setPublisher] = useState("");
  const [version, setVersion] = useState("");
  const [totalCopies, setTotalCopies] = useState("");
  const [libraryID, setLibraryID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const bookData = {
      ISBN: isbn,
      Title: title,
      Authors: authors,
      Publisher: publisher,
      Version: version,
      TotalCopies: totalCopies,
      LibraryID: libraryID,
    };

    try {
      // Send data to the backend API for adding a book
      const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage

      const response = await axios.post(
        "http://localhost:8080/api/books", // Backend route for adding books
        bookData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage(response.data.message); // Show success message
      setLoading(false);
    } catch (error) {
      setErrorMessage("Failed to add the book. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="admin-add-book-container">
      <AdminSidebar />
      <div className="content">
        <h2>Add a New Book</h2>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="isbn">ISBN:</label>
            <input
              type="text"
              id="isbn"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="authors">Authors:</label>
            <input
              type="text"
              id="authors"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="publisher">Publisher:</label>
            <input
              type="text"
              id="publisher"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="version">Version:</label>
            <input
              type="text"
              id="version"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="totalCopies">Total Copies:</label>
            <input
              type="number"
              id="totalCopies"
              value={totalCopies}
              onChange={(e) => setTotalCopies(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="libraryID">Library ID:</label>
            <input
              type="number"
              id="libraryID"
              value={libraryID}
              onChange={(e) => setLibraryID(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddBook;
