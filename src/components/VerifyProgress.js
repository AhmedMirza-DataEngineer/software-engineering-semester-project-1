import React, { useState, useEffect } from "react";
import axios from "axios";

const VerifyProgress = (id) => {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetchData();
  });
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/client/Administrator/${id.id}/verifyProgress`
      );

      if (response.status === 200) {
        setProgressData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleReject = async (progressId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/client/Administrator/${id.id}/verifyProgress`,
        {
          data: { progressId },
        }
      );

      if (response.status === 200) {
        alert("Progress Deleted Successfully");
        // Update the UI by refetching the data
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting progress:", error);
    }
  };
  const handleAccept = async (progressId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/client/Administrator/${id.id}/verifyProgress`,
        {
          progressId,
        }
      );

      if (response.status === 200) {
        alert("Progress Updated Successfully");
        // Update the UI by refetching the data
        fetchData();
      }
    } catch (error) {
      console.error("Error accepting progress:", error);
    }
  };

  return (
    <>
      <div className="userprojectsTable">
        <h4>Pending Verification</h4>
      </div>
      <div className="user-projects-table-container">
        <table className="user-projects-table">
          <thead>
            <tr>
              <th>Contractor Name</th>
              <th>Project Title</th>
              <th>Date</th>
              <th>Progress</th>
              <th>Progress Info</th>
              <th>Accept / Reject</th>
            </tr>
          </thead>

          <tbody>
            {progressData.length > 0 ? (
              progressData.map((item) => (
                <tr key={item.progressId}>
                  <td>{item.contractorName}</td>
                  <td>{item.projectTitle}</td>
                  <td>
                    {new Date(item.progressDateTime).toLocaleDateString()}
                  </td>
                  <td>{item.contractorProgress}</td>
                  <td>{item.progressInformation}</td>
                  <td>
                    <button
                      onClick={() => handleAccept(item.progressId)}
                      className="verify-contractor-button verify-contractor-button-accept"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(item.progressId)}
                      className="verify-contractor-button verify-contractor-button-reject"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="projects-table-no-projects">
                  No Requests
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default VerifyProgress;
