import styled from "styled-components";

const Container = styled.div`
	width: 100%;
	max-width: 611px;
	min-height: 232px;
	background-color: #1e1e1e;
	margin-bottom: ${({ repost }) => (repost ? 0 : "35px")};
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
	border-radius: 16px;
	background-color: #171717;

	@media screen and (max-width: 611px) {
		border-radius: 0;
	}
`;

const Description = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;

	span {
		width: 100%;
		font-size: 22px;
		font-weight: 400;
		color: #ffffff;
		margin-bottom: 10px;
		display: flex;
		justify-content: space-between;
		line-height: 20px;

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
		overflow: hidden;

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
			word-break: break-all;
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

	${({ seeComments }) => {
		if (seeComments) {
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

export { Container, Content, Description, UrlDatas, CommentsWrapper };
