/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UploadContext from "../../../../../Contexts/UploadContext.js";
import { redirectToHashtagPage } from "../../../commom/resirectTo.js";

export default function Comment({
	imageUrl,
	commentUserId,
	postUserId,
	name,
	comment,
	followee,
}) {
	const navigate = useNavigate();
	const { upload, setUpload } = useContext(UploadContext);
	const [commentTag, setCommentTag] = useState(<p>{name}</p>);

	useEffect(() => {
		if (commentUserId === postUserId) {
			setCommentTag("• post’s author");
		}
		if (followee !== null) {
			setCommentTag("• following");
		}
	}, []);

	return (
		<>
			<Container>
				<img src={imageUrl} alt="" />
				<Infos>
					<p
						onClick={() => {
							redirectToHashtagPage({
								setUpload,
								upload,
								name,
								navigate,
								userId: commentUserId,
							});
						}}
					>
						{name} <strong>{commentTag}</strong>
					</p>
					<span>{comment}</span>
				</Infos>
			</Container>
		</>
	);
}

const Container = styled.div`
	width: 93%;
	min-height: 50px;
	max-height: auto;
	line-height: 17px;
	border-bottom: 1px solid #353535;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	padding: 10px 0;

	//background-color: blueviolet;

	img {
		width: 50px;
		height: 50px;
		border-radius: 26.5px;
	}

	@media screen and (max-width: 611px) {
		min-height: 61px;
	}

	@media screen and (max-width: 352px) {
		img {
			width: 45px;
			height: 45px;
		}
	}
`;

const Infos = styled.div`
	width: 100%;
	min-height: 50px;
	max-height: auto;
	padding-left: 10px;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	word-wrap: break-word;
	word-break: break-all;

	//background-color: lightgreen;

	p {
		font-weight: 700;
		font-size: 14px;
		color: #f3f3f3;
		cursor: pointer;

		strong {
			color: #565656;
			font-weight: 400;
			padding-left: 3px;
		}
	}

	span {
		font-weight: 400;
		font-size: 14px;
		color: #acacac;
		padding-top: 5px;
	}
	@media screen and (max-width: 611px) {
		width: 85%;
	}
`;
