import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllContractors = (id) => {
  // console.log(id);
  const navigate = useNavigate();
  const [contractors, setContractors] = useState([]);
  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/client/Administrator/${id}/allContractors`
        );
        setContractors(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error as needed
      }
    };
    fetchData();
  }, []);
  const handleRowClick = (conId) => {
    navigate(`/client/Administrator/${id.id}/allContractors/${conId}`);
  };

  return (
    <>
      <div className="userprojectsTable">
        <h4>All Contractors</h4>
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
              <th>Status</th>
            </tr>
          </thead>
          {contractors.length > 0 ? (
            <tbody>
              {contractors.map((contractor) => (
                <tr
                  key={contractor.contractorId}
                  onClick={() => handleRowClick(contractor.contractorId)}
                >
                  <td>{contractor.contractorName}</td>
                  <td>{contractor.contractorEmail}</td>
                  <td>{contractor.contractorCNIC}</td>
                  <td>{contractor.contractorPhoneNo}</td>
                  <td>{contractor.contractorSpecialties}</td>
                  <td>
                    {contractor.contractorStatus === 0 ? "Free" : "Working"}
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="6" className="projects-table-no-projects">
                  No Contractor
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};

export default AllContractors;
