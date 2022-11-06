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
	const [uploadPosts, setUploadPosts] = useState(false);
	const [uploadComments, setUploadComments] = useState(false);
	const [uploadHashtagTrending, setUploadHashtagTrending] = useState(false);
	const [uploadFollowButton, setUploadFollowButton] = useState(false);
	const [uploadLikes, setUploadLikes] = useState(false);

	return (
		<>
			<GlobalStyle />
			<UploadContext.Provider
				value={{
					uploadPosts,
					setUploadPosts,
					uploadComments,
					setUploadComments,
					uploadHashtagTrending,
					setUploadHashtagTrending,
					uploadFollowButton,
					setUploadFollowButton,
					uploadLikes,
					setUploadLikes,
				}}
			>
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
