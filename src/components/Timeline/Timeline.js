import { useContext, useEffect, useState } from "react";
import { listPosts } from "../../services/linkr";
import UploadContext from "../../Contexts/UploadContext";
import MainLayout from "../Main/MainLayout";

import styled from "styled-components";

/* export default */ function Timeline() {
	/* 	const [posts, setPosts] = useState([]);
	const [allPosts, setAllPosts] = useState([]);
	const [needRender, setNeedRender] = useState(true);
	const [isRendering, setIsRendering] = useState(true);
	const [existPost, setExistPost] = useState(null);
	const [errorServer, setErrorServer] = useState(false);
	const [empty, setEmpty] = useState(false);
	const { upload } = useContext(UploadContext);

	useEffect(() => {
		setTimeout(function () {
			listPosts()
				.then((data) => {
					if (data.data.followSomeone === true) {
						setPosts(Array.from(data.data.posts));
						setAllPosts(Array.from(data.data.posts).slice(0, allPosts.length));
						if (data.data.posts.length === 0) setEmpty(true);
						else setExistPost(true);
					} else {
						if (data.data.posts.length === 0) {
							setExistPost(false);
						} else {
							setPosts(Array.from(data.data.posts));
							setAllPosts(
								Array.from(data.data.posts).slice(0, allPosts.length)
							);
						}
					}
				})
				.catch(() => {
					setErrorServer(true);
				});
		}, 500);
	}, [upload]);

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
		<TimelineMainLayout timeline={true}>
			<Homescreen>
				<Title id="title">timeline</Title>
				<PublishBox />
				<HasNewPost renderPosts={posts.length} />
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
								repostBy={value.repostBy}
							/>
						))}
					</>
					{isRendering ? (
						<Loading error={errorServer} empty={empty} existPost={existPost} />
					) : (
						<></>
					)}
				</InfiniteScroll>
			</Homescreen>
		</TimelineMainLayout>
	); */

	const [posts, setPosts] = useState([]);
	const [allPosts, setAllPosts] = useState([]);
	const [existPost, setExistPost] = useState(null);
	const [errorServer, setErrorServer] = useState(false);
	const [empty, setEmpty] = useState(false);
	const { upload } = useContext(UploadContext);

	useEffect(() => {
		setTimeout(function () {
			listPosts()
				.then((data) => {
					if (data.data.followSomeone === true) {
						setPosts(Array.from(data.data.posts));
						setAllPosts(Array.from(data.data.posts).slice(0, allPosts.length));
						if (data.data.posts.length === 0) setEmpty(true);
						else setExistPost(true);
					} else {
						if (data.data.posts.length === 0) {
							setExistPost(false);
						} else {
							setPosts(Array.from(data.data.posts));
							setAllPosts(
								Array.from(data.data.posts).slice(0, allPosts.length)
							);
						}
					}
				})
				.catch(() => {
					setErrorServer(true);
				});
		}, 500);
	}, [upload]);

	return (
		<MainLayout
			pageTitle={"timeline"}
			posts={posts}
			setAllPosts={setAllPosts}
			allPosts={allPosts}
			errorServer={errorServer}
			empty={empty}
			existPost={existPost}
		/>
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

export { Timeline, Homescreen, Title };
