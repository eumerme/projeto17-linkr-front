import Aside from "../Aside/Aside.js";
import SearchUser from "../SearchUser/SearchUser.js";
import { useEffect, useLayoutEffect, useState } from "react";

import { Container, MainLayout, Title, Repost, Info } from "./styles.js";
import PublishBox from "../Main/TimelinePage/PublishBox.js";
import Posts from "./Posts/Posts.js";
import Loading from "../commom/Loading.js";
import Navbar from "../Navbar/Navbar.js";

import { BiRepost } from "react-icons/bi";

export default function Main({
	userpage,
	follows,
	followeeId,

	allPosts,
	errorServer,
	empty,
	existPost,
	pageTitle,
	name,
	hashtag,
}) {
	const [title, setTitle] = useState("timeline");
	const auth = JSON.parse(localStorage.getItem("linkr"));

	useEffect(() => {
		setTimeout(() => {
			const title = document.getElementById("title");
			if (title) {
				title.scrollIntoView({ block: "center", behavior: "smooth" });
			}
		}, 500);
	}, []);

	useLayoutEffect(() => {
		if (pageTitle === "userpage") setTitle(`${name}'s posts`);
		if (pageTitle === "hashtag") setTitle(`# ${hashtag}`);
	}, [hashtag, setTitle, name]);

	return (
		<Container>
			<Navbar />
			<MainLayout>
				<Title id="title">{title}</Title>
				{pageTitle === "timeline" ? <PublishBox /> : ""}
				{allPosts.length !== 0 ? (
					<>
						{allPosts.map((value, index) =>
							value.repost.isRepost ? (
								<Repost>
									<Info>
										<BiRepost style={{ color: "#FFFFFF", fontSize: "24px" }} />
										<p>
											{"Re-posted by "}
											{value.repost.repostedById === auth.id
												? "you"
												: value.repost.repostedByName}
										</p>
									</Info>
									<Posts
										key={index}
										userId={value.userId}
										name={value.name}
										postId={value.id}
										img={value.imageUrl}
										text={value.text}
										url={value.url}
										urlTitle={value.urlTitle}
										urlImage={value.urlImage}
										urlDescription={value.urlDescription}
										repost={value.repost}
										repostsAmount={value.repostsAmount}
									/>
								</Repost>
							) : (
								<Posts
									key={index}
									userId={value.userId}
									name={value.name}
									postId={value.id}
									img={value.imageUrl}
									text={value.text}
									url={value.url}
									urlTitle={value.urlTitle}
									urlImage={value.urlImage}
									urlDescription={value.urlDescription}
									repost={value.repost}
									repostsAmount={value.repostsAmount}
								/>
							)
						)}
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
