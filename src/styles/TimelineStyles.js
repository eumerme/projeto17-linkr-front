import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";

export default function TimelineStyles({
  children,
  isDisabled,
  ...otherprops
}) {
  return (
    <>
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
        <h1>timeline</h1>
        <Publish>
          <div>
            <img
              src="https://www.fotoregistro.com.br/subhomes/_lojas_consumer/paginas/fotos/fotos-2020/src/Img_11.png"
              alt="profileImg"
            ></img>
          </div>
          <form isDisabled={isDisabled} {...otherprops}>
            {children}
          </form>
        </Publish>
      </Timeline>
    </>
  );
}


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
  h1 {
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

const Publish = styled.div`
  width: 611px;
  height: 209px;
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  font-family: "Lato", sans-serif;
  div {
    width: 86px;
    display: flex;
    justify-content: center;
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 27px;
    margin: 16px 0 0 0;
  }
  form {
    width: 90%;
    display: flex;
    flex-direction: column;
    position: relative;
    p {
      font-size: 20px;
      font-weight: 300;
      line-height: 24px;
      color: #707070;
      margin: 21px 0 15px 0;
    }
    input {
      width: 95%;
      height: 30px;
      background-color: #efefef;
      border: none;
      border-radius: 5px;
      margin: 0 0 5px 0;
      ::placeholder {
        padding: 0 0 0 13px;
        font-size: 15px;
        font-weight: 300;
        line-height: 18px;
        color: #949494;
      }
      :focus {
        outline: 0;
      }
    }
    input:nth-child(3) {
      height: 66px;
    }
    button {
      width: 112px;
      height: 31px;
      border-radius: 5px;
      background-color: #1877f2;
      border: none;
      color: #ffffff;
      font-size: 14px;
      font-weight: 700;
      line-height: 16.8px;
      position: absolute;
      bottom: 5px;
      right: 5%;
    }
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    border-radius: 0px;
    div {
      display: none;
    }
    form {
      width: 100%;
      align-items: center;
      button {
        right: 2.5%;
      }
    }
  }
`;