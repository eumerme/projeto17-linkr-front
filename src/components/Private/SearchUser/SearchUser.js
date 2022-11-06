import { IoIosSearch } from "react-icons/io";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { listUsers } from "../../../services/linkr.js";
import { useNavigate } from "react-router-dom";
import UploadContext from "../../../Contexts/UploadContext.js";

export default function SearchUser() {
	const [users, setUsers] = useState([]);
	const [search, setSearch] = useState("");
	const [userFiltered, setUserFiltered] = useState([]);
	const navigate = useNavigate();
	const searchRef = useRef(null);
	const [isActive, setIsActive] = useState(false);
	const { setUpload, upload } = useContext(UploadContext);

	useEffect(() => {
		/* setTimeout(() => {
		}, 300); */
		if (search?.length > 0) {
			const promise = listUsers();
			promise
				.then((res) => {
					setUsers(res.data);
				})
				.catch();
		}
		if (search?.length === 0) {
			//	setUsers("");
			setUserFiltered("");
		}
	}, [search.length, upload]);

	//console.log({ search, users, userFiltered });

	useMemo(() => {
		if (users.length !== 0 && search.length > 2) {
			const lowerSearch = search.toLowerCase();
			setTimeout(() => {
				setUserFiltered(
					users.filter((user) => user.name.toLowerCase().includes(lowerSearch))
				);
			}, 300);
		}
	}, [search.length]);

	//console.log({ users, userFiltered });

	function redirectTo(id, name) {
		setUpload(!upload);
		navigate(`/user/${id}`, {
			replace: false,
			state: { name },
		});
	}

	useEffect(() => {
		const pageClickEvent = (e) => {
			const activeElementExists = searchRef.current !== null;
			const isClickedOutside = !searchRef.current?.contains(e.target);
			if (activeElementExists && isClickedOutside) {
				setIsActive(!isActive);
				setSearch("");
			}
		};

		if (isActive) {
			window.addEventListener("click", pageClickEvent);
		}

		return () => {
			window.removeEventListener("click", pageClickEvent);
		};
	}, [isActive, upload]);

	return (
		<Container>
			<SearchWrapper>
				<SearchInput
					type="text"
					placeholder="Search for people"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					onClick={() => setIsActive(!isActive)}
				/>

				<IoIosSearch color="#C6C6C6" />
			</SearchWrapper>
			{userFiltered?.length !== 0 ? (
				<List ref={searchRef}>
					{userFiltered.map((user, index) => (
						<ListItem
							key={index}
							onClick={() => {
								setSearch("");
								redirectTo(user.id, user.name);
							}}
						>
							<ListImage src={user.imageUrl} alt="" />
							<ListInfoWrapper>
								<Username>{user.name}</Username>
								<Follow className="list_follow">
									{user.follow.following ? "• following" : ""}
								</Follow>
							</ListInfoWrapper>
						</ListItem>
					))}
				</List>
			) : (
				""
			)}
		</Container>
	);
}

const Container = styled.div`
	width: 100%;
	max-width: 490px;
	height: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: fixed;
	z-index: 2;
	top: 13px;
	right: calc (100% - 50%);
	background-color: #e7e7e7;
	border-radius: 8px;

	@media screen and (max-width: 882px) {
		position: absolute;
		width: 80%;
		top: 90px;
		z-index: 0;
	}
`;

const List = styled.ul`
	width: 100%;
	max-width: 490;
	height: auto;
	background-color: #e7e7e7;
	border-radius: 8px;
`;

const ListItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	cursor: pointer;

	:hover {
		background-color: #999ba138;
		transition: 0.4s;
		border-radius: 8px;
	}
`;

const ListImage = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	object-fit: cover;
	margin: 10px;
`;

const ListInfoWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const Username = styled.p`
	font-size: 19px;
	font-weight: 400;
	color: #515151;
	margin-right: 5px;
`;

const Follow = styled.span`
	font-size: 16px;
	font-weight: 400;
	color: #c5c5c5;
`;

const SearchWrapper = styled.div`
	width: 100%;
	height: 45px;
	background-color: #ffffff;
	border-radius: 8px;
	padding: 0 8px;
	font-weight: 400;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const SearchInput = styled.input`
	width: 90%;
	height: 100%;
	border-radius: 8px;
	margin-right: 8px;
	outline: none;
	border: none;
	cursor: pointer;

	::placeholder {
		color: #9f9f9f;
	}
`;
