import React, { useState, useEffect } from "react";
import UserSidebar from "../../Components/SidebarUser";  // Import the sidebar component
import axios from "axios"; // Assuming you're using axios for API calls
import "./StatusIssue.scss";

const UserStatusIssue = () => {
  const [statusData, setStatusData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch the status of the book issue request when the component is mounted
  useEffect(() => {
    const fetchStatus = async () => {
      const token = localStorage.getItem("token"); // Assuming the token is saved in localStorage

      if (!token) {
        setError("No token found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/api/issue/status", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        setStatusData(response.data); // Set status data when the response is successful
        setError(""); // Clear any existing error
      } catch (err) {
        setStatusData(null); // Clear status data if there's an error
        setError(err.response?.data?.error || "Unable to fetch issue status"); // Display error message
      } finally {
        setLoading(false); // Set loading to false after the fetch is complete
      }
    };

    fetchStatus(); // Call the fetch function on component mount
  }, []); // Empty dependency array to ensure it runs only once when the component is mounted

  return (
    <div className="status-issue-container">
      <UserSidebar />
      <div className="content">
        <h2>Check Book Issue Status</h2>

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        ) : (
          <div className="status-section">
            {statusData ? (
              <div className="status-details">
                <p><strong>Request ID:</strong> {statusData.request_id}</p>
                <p><strong>Book ID:</strong> {statusData.book_id}</p>
                <p><strong>Library ID:</strong> {statusData.library_id}</p>
                <p><strong>Request Date:</strong> {new Date(statusData.request_date * 1000).toLocaleString()}</p>
                <p><strong>Status:</strong> {statusData.status}</p>
                {statusData.approval_date && (
                  <p><strong>Approval Date:</strong> {new Date(statusData.approval_date * 1000).toLocaleString()}</p>
                )}
              </div>
            ) : (
              <p className="no-status">No status found for this request.</p>
            )}

            {error && <p className="error-message">{error}</p>} {/* Show error message if there's any */}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserStatusIssue;
