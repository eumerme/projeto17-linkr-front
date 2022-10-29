import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listPostsbyHashtags } from "../../services/linkr";
import UploadContext from "../../Contexts/UploadContext";
import MainLayout from "../Main/MainLayout";

export default function HashtagPage() {
	const params = useParams();

	const [posts, setPosts] = useState([]);
	const [allPosts, setAllPosts] = useState([]);
	const [errorServer, setErrorServer] = useState(false);
	const [empty, setEmpty] = useState(false);
	const { upload } = useContext(UploadContext);

	useEffect(() => {
		setTimeout(function () {
			listPostsbyHashtags(params.hashtag)
				.then((res) => {
					setAllPosts(res.data);
					//setPosts(res.data.slice(0, posts.length));
					if (res.data.length === 0) setEmpty(true);
				})
				.catch(() => setErrorServer(true));
		}, 500);
	}, [params.hashtag, upload]);

	return (
		<MainLayout
			pageTitle={"hashtag"}
			posts={posts}
			/* setPosts={setPosts} */
			allPosts={allPosts}
			errorServer={errorServer}
			empty={empty}
			hashtag={params.hashtag}
		/>
	);
}
