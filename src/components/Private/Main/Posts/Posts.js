import { useState, useContext, useLayoutEffect } from "react";
import { listComments, listLikes } from "../../../../services/linkr.js";
import UploadContext from "../../../../Contexts/UploadContext.js";
import CommentsBox from "./Comments/CommentsBox.js";
import AsideActions from "./AsideActions/AsideActions.js";
import Top from "./Top/Top.js";
import {
	Container,
	Content,
	Description,
	UrlDatas,
	CommentsWrapper,
} from "./styles.js";
import HandleModal from "./Modal/Modal.js";

export default function Posts({
	userId,
	name,
	postId,
	img,
	text,
	url,
	urlTitle,
	urlImage,
	urlDescription,
	repost,
	repostsAmount,
}) {
	const [modalIsOpen, setIsOpen] = useState(false);
	const { uploadComments, uploadLikes } = useContext(UploadContext);
	const [likedByNames, setLikedByNames] = useState([]);
	const [likedByIds, setLikedByIds] = useState([]);
	const [likes, setLikes] = useState([]);
	const [isLiked, setIsLiked] = useState(false);
	const [seeComments, setSeeComments] = useState(false);
	const [comments, setComments] = useState([]);
	const auth = JSON.parse(localStorage.getItem("linkr"));
	const [info, setInfo] = useState("");

	const openModal = (action, type) => {
		setInfo({ action, type });
		setIsOpen(true);
	};

	useLayoutEffect(() => {
		listLikes(postId)
			.then((res) => {
				setLikedByNames(res.data.likes.likedByNames);
				setLikedByIds(res.data.likes.likedByIds);
				setLikes(res.data.likes.likes);
				setIsLiked(res.data.isLiked);
			})
			.catch();
	}, [uploadLikes]);

	useLayoutEffect(() => {
		listComments(postId)
			.then((res) => setComments(res.data))
			.catch();
	}, [uploadComments]);

	return (
		<>
			<Container repost={repost.isRepost}>
				<Content>
					<AsideActions
						postId={postId}
						userId={auth.id}
						img={img}
						likedByNames={likedByNames}
						likedByIds={likedByIds}
						likes={likes}
						isLiked={isLiked}
						setIsLiked={setIsLiked}
						setSeeComments={setSeeComments}
						seeComments={seeComments}
						commentsLength={comments.length}
						openModal={openModal}
						repostsAmount={repostsAmount}
						isRepost={repost.isRepost}
					/>
					<Description>
						<Top
							userId={userId}
							name={name}
							authId={auth.id}
							postId={postId}
							text={text}
							openModal={openModal}
							repost={repost}
						/>
						<UrlDatas onClick={() => window.open(url, "_blank")}>
							<div>
								<h1>{urlTitle}</h1>
								<p>{urlDescription}</p>
								<h2>{url}</h2>
							</div>
							<div className="UrlImage">
								<img src={urlImage} alt="" />
							</div>
						</UrlDatas>
					</Description>
				</Content>
				{seeComments ? (
					<CommentsWrapper seeComments={seeComments}>
						<CommentsBox
							postId={postId}
							comments={comments}
							commentUserId={auth.id}
							isRepost={repost.isRepost}
						/>
					</CommentsWrapper>
				) : (
					""
				)}
			</Container>
			<HandleModal
				info={info}
				postId={postId}
				modalIsOpen={modalIsOpen}
				setIsOpen={setIsOpen}
			/>
		</>
	);
}
