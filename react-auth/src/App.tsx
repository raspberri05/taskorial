import Account from "./Account";
import AuthComponent from "./AuthComponent";
import { ResetPassword } from "./ResetPassword";
import { Feedback } from "./Feedback";
import { Privacy } from "./Privacy";
import { Terms } from "./Terms";
import { Settings } from "./Settings";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Account />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route
        path="/settings"
        element={
          <ProtectedRoutes>
            <Settings />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/auth"
        element={
          <ProtectedRoutes>
            <AuthComponent />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
}

export default App;
