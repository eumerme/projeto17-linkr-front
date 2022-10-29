import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { userLogout } from "../../../../services/linkr.js";

function ButtonLogout() {
	const promise = userLogout();
	promise
		.then((res) => {
			localStorage.clear("linkr");
			window.location.reload();
		})
		.catch((error) => console.error(error));
}

export default function Logout() {
	const dropdownRef = useRef(null);
	const [isActive, setIsActive] = useState(false);
	const auth = JSON.parse(localStorage.getItem("linkr"));

	useEffect(() => {
		const pageClickEvent = (e) => {
			const activeElementExists = dropdownRef.current !== null;
			const isClickedOutside = !dropdownRef.current.contains(e.target);

			if (activeElementExists && isClickedOutside) {
				setIsActive(!isActive);
			}
		};

		if (isActive) {
			window.addEventListener("click", pageClickEvent);
		}

		return () => {
			window.removeEventListener("click", pageClickEvent);
		};
	}, [isActive]);

	return (
		<Wrapper
			onClick={() => {
				setIsActive(!isActive);
			}}
		>
			<ToggleArrow isActive={isActive}>
				<IoIosArrowDown />
			</ToggleArrow>

			<img src={auth.image} alt="profileImg"></img>
			<ButtonWrapper
				ref={dropdownRef}
				isActive={isActive}
				onClick={() => ButtonLogout()}
			>
				Logout
			</ButtonWrapper>
		</Wrapper>
	);
}

const Wrapper = styled.span`
	width: auto;
	height: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	img {
		width: 53px;
		height: 53px;
		border-radius: 50%;
		margin-left: 20px;
	}

	@media screen and (max-width: 352px) {
		img {
			width: 47px;
			height: 47px;
			margin-left: 16px;
		}
	}
`;

const ToggleArrow = styled.div`
	font-size: 20px;
	transform: ${(props) =>
		props.isActive ? "rotate(-180deg)" : "rotate(0deg)"};
	transition: all 0.5s ease;
`;

const ButtonWrapper = styled.div`
	width: 120px;
	height: 47px;
	font-family: "Lato", sans-serif;
	font-weight: 700;
	font-size: 17px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 70px;
	right: 0;
	background-color: #151515;
	border-radius: 0px 0px 0px 20px;
	opacity: 0;
	visibility: hidden;
	transform: translateY(-3px);
	transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;

	${(props) => {
		if (props.isActive) {
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
