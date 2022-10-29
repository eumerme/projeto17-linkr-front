import styled from "styled-components";

const Container = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	padding-top: 72px;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	background-color: #333333;
	padding-bottom: 60px;
	position: relative;

	@media screen and (max-width: 611px) {
		padding-top: 130px;
	}
`;

const Navbar = styled.div`
	width: 100%;
	height: 72px;
	background-color: #151515;
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: #ffffff;
	position: fixed;
	right: 0;
	top: 0;
	z-index: 1;
	padding: 0 28px;

	h1 {
		font-size: 49px;
		font-weight: 700;
		line-height: 53.95px;
		font-family: "Passion One", cursive;
		cursor: pointer;
	}
	span {
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
	img {
		width: 53px;
		height: 53px;
		border-radius: 27px;
		margin-left: 20px;
		object-fit: cover;
	}
`;

const Homescreen = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	@media screen and (max-width: 611px) {
		width: 100%;
	}
`;

const Title = styled.div`
	width: 611px;
	font-family: "Oswald", sans-serif;
	font-size: 43px;
	font-weight: 700;
	line-height: 63.73px;
	text-align: justify;
	color: #ffffff;
	padding: 78px 0 43px 0;
	@media screen and (max-width: 611px) {
		width: 100%;
		padding: 19px 0 19px 17px;
	}
`;

export { Container, Navbar, Homescreen, Title };
