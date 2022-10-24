import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { editPostText, insertHashtag } from "../../services/linkr";

export default function EditPost({
  isEditing,
  setIsEditing,
  text,
  id,
  upload,
  setUpload,
}) {
  const [comment, setComment] = useState(text);
  const [isDisabled, setIsDisabled] = useState(false);
  const inputRef = useRef(null);

  const pageClickEvent = (e) => {
    if (e.keyCode === 27) {
      setIsEditing(false);
      window.removeEventListener("keyup", pageClickEvent);
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
      window.addEventListener("keyup", pageClickEvent);
    }
  }, [isEditing]);

  function changeText(e) {
    if (e.key === "Enter") {
      if (comment.includes("#")) {
        const hashtag = comment
          .split(" ")
          .filter((value) => value.includes("#"));

        hashtag.forEach((value) => {
          const hashtagText = value.replace("#", "");
          insertHashtag({ hashtagText })
            .then(() => setUpload(!upload))
            .catch((error) => console.log(error));
        });
      }
      setIsDisabled(true);
      editPostText({ comment: comment }, id)
        .then(() => {
          setIsEditing(!isEditing);
          setUpload(!upload);
        })
        .catch(() => {
          alert("Não foi possível salvar suas alterações, tente novamente!");
          setIsDisabled(false);
        });
    }
  }

  return (
    <EditText
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      onKeyPress={changeText}
      ref={inputRef}
      type="text"
      disabled={isDisabled}
      required
    ></EditText>
  );
}

const EditText = styled.input`
  width: 100%;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
  padding: 4px 9px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #4c4c4c;
`;