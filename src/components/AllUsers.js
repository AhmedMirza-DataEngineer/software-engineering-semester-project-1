import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AllUsers = (id) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/client/Administrator/${id}/allUsers`
        );
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error as needed
      }
    };
    fetchData();
  }, []);
  const handleRowClick = (usrId) => {
    navigate(`/client/Administrator/${id.id}/allUsers/${usrId}`);
  };
  return (
    <>
      <div className="userprojectsTable">
        <h4>All Users</h4>
      </div>
      <div className="user-projects-table-container">
        <table className="user-projects-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>CNIC</th>
              <th>PhoneNumber</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.userId} onClick={() => handleRowClick(user.userId)}>
                <td>{user.userName}</td>
                <td>{user.userEmail}</td>
                <td>{user.userCNIC}</td>
                <td>{user.userPhoneNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllUsers;
