/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { isFollowing, listUserPosts } from "../../services/linkr";
import Loading from "../commom/Loading";
import PostsMainLayout from "../Posts/PostsMainLayout";
import TimelineMainLayout from "../Timeline/TimelineMainLayout";
import { Homescreen, Title } from "../Timeline/Timeline";
import UploadContext from "../../Contexts/UploadContext";
import InfiniteScroll from "react-infinite-scroller";

export default function UserPage() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const { state } = useLocation();
  const [errorServer, setErrorServer] = useState(false);
  const [empty, setEmpty] = useState(false);
  const auth = JSON.parse(localStorage.getItem("linkr"));
  const [follow, setFollow] = useState(null);
  const [needRender, setNeedRender] = useState(true);
  const { setUpload, upload } = useContext(UploadContext);

  function loaderPosts() {
    setNeedRender(false);
    listUserPosts(id, posts.length + 10)
      .then((res) => {
        setUpload(!upload);
        setPosts(res.data);
        if (res.data.length === 0) setEmpty(true);
        if (posts.length < res.data.length) {
          setNeedRender(true);
        }
      })
      .catch((error) => {
        setErrorServer(true);
      });
  }

  useMemo(() => {
    isFollowing({ userId: auth.id, followeeId: Number(id) })
      .then((res) => {
        setFollow(res.data.follows);
      })
      .catch();
  }, [id, upload]);

  return (
    <>
      <TimelineMainLayout userpage={true} follows={follow} followeeId={id}>
        <Homescreen>
          <Title id="title">{`${state.name}'s posts`}</Title>
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
