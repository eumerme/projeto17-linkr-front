import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

export default function Loading({ error, empty }) {
	if (error) {
		return (
			<Wrapper>
				<h1>
					An error occured while trying to fetch the posts, please refresh the
					page
				</h1>
			</Wrapper>
		);
	}

	if (empty) {
		return (
			<Wrapper>
				<h1>There are no posts yet</h1>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<h1>Loading</h1>
			<ThreeDots color="#FFF" height={45} width={45} />
		</Wrapper>
	);
}

const Wrapper = styled.div`
	width: auto;
	max-width: 611px;
	height: 276px;
	margin-top: 40px;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 10px;

	h1 {
		text-align: center;
		font-family: "Oswald", sans-serif;
		font-size: 43px;
		font-weight: 700;
		color: #fff;
		word-wrap: break-word;
	}
`;
