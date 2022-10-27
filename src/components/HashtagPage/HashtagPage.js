import { useState } from "react";
import { useParams } from "react-router-dom";
import { listPostsbyHashtags } from "../../services/linkr";
import PostsMainLayout from "../Posts/PostsMainLayout";
import TimelineMainLayout from "../Timeline/TimelineMainLayout";
import { Homescreen, Title } from "../Timeline/Timeline";
import Loading from "../commom/Loading";
import InfiniteScroll from "react-infinite-scroller";

export default function HashtagPage() {
  const params = useParams();
  const [posts, setPosts] = useState([]);
  const [needRender, setNeedRender] = useState(true);
  const [errorServer, setErrorServer] = useState(false);
  const [empty, setEmpty] = useState(false);

  function loaderPosts() {
    setNeedRender(false);
    listPostsbyHashtags(params.hashtag, posts.length + 10)
      .then((data) => {
        setPosts(data.data);
        if (data.data.length === 0) setEmpty(true);
        if (posts.length < data.data.length) {
          setNeedRender(true);
        }
      })
      .catch((error) => {
        setErrorServer(true);
      });
  }

  return (
    <>
      <TimelineMainLayout hashtag={true}>
        <Homescreen>
          <Title id="title"># {params.hashtag}</Title>
          <InfiniteScroll
            pageStart={1}
            loadMore={loaderPosts}
            hasMore={needRender}
            loader={<Loading error={errorServer} empty={empty} />}
          >
            {posts.length > 0 ? (
              posts.map((value, index) => (
                <PostsMainLayout
                  key={index}
                  id={value.id}
                  img={value.imageUrl}
                  url={value.url}
                  text={value.text}
                  userId={value.userId}
                  name={value.name}
                />
              ))
            ) : (
              <Loading error={errorServer} empty={empty} />
            )}
          </InfiniteScroll>
        </Homescreen>
      </TimelineMainLayout>
    </>
  );
}
