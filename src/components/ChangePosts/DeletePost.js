import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function DeleteModal({ modalIsOpen, setIsOpen }) {
  function closeModal() {
    setIsOpen(false);
  }

  function deletePost() {
    alert("em breve função de apagar o post");
    setIsOpen(false);
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="DeletePostModal"
      >
        <p>
          Are you sure you want
          <br />
          to delete this post?
        </p>
        <button onClick={closeModal}>No, go back</button>
        <button onClick={deletePost}>Yes, delete it</button>
      </Modal>
    </>
  );
}
