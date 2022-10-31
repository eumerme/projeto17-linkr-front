import styled from "styled-components";
import { useState, useContext, useEffect, useMemo } from "react";
import {
	getUrlMetadata,
	listCommentsPost,
	listLikes,
	listReposts,
	getRepostById,
} from "../../../../services/linkr.js";
import { renderLikes, like } from "../../../../services/likes.js";
import ReactTooltip from "react-tooltip";
import { TiPencil } from "react-icons/ti";
import { BiRepost } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";
import EditPost from "./EditPost.js";
import DeleteModal from "./DeletePost.js";
import RepostModal from "./Repost.js";
import { useNavigate } from "react-router-dom";
import { ReactTagify } from "react-tagify";
import UploadContext from "../../../../Contexts/UploadContext.js";
import CommentsBox from "./Comments/CommentsBox.js";
import {
	redirectToHashtagPage,
	redirectToUserpage,
} from "../../commom/resirectTo.js";

export default function PostsMainLayout({ id, img, text, name, url, userId }) {
	const [isEditing, setIsEditing] = useState(false);
	const [modalIsOpen, setIsOpen] = useState(false);
	//	const [modalRepost, setModalRepost] = useState(false);
	const [urlData, setUrlData] = useState({});
	const { upload, setUpload, uploadComments } = useContext(UploadContext);
	const [ListLikes, setListLikes] = useState([]);
	const [clickLike, setClickLike] = useState({});
	const [seeComments, setSeeComments] = useState(false);
	const [commentsData, setCommentsData] = useState([]);
	//	const [reposts, setReposts] = useState(0);
	const [msg, setMsg] = useState("");
	//	const [repostName, setRepostName] = useState("");
	//const [itsReposts, setItsReposts] = useState(false);
	const navigate = useNavigate();
	const auth = JSON.parse(localStorage.getItem("linkr"));

	function openModal() {
		setIsOpen(true);
	}
	/* 
	function openModalRepost() {
		setModalRepost(true);
	} */

	useEffect(() => {
		getUrlMetadata(url)
			.then((data) => {
				const auxData = data.data.data;
				setUrlData({
					title: auxData.title,
					description: auxData.description,
					image: auxData.image.url,
					url: auxData.url,
				});
				if (!urlData.title) {
					setUpload(!upload);
				}
			})
			.catch();

		listLikes(id)
			.then((data) => {
				const likesData = data.data[0];
				renderLikes(likesData, setClickLike, setMsg, auth.id);
				setListLikes(likesData);
			})
			.catch();
	}, [upload]);

	useMemo(() => {
		listCommentsPost(id)
			.then((data) => {
				setCommentsData(data.data);
			})
			.catch();
	}, [uploadComments]);

	const tagStyle = {
		fontSize: "17px",
		fontWeight: 700,
		color: "#FFFFFF",
		cursor: "pointer",
		margin: 0,
	};

	return (
		<>
			<Container>
				<Content>
					<Infos>
						<img src={img} alt="" />
						<div>{clickLike.draw}</div>
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
						{/* 	<BiRepost
							onClick={() => {
								if (!itsReposts) openModalRepost();
							}}
							style={{
								cursor: "pointer",
								color: "#FFFFFF",
								fontSize: "28px",
							}}
						/>
						<p>{reposts} re-posts</p> */}
					</Infos>
					<Description>
						<span>
							<h1
								onClick={() =>
									redirectToUserpage({
										setUpload,
										upload,
										userId,
										name,
										navigate,
									})
								}
							>
								{name}
							</h1>
							{auth.id === userId ? (
								<Options>
									<TiPencil
										style={{ cursor: "pointer" }}
										onClick={() => setIsEditing(!isEditing)}
									/>

									<FaTrash style={{ cursor: "pointer" }} onClick={openModal} />
								</Options>
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
								tagClicked={(tag) =>
									redirectToHashtagPage({ setUpload, upload, tag, navigate })
								}
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
				{seeComments ? (
					<CommentsWrapper seeComments={seeComments}>
						<CommentsBox
							postId={id}
							commentsData={commentsData}
							seeComments={seeComments}
						/>
					</CommentsWrapper>
				) : (
					""
				)}
			</Container>
			<DeleteModal id={id} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
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
	padding: 3%;
	//background-color: blueviolet;
`;

const Infos = styled.div`
	width: auto;
	height: 100%;
	margin-right: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	//background-color: crimson;
	div {
		cursor: pointer;
	}
	img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin-bottom: 20px;
	}

	p {
		margin: 5px 0 10px 0;
		color: #ffffff;
		font-weight: 400;
		font-size: 11px;
		cursor: pointer;
		text-align: center;
		width: 60px;
	}

	.toopTip {
		border-radius: 3px;
		font-weight: 700;
		font-size: 11px;
		color: #505050;
	}

	@media screen and (max-width: 330px) {
		img {
			width: 40px;
			height: 40px;
		}
	}
`;

const Description = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;

	span {
		font-size: 22px;
		font-weight: 400;
		color: #ffffff;
		margin-bottom: 10px;
		display: flex;
		justify-content: space-between;
		width: auto;
		h1 {
			cursor: pointer;
		}
	}

	p {
		font-size: 17px;
		font-weight: 400;
		color: #b7b7b7;
		margin-bottom: 10px;
		display: flex;
		flex-wrap: wrap;
		span {
			width: auto;
			padding: 0 4px;
		}
	}
`;

const Options = styled.div`
	width: 55px;
	font-size: 20px;
	display: flex;
	justify-content: space-between;
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
			border-radius: 0 10px 10px 0;
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

		.UrlImage img {
			width: 100%;
			height: 100%;
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
	background-color: crimson;
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
