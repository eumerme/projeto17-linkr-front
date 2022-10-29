import { useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { isFollowing, listUserPosts } from "../../../../services/linkr.js";
import UploadContext from "../../../../Contexts/UploadContext.js";
import Main from "../Main.js";

export default function UserPage() {
	const { id } = useParams();
	const { state } = useLocation();
	const { setUpload, upload } = useContext(UploadContext);
	const auth = JSON.parse(localStorage.getItem("linkr"));

	//const [posts, setPosts] = useState([]);
	const [allPosts, setAllPosts] = useState([]);
	const [errorServer, setErrorServer] = useState(false);
	const [empty, setEmpty] = useState(false);
	const [follow, setFollow] = useState(null);

	useEffect(() => {
		setTimeout(function () {
			listUserPosts(id)
				.then((res) => {
					//setUpload(!upload);
					setAllPosts(res.data);
					//setPosts(res.data.slice(0, posts.length));
					if (res.data.length === 0) setEmpty(true);
				})
				.catch(() => setErrorServer(true));
		}, 1000);
	}, [id]);

	useMemo(() => {
		isFollowing({ userId: auth.id, followeeId: Number(id) })
			.then((res) => {
				setFollow(res.data.follows);
			})
			.catch();
	}, [id, upload]);

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
