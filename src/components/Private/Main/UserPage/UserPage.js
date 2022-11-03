import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { isFollowing, listUserPosts } from "../../../../services/linkr.js";
import UploadContext from "../../../../Contexts/UploadContext.js";
import Main from "../Main.js";

export default function UserPage() {
	const { id } = useParams();
	const { state } = useLocation();
	const { uploadFollowButton, uploaPosts } = useContext(UploadContext);
	const auth = JSON.parse(localStorage.getItem("linkr"));
	//const [posts, setPosts] = useState([]);
	const [allPosts, setAllPosts] = useState([]);
	const [errorServer, setErrorServer] = useState(false);
	const [empty, setEmpty] = useState(false);
	const [follow, setFollow] = useState(null);

	useEffect(() => {
		setTimeout(() => {
			listUserPosts(id)
				.then((res) => {
					setAllPosts(res.data);
					//setPosts(res.data.slice(0, posts.length));
					if (res.data.length === 0) setEmpty(true);
				})
				.catch(() => setErrorServer(true));
		}, 500);
	}, [id, uploaPosts]);

	useLayoutEffect(() => {
		const body = { userId: auth.id, followeeId: Number(id) };
		isFollowing(body)
			.then((res) => {
				setFollow(res.data.follows);
			})
			.catch();
	}, [id, uploadFollowButton]);

	return (
		<Main
			pageTitle={"userpage"}
			/* posts={posts}
			setPosts={setPosts} */
			allPosts={allPosts}
			errorServer={errorServer}
			empty={empty}
			follows={follow}
			followeeId={id}
			name={state.name}
		/>
	);
}
