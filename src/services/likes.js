import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { likes } from "./linkr";

function renderLikes(likesData, setClickLike, setMsg, id) {
  let array = [];
  let cont = 0;
  let text = "";
  if (likesData.likeBy !== null) {
    const nameLike = likesData.users.filter((value, index) => {
      if (value === id) {
        array.push(index);
        return value;
      }
    });

    if (nameLike.length === 0) {
      setClickLike({
        draw: <AiOutlineHeart color="#FFF" size="30px" />,
        type: false,
      });
      text = likesData.likeBy.reduce((previousValue, currentValue, index) => {
        if (index === 0) return previousValue + currentValue;
        else if (index === 1) return previousValue + " " + currentValue;
        else {
          cont++;
          return previousValue;
        }
      }, "");
    } else {
      setClickLike({
        draw: <AiFillHeart color="red" size="30px" />,
        type: true,
      });
      const names = likesData.likeBy.filter(
        (value, index) => index !== array[0]
      );
      text = names.reduce((previousValue, currentValue, index) => {
        if (index === 0) return previousValue + " " + currentValue;
        else {
          cont++;
          return previousValue;
        }
      }, "Você");
    }
    if (cont === 0 && likesData.likeBy.length === 1) setMsg(`${text} curtiu!`);
    else if (cont === 0 && likesData.likeBy.length === 2)
      setMsg(text.replace(" ", " e ") + " curtiram!");
    else setMsg(text.replace(" ", ", ") + " e outras " + cont + " pessoas!");
  } else {
    setClickLike({
      draw: <AiOutlineHeart color="#FFF" size="30px" />,
      type: false,
    });
    setMsg("0 curtidas");
  }
}

function like(clickLike, id, userId, setClickLike, setUpload, upload) {
  if (clickLike.type === false) {
    likes({
      id,
      userId,
      type: "like",
    })
      .then(() => {
        setClickLike({
          draw: <AiFillHeart color="red" size="30px" />,
          type: true,
        });
        setUpload(!upload);
      })
      .catch((error) => {
        console.log(error.response.status);
      });
  } else {
    likes({
      id,
      userId,
      type: "noLike",
    })
      .then(() => {
        setClickLike({
          draw: <AiOutlineHeart color="#FFF" size="30px" />,
          type: false,
        });
        setUpload(!upload);
      })
      .catch((error) => {
        console.log(error.response.status);
      });
  }
}

export { renderLikes, like };
