import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useParams } from "react-router-dom";

const Meetings = (id) => {
  // const { contractorId } = useParams();
  const maxFileSizeInBytes = 10 * 1024 * 1024;
  const [selectedFile, setSelectedFile] = useState(null);
  const [meetingData, setMeetingData] = useState([]);
  const [isUploadEnabled, setUploadEnabled] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/client/Contractors/${id.id}/meeting`)
      .then((response) => {
        setMeetingData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching meeting data:", error);
      });
  }, [id]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Check if a file is selected
    if (!file) {
      setUploadEnabled(false);
      alert("Please select a file.");
      return;
    }

    // Check file size
    if (file.size > maxFileSizeInBytes) {
      setUploadEnabled(false);
      alert("File size exceeds the maximum limit of 10 MB.");
      // Clear the selected file
      event.target.value = null;
      return;
    }

    // Set the selected file
    setSelectedFile(file);
    setUploadEnabled(true);
  };

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const formattedDate = dateTime.toLocaleDateString();
    const formattedTime = dateTime.toLocaleTimeString();
    return { formattedDate, formattedTime };
  };

  const resetFile = () => {
    setSelectedFile(null);
    setUploadEnabled(false);
    // Reset the file input value to allow selecting the same file again
    document.getElementById("fileInput").value = null;
  };

  const handleUpload = () => {
    // Handle file upload logic here
    if (selectedFile) {
      // Create a FormData object to send the file to the server
      const fileName = selectedFile.name;
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("contractorId", id.id);
      formData.append("fileName", fileName);
      // console.log(formData);

      // Make a POST request to your backend API
      axios
        .post(
          `http://localhost:5000/client/Contractors/${id.id}/meeting`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          alert("Documents Uploaded Successfully");
          resetFile();
        })
        .catch((error) => {
          console.error("Error uploading documents:", error);
          alert("Error uploading documents. Please try again.");
        });
    } else {
      alert("No file selected");
    }
  };

  return (
    <>
      <div
        className="user-projects-table-container"
        id="assignProject-container"
      >
        <div className="meetings-tbl">
          <h4>Meeting</h4>
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
                      {/* Use formatDateTime to separate date and time */}
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
                      No Meeting Yet
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
        <div className="upload-documents">
          <h4>Upload Documents</h4>
          <div>
            <div className="upload-documents-container">
              <div>
                {selectedFile && (
                  <div className="file-preview">
                    <h5>Preview:</h5>
                    {selectedFile.type.startsWith("image") ? (
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Preview"
                        className="preview-image"
                      />
                    ) : (
                      <p>Preview not available for this file type</p>
                    )}
                  </div>
                )}
                <p>Document Size: 10 MB Max</p>
                <input
                  type="file"
                  id="fileInput"
                  accept=".png, .jpg, .jpeg, .pdf"
                  onChange={handleFileChange}
                />
              </div>

              <div className="profilePage-form-row-button upload-buton double-button-upload-reset">
                <button onClick={handleUpload} disabled={!isUploadEnabled}>
                  UPLOAD
                </button>
                {selectedFile && (
                  <button onClick={resetFile} className="reset-button">
                    Reset File
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Meetings;
