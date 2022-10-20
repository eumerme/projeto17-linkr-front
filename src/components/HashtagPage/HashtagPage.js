import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listPosts } from "../../services/linkr";
import HashtagPageStyles from "../../styles/HashtagPageStyles";
import PostStyles from "../../styles/PostStyles";

export default function HashtagPage() {
  const params = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setTimeout(function () {
      listPosts()
        .then((data) => {
          setPosts(data.data);
        })
        .catch();
    }, 2000);
  }, []);
  return (
    <>
      <HashtagPageStyles params={params.hashtag}>
        {posts.map((value, index) => (
          <PostStyles
            key={index}
            img={value.imageUrl}
            user={value.name}
            text={value.text}
          />
        ))}
      </HashtagPageStyles>
    </>
  );
}
