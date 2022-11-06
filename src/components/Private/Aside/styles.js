import styled from "styled-components";

const Container = styled.div`
	width: auto;
	height: auto;
	padding: 103px 0 0 50px;
	position: sticky;
	top: ${({ pageTitle }) => (pageTitle === "timeline" ? "153px" : "72px")};
	display: flex;
	flex-direction: column;
	align-items: flex-end;

	@media screen and (max-width: 1024px) {
		position: fixed;
		padding: 0;
		top: 22px;
		right: 140px;
		z-index: 3;
	}

	@media screen and (max-width: 380px) {
		right: 115px;
	}

	@media screen and (max-width: 315px) {
		right: 110px;
	}
`;

const TrendingBox = styled.div`
	width: 300px;
	height: 406px;
	border-radius: 16px;
	background-color: #171717;
	margin-top: ${({ pageTitle }) => (pageTitle === "hashtag" ? "81px" : "0")};
	margin-bottom: 28px;

	h2 {
		width: 100%;
		font-family: "Oswald", sans-serif;
		font-size: 27px;
		font-weight: 700;
		line-height: 40.01px;
		color: #ffffff;
		padding: 9px 0 12px 16px;
		border-bottom: 1px solid #484848;
	}
	ul {
		width: 90%;
		height: 293px;
		overflow-y: scroll;
		margin: 22px 0 0 16px;
		::-webkit-scrollbar {
			display: none;
		}
		li {
			overflow-x: hidden;
			font-size: 19px;
			font-weight: 700;
			line-height: 22.08px;
			color: #ffffff;
			margin: 0 0 8px 0;
			cursor: pointer;
		}
	}

	@media screen and (max-width: 1024px) {
		opacity: 0;
		visibility: hidden;
		transform: translateY(-3px);
		transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
		position: fixed;
		top: 72px;
		left: 50px;
		margin-top: 0;

		${({ isActive }) => {
			if (isActive) {
				return `
            &&& {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);				
            }`;
			}
		}}
	}

	@media screen and (max-width: 611px) {
		top: 72px;
		left: 0;
		border-radius: 0 0 16px 16px;
	}

	@media screen and (max-width: 352px) {
		width: 100%;
		border-radius: 0 0 16px 16px;
	}
`;

const FollowButton = styled.button`
	width: 112px;
	height: 31px;
	margin-bottom: 50px;
	border-radius: 5px;
	background-color: ${({ follows }) => (follows ? "#ffffff" : "#1877f2")};
	font-size: 14px;
	font-weight: 700;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${({ follows }) => (follows ? "#1877f2" : "#ffffff")};
	cursor: pointer;
	outline: inherit;
	border: inherit;
	opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
	visibility: ${({ user }) => (user ? "hidden" : "visible")};

	@media screen and (max-width: 1024px) {
		display: none;
	}
`;

const FollowIcon = styled.button`
	width: auto;
	height: auto;
	font-size: 25px;
	color: #f3f3f3;
	background-color: inherit;
	border: inherit;
	outline: inherit;
	cursor: pointer;
	opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
	visibility: ${({ user }) => (user ? "hidden" : "visible")};

	@media screen and (min-width: 1024px) {
		display: none;
	}
`;

const TrendingBoxMobile = styled.div`
	@media screen and (max-width: 1024px) {
		width: 35px;
		height: 35px;
		border-radius: 50%;
		display: grid;
		place-content: center;
		position: fixed;
		top: 19px;
		left: 147px;
		z-index: 3;
		margin-top: 0;
		font-size: 35px;
		font-weight: 500;
		color: ${({ isActive }) => (isActive ? "#1877f2" : "#ffffff")};
		cursor: pointer;
		font-family: "Passion One";
	}

	@media screen and (min-width: 1024px) {
		display: none;
	}

	@media screen and (max-width: 380px) {
		left: 125px;
	}

	@media screen and (max-width: 315px) {
		left: 110px;
	}
`;

export { Container, TrendingBox, TrendingBoxMobile, FollowButton, FollowIcon };
