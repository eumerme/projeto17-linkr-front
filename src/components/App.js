import GlobalStyle from "../styles/globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";

export default function App() {
	return (
		<>
			<GlobalStyle />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<SignIn />} />
					<Route path="/sign-up" element={<SingUp />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}
