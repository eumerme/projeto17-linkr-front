import styled from "styled-components";

export default function AuthMainLayout({
	children,
	isDisabled,
	...otherprops
}) {
	return (
		<Container>
			<Infos>
				<h1>Linkr</h1>
				<p>
					save, share and discover
					<br />
					the best links on the web
				</p>
			</Infos>
			<Form isDisabled={isDisabled} {...otherprops}>
				{children}
			</Form>
		</Container>
	);
}

const Container = styled.div`
	width: 100%;
	height: 100%;
	box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
	display: flex;
	justify-content: space-between;

	@media screen and (max-width: 768px) {
		background-color: white;
		flex-direction: column;
	}
`;

const Infos = styled.div`
	width: 65%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	padding-left: 7%;
	background-color: #151515;
	color: #fff;
	font-weight: 700;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

	h1 {
		font-family: "Passion One", cursive;
		font-size: 106px;
	}

	p {
		font-family: "Oswald", sans-serif;
		font-size: 43px;
	}

	@media screen and (max-width: 768px) {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		width: 100%;
		height: 175px;
		padding-left: 0;
		align-items: center;

		h1 {
			font-size: 76px;
		}

		p {
			font-size: 23px;
		}
	}
`;

const Form = styled.form`
	width: 35%;
	height: 100%;
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
		background-color: ${(props) => (props.isDisabled ? "#8A8A8A" : "#FFF")};
		border: none;
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
		background-color: ${(props) => (props.isDisabled ? "#8A8A8A" : "#1877F2")};
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

	p {
		font-family: "Lato", sans-serif;
		font-weight: 400;
		font-size: 20px;
		color: #fff;
		text-decoration: underline;
		cursor: pointer;
	}

	@media screen and (max-width: 768px) {
		width: 100%;
		height: 100%;
		justify-content: start;
		padding-top: 200px;

		input,
		button {
			font-size: 22px;
		}

		p {
			font-size: 17px;
		}
	}
`;
