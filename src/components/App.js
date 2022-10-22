import GlobalStyle from "../globalStyles/globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingUp from "./Auth/SignUp";
import SignIn from "./Auth/SignIn";
import { Timeline } from "./Timeline/Timeline";
import HashtagPage from "./HashtagPage/HashtagPage";
import Private from "./Private/Private";
import UserPage from "./UserPage/UserPage";

export default function App() {
	return (
		<>
			<GlobalStyle />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<SignIn />} />
					<Route path="/sign-up" element={<SingUp />} />
					<Route
						path="/timeline"
						element={
							<Private>
								<Timeline />
							</Private>
						}
					/>
					<Route
						path="/hashtag/:hashtag"
						element={
							<Private>
								<HashtagPage />
							</Private>
						}
					/>
					<Route
						path="/user/:id"
						element={
							<Private>
								<UserPage />
							</Private>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}
