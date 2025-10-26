import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/homePage";
import LoginPage from "./components/pages/loginPage";

import { Toaster } from "react-hot-toast";
import AdminHomePage from "./components/pages/adminhomePage";
import SignUp from "./components/pages/singupPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes path="/*">
          <Route path="/*" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin/*" element={<AdminHomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
