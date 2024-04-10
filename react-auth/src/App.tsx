import AuthComponent from "./AuthComponent";
import { ResetPassword } from "./ResetPassword";
import { Feedback } from "./Feedback";
import { Privacy } from "./Privacy";
import { Terms } from "./Terms";
import { Settings } from "./Settings";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { Routes, Route } from "react-router-dom";
import Footer from "./Footer";
import { NavBar } from "./NavBar";
import { LandingPage } from "./LandingPage";
import { Register } from "./Register";
import { DeleteAccount } from "./DeleteAccount";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("TOKEN");

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Register type="login" />} />
        <Route path="/register" element={<Register type="register" />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route 
          path="/delete-account"
          element={
            <ProtectedRoutes>
              <DeleteAccount token={token} />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoutes>
              <Settings />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoutes>
              <AuthComponent />
            </ProtectedRoutes>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
