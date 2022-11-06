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

const MainLayout = styled.div`
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

export { Container, MainLayout, Title };
