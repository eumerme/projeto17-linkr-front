import styled from "styled-components";

export default function CommentArea({
  imageUrl,
  commentUserId,
  postUserId,
  name,
  comment,
}) {
  return (
    <>
      <Container>
        <img src={imageUrl} alt="" />
        <Infos>
          {commentUserId === postUserId ? (
            <p>
              {name} <strong>• post’s author</strong>
            </p>
          ) : (
            <p>{name}</p>
          )}
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
