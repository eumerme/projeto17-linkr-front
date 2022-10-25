import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import {
  getUrlMetadata,
  listCommentsPost,
  listLikes,
} from "../../services/linkr";
import { renderLikes, like } from "../../services/likes";
import ReactTooltip from "react-tooltip";
import { TiPencil } from "react-icons/ti";
import { FaTrash } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";
import EditPost from "./EditPost";
import DeleteModal from "./DeletePost";
import { useNavigate } from "react-router-dom";
import { ReactTagify } from "react-tagify";
import UploadContext from "../../Contexts/UploadContext";
import CommentsBox from "./CommentsPost";

export default function PostsMainLayout({ id, img, text, name, url, userId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [urlData, setUrlData] = useState({});
  const { upload, setUpload } = useContext(UploadContext);
  const [ListLikes, setListLikes] = useState([]);
  const [clickLike, setClickLike] = useState({});
  const [seeComments, setSeeComments] = useState(false);
  const [commentsData, setCommentsData] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("linkr"));

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
        if (!urlData.title) {
          setUpload(!upload);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    listLikes(id)
      .then((data) => {
        const likesData = data.data[0];
        renderLikes(likesData, setClickLike, setMsg, auth.id);
        setListLikes(likesData);
      })
      .catch((error) => {
        console.log(error);
      });

    listCommentsPost(id)
      .then((data) => {
        setCommentsData(data.data);
      })
      .catch();
  }, [upload]);

  function redirectToUserpage() {
    navigate(`/user/${userId}`, {
      replace: false,
      state: { name },
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
        <Content>
          <Infos>
            <img src={img} alt="" />
            <div
              onClick={() =>
                like(clickLike, id, auth.id, setClickLike, setUpload, upload)
              }
            >
              {clickLike.draw}
            </div>
            <p data-tip={msg}>{ListLikes.likes} likes</p>
            <ReactTooltip
              backgroundColor="#FFFFFF"
              className="toopTip"
              place="bottom"
            />
            <ReactTooltip
              backgroundColor="#FFFFFF"
              className="toopTip"
              place="bottom"
            />
            <AiOutlineComment
              style={{ cursor: "pointer", color: "#FFFFFF", fontSize: "28px" }}
              onClick={() => setSeeComments(!seeComments)}
            />
            <p>comments</p>
          </Infos>
          <Description>
            <span>
              <h1 onClick={redirectToUserpage}>{name}</h1>
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
                <p>{text}</p>
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
        </Content>
        <CommentsBox
          img={img}
          seeComments={seeComments}
          postId={id}
          commentsData={commentsData}
        />
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
  width: 100%;
  max-width: 611px;
  background-color: #171717;
  min-height: 276px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 768px) {
    max-width: 100%;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    border-radius: 0;
  }
`;

const Content = styled.div`
  width: 93%;
  display: flex;
  margin: 18px 0;
`;

const Infos = styled.div`
  width: auto;
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
    margin: 5px 0 10px 0;
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

  @media screen and (max-width: 330px) {
    img {
      width: 40px;
      height: 40px;
    }
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
    width: auto;
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
  max-height: auto;
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
