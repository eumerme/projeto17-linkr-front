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

	useEffect(() => {
		setTimeout(function () {
			listPostsbyHashtags(params.hashtag)
				.then((data) => {
					setPosts(data.data);
				})
				.catch();
		}, 2000);
	}, [params.hashtag]);

	return (
		<>
			<TimelineMainLayout>
				<Homescreen>
					<Title># {params.hashtag}</Title>
					{posts.length !== 0 ? (
						posts.map((value, index) => (
							<PostsMainLayout
								key={index}
								id={value.id}
								img={value.imageUrl}
								url={value.url}
								user={value.name}
								text={value.text}
								likesUser={value.likes}
								userId={value.userId}
							/>
						))
					) : (
						<Loading />
					)}
				</Homescreen>
			</TimelineMainLayout>
		</>
	);
}
