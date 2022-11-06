import { useNavigate } from "react-router-dom";
import Logout from "./Logout/Logout.js";
import styled from "styled-components";
import { redirectToTimeline } from "../commom/resirectTo.js";

export default function Navbar() {
	const navigate = useNavigate();

	return (
		<NavbarLayout>
			<h1 onClick={() => redirectToTimeline({ navigate })}>linkr</h1>
			<Logout />
		</NavbarLayout>
	);
}

const NavbarLayout = styled.div`
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
		font-family: "Passion One", cursive;
		cursor: pointer;
	}

	@media screen and (max-width: 352px) {
		padding: 0 23px;

		h1 {
			font-size: 45px;
		}
	}
`;
