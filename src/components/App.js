import GlobalStyle from "../globalStyles/globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingUp from "./Auth/SignUp";
import SignIn from "./Auth/SignIn";
import { Timeline } from "./Timeline/Timeline";
import HashtagPage from "./HashtagPage/HashtagPage";
import Private from "./Private/Private";
import UserPage from "./UserPage/UserPage";
import UploadContext from "../Contexts/UploadContext.js";
import { useState } from "react";

export default function App() {
	const [upload, setUpload] = useState(true);

	return (
		<>
			<GlobalStyle />
			<UploadContext.Provider value={{ upload, setUpload }}>
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
			</UploadContext.Provider>
		</>
	);
}
