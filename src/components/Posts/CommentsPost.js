import styled from "styled-components";
import { TiLocationArrowOutline } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";
import { createNewComment } from "../../services/linkr";

export default function CommentsBox({
  img,
  seeComments,
  postId,
  commentsData,
}) {
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const auth = JSON.parse(localStorage.getItem("linkr"));
  const [isDisabled, setIsDisabled] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (seeComments) {
      inputRef.current.focus();
    }
  }, [seeComments]);

  function publishComment(e) {
    e.preventDefault();
    setIsDisabled(true);
    const body = { comment, postId };

    createNewComment(body)
      .then(() => {
        setComment("");
      })
      .catch(() => {
        alert("Ops! Houve um erro com sua requisição, tente novamente");
        setIsDisabled(false);
      });
  }
  console.log(auth);

  return (
    <>
      <Container ref={dropdownRef} seeComments={seeComments}>
        {commentsData.map((value, index) => (
          <CommentArea key={index}>
            <img src={value.imageUrl} alt="" />
            <Infos>
              {value.commentUserId === value.postUserId ? (
                <p>
                  {value.name} <strong>• post’s author</strong>
                </p>
              ) : (
                <p>{value.name}</p>
              )}
              <span>{value.comment}</span>
            </Infos>
          </CommentArea>
        ))}
        <WriterArea>
          <img src={auth.image} alt="" />
          <TextArea>
            <input
              placeholder="write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              ref={inputRef}
              type="text"
              disabled={isDisabled}
            ></input>
            <div>
              <TiLocationArrowOutline onClick={publishComment} />
            </div>
          </TextArea>
        </WriterArea>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 611px;
  height: auto;
  background: #1e1e1e;
  border-radius: 0 0 16px 16px;
  display: none;
  flex-direction: column;
  align-items: center;
  font-family: "Lato", sans-serif;
  transform: translateY(-3px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;

  ${(props) => {
    if (props.seeComments) {
      return `
              &&& {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
                display: flex;			
              } 
            `;
    }
  }}

  @media screen and (max-width: 768px) {
    width: 100%;
    border-radius: 0;
  }
`;

const CommentArea = styled.div`
  width: 93%;
  height: 71px;
  border-bottom: 1px solid #353535;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 39px;
    height: 39px;
    border-radius: 26.5px;
  }
`;

const Infos = styled.div`
  width: 510px;

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
`;

const WriterArea = styled.div`
  width: 93%;
  height: 83px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 39px;
    height: 39px;
    border-radius: 26.5px;
  }
`;

const TextArea = styled.div`
  position: relative;

  input {
    width: 510px;
    height: 39px;
    border: none;
    background: #252525;
    border-radius: 8px;
    color: #575757;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    padding: 0 0 0 15px;
  }

  div {
    position: absolute;
    right: 8px;
    top: 8px;
    font-size: 25px;
    color: #f3f3f3;
  }
`;
