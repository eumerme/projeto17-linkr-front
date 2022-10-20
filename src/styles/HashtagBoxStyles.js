import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { listHashtags } from "../services/linkr";

export default function HashtagBox() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setTimeout(function () {
      listHashtags()
        .then((data) => {
          setPosts(data.data);
        })
        .catch();
    }, 2000);
  }, []);

  function redirect(text) {
    navigate(`/hashtag/${text}`);
  }

  return (
    <Container>
      <h2>trending</h2>
      <ul>
        {posts.map((value, index) => (
          <li onClick={() => redirect(value.name)}>{value.name}</li>
        ))}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  width: 300px;
  height: 406px;
  border-radius: 16px;
  background-color: #171717;
  position: absolute;
  right: 6%;
  top: 184.72px;
  h2 {
    width: 100%;
    font-family: "Oswald", sans-serif;
    font-size: 27px;
    font-weight: 700;
    line-height: 40.01px;
    color: #ffffff;
    padding: 9px 0 12px 16px;
    border-bottom: 1px solid #484848;
  }
  ul {
    width: 90%;
    height: 293px;
    overflow-y: scroll;
    margin: 22px 0 0 16px;
    ::-webkit-scrollbar {
      display: none;
    }
    li {
      font-family: "Lato", sans-serif;
      overflow-x: hidden;
      font-size: 19px;
      font-weight: 700;
      line-height: 22.08px;
      color: #ffffff;
      margin: 0 0 8px 0;
      cursor: pointer;
    }
  }
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
