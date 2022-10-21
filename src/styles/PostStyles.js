import styled from "styled-components";
import { TiPencil } from "react-icons/ti";
import { FaTrash } from "react-icons/fa";

export default function PostStyles({ img, user, text }) {
  return (
    <>
      <Container>
        <Infos>
          <img src={img} alt="" />
        </Infos>
        <Description>
          <span>
            <h1>{user}</h1>
            <h3>
              <TiPencil />
              <FaTrash />
            </h3>
          </span>
          <p>{text}</p>
          <div></div>
        </Description>
      </Container>
    </>
  );
}

const Container = styled.div`
  margin-top: 30px;
  padding: 18px;
  width: 611px;
  background-color: #171717;
  height: 276px;
  border-radius: 16px;
  display: flex;

  @media screen and (max-width: 768px) {
    width: 100%;
    border-radius: 0;
  }
`;

const Infos = styled.div`
  width: 50px;
  height: 100%;
  margin-right: 15px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const Description = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  span {
    font-family: "Lato", sans-serif;
    font-size: 22px;
    font-weight: 400;
    color: #ffffff;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    width: 100%;

    h3 {
      width: 50px;
      display: flex;
      justify-content: space-between;
    }
  }

  p {
    font-family: "Lato", sans-serif;
    font-size: 17px;
    font-weight: 400;
    color: #b7b7b7;
    margin-bottom: 10px;
  }

  div {
    width: 100%;
    height: 100%;
    border: 1px solid #4d4d4d;
    border-radius: 11px;
  }
`;
