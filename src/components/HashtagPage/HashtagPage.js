import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listPostsbyHashtags } from "../../services/linkr";
import HashtagPageStyles from "../../styles/HashtagPageStyles";
import PostStyles from "../../styles/PostStyles";

export default function HashtagPage() {
  const params = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setTimeout(function () {
      listPostsbyHashtags(params.hashtag)
        .then((data) => {
          setPosts(data.data);
        })
        .catch();
    }, 2000);
  }, [params.hashtag]);
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
