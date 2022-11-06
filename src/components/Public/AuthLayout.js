import styled from "styled-components";

export default function AuthLayout({ children, isDisabled, onSubmit }) {
	return (
		<Container>
			<Infos>
				<h1>Linkr</h1>
				<p>save, share and discover the best links on the web</p>
			</Infos>
			<Form onSubmit={onSubmit} isDisabled={isDisabled}>
				{children}
			</Form>
		</Container>
	);
}

const Container = styled.div`
	width: 100%;
	height: 100vh;
	box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
	display: flex;

	@media screen and (max-width: 768px) {
		flex-direction: column;
	}
`;

const Infos = styled.div`
	width: 65%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	padding: 0 7%;
	background-color: #151515;
	color: #fff;
	font-weight: 700;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

	h1 {
		font-family: "Passion One", cursive;
		font-size: 106px;
	}

	p {
		max-width: 400px;
		font-family: "Oswald", sans-serif;
		font-size: 43px;
	}

	@media screen and (max-width: 1000px) {
		width: 55%;
	}

	@media screen and (max-width: 768px) {
		width: 100%;
		height: auto;
		padding: 25px 50px;
		align-items: center;
		text-align: center;

		h1 {
			font-size: 78px;
		}

		p {
			font-size: 32px;
		}
	}
`;

const Form = styled.form`
	width: 35%;
	height: 100vh;
	padding: 35px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #333333;

	input {
		width: 100%;
		height: 65px;
		border-radius: 6px;
		background-color: ${({ isDisabled }) => (isDisabled ? "#8A8A8A" : "#FFF")};
		border: inherit;
		outline: #000000;
		margin-bottom: 12px;
		padding-left: 15px;
		font-family: "Oswald", sans-serif;
		font-size: 27px;
		font-weight: 700;
		color: #9f9f9f;
		cursor: pointer;
	}

	input::placeholder {
		color: #9f9f9f;
		font-size: 27px;
	}

	button {
		width: 100%;
		height: 65px;
		background-color: ${({ isDisabled }) =>
			isDisabled ? "#8A8A8A" : "#1877F2"};
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: "Oswald", sans-serif;
		font-size: 27px;
		font-weight: 700;
		color: #fff;
		border-radius: 6px;
		border: none;
		cursor: pointer;
		margin-bottom: 12px;
	}

	input:hover {
		opacity: 0.92;
		border-radius: 6px;
	}
	button:hover {
		opacity: 0.9;
		border-radius: 6px;
	}

	p {
		font-weight: 400;
		font-size: 20px;
		color: #fff;
		text-decoration: underline;
		cursor: pointer;
	}

	@media screen and (max-width: 1000px) {
		width: 45%;
	}

	@media screen and (max-width: 768px) {
		width: 100%;
		height: 100%;
		justify-content: flex-start;

		input,
		button {
			font-size: 22px;
			height: 58px;
		}

		input::placeholder {
			font-size: 22px;
		}

		p {
			font-size: 17px;
		}
	}
`;
