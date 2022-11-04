import styled from "styled-components";
import { useState, useContext, useEffect, useLayoutEffect } from "react";
import {
	listComments,
	listLikes,
	listReposts,
	getRepostById,
} from "../../../../services/linkr.js";

import DeleteModal from "./Top/DeletePost.js";
import UploadContext from "../../../../Contexts/UploadContext.js";
import CommentsBox from "./Comments/CommentsBox.js";

import AsideActions from "./AsideActions/AsideActions.js";
import Top from "./Top/Top.js";

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
}) {
	const [modalIsOpen, setIsOpen] = useState(false);
	const { uploadComments, uploadLikes } = useContext(UploadContext);
	const [likedByNames, setLikedByNames] = useState([]);
	const [likedByIds, setLikedByIds] = useState([]);
	const [likes, setLikes] = useState([]);
	const [liked, setLiked] = useState(false);
	const [seeComments, setSeeComments] = useState(false);
	const [comments, setComments] = useState([]);
	const auth = JSON.parse(localStorage.getItem("linkr"));

	function openModal() {
		setIsOpen(true);
	}

	useLayoutEffect(() => {
		listLikes(postId)
			.then((res) => {
				setLikedByNames(res.data.likes.likedByNames);
				setLikedByIds(res.data.likes.likedByIds);
				setLikes(res.data.likes.likes);
				setLiked(res.data.liked);
			})
			.catch();
	}, [uploadLikes]);

	useLayoutEffect(() => {
		listComments(postId)
			.then((res) => setComments(res.data))
			.catch();
	}, [uploadComments]);

	console.log({ seeComments });

	return (
		<>
			<Container>
				<Content>
					<AsideActions
						postId={postId}
						userId={auth.id}
						img={img}
						likedByNames={likedByNames}
						likedByIds={likedByIds}
						likes={likes}
						liked={liked}
						setSeeComments={setSeeComments}
						seeComments={seeComments}
						commentsLength={comments.length}
					/>
					<Description>
						<Top
							userId={userId}
							name={name}
							authId={auth.id}
							postId={postId}
							text={text}
							openModal={openModal}
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
						/>
					</CommentsWrapper>
				) : (
					""
				)}
			</Container>
			<DeleteModal
				postId={postId}
				modalIsOpen={modalIsOpen}
				setIsOpen={setIsOpen}
			/>
		</>
	);
}

const Container = styled.div`
	width: 100%;
	max-width: 611px;
	background-color: #171717;
	margin-bottom: 35px;
	//background-color: crimson;
	min-height: 276px;
	border-radius: 16px;
	display: flex;
	flex-direction: column;
	align-items: center;

	@media screen and (max-width: 611px) {
		width: 100%;
		border-radius: 0;
		min-height: 232px;
	}
`;

const Content = styled.div`
	width: 100%;
	min-height: 232px;
	display: flex;
	padding: 4% 3%;
	//background-color: blueviolet;
`;

const Description = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	//background-color: lightblue;

	span {
		width: 100%;
		font-size: 22px;
		font-weight: 400;
		color: #ffffff;
		margin-bottom: 10px;
		display: flex;
		justify-content: space-between;
		line-height: 20px;
		//background-color: lightcoral;
		h1 {
			cursor: pointer;
		}

		p {
			width: 100%;
			font-size: 17px;
			font-weight: 400;
			color: #b7b7b7;
			margin-bottom: 10px;
			display: flex;
			flex-wrap: wrap;
			word-wrap: break-word;
			word-break: break-all;
			//background-color: #b7b7b7;
			span {
				width: auto;
				padding: 0 4px;
			}
		}
	}
`;

const UrlDatas = styled.div`
	width: 100%;
	height: 180px;
	max-height: auto;
	border: 1px solid #4d4d4d;
	border-radius: 11px;
	display: flex;
	cursor: pointer;

	div {
		padding: 10px;
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		overflow-y: hidden;

		h1 {
			height: auto;
			width: 100%;
			font-weight: 400;
			font-size: 16px;
			color: #cecece;
		}

		p {
			width: 100%;
			height: auto;
			font-weight: 400;
			font-size: 11px;
			color: #9b9595;
		}

		h2 {
			width: 100%;
			height: auto;
			font-weight: 400;
			font-size: 11px;
			color: #cecece;
			word-wrap: break-word;
		}
	}

	.UrlImage {
		width: 40%;
		height: 100%;
		border-left: 1px solid #4d4d4d;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;

		img {
			width: 100%;
			height: 100%;
			border-radius: 0 11px 11px 0;
		}
	}

	@media screen and (max-width: 611px) {
		justify-content: space-between;
		height: 165px;

		div {
			h1 {
				font-size: 11px;
			}
			p {
				font-size: 9px;
			}
			h2 {
				font-size: 9px;
			}
		}

		.UrlImage {
			min-width: 32%;
		}
	}
`;

const CommentsWrapper = styled.div`
	width: 100%;
	height: auto;
	opacity: 0;
	visibility: hidden;
	transform: translateY(5px);
	transition: opacity 1s ease, transform 1s ease, visibility 1s;
	//background-color: crimson;
	${(props) => {
		if (props.seeComments) {
			return `
              &&& {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);				
              } 
            `;
		}
	}}
`;

/* const RePost = styled.div`
	width: 100%;
	min-height: 279px;
	border-radius: 16px;
	margin-bottom: 30px;
	display: flex;
	justify-content: center;
	flex-direction: column;
	//background-color: #1e1e1e;
	background-color: blue;

	@media screen and (max-width: 611px) {
		width: 100%;
		border-radius: 0;
		min-height: 232px;
	}
`;

const InfoRePost = styled.div`
	display: flex;
	align-items: center;

	p {
		font-weight: 700;
		font-size: 11px;
		color: #ffffff;
	}
`;

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
			<DeleteModal id={id} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
			<RepostModal
				modalRepost={modalRepost}
				setModalRepost={setModalRepost}
				postId={id}
				userId={auth.id}
			/> */
