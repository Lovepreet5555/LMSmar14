import React, { useState } from "react";
import AdminSidebar from "../../Components/SidebarAdmin";  // Import the sidebar component
import "./AdminRemoveBook.scss";  // Import SCSS for styling

const AdminRemoveBook = () => {
  const [isbn, setIsbn] = useState("");
  const [libraryId, setLibraryId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRemoveBook = async (e) => {
    e.preventDefault();
    setMessage("");  // Clear previous messages
    setError("");    // Clear previous error

    try {
      const response = await fetch(`/api/book/remove/${isbn}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,  // Assuming you're storing token in localStorage
        },
        body: JSON.stringify({ libraryid: libraryId }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to remove the book. Please try again later.");
    }
  };

  return (
    <div className="admin-remove-book-container">
      <AdminSidebar />
      <div className="content">
        <h2>Remove Book from Library</h2>
        
        <form onSubmit={handleRemoveBook}>
          <div className="form-group">
            <label htmlFor="isbn">Book ISBN:</label>
            <input
              type="text"
              id="isbn"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              placeholder="Enter ISBN of the book"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="libraryId">Library ID:</label>
            <input
              type="number"
              id="libraryId"
              value={libraryId}
              onChange={(e) => setLibraryId(e.target.value)}
              placeholder="Enter Library ID"
              required
            />
          </div>

          <button type="submit">Remove Book</button>
        </form>

        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default AdminRemoveBook;
