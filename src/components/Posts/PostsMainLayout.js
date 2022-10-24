import styled from "styled-components";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useState, useEffect, useRef, useContext } from "react";
import { getUrlMetadata, insertHashtag, likes } from "../../services/linkr";
import ReactTooltip from "react-tooltip";
import { TiPencil } from "react-icons/ti";
import { FaTrash } from "react-icons/fa";
import EditPost from "./EditPost";
import DeleteModal from "./DeletePost";
import { useNavigate } from "react-router-dom";
import { auth } from "../commom/localStorage";
import { ReactTagify } from "react-tagify";
import UploadContext from "../../Contexts/UploadContext";

export default function PostsMainLayout({
  id,
  img,
  user,
  text,
  likesUser,
  url,
  userId,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [urlData, setUrlData] = useState({});
  const [thereIsTag, setThereIsTag] = useState(false);
  const { upload, setUpload } = useContext(UploadContext);
  const navigate = useNavigate();
  const tag = useRef(null);

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    getUrlMetadata(url)
      .then((data) => {
        const auxData = data.data.data;
        setUrlData({
          title: auxData.title,
          description: auxData.description,
          image: auxData.image.url,
          url: auxData.url,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (tag.current.innerText.includes("#")) {
      const hashtag = tag.current.innerText
        .split("\n")
        .find((value) => value.includes("#"));
      const hashtagText = hashtag.slice(1, hashtag.length);
      console.log(hashtagText);
      insertHashtag({ hashtagText })
        .then((res) => {
          setThereIsTag(!thereIsTag);
          setUpload(!upload);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const [clickLike, setClickLike] = useState({
    draw: <AiOutlineHeart color="#FFF" size="30px" />,
    type: false,
  });

  function like() {
    if (clickLike.type === false) {
      setClickLike({
        draw: <AiFillHeart color="red" size="30px" />,
        type: true,
      });
      likes({
        id,
        type: "like",
      })
        .then(() => {
          setUpload(!upload);
        })
        .catch((error) => {
          console.log(error.response.status);
        });
    } else {
      setClickLike({
        draw: <AiOutlineHeart color="#FFF" size="30px" />,
        type: false,
      });
      likes({
        id,
        type: "noLike",
      })
        .then(() => {
          setUpload(!upload);
        })
        .catch((error) => {
          console.log(error.response.status);
        });
    }
  }

  function redirectToUserpage() {
    navigate(`/user/${userId}`, {
      replace: false,
      state: { name: user },
    });
  }

  function redirectToHashtagPage(tag) {
    const hashtag = tag.slice(1, tag.length);
    navigate(`/hashtag/${hashtag}`);
  }

  const tagStyle = {
    fontSize: "17px",
    fontWeight: 700,
    color: "#FFFFFF",
    cursor: "pointer",
    margin: 0,
  };

  return (
    <>
      <Container>
        <Infos>
          <img src={img} alt="" />
          <div onClick={() => like()}>{clickLike.draw}</div>
          <p data-tip="hello word">{likesUser} likes</p>
          <ReactTooltip
            backgroundColor="#FFFFFF"
            className="toopTip"
            place="bottom"
          />
        </Infos>
        <Description>
          <span>
            <h1 onClick={redirectToUserpage}>{user}</h1>
            {auth.id === userId ? (
              <h3>
                <TiPencil
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsEditing(!isEditing)}
                />
                <FaTrash style={{ cursor: "pointer" }} onClick={openModal} />
              </h3>
            ) : (
              ""
            )}
          </span>
          {isEditing ? (
            <EditPost
              id={id}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              text={text}
              upload={upload}
              setUpload={setUpload}
            />
          ) : (
            <ReactTagify
              tagStyle={tagStyle}
              tagClicked={(tag) => redirectToHashtagPage(tag)}
            >
              <p ref={tag}>{text}</p>
            </ReactTagify>
          )}
          <UrlDatas onClick={() => window.open(url, "_blank")}>
            <div>
              <h1>{urlData.title}</h1>
              <p>{urlData.description}</p>
              <h2>{urlData.url}</h2>
            </div>
            <div className="UrlImage">
              <img src={urlData.image} alt="" />
            </div>
          </UrlDatas>
        </Description>
      </Container>
      <DeleteModal
        upload={upload}
        setUpload={setUpload}
        id={id}
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}

const Container = styled.div`
  margin-bottom: 30px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    cursor: pointer;
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-bottom: 20px;
    object-fit: cover;
  }

  p {
    margin-top: 5px;
    font-family: "Lato", sans-serif;
    color: #ffffff;
    font-weight: 400;
    font-size: 11px;
    cursor: pointer;
  }

  .toopTip {
    border-radius: 3px;
    font-family: "Lato", sans-serif;
    font-weight: 700;
    font-size: 11px;
    color: #505050;
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
    h1 {
      cursor: pointer;
    }
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
    display: flex;
    span {
      width: auto;
      padding: 0 4px;
    }
  }
`;

const UrlDatas = styled.div`
  width: 100%;
  height: 180px;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  display: flex;

  cursor: pointer;

  div {
    padding: 10px;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow: hidden;

    h1 {
      height: auto;

      width: 100%;
      font-family: "Lato", sans-serif;
      font-weight: 400;
      font-size: 16px;
      color: #cecece;
    }

    p {
      width: 100%;
      height: auto;

      font-family: "Lato", sans-serif;
      font-weight: 400;
      font-size: 11px;
      color: #9b9595;
    }

    h2 {
      width: 100%;
      height: auto;
      font-family: "Lato", sans-serif;
      font-weight: 400;
      font-size: 11px;
      color: #cecece;
      word-wrap: break-word;
    }
  }

  .UrlImage {
    width: 35%;
    height: 100%;
    border-left: 1px solid #4d4d4d;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 0 10px 10px 0;
    }
  }

  @media screen and (max-width: 768px) {
    justify-content: space-between;

    .UrlImage {
      width: 25%;
    }

    .UrlImage img {
      width: 100%;
      height: 100%;
    }
  }
`;
