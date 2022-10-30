import Aside from "../Aside/Aside.js";
import SearchUser from "../SearchUser/SearchUser.js";
import { useEffect, useState } from "react";

import { Container, MainLayout, Title } from "./styles.js";
//import InfiniteScroll from "react-infinite-scroller";
import PublishBox from "../Main/TimelinePage/PublishBox.js";
//import HasNewPost from "../Timeline/HasNewPost";
import PostsMainLayout from "./Posts/PostsMainLayout.js";
import Loading from "../commom/Loading.js";
import Navbar from "../Navbar/Navbar.js";

export default function Main({
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
	//	const [needRender, setNeedRender] = useState(true);
	//	const [isRendering, setIsRendering] = useState(true);
	const [title, setTitle] = useState("timeline");

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

	console.log("chamoi main");
	return (
		<Container>
			<Navbar />
			<MainLayout>
				<Title id="title">{title}</Title>
				{pageTitle === "timeline" ? <PublishBox /> : ""}
				{/* <HasNewPost renderPosts={posts.length} /> */}
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
			</MainLayout>
			<Aside
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
