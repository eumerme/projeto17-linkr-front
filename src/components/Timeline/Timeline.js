import { useState } from "react";
import { listPosts } from "../../services/linkr";
import TimelineMainLayout from "./TimelineMainLayout";
import PostsMainLayout from "../Posts/PostsMainLayout";
import styled from "styled-components";
import Loading from "../commom/Loading";
import PublishBox from "./PublishBox";
import InfiniteScroll from "react-infinite-scroller";

function Timeline() {
	const [posts, setPosts] = useState([]);
	const [needRender, setNeedRender] = useState(true);
	const [existPost, setExistPost] = useState(null);
	const [errorServer, setErrorServer] = useState(false);
	const [empty, setEmpty] = useState(false);

	function loaderPosts() {
		setNeedRender(false);
		listPosts(posts.length + 10)
			.then((data) => {
				if (data.data.followSomeone === true) {
					setPosts(Array.from(data.data.posts));
					if (data.data.posts.length === 0) setEmpty(true);
					else setExistPost(true);
				} else {
					if (data.data.posts.length === 0) setExistPost(false);
					else setPosts(Array.from(data.data.posts));
				}
				setNeedRender(true);
			})
			.catch(() => {
				setErrorServer(true);
			});
	}

	return (
		<TimelineMainLayout timeline={true}>
			<Homescreen>
				<Title id="title">timeline</Title>
				<PublishBox />
				<InfiniteScroll
					pageStart={1}
					loadMore={loaderPosts}
					hasMore={needRender}
					loader={
						<Loading error={errorServer} empty={empty} existPost={existPost} />
					}
				>
					{posts.length > 0 ? (
						posts.map((value, index) => (
							<PostsMainLayout
								key={index}
								id={value.id}
								img={value.imageUrl}
								url={value.url}
								text={value.text}
								userId={value.userId}
								name={value.name}
							/>
						))
					) : (
						<Loading error={errorServer} empty={empty} existPost={existPost} />
					)}
				</InfiniteScroll>
			</Homescreen>
		</TimelineMainLayout>
	);
}

const Homescreen = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	@media screen and (max-width: 611px) {
		width: 100%;
	}
`;

const Title = styled.div`
	width: 611px;
	font-family: "Oswald", sans-serif;
	font-size: 43px;
	font-weight: 700;
	line-height: 63.73px;
	text-align: justify;
	color: #ffffff;
	padding: 78px 0 43px 0;
	@media screen and (max-width: 611px) {
		width: 100%;
		padding: 19px 0 19px 17px;
	}
`;

export { Timeline, Title, Homescreen };
