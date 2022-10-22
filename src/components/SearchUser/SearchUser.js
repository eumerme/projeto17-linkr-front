import { IoIosSearch } from "react-icons/io";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { listUsers } from "../../services/linkr";

export default function SearchUser() {
	const [users, setUsers] = useState([]);
	const [search, setSearch] = useState("");
	const [userFiltered, setUserFiltered] = useState([]);

	const scrollTo = () => {
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		setTimeout(() => {
			if (search?.length >= 3) {
				const promise = listUsers();
				promise
					.then((res) => {
						setUsers(res.data);
					})
					.catch((error) => console.log(error));
			}
		}, 300);
		if (search?.length === 0) {
			setUserFiltered("");
		}
	}, [search.length]);

	useMemo(() => {
		if (users.length !== 0 && search.length >= 3) {
			setTimeout(() => {
				const lowerSearch = search.toLowerCase();
				setUserFiltered(
					users.filter((user) => user.name.toLowerCase().includes(lowerSearch))
				);
			}, 300);
		}
	}, [users.length, search.length]);

	return (
		<Container>
			<SearchWrapper>
				<SearchInput
					type="text"
					placeholder="Search for people"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>

				<IoIosSearch color="#C6C6C6" />
			</SearchWrapper>
			{userFiltered?.length !== 0 ? (
				<List>
					{userFiltered.map((user, index) => (
						<li className="list_item" key={index}>
							<img className="list_img" src={user.imageUrl} alt="" />
							<p className="list_name">{user.name}</p>
						</li>
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

	@media screen and (max-width: 768px) {
		position: absolute;
		width: 95%;
		top: -40px;
		z-index: 0;
	}
`;

const List = styled.ul`
	width: 100%;
	max-width: 490;
	height: auto;
	background-color: #e7e7e7;
	padding: 0 10px;
	border-radius: 8px;

	.list_item {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin: 13px 0;
	}

	.list_img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		object-fit: cover;
		margin-right: 10px;
	}

	.list_name {
		font-family: "Lato", sans-serif;
		font-size: 19px;
		font-weight: 400;
		color: #515151;
	}
`;

const SearchWrapper = styled.div`
	width: 100%;
	height: 45px;
	background-color: #ffffff;
	border-radius: 8px;
	padding: 0 8px;
	font-family: "Lato", sans-serif;
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

	&::placeholder {
		color: #9f9f9f;
	}
`;
