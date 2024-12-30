import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UnverifiedContractor = (id) => {
  const contractorId = useParams();
  //   console.log(id.id, contractorId.contractorId);
  const [meetingData, setMeetingData] = useState([]);
  const [documentData, setDocumentData] = useState();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const dropdownRef = useRef(null);
  const [dropdown, setDropdown] = useState(false);

  const handleDropdown = (val) => {
    setDropdown(!dropdown);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/client/Administrator/${id.id}/verifyContractor/${contractorId.contractorId}`
      );
      setMeetingData(response.data.data);
      setDocumentData(response.data.document);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching meeting data:", error);
    }
  }, [id, contractorId]);

  useEffect(() => {
    const presentDateTime = () => {
      const currentDate = new Date().toISOString().slice(0, 10);
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
      setDate(currentDate);
      setTime(currentTime);
    };

    presentDateTime();
    fetchData();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [fetchData]);

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const formattedDate = dateTime.toLocaleDateString();
    const formattedTime = dateTime.toLocaleTimeString();
    return { formattedDate, formattedTime };
  };

  const handleDownload = (documentName, documentData) => {
    const blob = new Blob([documentData]);

    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = documentName;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleSave = async () => {
    const confirmation = window.confirm("Do you want to add a new meeting?");
    if (confirmation) {
      try {
        const formattedDateTime = `${date} ${time}`;
        await axios.post(
          `http://localhost:5000/client/Administrator/${id.id}/verifyContractor/${contractorId.contractorId}`,
          {
            contractorId: contractorId.contractorId,
            meetingDateTime: formattedDateTime,
          }
        );
        alert("Meeting added successfully:");

        fetchData();
      } catch (error) {
        alert("Error adding meeting:", error);
      }
    }
  };

  return (
    <>
      <div className="special-new-meeting-schedule">
        <h4>Meeting</h4>
        <div className="dropdown-meeting-new" ref={dropdownRef}>
          <button
            onClick={() => handleDropdown(dropdown)}
            className="verify-contractor-button verify-contractor-button-reject"
          >
            NEW MEETING
          </button>
          <div
            className={`dropdown-content-new-meeting ${
              !dropdown ? "dropdown-hidden" : ""
            }`}
          >
            <input
              type="date"
              placeholder="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="time"
              placeholder="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <button onClick={handleSave}>SAVE</button>
          </div>
        </div>
      </div>

      <div
        className="user-projects-table-container"
        id="assignProject-container"
      >
        <div className="meetings-tbl">
          <div className="scrollable-table-container">
            <table className="user-projects-table assigncontractor-left">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              {meetingData.length > 0 ? (
                <tbody>
                  {meetingData.map((meeting) => (
                    <tr key={meeting.meetingId}>
                      <td>
                        {formatDateTime(meeting.meetingDate).formattedDate}
                      </td>
                      <td>
                        {formatDateTime(meeting.meetingDate).formattedTime}
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan="2" className="projects-table-no-projects">
                      No Meeting
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
        <div className="upload-documents">
          <h4>Uploaded Documents</h4>
          {documentData && documentData.length > 0 ? (
            <div className="preview-documents">
              {documentData.map((document) => (
                <div key={document.documentId} className="document-item">
                  <p>Document Name: {document.documentName}</p>
                  <button
                    className="verify-contractor-button verify-contractor-button-reject download-button-document"
                    onClick={() =>
                      handleDownload(
                        document.documentName,
                        document.documentData
                      )
                    }
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="preview-documents">
              <p>No Documents Uploaded</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UnverifiedContractor;
