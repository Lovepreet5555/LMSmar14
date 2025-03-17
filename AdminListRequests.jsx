import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../../Components/SidebarAdmin";  
import "./adminListRequests.scss"; 

const AdminListRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        const response = await axios.get("http://localhost:8080/api/issues", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(response.data.requests);
      } catch (err) {
        setError("Failed to fetch requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="admin-requests-container">
      <AdminSidebar />
      <div className="content">
        <h2>Issue Requests</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : requests.length === 0 ? (
          <p>No requests found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Book ID</th>
                <th>User ID</th>
                <th>Request Type</th>
                <th>Request Date</th>
                <th>Approval Date</th>
                <th>Approver ID</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>{request.book_id}</td>
                  <td>{request.user_id}</td>
                  <td>{request.request_type}</td>
                  <td>{request.request_date}</td>
                  <td>{request.approval_date || "Pending"}</td>
                  <td>{request.approver_id || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminListRequests;
