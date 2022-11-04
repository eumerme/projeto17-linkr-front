import styled from "styled-components";

const ModalStyle = styled.div`
	width: 597px;
	height: 262px;
	background: #333333;
	border-radius: 50px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	padding: 5% 10%;

	p {
		font-weight: 700;
		font-size: 34px;
		line-height: 40px;
		text-align: center;
		color: #ffffff;
	}

	div {
		width: 100%;
		display: flex;
		justify-content: space-evenly;

		button {
			width: auto;
			height: auto;
			background: #ffffff;
			border: none;
			border-radius: 5px;
			font-weight: 700;
			font-size: 18px;
			color: #1877f2;
			cursor: pointer;
			padding: 10px;
		}

		button:nth-child(2) {
			background: #1877f2;
			color: #ffffff;
		}
	}
	@media screen and (max-width: 645px) {
		width: 300px;
		height: 200px;
		p {
			font-size: 20px;
			line-height: 25px;
		}
		button:nth-child(1) {
			margin-right: 2.5px;
		}
		button:nth-child(2) {
			margin-left: 2.5px;
		}
		button:nth-child(1),
		button:nth-child(2) {
			font-size: 14px;
		}
	}
`;

export { ModalStyle };
