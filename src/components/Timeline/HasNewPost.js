import styled from "styled-components";
import { TfiReload } from "react-icons/tfi";
import useInterval from "use-interval";

export default function HasNewPost(number) {
  useInterval(() => {}, 1000);
  return (
    <>
      {number > 0 ? (
        <Container>
          <p>
            {""}
            new posts, load more! <TfiReload className="Icon" />
          </p>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 611px;
  height: 61px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1877f2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin: 0 0 17px 0;

  p {
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
  }

  .Icon {
  }

  @media screen and (max-width: 611px) {
    width: 90%;
    height: 51px;
  }
`;
