import "./App.css";
import emailjs from "emailjs-com";
import AboutUs from "./components/AboutUs";
import Calculator from "./components/Calculator";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import NavigationBar from "./components/NavigationBar";
import NoProjectTooBig from "./components/NoProjectTooBig";
import OurServices from "./components/OurServices";
import Projects from "./components/Projects";
import Quote from "./components/Quote";
import WhyChooseUs from "./components/WhyChooseUs";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import ForgotPassword from "./components/ForgotPassword";
import ProjectsNextPage from "./components/ProjectsNextPage";
import SignUpPage from "./components/SignUpPage";
import DashTemplate from "./components/DashTemplate";

emailjs.init("mNvN4AVt9BFi-AxjrdDX1");
function CommonLayout({ children }) {
  return (
    <>
      <NavigationBar />
      {children}
      <Quote />
      <Calculator />
      <WhyChooseUs />
      <Projects />
      <NoProjectTooBig />
      <OurServices />
      <AboutUs />
      <Footer />
    </>
  );
}
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <CommonLayout>
              <HeroSection />
            </CommonLayout>
          }
        />
        <Route
          path="/login"
          element={
            <CommonLayout>
              <LoginPage />
            </CommonLayout>
          }
        />
        <Route
          path="/login/forgotPassword"
          element={
            <CommonLayout>
              <LoginPage />
              <ForgotPassword />
            </CommonLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <CommonLayout>
              <SignUpPage />
            </CommonLayout>
          }
        />
        <Route path="/projects" element={<ProjectsNextPage />} />
        <Route
          path="/client/:tableName/:id"
          element={<DashTemplate loadWith="ProfilePage" />}
        />
        <Route
          path="/client/:tableName/:id/projects"
          element={<DashTemplate loadWith="ProjectsTable" />}
        />
        <Route
          path="/client/:tableName/:id/requestProject"
          element={<DashTemplate loadWith="ProjectRequest" />}
        />
        <Route
          path="/client/:tableName/:id/checkRequest"
          element={<DashTemplate loadWith="CheckRequest" />}
        />
        <Route
          path="/client/:tableName/:id/contractorProjects"
          element={<DashTemplate loadWith="ContractorProjects" />}
        />
        <Route
          path="/client/:tableName/:id/allProjects"
          element={<DashTemplate loadWith="AllProjects" />}
        />
        <Route
          path="/client/:tableName/:id/allUsers"
          element={<DashTemplate loadWith="AllUsers" />}
        />
        <Route
          path="/client/:tableName/:id/allContractors"
          element={<DashTemplate loadWith="AllContractors" />}
        />
        <Route
          path="/client/:tableName/:id/verifyContractor"
          element={<DashTemplate loadWith="VerifyContractor" />}
        />
        <Route
          path="/client/:tableName/:id/assignContractor"
          element={<DashTemplate loadWith="AssignContractor" />}
        />
        <Route
          path="/client/:tableName/:id/allUsers/:userId"
          element={<DashTemplate loadWith="SpecficUser" />}
        />
        <Route
          path="/client/:tableName/:id/allContractors/:contractorId"
          element={<DashTemplate loadWith="SpecficContractor" />}
        />
        <Route
          path="/client/:tableName/:id/allProjects/:projectId"
          element={<DashTemplate loadWith="SpecficProject" />}
        />
        <Route
          path="/client/:tableName/:id/completedWork"
          element={<DashTemplate loadWith="UnassignContractor" />}
        />
        <Route
          path="/client/:tableName/:id/projects/:projectId"
          element={<DashTemplate loadWith="UserSpecficProject" />}
        />
        <Route
          path="/client/:tableName/:id/contractorProjects/:projectId"
          element={<DashTemplate loadWith="UploadProgress" />}
        />
        <Route
          path="/client/:tableName/:id/verifyProgress"
          element={<DashTemplate loadWith="VerifyProgress" />}
        />
        <Route
          path="/client/:tableName/:id/createProject"
          element={<DashTemplate loadWith="CreateProject" />}
        />
        <Route
          path="/client/:tableName/:id/createProject"
          element={<DashTemplate loadWith="CreateProjectInsert" />}
        />
        <Route
          path="/client/:tableName/:id/meeting"
          element={<DashTemplate loadWith="Meetings" />}
        />
        <Route
          path="/client/:tableName/:id/verifyContractor/:contractorId"
          element={<DashTemplate loadWith="UnverifiedContractor" />}
        />
      </Routes>
    </>
  );
}

export default App;
