import styled from "styled-components";
import { TiLocationArrowOutline } from "react-icons/ti";

export default function CommentsBox({ img }) {
  return (
    <>
      <Container>
        <WriterArea>
          <img src={img} alt="" />
          <TextArea>
            <input placeholder="write a comment..."></input>
            <div>
              <TiLocationArrowOutline />
            </div>
          </TextArea>
        </WriterArea>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: auto;
  margin: 20px 0 0 0;
  background: #1e1e1e;
  border-radius: 16px;

  @media screen and (max-width: 768px) {
    width: 100%;
    border-radius: 0;
  }
`;

const WriterArea = styled.div`
  width: 100%;
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
