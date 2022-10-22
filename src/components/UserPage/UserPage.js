import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { listUserPosts } from "../../services/linkr";
import Loading from "../../styles/Loading";
import PostStyles from "../../styles/PostStyles";
import TimelineStyles from "../../styles/TimelineStyles";
import { Homescreen, Title } from "../timeline/Timeline";

export default function UserPage() {
	const { id } = useParams();
	const [posts, setPosts] = useState([]);
	const { state } = useLocation();

	useEffect(() => {
		setTimeout(function () {
			listUserPosts(id)
				.then((res) => {
					setPosts(res.data);
				})
				.catch((error) => console.log(error));
		}, 2000);
	}, [id]);

	return (
		<>
			<TimelineStyles>
				<Homescreen>
					<Title>{`${state.name}'s posts`}</Title>
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
