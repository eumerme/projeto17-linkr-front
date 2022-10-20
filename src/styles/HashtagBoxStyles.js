import styled from "styled-components";

export default function HashtagBox() {
  return (
    <Container>
      <h1>trending</h1>
      <ul>
        <li>#NomeRealmenteMuitoGrandeParaVerNoLayou</li>
        <li># react</li>
        <li># react-native</li>
        <li># web-dev</li>
        <li># NomeRealmenteMuitoGrandeParaVerNoLayou</li>
        <li># react</li>
        <li># react-native</li>
        <li># web-dev</li>
        <li># NomeRealmenteMuitoGrandeParaVerNoLayou</li>
        <li># react</li>
        <li># react-native</li>
        <li># web-dev</li>
        <li># NomeRealmenteMuitoGrandeParaVerNoLayou</li>
        <li># react</li>
        <li># react-native</li>
        <li># web-dev</li>
      </ul>
    </Container>
  );
}

const Container = styled.div`
  width: 300px;
  height: 406px;
  border-radius: 16px;
  background-color: #171717;
  h1 {
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
`;
