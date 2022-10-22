import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { listUserPosts } from "../../services/linkr";
import Loading from "../commom/Loading";
import PostsMainLayout from "../Posts/PostsMainLayout";
import TimelineMainLayout from "../Timeline/TimelineMainLayout";
import { Homescreen, Title } from "../Timeline/Timeline";

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
		}, 1000);
	}, [id]);

	return (
		<>
			<TimelineMainLayout>
				<Homescreen>
					<Title>{`${state.name}'s posts`}</Title>
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
