import React, { useState, useEffect } from "react";
import axios from "axios";
import "./cssFiles/UnassignContractor.css";

const UnassignContractor = () => {
  const [contractorList, setContractorList] = useState([]);

  const fetchContractorList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/client/Administrator/:id/completedWork"
      );

      setContractorList(response.data.data);
    } catch (error) {
      console.error("Error fetching contractor list:", error);
    }
  };
  useEffect(() => {
    fetchContractorList();
  }, []);
  const handleUnassignContractor = async (contractorId, projectId) => {
    try {
      await axios.post(
        "http://localhost:5000/client/Administrator/:id/completedWork",
        {
          contractorId: contractorId,
          projectId: projectId,
        }
      );

      // Fetch the updated contractor list after unassigning
      fetchContractorList();
    } catch (error) {
      console.error("Error unassigning contractor:", error);
    }
  };

  return (
    <>
      <div className="userprojectsTable">
        <h4>Working Contractor List</h4>
      </div>
      <div className="user-projects-table-container">
        <table className="user-projects-table">
          <thead>
            <tr>
              <th>Project Title</th>
              <th>Contractor Name</th>
              <th>Contractor Specialties</th>
              <th>Contractor's Work</th>
              <th>Accept/Reject</th>
            </tr>
          </thead>
          {contractorList.length > 0 ? (
            <tbody>
              {contractorList.map((contractor) => (
                <tr key={contractor.projectId + contractor.contractorId}>
                  <td>{contractor.projectTitle}</td>
                  <td>{contractor.contractorName}</td>
                  <td>{contractor.contractorSpecialties}</td>
                  <td>{contractor.contractorWork}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleUnassignContractor(
                          contractor.contractorId,
                          contractor.projectId
                        )
                      }
                      className="verify-contractor-button verify-contractor-button-accept unassigncontractor"
                    >
                      UNASSIGN
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="5" className="projects-table-no-projects">
                  No Projects
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};

export default UnassignContractor;
