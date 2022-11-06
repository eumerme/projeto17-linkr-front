import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listPostsbyHashtags } from "../../services/linkr";
import PostsMainLayout from "../Posts/PostsMainLayout";
import TimelineMainLayout from "../Timeline/TimelineMainLayout";
import { Homescreen, Title } from "../Timeline/Timeline";
import Loading from "../commom/Loading";
import InfiniteScroll from "react-infinite-scroller";
import UploadContext from "../../Contexts/UploadContext";

export default function HashtagPage() {
	const params = useParams();
	const [posts, setPosts] = useState([]);
	const [allPosts, setAllPosts] = useState([]);
	const [needRender, setNeedRender] = useState(true);
	const [isRendering, setIsRendering] = useState(true);
	const [errorServer, setErrorServer] = useState(false);
	const [empty, setEmpty] = useState(false);
	const { reload } = useContext(UploadContext);

	useEffect(() => {
		setTimeout(function () {
			listPostsbyHashtags(params.hashtag)
				.then((data) => {
					setPosts(data.data);
					setAllPosts(data.data.slice(0, allPosts.length));
					if (data.data.length === 0) setEmpty(true);
				})
				.catch((error) => {
					setErrorServer(true);
				});
		}, 500);
	}, [params.hashtag, reload]);

	function loaderPosts() {
		setIsRendering(true);
		setNeedRender(false);
		if (posts.length === 0) setNeedRender(true);
		setTimeout(() => {
			setIsRendering(false);
			const partOfPosts = posts.slice(allPosts.length, allPosts.length + 10);
			setAllPosts(allPosts.concat(partOfPosts));

			if (posts.length > allPosts.length) {
				setNeedRender(true);
			}
		}, 2000);
	}

	return (
		<>
			<TimelineMainLayout hashtag={true}>
				<Homescreen>
					<Title id="title"># {params.hashtag}</Title>
					<InfiniteScroll
						pageStart={1}
						loadMore={loaderPosts}
						hasMore={needRender}
						threshold={150}
					>
						<>
							{allPosts.map((value, index) => (
								<PostsMainLayout
									key={index}
									id={value.id}
									img={value.imageUrl}
									url={value.url}
									text={value.text}
									userId={value.userId}
									name={value.name}
								/>
							))}
						</>
						{isRendering ? (
							<Loading error={errorServer} empty={empty} />
						) : (
							<></>
						)}
					</InfiniteScroll>
				</Homescreen>
			</TimelineMainLayout>
		</>
	);
}
