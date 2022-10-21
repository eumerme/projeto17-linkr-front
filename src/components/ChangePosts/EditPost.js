import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

export default function EditPost({ isEditing, setIsEditing, text }) {
  const [comment, setComment] = useState(text);
  const inputRef = useRef(null);

  const pageClickEvent = (e) => {
    if (e.keyCode === 27) {
      setIsEditing(false);
      window.removeEventListener("keypress", pageClickEvent);
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
      window.addEventListener("keypress", pageClickEvent);
    }
  }, []);

  function changeText() {
    console.log("vou enviar hein");
  }

  return (
    <form onSubmit={changeText}>
      <EditText
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyPress={pageClickEvent}
        ref={inputRef}
        type="text"
        required
      ></EditText>
    </form>
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
