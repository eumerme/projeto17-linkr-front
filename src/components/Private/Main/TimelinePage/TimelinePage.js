import { useContext, useLayoutEffect, useState } from "react";
import { listPosts } from "../../../../services/linkr.js";
import UploadContext from "../../../../Contexts/UploadContext.js";
import Main from "../Main.js";

export default function Timeline() {
	const [allPosts, setAllPosts] = useState([]);
	const [existPost, setExistPost] = useState(null);
	const [errorServer, setErrorServer] = useState(false);
	const [empty, setEmpty] = useState(false);
	const { uploadPosts } = useContext(UploadContext);

	const handlePosts = (posts) => {
		setAllPosts(Array.from(posts));
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
				.catch((error) => {
					if (error.response.status === 401) {
						alert("Your session has expired, please log in again");
						localStorage.clear("linkr");
						window.location.reload();
					} else {
						setErrorServer(true);
					}
				});
		}, 500);
	}, [uploadPosts]);

	return (
		<Main
			pageTitle={"timeline"}
			allPosts={allPosts}
			errorServer={errorServer}
			empty={empty}
			existPost={existPost}
		/>
	);
}
