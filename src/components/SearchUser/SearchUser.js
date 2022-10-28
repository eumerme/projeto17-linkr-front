import { IoIosSearch } from "react-icons/io";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { listUsers } from "../../services/linkr";
import { useNavigate } from "react-router-dom";
import UploadContext from "../../Contexts/UploadContext";

export default function SearchUser() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [userFiltered, setUserFiltered] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const { setUpload, upload } = useContext(UploadContext);

  useEffect(() => {
    setTimeout(() => {
      if (search?.length >= 3) {
        const promise = listUsers();
        promise
          .then((res) => {
            setUsers(res.data);
          })
          .catch();
      }
    }, 300);
    if (search?.length === 0) {
      setUserFiltered("");
    }
  }, [search.length, upload]);

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
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onClick={() => setIsActive(!isActive)}
        />

        <IoIosSearch color="#C6C6C6" />
      </SearchWrapper>
      {userFiltered?.length !== 0 ? (
        <List ref={searchRef}>
          {userFiltered.map((user, index) => (
            <li
              className="list_item"
              key={index}
              onClick={() => {
                setSearch("");
                redirectTo(user.id, user.name);
              }}
            >
              <img className="list_img" src={user.imageUrl} alt="" />
              <div className="list_container">
                <p className="list_name">{user.name}</p>
                <span className="list_follow">
                  {user.follow.following ? "• following" : ""}
                </span>
              </div>
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

  .list_item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
  }

  .list_item:hover {
    background-color: #999ba138;
    transition: 0.4s;
    border-radius: 8px;
  }

  .list_img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin: 10px;
  }

  .list_name {
    font-family: "Lato", sans-serif;
    font-size: 19px;
    font-weight: 400;
    color: #515151;
    margin-right: 5px;
  }

  .list_follow {
    font-family: "Lato", sans-serif;
    font-size: 16px;
    font-weight: 400;
    color: #c5c5c5;
  }

  .list_container {
    display: flex;
    flex-wrap: wrap;
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
