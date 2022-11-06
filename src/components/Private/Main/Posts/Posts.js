import { useState, useContext, useLayoutEffect } from "react";
import {
	listComments,
	listLikes,
	listReposts,
	getRepostById,
} from "../../../../services/linkr.js";
//import DeletePost from "./Top/DeletePost.js";
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
	console.log("repost posts ", repost);
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

	console.log({ repost });

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

/*
	<RePost>
				{itsReposts ? (
					<InfoRePost>
						<BiRepost
							style={{ color: "#FFFFFF", fontSize: "28px", margin: "7px 13px" }}
						/>
						<p>{repostName}</p>
					</InfoRePost>
				) : (
					<></>
				)}
				<Container>
					<Content>
						<Infos>
							<img src={img} alt="" />
							<div
								onClick={() => {
									if (!itsReposts)
										like(
											clickLike,
											id,
											auth.id,
											setClickLike,
											setUpload,
											upload
										);
								}}
							>
								{clickLike.draw}
							</div>
							<p data-tip={msg}>{ListLikes.likes} likes</p>
							<ReactTooltip
								backgroundColor="#FFFFFF"
								className="toopTip"
								place="bottom"
							/>
							<ReactTooltip
								backgroundColor="#FFFFFF"
								className="toopTip"
								place="bottom"
							/>
							<AiOutlineComment
								style={{
									cursor: "pointer",
									color: "#FFFFFF",
									fontSize: "28px",
								}}
								onClick={() => setSeeComments(!seeComments)}
							/>
							<p>{commentsData.length} comments</p>
							<BiRepost
								onClick={() => {
									if (!itsReposts) openModalRepost();
								}}
								style={{
									cursor: "pointer",
									color: "#FFFFFF",
									fontSize: "28px",
								}}
							/>
							<p>{reposts} re-posts</p>
						</Infos>
						<Description itsReposts={itsReposts}>
							<span>
								<h1 onClick={redirectToUserpage}>{name}</h1>
								{auth.id === userId ? (
									<h3>
										{itsReposts ? (
											<></>
										) : (
											<TiPencil
												style={{ cursor: "pointer" }}
												onClick={() => setIsEditing(!isEditing)}
											/>
										)}
										<FaTrash
											style={{ cursor: "pointer" }}
											onClick={openModal}
										/>
									</h3>
								) : (
									""
								)}
							</span>
							{isEditing ? (
								<EditPost
									id={id}
									isEditing={isEditing}
									setIsEditing={setIsEditing}
									text={text}
									upload={upload}
									setUpload={setUpload}
								/>
							) : (
								<ReactTagify
									tagStyle={tagStyle}
									tagClicked={(tag) => redirectToHashtagPage(tag)}
								>
									<p>{text}</p>
								</ReactTagify>
							)}
							<UrlDatas onClick={() => window.open(url, "_blank")}>
								<div>
									<h1>{urlData.title}</h1>
									<p>{urlData.description}</p>
									<h2>{urlData.url}</h2>
								</div>
								<div className="UrlImage">
									<img src={urlData.image} alt="" />
								</div>
							</UrlDatas>
						</Description>
					</Content>
					<CommentsBox
						seeComments={seeComments}
						postId={id}
						commentsData={commentsData}
						itsReposts={itsReposts}
					/>
				</Container>
			</RePost>
			<DeletePost id={id} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
			<RepostModal
				modalRepost={modalRepost}
				setModalRepost={setModalRepost}
				postId={id}
				userId={auth.id}
			/> */
