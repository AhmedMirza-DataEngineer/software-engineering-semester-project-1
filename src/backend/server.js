const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
// const { useParams } = require("next/navigation");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// CREATE CONECTION
var pool = mysql.createPool({
  host: "localhost",
  user: "umar",
  password: "umar",
  database: "sitecraft_solutions",
});

// CONNECT TO DATABASE
// pool.connect((err) => {
//   if (err) {
//     console.error("error connecting Mysql", err);
//   } else {
//
//   }
// });

// LOGIN API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check Users table
    const user = await checkTable(
      "Users",
      "userEmail",
      "userPassword",
      email,
      password
    );

    // Check Contractors table
    const contractor = await checkTable(
      "Contractors",
      "contractorEmail",
      "contractorPassword",
      email,
      password
    );

    // Check Administrator table
    const admin = await checkTable(
      "Administrator",
      "adminEmail",
      "adminPassword",
      email,
      password
    );

    if (!user && !contractor && !admin) {
      // No matching user found in any table
      return res.status(404).json({ error: "User not found" });
    }

    // Determine which table the user was found in
    let fromTable = null;
    let isVerified = 0;
    if (user) {
      fromTable = "Users";
    } else if (contractor) {
      fromTable = "Contractors";
      isVerified = contractor.contractorVerified;
    } else if (admin) {
      fromTable = "Administrator";
    }

    res.json({
      message: "Login successful",
      user: user || contractor || admin,
      fromTable,
      isVerified,
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Login API Function
function checkTable(tableName, emailColumn, passwordColumn, email, password) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName} WHERE ${emailColumn} = ? AND ${passwordColumn} = ?`;

    pool.query(query, [email, password], (err, results) => {
      if (err) {
        console.error(`Error executing query for ${tableName} table:`, err);
        return reject(err);
      }

      if (results.length === 0) {
        // No matching user in this table
        return resolve(null);
      }
      const user = results[0];
      user.tableName = tableName;

      resolve(user);
    });
  });
}

// API for DashBoard
app.post("/client", (req, res) => {
  const { id, tablename } = req.body;

  let query;

  if (tablename === "Users") {
    query = "SELECT * FROM Users WHERE userId = ?";
  } else if (tablename === "Contractors") {
    query = "SELECT * FROM Contractors WHERE contractorId = ?";
  } else if (tablename === "Administrator") {
    query = "SELECT * FROM Administrator WHERE adminId = ?";
  } else {
    res.status(400).send("Invalid tablename");
    return;
  }

  pool.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      if (results.length > 0) {
        const user = results[0];
        res.json({ user });
      } else {
        res.status(404).send("User not found");
      }
    }
  });
});

// API for Update Profile
app.post("/client/:tableName/:id", async (req, res) => {
  try {
    const { tableName, id } = req.params;

    const {
      fullName,
      cnic,
      phoneNumber,
      password,
      newPassword,
      showChangePassword,
    } = req.body;
    const passwordMatch = await checkPassword(tableName, id, password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid Password" });
    }
    if (showChangePassword) {
      // Update with password
      await updateWithPassword(
        tableName,
        id,
        fullName,
        cnic,
        phoneNumber,
        newPassword
      );
    } else {
      // Update without password
      await updateWithoutPassword(tableName, id, fullName, cnic, phoneNumber);
    }

    let userId, userName;
    if (tableName === "Users") {
      userId = "userId";
      userName = "userName";
    } else if (tableName === "Contractors") {
      userId = "contractorId";
      userName = "contractorName";
    } else if (tableName === "Administrator") {
      userId = "adminId";
      userName = "adminName";
    }
    const query = ` SELECT ${userName} FROM ${tableName} WHERE ${userId}=${id}`;
    pool.query(query, (err, results) => {
      if (err) {
        console.error("Errro Found", err);
        return;
      }
      const columnName = userName;
      const updatedName = results[0][columnName];
      res.status(200).json({ data: updatedName, message: "Update successful" });
    });
  } catch (error) {
    console.error("Error in server:", error);
    res.status(500).json({ error: "Server Error" });
  }
});
async function checkPassword(tableName, id, password) {
  // Function to Check Password exists
  return new Promise((resolve, reject) => {
    let userId, userPassword;

    if (tableName === "Users") {
      userId = "userId";
      userPassword = "userPassword";
    } else if (tableName === "Contractors") {
      userId = "contractorId";
      userPassword = "contractorPassword";
    } else if (tableName === "Administrator") {
      userId = "adminId";
      userPassword = "adminPassword";
    }
    const query = `SELECT * FROM ${tableName} WHERE ${userId}=${id}`;
    pool.query(query, (err, results) => {
      if (err) {
        console.error("Error In fetching password", err);
        reject(err);
      } else {
        if (results.length > 0) {
          const storedPassword = results[0][userPassword];

          // Compare storedPassword with providedPassword
          if (storedPassword === password) {
            resolve(true); // Passwords match
          } else {
            resolve(false); // Passwords do not match
          }
        } else {
          resolve(false); // No matching user found
        }
      }
    });
  });
}
async function updateWithPassword(
  tableName,
  id,
  fullName,
  cnic,
  phoneNumber,
  newPassword
) {
  // Function to update user with password
  return new Promise((resolve, reject) => {
    let userId, userName, userCNIC, userPhoneNumber, userPassword;
    if (tableName === "Users") {
      userId = "userId";
      userName = "userName";
      userCNIC = "userCNIC";
      userPhoneNumber = "userPhoneNo";
      userPassword = "userPassword";
    } else if (tableName === "Contractors") {
      userId = "contractorId";
      userName = "contractorName";
      userCNIC = "contractorCNIC";
      userPhoneNumber = "contractorPhoneNo";
      userPassword = "contractorPassword";
    } else if (tableName === "Administrator") {
      userId = "adminId";
      userName = "adminName";
      userCNIC = "adminCNIC";
      userPhoneNumber = "adminPhoneNo";
      userPassword = "adminPassword";
    }
    const query = `UPDATE ${tableName} SET ${userName}=?,${userCNIC}=?,${userPhoneNumber}=?,${userPassword}=? WHERE ${userId}=${id}`;

    pool.query(
      query,
      [fullName, cnic, phoneNumber, newPassword],
      (err, results) => {
        if (err) {
          console.error("Error In change values", err);
          reject(err);
        } else {
          resolve("Profile Updated Successfully");
        }
      }
    );
  });
}

async function updateWithoutPassword(
  tableName,
  id,
  fullName,
  cnic,
  phoneNumber
) {
  // Function to update user with password
  return new Promise((resolve, reject) => {
    let userId, userName, userCNIC, userPhoneNumber;
    if (tableName === "Users") {
      userId = "userId";
      userName = "userName";
      userCNIC = "userCNIC";
      userPhoneNumber = "userPhoneNo";
    } else if (tableName === "Contractors") {
      userId = "contractorId";
      userName = "contractorName";
      userCNIC = "contractorCNIC";
      userPhoneNumber = "contractorPhoneNo";
    } else if (tableName === "Administrator") {
      userId = "adminId";
      userName = "adminName";
      userCNIC = "adminCNIC";
      userPhoneNumber = "adminPhoneNo";
    }
    const query = `UPDATE ${tableName} SET ${userName}=?,${userCNIC}=?,${userPhoneNumber}=? WHERE ${userId}=${id}`;
    pool.query(query, [fullName, cnic, phoneNumber], (err, results) => {
      if (err) {
        console.error("Error In change values", err);
        reject(err);
      } else {
        resolve("Profile Updated Successfully");
      }
    });
  });
}

// API for Users Projects
app.get("/client/Users/:id/projects", (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM Projects WHERE userId=?`;
  const values = [id];
  pool.query(query, values, (err, results) => {
    if (err) {
      console.error("Error in Getting Projects Query", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json({ projects: results });
    }
  });
});

// API FOR Contractors Projects
app.get("/client/Contractors/:id/projects", (req, res) => {
  const { id } = req.params;
  const query = "SELECT contractorStatus FROM Contractors WHERE contractorId=?";
  const values = [id];

  pool.query(query, values, (err, statusResults) => {
    if (err) {
      console.error("Error in Getting Contractor Status Query", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (statusResults.length !== 0 && statusResults[0].contractorStatus === 1) {
      const querySecond = "SELECT * FROM Projects WHERE contractorId=?";
      pool.query(querySecond, [id], (errSecond, projectsResults) => {
        if (errSecond) {
          console.error("Error in Getting Projects Query", errSecond);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.status(200).json({ projects: projectsResults });
      });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

// API for Forgot Password
app.get("/login/forgotPassword", async (req, res) => {
  const { email, phoneNumber, newPassword } = req.query;

  try {
    // Check Users table
    const user = await checkForgetPassword(
      "Users",
      "userEmail",
      "userPhoneNo",
      "userPassword",
      email,
      phoneNumber,
      newPassword
    );

    // Check Contractors table
    const contractor = await checkForgetPassword(
      "Contractors",
      "contractorEmail",
      "contractorPhoneNo",
      "contractorPassword",
      email,
      phoneNumber,
      newPassword
    );

    // Check Administrator table
    const admin = await checkForgetPassword(
      "Administrator",
      "adminEmail",
      "adminPhoneNo",
      "adminPassword",
      email,
      phoneNumber,
      newPassword
    );

    if (!user && !contractor && !admin) {
      // No matching user found in any table
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      status: "OK",
      message: "Password Changed Successfully",
    });
  } catch (err) {
    console.error("Error during Changing Password:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error", errorMessage: err.message });
  }
});

// Function for Forget Password
function checkForgetPassword(
  tableName,
  emailColumn,
  phoneNumberColumn,
  passwordColumn,
  email,
  phoneNumber,
  newPassword
) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName} WHERE ${emailColumn} = ? AND ${phoneNumberColumn} = ?`;

    pool.query(query, [email, phoneNumber], (err, results) => {
      if (err) {
        console.error(`Error executing query for ${tableName} table:`, err);
        return reject(err);
      }

      if (results.length === 0) {
        // No matching user in this table
        return resolve(null);
      }

      const user = results[0];
      if (newPassword && user[passwordColumn] === newPassword) {
        return reject(
          new Error("New password must be different from the current password")
        );
      }
      // Update the password if newPassword is provided
      if (newPassword) {
        const updateQuery = `UPDATE ${tableName} SET ${passwordColumn} = ? WHERE ${emailColumn} = ? AND ${phoneNumberColumn} = ?`;
        pool.query(updateQuery, [newPassword, email, phoneNumber], (err) => {
          if (err) {
            console.error(
              `Error updating password in ${tableName} table:`,
              err
            );
            return reject(err);
          }
          user.tableName = tableName;
          resolve(user);
        });
      } else {
        user.tableName = tableName;
        resolve(user);
      }
    });
  });
}

//API for Create Project Request
app.post("/client/Users/:id/requestProject", async (req, res) => {
  const userId = req.params.id;

  const {
    projectTitle,
    projectFloors,
    projectArea,
    projectInformation,
    projectType,
  } = req.body.obj;

  try {
    if (
      !projectTitle ||
      !projectFloors ||
      !projectArea ||
      !projectInformation ||
      !projectType
    ) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }
    const insertQuery = `INSERT INTO ProjectRequest (userId,projectTitle,projectFloors,projectArea,projectInformation,projectType) VALUES(?, ?, ?, ?, ?, ?)`;
    pool.query(
      insertQuery,
      [
        userId,
        projectTitle,
        projectFloors,
        projectArea,
        projectInformation,
        projectType,
      ],
      (err, results) => {
        if (err) {
          console.error("Error Creating Project requesr:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(201).json({
          status: "OK",
          message: "Project Request created successfully",
        });
      }
    );
  } catch (err) {
    console.error("Errro During project Request creation", err);
    res.status(500).json({
      error: "Server Error",
    });
  }
});

//API for Check Requests
app.get("/client/Users/:id/checkRequest", (req, res) => {
  const userId = req.params.id;

  try {
    const query = "SELECT * FROM projectRequest WHERE userId=?";
    pool.query(query, [userId], (error, results) => {
      res.status(200).json({ results });
    });
  } catch (error) {
    res.status(500).json({ error: "Inernal Server Error" });
  }
});

//API for Signup Page
app.post("/signup", (req, res) => {
  const {
    fullName,
    email,
    cnic,
    phoneNumber,
    contractorSpecialties,
    password,
    tableName,
  } = req.body;

  // Check if email or CNIC already exists for Users
  const userQuery = "SELECT * FROM Users WHERE userEmail = ? OR userCNIC = ?";
  pool.query(userQuery, [email, cnic], (userError, userResults) => {
    if (userError) {
      console.error("Error checking existing user:", userError);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (userResults.length > 0) {
      // User with the same email or CNIC already exists
      return res.status(400).json({ error: "Email or CNIC already exists" });
    }

    // Check if email or CNIC already exists for Contractors
    const contractorQuery =
      "SELECT * FROM Contractors WHERE contractorEmail = ? OR contractorCNIC = ?";
    pool.query(
      contractorQuery,
      [email, cnic],
      (contractorError, contractorResults) => {
        if (contractorError) {
          console.error("Error checking existing contractor:", contractorError);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        if (contractorResults.length > 0) {
          // Contractor with the same email or CNIC already exists
          return res
            .status(400)
            .json({ error: "Email or CNIC already exists" });
        }

        // Check if email or CNIC already exists for Administrator
        const adminQuery =
          "SELECT * FROM Administrator WHERE adminEmail = ? OR adminCNIC = ?";
        pool.query(adminQuery, [email, cnic], (adminError, adminResults) => {
          if (adminError) {
            console.error("Error checking existing administrator:", adminError);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          if (adminResults.length > 0) {
            // Administrator with the same email or CNIC already exists
            return res
              .status(400)
              .json({ error: "Email or CNIC already exists" });
          }

          // No existing records found, proceed with registration based on tableName
          if (tableName === "Users") {
            const insertUserQuery =
              "INSERT INTO Users(userName, userEmail, userCNIC, userPhoneNo, userPassword) VALUES (?,?,?,?,?)";
            pool.query(
              insertUserQuery,
              [fullName, email, cnic, phoneNumber, password],
              (insertError, insertResults) => {
                if (insertError) {
                  console.error("Error during user signup:", insertError);
                  return res
                    .status(500)
                    .json({ error: "Internal Server Error" });
                }

                res.status(201).json({
                  status: "OK",
                  message: "User Account Registered Successfully",
                });
              }
            );
          } else if (tableName === "Contractors") {
            const insertContractorQuery =
              "INSERT INTO Contractors(contractorName, contractorEmail, contractorCNIC, contractorPhoneNo, contractorPassword, contractorSpecialties, contractorVerifed, contractorStatus) VALUES (?,?,?,?,?,?,0,0)";
            pool.query(
              insertContractorQuery,
              [
                fullName,
                email,
                cnic,
                phoneNumber,
                password,
                contractorSpecialties,
              ],
              (insertError, insertResults) => {
                if (insertError) {
                  console.error("Error during contractor signup:", insertError);
                  return res
                    .status(500)
                    .json({ error: "Internal Server Error" });
                }

                res.status(201).json({
                  status: "OK",
                  message: "Contractor Account Registered Successfully",
                });
              }
            );
          }
        });
      }
    );
  });
});

//API for ALL Projects
app.get("/client/Administrator/:id/allProjects", (req, res) => {
  const query = "SELECT * FROM Projects";
  pool.query(query, (error, results) => {
    if (error) {
      return res.status(500).send("Internal Server Error");
    }
    res.status(201).json({
      status: "OK",
      data: results,
    });
  });
});

//API for ALL Users
app.get("/client/Administrator/:id/allUsers", (req, res) => {
  const query = "SELECT * FROM Users";
  pool.query(query, (error, results) => {
    if (error) {
      return res.status(500).send("Internal Server Error");
    }
    res.status(201).json({
      status: "OK",
      data: results,
    });
  });
});

//API for ALL Contractors
app.get("/client/Administrator/:id/allContractors", (req, res) => {
  const query = "SELECT * FROM Contractors WHERE contractorVerifed=1";
  pool.query(query, (error, results) => {
    if (error) {
      return res.status(500).send("Internal Server Error");
    }
    res.status(201).json({
      status: "OK",
      data: results,
    });
  });
});

// API for Check Verify Contractors List
app.get("/client/Administrator/:id/verifyContractor", (req, res) => {
  const query = "SELECT * FROM Contractors WHERE contractorVerifed = 0";
  pool.query(query, (error, results) => {
    if (error) {
      return res.status(500).send("Internal Server Error");
    }
    res.status(201).json({
      status: "OK",
      data: results,
    });
  });
});

//API for Accept Verify Contractor
app.post("/client/Administrator/:id/verifyContractor", (req, res) => {
  const id = req.body.contractorId;

  const query =
    "UPDATE Contractors SET contractorVerifed=1 WHERE contractorId=?";
  pool.query(query, id, (error, results) => {
    if (error) {
      return res.status(500).send("Internal Server Error");
    }
    res.status(201).json({
      status: "OK",
    });
  });
});
//API for Delete Contractor Verify
app.delete("/client/Administrator/:id/verifyContractor", (req, res) => {
  const id = req.body.contractorId;

  const query = `DELETE FROM Contractors WHERE contractorId=?`;
  pool.query(query, id, (error, results) => {
    if (error) {
      return res.status(500).send("Internal Server Error");
    }
    res.status(201).json({
      status: "OK",
    });
  });
});

//Api for Specfic Project
app.get("/client/:tableName/:id/allProjects/:projectId", (req, res) => {
  const { projectId } = req.params;
  const query = "SELECT * FROM Projects WHERE projectId = ?";

  pool.query(query, projectId, (error, results) => {
    if (error) {
      return res.status(500).send("Internal Server Error");
    }

    if (results.length === 0) {
      return res.status(404).json({
        status: "Not Found",
        message: "Project not found",
      });
    }

    const userId = results[0].userId;
    const userQuery = "SELECT userName FROM Users WHERE userId=?";
    pool.query(userQuery, userId, (userError, userResults) => {
      if (userError) {
        return res.status(500).send("Internal Server Error");
      }

      return res.status(200).json({
        status: "OK",
        projectData: results[0],
        userData: userResults[0],
      });
    });
  });
});

//API for Specfic User
app.get("/client/Administrator/:id/allUsers/:userId", (req, res) => {
  const { userId } = req.params;
  const query = "SELECT * FROM Users WHERE userId = ?";
  pool.query(query, userId, (error, results) => {
    if (error) {
      return res.status(500).send("Internal Server Error");
    }
    const userProjectQuery =
      "SELECT projectId,projectTitle, projectStatus FROM Projects WHERE userId=?";
    pool.query(userProjectQuery, userId, (projError, projResults) => {
      if (projError) {
        return res.status(500).send("Server Error");
      }
      res.status(201).json({
        status: "OK",
        data: results,
        project: projResults,
      });
    });
  });
});

//API GET for Specfic Contractor
app.get(
  "/client/Administrator/:id/allContractors/:contractorId",
  (req, res) => {
    const { contractorId } = req.params;
    // console.log(contractorId);
    const query = "SELECT * FROM Contractors WHERE contractorId = ?";
    pool.query(query, [contractorId], (error, results) => {
      if (error) {
        return res.status(500).send("Internal Server Error");
      }
      return res.json({
        status: "OK",
        contractorData: results,
      });
    });
  }
);

//Update Specfic User
app.post("/client/Administrator/:id/allUsers/:userId", (req, res) => {
  const userId = req.params;

  const { name, email, cnic, phoneNo, password } = req.body;
  const query =
    "UPDATE Users SET userName=?, userEmail=?, userCNIC=?, userPhoneNo=?, userPassword=? WHERE userId=?";
  pool.query(
    query,
    [name, email, cnic, phoneNo, password, userId.userId],
    (error, results) => {
      if (error) {
        return res.status(500).send("Internal Server Error");
      }
      res.status(201).json({
        status: "OK",
      });
    }
  );
});

//API Update Specfic Contractor
app.post(
  "/client/Administrator/:id/allContractors/:contractorId",
  (req, res) => {
    const contractorId = req.params;

    const { name, email, cnic, specialties, phoneNo, password } = req.body;
    const query =
      "UPDATE Contractors SET contractorName=?, contractorEmail=?, contractorCNIC=?, contractorPhoneNo=?, contractorPassword=?, contractorSpecialties=? WHERE contractorId=?";
    pool.query(
      query,
      [name, email, cnic, specialties, phoneNo, password, contractorId.userId],
      (error, results) => {
        if (error) {
          return res.status(500).send("Internal Server Error");
        }
        res.status(201).json({
          status: "OK",
        });
      }
    );
  }
);

//API for DELETE Specfic Contractor
app.delete(
  "/client/Administrator/:id/allContractors/:contractorId",
  (req, res) => {
    const contractorId = req.params.contractorId;
    const query = "DELETE FROM Contractors WHERE contractorId=?";
    pool.query(query, contractorId, (error, results) => {
      if (error) {
        return res.status(500).send("Internal Server Error");
      }
      res.status(201).json({
        status: "OK",
      });
    });
  }
);

//API for DELETE Specfic User
app.delete("/client/Administrator/:id/allUsers/:userId", (req, res) => {
  const userId = req.params.userId;
  const query = "DELETE FROM Users WHERE userId=?";
  pool.query(query, userId, (error, results) => {
    if (error) {
      return res.status(500).send("Internal Server Error");
    }
    res.status(201).json({
      status: "OK",
    });
  });
});

//API for Update specfic Project
app.post("/client/:tableName/:id/allProjects/:projectId", (req, res) => {
  const projectId = req.params.projectId;
  const {
    cost,
    startDate,
    allProgress,
    status,
    type,
    floors,
    area,
    completeDate,
    additionalInfo,
  } = req.body;
  const query =
    "UPDATE Projects SET projectCost=?, startDate=?, overAllProgress=?, projectStatus=?, projectType=?, projectFloors=?, projectArea=?, completeDate=?, additionalInfo=? WHERE projectId=?";
  pool.query(
    query,
    [
      cost,
      startDate,
      allProgress,
      status,
      type,
      floors,
      area,
      completeDate,
      additionalInfo,
      projectId,
    ],
    (errors, results) => {
      if (errors) {
        return res.status(500).send("Internal Server Error");
      }
      res.status(201).json({
        status: "OK",
      });
    }
  );
});

//API Delete specfic Project
app.delete("/client/:tableName/:id/allProjects/:projectId", (req, res) => {
  const projectId = req.params.projectId;
  const projectDeleteQuery = "DELETE FROM Projects WHERE projectId=?";
  pool.query(projectDeleteQuery, [projectId], (errors, results) => {
    if (errors) {
      return res.status(500).send("Internal Server Error");
    }
    res.status(201).json({
      status: "OK",
    });
  });
});

//API for Assign Contractor to Project
app.get("/client/Administrator/:id/assignContractor", (req, res) => {
  const projectQuery =
    "SELECT * FROM Projects WHERE projectStatus != 'Completed' ";
  pool.query(projectQuery, (projError, projResults) => {
    if (projError) {
      return res.status(500).send("Internal Server Error");
    }
    const conQuery =
      "SELECT * FROM Contractors WHERE contractorStatus=0 AND contractorVerifed=1";
    pool.query(conQuery, (conError, conResult) => {
      if (conError) {
        return res.status(500).send("Internal Server Error");
      }
      return res.status(201).json({
        status: "OK",
        projectData: projResults,
        contractorData: conResult,
      });
    });
  });
});

//API for Assign Contractor
app.post("/client/Administrator/:id/assignContractor", (req, res) => {
  const { projId, conAssign, conId, contractorWork } = req.body;
  const projectQuery =
    "UPDATE Projects SET contractorAssign=? WHERE projectId=?";
  pool.query(projectQuery, [conAssign, projId], (projError, projResults) => {
    if (projError) {
      return res.status(500).send("Internal Server Error");
    }
    const updateConQuery =
      "UPDATE Contractors SET contractorStatus=1 WHERE contractorId=?";
    pool.query(updateConQuery, [conId], (conError, conResult) => {
      if (conError) {
        return res.status(500).send("Internal Server Error");
      }
      const conListQuery =
        "INSERT INTO ContractorList(projectId, contractorId,contractorWork) VALUES (?,?,?)";
      pool.query(
        conListQuery,
        [projId, conId, contractorWork],
        (listError, lisResu) => {
          if (listError) {
            return res.status(500).send("Internal Server Error");
          }
        }
      );
      return res.status(201).json({
        status: "OK",
      });
    });
  });
});

//API to get All assign Contractors (list of assigned)
app.get("/client/Administrator/:id/completedWork", (req, res) => {
  const query =
    "SELECT " +
    " ContractorList.projectId, " +
    " ContractorList.contractorWork, " +
    " Projects.projectTitle, " +
    " ContractorList.contractorId, " +
    " Contractors.contractorName, " +
    " Contractors.contractorSpecialties " +
    " FROM " +
    " ContractorList " +
    " JOIN " +
    " Projects ON ContractorList.projectId = Projects.projectId " +
    " JOIN " +
    " Contractors ON ContractorList.contractorId = Contractors.contractorId";
  pool.query(query, (error, results) => {
    if (error) {
      return res.status(500).send("Internal Server Error");
    }
    return res.status(200).json({
      status: "OK",
      data: results,
    });
  });
});

//APi for unassign Contractor
app.post("/client/Administrator/:id/completedWork", (req, res) => {
  const { contractorId, projectId } = req.body;
  const contractorQuery =
    "UPDATE Contractors SET contractorStatus=0 WHERE contractorId=?";
  pool.query(contractorQuery, [contractorId], (conErr, conRes) => {
    if (conErr) {
      return res.status(500).send("Internal Server Error");
    }
    const conListQuery = `DELETE FROM ContractorList WHERE contractorId = ? AND projectId=?`;
    pool.query(conListQuery, [contractorId, projectId], (conLErr, conLRes) => {
      if (conLErr) {
        return res.status(500).send("Internal Server Error");
      }
      return res.status(201).json({
        status: "OK",
      });
    });
  });
});

//API for contractor project

app.get("/client/Contractors/:id/contractorProjects", (req, res) => {
  const { id } = req.params;
  const conQuery = "SELECT * FROM ContractorList WHERE contractorId=?";
  pool.query(conQuery, [id], (err, result) => {
    if (err) return res.status(500).send("Internal Server Error");
    else {
      if (result.length > 0) {
        const projectId = result[0].projectId;
        const projQuery = "SELECT * FROM Projects WHERE projectId=?";
        pool.query(projQuery, [projectId], (projErr, projRes) => {
          if (projErr) {
            return res.status(500).send("Internal Server Error");
          } else {
            const finalResult = { data: projRes, conData: result };
            return res.status(200).json({
              status: "OK",
              data: finalResult,
            });
          }
        });
      }
    }
  });
});

//API for user Projects
app.get("/client/Users/:id/projects/:projectId", (req, res) => {
  const { id, projectId } = req.params;
  // console.log(id, projectId);
  const query = "SELECT * FROM Projects WHERE userId=? AND projectId=?";
  pool.query(query, [id, projectId], (error, results) => {
    if (error) {
      return res.status(500).send("Internal Server Error");
    }
    return res.status(200).json({
      status: "OK",
      data: results,
    });
  });
});

//API for progres upload
app.post(
  "/client/Contractors/:id/contractorProjects/:projectId",
  (req, res) => {
    const { id, projectId } = req.params;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so add 1
    const day = currentDate.getDate().toString().padStart(2, "0");
    const mysqlFormattedDate = `${year}-${month}-${day}`;

    const { progressPer, progressInfo, progressStatus } = req.body;
    const query = `INSERT INTO contractorprogress
    (contractorId,
      projectId,
      progressDateTime,
      contractorProgress,
      verifiedProgress,
      progressInformation,
      progressStatus) 
      VALUES (?,?,?,?,0,?,?)`;
    pool.query(
      query,
      [
        id,
        projectId,
        mysqlFormattedDate,
        progressPer,
        progressInfo,
        progressStatus,
      ],
      (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send("Internal Server Error", error);
        }
        return res.status(200).json({
          status: "OK",
        });
      }
    );
  }
);

//Api for verify progress
app.get("/client/Administrator/:id/verifyProgress", (req, res) => {
  const query = `Select contractorprogress.progressId,
  contractorprogress.contractorId,
  contractorprogress.projectId,
  contractorprogress.progressDateTime,
  contractorprogress.contractorProgress,
  contractorprogress.progressInformation,
  Projects.projectTitle,
  Contractors.contractorName FROM 
  contractorProgress JOIN Projects
  JOIN Contractors ON 
  Projects.projectId=contractorProgress.projectId AND
  Contractors.contractorId=contractorProgress.contractorId
  AND contractorprogress.verifiedProgress`;
  pool.query(query, (err, result) => {
    if (err) {
      return res.status(500).send("Internal Server Error");
    }
    return res.status(200).json({
      status: "OK",
      data: result,
    });
  });
});

//Api for update progress
app.delete("/client/Administrator/:id/verifyProgress", (req, res) => {
  const progressId = req.body;
  const query = "DELETE FROM contractorProgress WHERE progressId=?";
  pool.query(query, [progressId], (error, result) => {
    if (error) {
      return res.status(500).send("Internal Server Error");
    }
    return res.status(200).json({
      status: "OK",
    });
  });
});

//Api for update progress
app.post("/client/Administrator/:id/verifyProgress", (req, res) => {
  const progressId = req.body;
  const query =
    "UPDATE contractorProgress SET verifiedProgress=1 WHERE progressId=?";
  pool.query(query, [progressId.progressId], (error, result) => {
    if (error) {
      return res.status(500).send("Internal Server Error");
    }
    return res.status(200).json({
      status: "OK",
    });
  });
});

//API for request project
app.get("/client/Administrator/:id/createProject", (req, res) => {
  const query = `SELECT * FROM projectrequest
                WHERE requestStatus IS NULL`;
  pool.query(query, (err, result) => {
    if (err) {
      return res.status(500).send("Internal Server Error");
    }
    return res.status(200).json({
      status: "OK",
      data: result,
    });
  });
});

//Api for project
app.get("/client/Administrator/:id/createProject/:requestId", (req, res) => {
  const requestId = req.params.requestId;
  // console.log(requestId);
  const query = "SELECT * FROM projectrequest WHERE requestId=?";
  pool.query(query, [requestId], (err, result) => {
    if (err) {
      return res.status(500).send("Internal Server Error");
    }
    return res.status(200).json({
      status: "OK",
      data: result,
    });
  });
});

//Api to insert project data
app.post("/client/Administrator/:id/createProject/:requestId", (req, res) => {
  const { requestId } = req.params;

  const { userId, projectTitle, floors, area, cost, type, additionalInfo } =
    req.body;
  // console.log(userId, projectTitle, floors, area, cost, type, additionalInfo);
  const query = `INSERT INTO Projects(
    projectTitle,projectStatus,projectCost,projectType,
    userId,projectFloors,projectArea,additionalInfo,requestId,overAllProgress)
    VALUES (?,'Pending',?,?,?,?,?,?,?,0)`;
  pool.query(
    query,
    [projectTitle, cost, type, userId, floors, area, additionalInfo, requestId],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "Error",
          message: "Internal Server Error",
          error: err.message,
        });
      }
      const reqIdQuery =
        "UPDATE projectrequest SET requestStatus=1 WHERE requestId=? ";
      pool.query(reqIdQuery, [requestId], (reqErr, reqResul) => {
        if (reqErr) {
          return res.status(500).json({
            status: "Error",
            message: "Internal Server Error",
            error: err.message,
          });
        }
      });
      return res.status(200).json({
        status: "OK",
      });
    }
  );
});

//meeting datetime api
app.get("/client/Contractors/:id/meeting", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM meetings WHERE contractorId=?";
  pool.query(query, [id], (error, result) => {
    if (error) {
      return res.status(500).json({
        status: "Error",
        message: "Internal Server Error",
        error: error.message,
      });
    }
    return res.status(200).json({
      status: "OK",
      data: result,
    });
  });
});

//upload documents
app.post(
  "/client/Contractors/:id/meeting",
  upload.single("file"),
  (req, res) => {
    try {
      // Extract data from the request
      const id = req.params.id; // Use req.params to get parameters from URL
      const fileName = req.file.originalname; // Use req.file.originalname to get the original name of the file
      const fileData = req.file.buffer; // file buffer from multer
      // console.log(id, fileName, fileData);
      const query =
        "INSERT INTO documents(documentName, documentData, contractorId) VALUES (?, ?, ?)";
      pool.query(query, [fileName, fileData, id], (error, results) => {
        if (error) {
          // console.log(error, error.message);
          return res.status(500).json({
            status: "Error",
            message: "Internal Server Error",
            error: error.message,
          });
        }
        return res.status(200).json({
          status: "OK",
          message: "File uploaded successfully.",
        });
      });
    } catch (error) {
      console.error("Error handling file upload:", error);
      res.status(500).json({
        status: "Error",
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }
);

//api for meeting for admin
app.get(
  "/client/Administrator/:id/verifyContractor/:contractorId",
  (req, res) => {
    const { contractorId } = req.params;
    const query = "SELECT * FROM meetings WHERE contractorId=?";
    pool.query(query, [contractorId], (error, result) => {
      if (error) {
        console.log(error.message);
        return res.status(500).json({
          status: "Error",
          message: "Internal Server Error",
          error: error.message,
        });
      }
      // console.log(contractorId);
      const dataQuery = "SELECT * FROM documents WHERE contractorId=?";
      pool.query(dataQuery, [contractorId], (dataErr, dataResult) => {
        if (dataErr) {
          console.log(dataErr.message);
          return res.status(500).json({
            status: "Error",
            message: "Internal Server Error",
            error: dataErr.message,
          });
        }
        // console.log(dataResult);
        return res.status(200).json({
          status: "OK",
          data: result,
          document: dataResult,
        });
      });
    });
  }
);

//api for new meeting
app.post(
  "/client/Administrator/:id/verifyContractor/:contractorId",
  (req, res) => {
    const { contractorId, meetingDateTime } = req.body;
    const query = `INSERT INTO meetings(contractorId,meetingDate,meetingStatus) 
    VALUES(?,?,0)`;
    pool.query(query, [contractorId, meetingDateTime], (error, result) => {
      if (error) {
        return res.status(500).json({
          status: "Error",
          message: "Internal Server Error",
          error: error.message,
        });
      }
      return res.status(200).json({
        status: "OK",
      });
    });
  }
);

// LISTEN PORT
app.listen(5000, () => {
  console.log(`Server is running`);
});
