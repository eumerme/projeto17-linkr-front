import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UploadContext from "../../Contexts/UploadContext";

export default function CommentArea({
  imageUrl,
  commentUserId,
  postUserId,
  name,
  comment,
  followee,
}) {
  const navigate = useNavigate();
  const { upload, setUpload } = useContext(UploadContext);

  const [commentTag, setCommentTag] = useState(<p>{name}</p>);

  function redirectToUserpage() {
    setUpload(!upload);
    navigate(`/user/${commentUserId}`, {
      replace: false,
      state: { name },
    });
  }

  useEffect(() => {
    if (commentUserId === postUserId) {
      setCommentTag(
        <p onClick={redirectToUserpage}>
          {name} <strong>• post’s author</strong>
        </p>
      );
    } else if (followee !== null) {
      setCommentTag(
        <p onClick={redirectToUserpage}>
          {name} <strong>• following</strong>
        </p>
      );
    }
  }, []);

  return (
    <>
      <Container>
        <img src={imageUrl} alt="" />
        <Infos>
          {commentTag}
          <span>{comment}</span>
        </Infos>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 93%;
  min-height: 71px;
  border-bottom: 1px solid #353535;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 39px;
    height: 39px;
    border-radius: 26.5px;
  }

  @media screen and (max-width: 610px) {
    min-height: 61px;
  }
`;

const Infos = styled.div`
  width: 89.7%;

  p {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #f3f3f3;
    margin: 0 0 5px 0;

    strong {
      color: #565656;
      font-weight: 400;
    }
  }

  span {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #acacac;
  }
  @media screen and (max-width: 610px) {
    width: 85%;
  }
`;
