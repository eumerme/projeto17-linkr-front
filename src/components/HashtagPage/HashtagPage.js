import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listPostsbyHashtags } from "../../services/linkr";
import PostStyles from "../../styles/PostStyles";
import TimelineStyles from "../../styles/TimelineStyles";
import { Homescreen, Title } from "../timeline/Timeline";
import Loading from "../../styles/Loading";

export default function HashtagPage() {
	const params = useParams();
	console.log(params);
	const [posts, setPosts] = useState([]);
	console.log(posts);
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
			<TimelineStyles>
				<Homescreen>
					<Title># {params.hashtag}</Title>
					{posts.length !== 0 ? (
						posts.map((value, index) => (
							<PostStyles
								key={index}
								img={value.imageUrl}
								user={value.name}
								text={value.text}
							/>
						))
					) : (
						<Loading />
					)}
				</Homescreen>
			</TimelineStyles>
		</>
	);
}
