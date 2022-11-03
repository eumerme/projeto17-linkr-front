import { useContext, useLayoutEffect, useState } from "react";
import { listPosts } from "../../../../services/linkr.js";
import UploadContext from "../../../../Contexts/UploadContext.js";
import Main from "../Main.js";

export default function Timeline() {
	//	const [posts, setPosts] = useState([]);
	const [allPosts, setAllPosts] = useState([]);
	const [existPost, setExistPost] = useState(null);
	const [errorServer, setErrorServer] = useState(false);
	const [empty, setEmpty] = useState(false);
	const { uploadPosts } = useContext(UploadContext);

	const handlePosts = (posts) => {
		setAllPosts(Array.from(posts));
		//setPosts(Array.from(posts).slice(0, posts.length));
	};

	useLayoutEffect(() => {
		setTimeout(() => {
			listPosts()
				.then((res) => {
					if (res.data.followSomeone === true) {
						if (res.data.posts.length === 0) setEmpty(true);
						else setExistPost(true);
						handlePosts(res.data.posts);
					} else {
						if (res.data.posts.length === 0) setExistPost(false);
						else handlePosts(res.data.posts);
					}
				})
				.catch(() => setErrorServer(true));
		}, 500);
	}, [uploadPosts]);

	return (
		<Main
			pageTitle={"timeline"}
			/* posts={posts}
			setPosts={setPosts} */
			allPosts={allPosts}
			errorServer={errorServer}
			empty={empty}
			existPost={existPost}
		/>
	);
}
