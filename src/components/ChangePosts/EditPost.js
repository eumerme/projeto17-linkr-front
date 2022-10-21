import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { editPostText } from "../../services/linkr";

export default function EditPost({ isEditing, setIsEditing, text }) {
  const [comment, setComment] = useState(text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  function changeText(e) {
    if (e.key === "Enter") {
      editPostText(comment);
    }
    if (e.key === "esc") {
      setIsEditing(!isEditing);
    }
  }

  return (
    <EditText
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      onKeyPress={changeText}
      ref={inputRef}
      type="text"
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
