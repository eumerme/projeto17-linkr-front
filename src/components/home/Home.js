import { useState } from "react";
import { publish } from "../../services/linkr";
import TimelineStyles from "../../styles/TimelineStyles";

export default function HomeScreen() {
  const [url, setUrl] = useState("");
  const [comment, setComment] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [msgBtn, setMsgBtn] = useState("Publish");

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
          setUrl("");
          setComment("");
          setIsDisabled(false);
        });
    }
  }

  return (
    <>
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
    </>
  );
}
