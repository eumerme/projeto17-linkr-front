import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UploadContext from "../../../Contexts/UploadContext.js";
import Logout from "./Logout/Logout.js";
import styled from "styled-components";

export default function Navbar() {
	const { setUpload, upload } = useContext(UploadContext);
	const navigate = useNavigate();

	const redirectToTimeline = () => {
		setUpload(!upload);
		navigate("/timeline");
	};

	return (
		<NavbarLayout>
			<h1 onClick={redirectToTimeline}>linkr</h1>
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
