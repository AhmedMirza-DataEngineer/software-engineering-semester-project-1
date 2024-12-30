import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./cssFiles/DashTemplate.css";
import dashLogo from "../images/dashBoardLogoImg.png";
import dashAddIcon from "../icons/dashboardAddIcon.png";
import dashEditIcon from "../icons/dashboardEditIcon.png";
import dashLogoutIcon from "../icons/dashboardLogoutIcon.png";
import dashProjectIcon from "../icons/dashboardProjectsIcon.png";
import dashRequestIcon from "../icons/dashboardProjectRequestIcon.png";
import dashUserIcon from "../icons/dashboardUsersIcon.png";
import dashassignIcon from "../icons/dashboardAssignIcon.png";
import dashVerifyIcon from "../icons/dashboardVerifyIcon.png";
import ProfilePage from "./ProfilePage";
import ProjectsTable from "./ProjectsTable";
import RequestProject from "./RequestProject";
import CheckRequest from "./CheckRequest";
import ContractorProject from "./ContractorProject";
import AllProjects from "./AllProjects";
import AllUsers from "./AllUsers";
import AllContractors from "./AllContractors";
import VerifyContractor from "./VerifyContractor";
import AssignContractor from "./AssignContractor";
import SpecficUser from "./SpecficUser";
import SpecficContractor from "./SpecficContractor";
import SpecficProject from "./SpecficProject";
import UnassignContractor from "./UnassignContractor";
import UserSpecficProject from "./UserSpecficProject";
import UploadProgress from "./UploadProgress";
import VerifyProgress from "./VerifyProgress";
import CreateProject from "./CreateProject";
import CreateProjectInsert from "./CreateProjectInsert";
import Meetings from "./Meetings";
import UnverifiedContractor from "./UnverifiedContractor";
// import ContractorUnverified from "./ContractorUnverified";

const DashTemplate = (loadWith) => {
  const { tableName, id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("isContractorUnverified");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const columnMapping = {
    Users: "userName",
    Contractors: "contractorName",
    Administrator: "adminName",
  };
  let checkval = false;
  useEffect(() => {
    if (tableName) {
      // Replace with your Express.js server URL
      const apiUrl = `http://localhost:5000/client`;

      axios
        .post(apiUrl, { tablename: tableName, id })
        .then((response) => {
          const data = response.data;
          setUserData(data.user);
        })
        .catch((error) => {
          console.error("Error fetching data from the server:", error);
        });
    }
  }, [tableName, id]);
  if (tableName === "Contractors") {
    const isContractorUnverified = JSON.parse(
      localStorage.getItem("isContractorUnverified")
    );
    checkval = isContractorUnverified;

    console.log(checkval);
  }

  console.log(checkval);
  return (
    <>
      <div className="dashboard-container1">
        <div className="dashboard-container1-left">
          <img src={dashLogo} alt="main-logo" />
          <div>{tableName}</div>
          <div className="dash-left-full-box">
            {tableName === "Users" && (
              <>
                <Link
                  to={`/client/Users/${id}/requestProject`}
                  className="dashboard-left-profie-btns"
                >
                  <div className="dashboard-left-profie-btns">
                    <img src={dashAddIcon} alt="add profile" />
                    <p>Create Project</p>
                  </div>
                </Link>
                <Link
                  to={`/client/${tableName}/${id}/projects`}
                  className="dashboard-left-profie-btns"
                >
                  <div className="dashboard-left-profie-btns">
                    <img src={dashProjectIcon} alt="add profile" />
                    <p>My Projects</p>
                  </div>
                </Link>
                <Link
                  to={`/client/${tableName}/${id}/checkRequest`}
                  className="dashboard-left-profie-btns"
                >
                  <div className="dashboard-left-profie-btns">
                    <img src={dashassignIcon} alt="add profile" />
                    <p>My Requests</p>
                  </div>
                </Link>
              </>
            )}
            {tableName === "Contractors" && !checkval && (
              <>
                <Link
                  to={`/client/${tableName}/${id}/contractorProjects`}
                  className="dashboard-left-profie-btns"
                >
                  <div className="dashboard-left-profie-btns">
                    <img src={dashProjectIcon} alt="add profile" />
                    <p>My Projects</p>
                  </div>
                </Link>
              </>
            )}
            {tableName === "Contractors" && checkval && (
              <>
                <Link
                  to={`/client/${tableName}/${id}/meeting`}
                  className="dashboard-left-profie-btns"
                >
                  <div className="dashboard-left-profie-btns">
                    <img src={dashProjectIcon} alt="add profile" />
                    <p>Meeting</p>
                  </div>
                </Link>
              </>
            )}
            {tableName === "Administrator" && (
              <>
                <Link
                  to={`/client/${tableName}/${id}/allProjects`}
                  className="dashboard-left-profie-btns"
                >
                  <div className="dashboard-left-profie-btns">
                    <img src={dashProjectIcon} alt="add profile" />
                    <p>All Projects</p>
                  </div>
                </Link>
                <Link
                  to={`/client/${tableName}/${id}/allUsers`}
                  className="dashboard-left-profie-btns"
                >
                  <div className="dashboard-left-profie-btns">
                    <img src={dashUserIcon} alt="add profile" />
                    <p>All Users</p>
                  </div>
                </Link>
                <Link
                  to={`/client/${tableName}/${id}/allContractors`}
                  className="dashboard-left-profie-btns"
                >
                  <div className="dashboard-left-profie-btns">
                    <img src={dashRequestIcon} alt="add profile" />
                    <p>All Contractors</p>
                  </div>
                </Link>
                <Link
                  to={`/client/${tableName}/${id}/verifyContractor`}
                  className="dashboard-left-profie-btns"
                >
                  <div className="dashboard-left-profie-btns">
                    <img src={dashVerifyIcon} alt="add profile" />
                    <p>Verify Contractor</p>
                  </div>
                </Link>
                <Link
                  to={`/client/${tableName}/${id}/createProject`}
                  className="dashboard-left-profie-btns"
                >
                  <div className="dashboard-left-profie-btns">
                    <img src={dashEditIcon} alt="view/delete profile" />
                    <p>Create Project</p>
                  </div>
                </Link>
                <Link
                  to={`/client/${tableName}/${id}/assignContractor`}
                  className="dashboard-left-profie-btns"
                >
                  <div className="dashboard-left-profie-btns">
                    <img src={dashassignIcon} alt="add profile" />
                    <p>Assign Project</p>
                  </div>
                </Link>
                <Link
                  to={`/client/${tableName}/${id}/verifyProgress`}
                  className="dashboard-left-profie-btns"
                >
                  <div className="dashboard-left-profie-btns">
                    <img src={dashVerifyIcon} alt="add profile" />
                    <p>Verify Progress</p>
                  </div>
                </Link>
              </>
            )}
            <Link
              to={`/client/${tableName}/${id}`}
              className="dashboard-left-profie-btns"
            >
              <div className="dashboard-left-profie-btns">
                <img src={dashEditIcon} alt="view/delete profile" />
                <p>Edit Profile</p>
              </div>
            </Link>
            <Link className="dashboard-left-profie-btns" onClick={handleLogout}>
              <div className="dashboard-left-profie-btns">
                <img src={dashLogoutIcon} alt="logout" />
                <p>Logout</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="dashboard-container1-right">
          {userData && (
            <div className="dashboard-container-top">
              <Link
                to={`/client/${tableName}/${id}`}
                className="dashboard-link-p"
              >
                <p>{userData[columnMapping[tableName]]}</p>
              </Link>
              <div className="dashboard-container-top-name">
                <Link
                  className="dashboard-link"
                  to={`/client/${tableName}/${id}`}
                >
                  <h2>
                    {userData[columnMapping[tableName]] &&
                      userData[columnMapping[tableName]]
                        .split(" ")
                        .map((word) => word[0].toUpperCase())
                        .join("")}
                  </h2>
                </Link>
              </div>
            </div>
          )}
          {checkval && (
            <div className="notification-bar">Account Not Verified</div>
          )}
          <div className="dashboard-container-bottom">
            <div
              className="dashboard-container-projects"
              id={loadWith === "SpecficProject" ? "specfic-project-size" : ""}
            >
              {userData && loadWith.loadWith === "ProfilePage" && (
                <ProfilePage userData={userData} tableName={tableName} />
              )}
              {userData && loadWith.loadWith === "ProjectsTable" && (
                <ProjectsTable
                  userData={userData}
                  tableName={tableName}
                  id={id}
                />
              )}
              {userData && loadWith.loadWith === "ProjectRequest" && (
                <RequestProject id={id} />
              )}
              {userData && loadWith.loadWith === "CheckRequest" && (
                <CheckRequest id={id} />
              )}
              {userData && loadWith.loadWith === "ContractorProjects" && (
                <ContractorProject id={id} />
              )}
              {userData && loadWith.loadWith === "AllProjects" && (
                <AllProjects id={id} />
              )}
              {userData && loadWith.loadWith === "AllUsers" && (
                <AllUsers id={id} />
              )}
              {userData && loadWith.loadWith === "AllContractors" && (
                <AllContractors id={id} />
              )}
              {userData && loadWith.loadWith === "VerifyContractor" && (
                <VerifyContractor id={id} />
              )}
              {userData && loadWith.loadWith === "AssignContractor" && (
                <AssignContractor id={id} />
              )}
              {userData && loadWith.loadWith === "SpecficUser" && (
                <SpecficUser id={id} />
              )}
              {userData && loadWith.loadWith === "SpecficContractor" && (
                <SpecficContractor id={id} />
              )}
              {userData && loadWith.loadWith === "SpecficProject" && (
                <SpecficProject id={id} tableName={tableName} />
              )}
              {userData && loadWith.loadWith === "UnassignContractor" && (
                <UnassignContractor id={id} />
              )}
              {userData && loadWith.loadWith === "UserSpecficProject" && (
                <UserSpecficProject id={id} />
              )}
              {userData && loadWith.loadWith === "UploadProgress" && (
                <UploadProgress id={id} />
              )}
              {userData && loadWith.loadWith === "VerifyProgress" && (
                <VerifyProgress id={id} />
              )}
              {userData && loadWith.loadWith === "CreateProject" && (
                <CreateProject id={id} />
              )}{" "}
              {userData && loadWith.loadWith === "CreateProjectInsert" && (
                <CreateProjectInsert id={id} />
              )}{" "}
              {userData && loadWith.loadWith === "Meetings" && (
                <Meetings id={id} />
              )}
              {userData && loadWith.loadWith === "UnverifiedContractor" && (
                <UnverifiedContractor id={id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DashTemplate;
