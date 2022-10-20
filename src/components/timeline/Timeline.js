import { useState, useEffect } from "react";
import { publish, listPosts } from "../../services/linkr";
import TimelineStyles from "../../styles/TimelineStyles";
import PostStyles from "../../styles/PostStyles";
import styled from 'styled-components';
import Loading from "../../styles/Loading";

export default function HomeScreen() {
  const [url, setUrl] = useState("");
  const [comment, setComment] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [msgBtn, setMsgBtn] = useState("Publish");
  const [posts, setPosts] = useState([]);
  const [existPost, setExistPost] = useState(false);
  const [errorServer, setErrorServer] = useState(false);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    setTimeout(function(){
      listPosts().then((data) => {
        setPosts(data.data);
        if(data.data.length === 0) setEmpty(true);
        else setExistPost(true);
      }).catch((error) => {
        setErrorServer(true);
      });
    }, 2000);
  }, []);

  function publishPost(event) {
    event.preventDefault();
    setIsDisabled(true);
    setMsgBtn("Publishing...");
    if (url === " ") {
      setTimeout(function () {
        alert("É necessário compartilhar uma Url para publicar!");
        setIsDisabled(false);
        setMsgBtn("Publish");
      }, 1000);
    } else {
      publish({ url, comment })
        .then(() => {
          setIsDisabled(false);
          setUrl("");
          setComment("");
        })
        .catch(() => {
          alert("Houve um erro ao publicar seu link");
          setMsgBtn("Publish");
          setUrl("");
          setComment("");
          setIsDisabled(false);
        });
    }
  }

  return (
    <>
      <Container>
      <TimelineStyles onSubmit={publishPost} isDisabled={+isDisabled}>
        <p>What are you going to share today?</p>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isDisabled}
          type="text"
          placeholder="http://..."
          required
        ></input>
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={isDisabled}
          type="text"
          placeholder="Awesome article about..."
          required
        ></input>
        <button type="onSubmit">{msgBtn}</button>
      </TimelineStyles>
      {existPost ? 
      posts.map((value, index) =>  <PostStyles key={index} img={value.imageUrl} user={value.name} text={value.text}/>) 
      : <Loading error={+errorServer} empty={+empty}/>}
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
  justify-content: center;
`;