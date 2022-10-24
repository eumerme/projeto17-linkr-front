import styled from "styled-components";
import Modal from "react-modal";
import { deleteFatalPost } from "../../services/linkr";
import Loading from "../commom/Loading";
import { useState } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    background: "none",
    border: "none",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function DeleteModal({
  modalIsOpen,
  setIsOpen,
  id,
  upload,
  setUpload,
}) {
  const [isSucess, setIsSucess] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function deletePost() {
    deleteFatalPost(id)
      .then(() => {
        console.log("chamou");
        setUpload(!upload);
        setIsSucess(true);
        setTimeout(function () {
          setIsOpen(false);
          setIsSucess(false);
        }, 2000);
      })
      .catch(() => {
        alert("Houve um problema com a sua requisição, tente novamente!");
        setIsOpen(false);
      });
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="DeletePostModal"
      >
        <Style>
          {isSucess ? (
            <Loading />
          ) : (
            <>
              <p>
                Are you sure you want
                <br />
                to delete this post?
              </p>
              <div>
                <button onClick={closeModal}>No, go back</button>
                <button onClick={deletePost}>Yes, delete it</button>
              </div>
            </>
          )}
        </Style>
      </Modal>
    </>
  );
}

const Style = styled.div`
  width: 597px;
  height: 262px;
  background: #333333;
  border-radius: 50px;
  font-family: "Lato", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    font-weight: 700;
    font-size: 34px;
    line-height: 41px;
    text-align: center;
    color: #ffffff;
    padding: 39px 0;
  }

  div {
    width: 80%;
    display: flex;
    justify-content: space-evenly;

    button {
      width: 134px;
      height: 37px;
      background: #ffffff;
      border: none;
      border-radius: 5px;
      font-weight: 700;
      font-size: 18px;
      line-height: 22px;
      color: #1877f2;
      cursor: pointer;
    }

    button:nth-child(2) {
      background: #1877f2;
      color: #ffffff;
    }
  }
  @media screen and (max-width: 645px) {
    width: 300px;
    p {
      font-size: 20px;
      line-height: 30px;
    }
    button:nth-child(1),
    button:nth-child(2) {
      width: 80px;
      height: 50px;
      font-size: 14px;
    }
  }
`;
