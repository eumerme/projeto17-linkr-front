import { useContext, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listPostsbyHashtags } from "../../../../services/linkr.js";
import UploadContext from "../../../../Contexts/UploadContext.js";
import Main from "../Main.js";

export default function HashtagPage() {
	const { hashtag } = useParams();
	//const [posts, setPosts] = useState([]);
	const [allPosts, setAllPosts] = useState([]);
	const [errorServer, setErrorServer] = useState(false);
	const [empty, setEmpty] = useState(false);
	const { uploadPosts } = useContext(UploadContext);

	useLayoutEffect(() => {
		setTimeout(() => {
			listPostsbyHashtags(hashtag)
				.then((res) => {
					setAllPosts(res.data);
					//setPosts(res.data.slice(0, posts.length));
					if (res.data.length === 0) setEmpty(true);
				})
				.catch(() => setErrorServer(true));
		}, 500);
	}, [hashtag, uploadPosts]);

	return (
		<Main
			pageTitle={"hashtag"}
			/*posts={posts}
			 setPosts={setPosts} */
			allPosts={allPosts}
			errorServer={errorServer}
			empty={empty}
			hashtag={hashtag}
		/>
	);
}
