import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listPostsbyHashtags } from "../../services/linkr";
import PostsMainLayout from "../Posts/PostsMainLayout";
import TimelineMainLayout from "../Timeline/TimelineMainLayout";
import { Homescreen, Title } from "../Timeline/Timeline";
import Loading from "../commom/Loading";

export default function HashtagPage() {
	const params = useParams();
	const [posts, setPosts] = useState([]);
	const [errorServer, setErrorServer] = useState(false);
	const [empty, setEmpty] = useState(false);

	useEffect(() => {
		setTimeout(function () {
			listPostsbyHashtags(params.hashtag)
				.then((data) => {
					setPosts(data.data);
					if (data.data.length === 0) setEmpty(true);
				})
				.catch((error) => {
					console.log(error);
					setErrorServer(true);
				});
		}, 500);
	}, [params.hashtag]);

	return (
		<>
			<TimelineMainLayout>
				<Homescreen>
					<Title># {params.hashtag}</Title>
					{posts.length !== 0 ? (
						posts.map((value, index) => console.log(value))
					) : (
						<Loading error={+errorServer} empty={+empty} />
					)}
				</Homescreen>
			</TimelineMainLayout>
		</>
	);
}
