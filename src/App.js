import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import OtpVerify from "./pages/OtpPage";
import Verify from "./components/Verify";
import LanguageState from "./context/language/LanguageState";
import Profile from "./pages/ProfilePage";
import QuestionPage from "./pages/QuestionPage";
import SessionTimeoutPopup from "./components/Session";
function App() {
  return (
    <div className="App" >
      <BrowserRouter>
      <LanguageState>
        <SessionTimeoutPopup/>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route
            exact
            path="/otp"
            element={
              <Verify>
                <OtpVerify />
              </Verify>
            }
          />
          <Route exact path="/account" element={<Profile/>}/>
          <Route exact path="/ask/:id" element={<QuestionPage/>}></Route>
          <Route exact path="/ask" element={<QuestionPage/>}></Route>
        </Routes>
        </LanguageState>
      </BrowserRouter>
    </div>
  );
}

export default App;
