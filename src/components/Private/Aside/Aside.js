import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadContext from "../../../Contexts/UploadContext.js";
import { listHashtags, toggleFollow } from "../../../services/linkr.js";
import { BsFillPersonCheckFill, BsFillPersonPlusFill } from "react-icons/bs";
import { redirectToHashtagPage } from "../commom/resirectTo.js";
import {
	Container,
	TrendingBox,
	TrendingBoxMobile,
	FollowButton,
	FollowIcon,
} from "./styles.js";

export default function Aside({ pageTitle, follows, followeeId }) {
	const dropdownTrending = useRef(null);
	const navigate = useNavigate();
	const [hashtags, setHashtags] = useState([]);
	const {
		setUpload,
		upload,
		uploadHashtagTrending,
		uploadFollowButton,
		setUploadFollowButton,
	} = useContext(UploadContext);
	const auth = JSON.parse(localStorage.getItem("linkr"));
	const [isDisabled, setIsDisabled] = useState(false);
	const user = Number(followeeId) === auth.id;
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		listHashtags()
			.then((res) => setHashtags(res.data))
			.catch();
	}, [uploadHashtagTrending]);

	const handleFollow = () => {
		setIsDisabled(true);

		setTimeout(() => {
			const body = { userId: auth.id, followeeId: Number(followeeId) };
			toggleFollow(body)
				.then(() => {
					setIsDisabled(false);
					setUploadFollowButton(!uploadFollowButton);
				})
				.catch(() => setIsDisabled(false));
		}, 1000);
	};

	useEffect(() => {
		const pageClickEvent = (e) => {
			const activeElementExists = dropdownTrending.current !== null;
			const isClickedOutside = !dropdownTrending.current.contains(e.target);

			if (activeElementExists && isClickedOutside) {
				setIsActive(!isActive);
			}
		};

		if (isActive) {
			window.addEventListener("click", pageClickEvent);
		}

		return () => {
			window.removeEventListener("click", pageClickEvent);
		};
	}, [isActive]);

	return (
		<Container pageTitle={pageTitle}>
			{pageTitle === "userpage" ? (
				<>
					<FollowButton
						follows={follows}
						onClick={handleFollow}
						disabled={isDisabled}
						user={user}
					>
						{follows ? "Unfollow" : "Follow"}
					</FollowButton>
					<FollowIcon onClick={handleFollow} disabled={isDisabled} user={user}>
						{follows ? <BsFillPersonCheckFill /> : <BsFillPersonPlusFill />}
					</FollowIcon>
				</>
			) : (
				""
			)}
			<TrendingBox
				pageTitle={pageTitle}
				isActive={isActive}
				ref={dropdownTrending}
			>
				<h2>trending</h2>
				<ul>
					{hashtags.map((value, index) => (
						<li
							key={index}
							onClick={() =>
								redirectToHashtagPage({
									setIsActive,
									isActive,
									navigate,
									tag: value.name,
								})
							}
						>
							# {value.name}
						</li>
					))}
				</ul>
			</TrendingBox>
			<TrendingBoxMobile
				isActive={isActive}
				onClick={() => setIsActive(!isActive)}
			>
				#
			</TrendingBoxMobile>
		</Container>
	);
}
