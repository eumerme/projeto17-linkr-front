import Logout from "../Logout/Logout";
import AsideMainLayout from "../Aside/AsideMainLayout";
import SearchUser from "../SearchUser/SearchUser";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UploadContext from "../../Contexts/UploadContext.js";

import { Container, Navbar, Homescreen, Title } from "./styles";
//import InfiniteScroll from "react-infinite-scroller";
import PublishBox from "../Timeline/PublishBox";
import HasNewPost from "../Timeline/HasNewPost";
import PostsMainLayout from "../Posts/PostsMainLayout";
import Loading from "../commom/Loading";

export default function MainLayout({
	userpage,
	follows,
	followeeId,
	posts,
	/* setPosts, */
	allPosts,
	errorServer,
	empty,
	existPost,
	pageTitle,
	name,
	hashtag,
}) {
	const navigate = useNavigate();
	//	const [needRender, setNeedRender] = useState(true);
	//	const [isRendering, setIsRendering] = useState(true);
	const [title, setTitle] = useState("timeline");
	const { setUpload, upload } = useContext(UploadContext);

	useEffect(() => {
		setTimeout(() => {
			const title = document.getElementById("title");
			if (title) {
				title.scrollIntoView({ block: "center", behavior: "smooth" });
			}
		}, 500);

		if (pageTitle === "userpage") setTitle(`${name}'s posts`);
		if (pageTitle === "hashtag") setTitle(`# ${hashtag}`);
	}, []);

	/* function loaderPosts() {
		setIsRendering(true);
		setNeedRender(false);

		if (allPosts.length === 0) setNeedRender(true);

		setTimeout(() => {
			setIsRendering(false);
			const partOfPosts = allPosts.slice(posts.length, posts.length + 10);
			setPosts(posts.concat(partOfPosts));

			if (allPosts.length > posts.length) {
				setNeedRender(true);
			}
		}, 2000);
	} */

	const redirectToTimeline = () => {
		setUpload(!upload);
		navigate("/timeline");
	};

	console.log({ name, title });
	return (
		<Container>
			<Navbar>
				<h1 onClick={redirectToTimeline}>linkr</h1>
				<Logout />
			</Navbar>
			<Homescreen>
				<Title id="title">{title}</Title>
				{pageTitle === "timeline" ? <PublishBox /> : ""}
				<HasNewPost renderPosts={posts.length} />
				{allPosts.length !== 0 ? (
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
				) : (
					<Loading error={errorServer} empty={empty} existPost={existPost} />
				)}
			</Homescreen>
			<AsideMainLayout
				userpage={userpage}
				pageTitle={pageTitle}
				follows={follows}
				followeeId={followeeId}
			/>
			<SearchUser />
		</Container>
	);
}

/* <InfiniteScroll
	pageStart={1}
	loadMore={loaderPosts}
	hasMore={needRender}
	threshold={150}
></InfiniteScroll> 

{isRendering ? (
	<Loading error={errorServer} empty={empty} existPost={existPost} />
) : (
	""
)}
*/
