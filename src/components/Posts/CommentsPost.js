import styled from "styled-components";
import { TiLocationArrowOutline } from "react-icons/ti";

export default function CommentsBox({ img }) {
  return (
    <>
      <Container>
        <CommentArea>
          <img src={img} alt="" />
          <Infos>
            <p>João Avatares</p>
            <span>Irmão que post foda você jogou</span>
          </Infos>
        </CommentArea>
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
  max-width: 611px;
  height: auto;
  background: #1e1e1e;
  border-radius: 0 0 16px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Lato", sans-serif;

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
