import GlobalStyle from "../globalStyles/globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingUp from "./Public/SignUp";
import SignIn from "./Public/SignIn";
import TimelinePage from "./Private/Main/TimelinePage/TimelinePage";
import HashtagPage from "./Private/Main/HashtagPage/HashtagPage";
import Private from "./Private/Private";
import UserPage from "./Private/Main/UserPage/UserPage";
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
									<TimelinePage />
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
