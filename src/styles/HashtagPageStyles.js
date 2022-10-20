import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import HashtagBox from "./HashtagBoxStyles";

export default function HashtagPageStyles({ children, params }) {
  return (
    <>
      <Container>
        <Navbar>
          <div>
            <h1>linkr</h1>
            <span>
              <IoIosArrowDown />
              <img
                src="https://www.fotoregistro.com.br/subhomes/_lojas_consumer/paginas/fotos/fotos-2020/src/Img_11.png"
                alt="profileImg"
              ></img>
            </span>
          </div>
        </Navbar>
        <Timeline>
          <span># {params}</span>
          {children}
          <HashtagBox></HashtagBox>
        </Timeline>
      </Container>
    </>
  );
}

const Container = styled.div`
  min-height: 100vh;
  background-color: #333333;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Navbar = styled.div`
  width: 100%;
  height: 72px;
  background-color: #151515;
  display: flex;
  justify-content: center;
  color: #ffffff;
  div {
    width: 1440px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 17px 0 28px;
  }
  h1 {
    font-size: 49px;
    font-weight: 700;
    line-height: 53.95px;
    font-family: "Passion One", cursive;
  }
  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 53px;
    height: 53px;
    border-radius: 27px;
    margin: 0 0 0 17px;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    img {
      margin: 0 0 0 12px;
    }
  }
`;

const Timeline = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  span {
    width: 611px;
    font-family: "Oswald", sans-serif;
    font-size: 43px;
    font-weight: 700;
    line-height: 63.73px;
    text-align: justify;
    color: #ffffff;
    margin: 78px 0 43px 0;
    @media screen and (max-width: 768px) {
      width: 100%;
      margin: 19px 0 19px 17px;
    }
  }
`;
