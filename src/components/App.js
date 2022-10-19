import GlobalStyle from "../styles/globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import SingUp from "./SignUp/SignUp";
import Home from "./home/Home";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          {/* <Route path="/signup" element={<SingUp />} /> */}
          <Route path="/timeline" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
