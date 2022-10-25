import { useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { isFollowing, listUserPosts } from "../../services/linkr";
import Loading from "../commom/Loading";
import PostsMainLayout from "../Posts/PostsMainLayout";
import TimelineMainLayout from "../Timeline/TimelineMainLayout";
import { Homescreen, Title } from "../Timeline/Timeline";
import UploadContext from "../../Contexts/UploadContext";

export default function UserPage() {
	const { id } = useParams();
	const [posts, setPosts] = useState([]);
	const { state } = useLocation();
	const [errorServer, setErrorServer] = useState(false);
	const [empty, setEmpty] = useState(false);
	const auth = JSON.parse(localStorage.getItem("linkr"));
	const [follow, setFollow] = useState(null);
	const { upload } = useContext(UploadContext);
	useEffect(() => {
		setTimeout(function () {
			listUserPosts(id)
				.then((res) => {
					setPosts(res.data);
					if (res.data.length === 0) setEmpty(true);
				})
				.catch((error) => {
					console.log(error);
					setErrorServer(true);
				});
		}, 1000);
	}, [id]);

	useMemo(() => {
		isFollowing({ userId: auth.id, followeeId: Number(id) })
			.then((res) => {
				setFollow(res.data.follows);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [id, upload]);

	return (
		<>
			<TimelineMainLayout userpage={true} follows={follow} followeeId={id}>
				<Homescreen>
					<Title>{`${state.name}'s posts`}</Title>
					{posts.length !== 0 ? (
						posts.map((value, index) => (
							<PostsMainLayout
								key={index}
								id={value.id}
								img={value.imageUrl}
								url={value.url}
								name={value.name}
								text={value.text}
								likesUser={value.likes}
								userId={value.userId}
							/>
						))
					) : (
						<Loading error={+errorServer} empty={+empty} />
					)}
				</Homescreen>
			</TimelineMainLayout>
		</>
	);
}
