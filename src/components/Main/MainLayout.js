import styled from "styled-components";
import Logout from "../Logout/Logout";
import AsideMainLayout from "../Aside/AsideMainLayout";
import SearchUser from "../SearchUser/SearchUser";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UploadContext from "../../Contexts/UploadContext.js";

import InfiniteScroll from "react-infinite-scroller";
import PublishBox from "../Timeline/PublishBox";
import HasNewPost from "../Timeline/HasNewPost";
import PostsMainLayout from "../Posts/PostsMainLayout";
import Loading from "../commom/Loading";

export default function MainLayout({
	children,
	userpage,
	timeline,
	follows,
	followeeId,
	hashtag,

	posts,
	setAllPosts,
	allPosts,
	errorServer,
	empty,
	existPost,
	pageTitle,
}) {
	const [needRender, setNeedRender] = useState(true);
	const [isRendering, setIsRendering] = useState(true);

	const navigate = useNavigate();
	const { setUpload, upload } = useContext(UploadContext);

	useEffect(() => {
		setTimeout(() => {
			const title = document.getElementById("title");
			if (title) {
				title.scrollIntoView({ block: "center", behavior: "smooth" });
			}
		}, 500);
	}, []);

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

	const redirectToTimeline = () => {
		setUpload(!upload);
		navigate("/timeline");
	};

	return (
		<Container>
			<Navbar>
				<h1 onClick={redirectToTimeline}>linkr</h1>
				<Logout />
			</Navbar>
			<Homescreen>
				<Title id="title">{pageTitle}</Title>
				{pageTitle === "timeline" ? <PublishBox /> : ""}
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
						""
					)}
				</InfiniteScroll>
			</Homescreen>
			<AsideMainLayout
				userpage={userpage}
				pageTitle={pageTitle}
				follows={follows}
				followeeId={followeeId}
				hashtag={hashtag}
			/>

			<SearchUser />
		</Container>
	);
}

const Container = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	padding-top: 72px;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	background-color: #333333;
	padding-bottom: 60px;
	position: relative;

	@media screen and (max-width: 611px) {
		padding-top: 130px;
	}
`;

const Navbar = styled.div`
	width: 100%;
	height: 72px;
	background-color: #151515;
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: #ffffff;
	position: fixed;
	right: 0;
	top: 0;
	z-index: 1;
	padding: 0 28px;

	h1 {
		font-size: 49px;
		font-weight: 700;
		line-height: 53.95px;
		font-family: "Passion One", cursive;
		cursor: pointer;
	}
	span {
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
	img {
		width: 53px;
		height: 53px;
		border-radius: 27px;
		margin-left: 20px;
		object-fit: cover;
	}
`;

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
