import React, { useState, useEffect } from "react";
import axios from "axios";
import "./cssFiles/VerifyContractor.css";
import { useNavigate } from "react-router-dom";

const VerifyContractor = (id) => {
  const navigate = useNavigate();
  const [contractors, setContractors] = useState([]);
  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/client/Administrator/${id}/verifyContractor`
        );
        setContractors(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error as needed
      }
    };
    fetchData();
  }, []);
  const updateVerificationStatus = async (contractorId, isVerified) => {
    try {
      const url = `http://localhost:5000/client/Administrator/${id.id}/verifyContractor`;
      const requestData = { contractorId };
      const response = isVerified
        ? await axios.post(url, requestData)
        : await axios.delete(url, { data: requestData });

      // Update the local state to reflect the change
      if (response.data && response.data.status === "OK") {
        setContractors((prevContractors) =>
          prevContractors.map((contractor) =>
            contractor.contractorId === contractorId
              ? { ...contractor, verified: isVerified }
              : contractor
          )
        );
      }
    } catch (error) {
      console.error("Error updating verification status:", error);
      // Handle error as needed
    }
  };
  const handleRowClick = (conId) => {
    navigate(`/client/Administrator/${id.id}/verifyContractor/${conId}`);
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
              <th>Name</th>
              <th>Email</th>
              <th>CNIC</th>
              <th>PhoneNumber</th>
              <th>Specialties</th>
              <th>Accept / Reject</th>
            </tr>
          </thead>

          <tbody>
            {contractors.length ? (
              contractors.map((contractor) => (
                <tr key={contractor.contractorId}>
                  <td onClick={() => handleRowClick(contractor.contractorId)}>
                    {contractor.contractorName}
                  </td>
                  <td onClick={() => handleRowClick(contractor.contractorId)}>
                    {contractor.contractorEmail}
                  </td>
                  <td onClick={() => handleRowClick(contractor.contractorId)}>
                    {contractor.contractorCNIC}
                  </td>
                  <td onClick={() => handleRowClick(contractor.contractorId)}>
                    {contractor.contractorPhoneNo}
                  </td>
                  <td onClick={() => handleRowClick(contractor.contractorId)}>
                    {contractor.contractorSpecialties}
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        updateVerificationStatus(contractor.contractorId, true)
                      }
                      className="verify-contractor-button verify-contractor-button-accept"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        updateVerificationStatus(contractor.contractorId, false)
                      }
                      className="verify-contractor-button verify-contractor-button-reject"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tbody>
                <tr>
                  <td colSpan="6" className="projects-table-no-projects">
                    No Requests
                  </td>
                </tr>
              </tbody>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default VerifyContractor;
