/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useMemo, useState } from "react";
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
  const [allPosts, setAllPosts] = useState([]);
  const [needRender, setNeedRender] = useState(true);
  const [isRendering, setIsRendering] = useState(true);
  const { state } = useLocation();
  const [errorServer, setErrorServer] = useState(false);
  const [empty, setEmpty] = useState(false);
  const auth = JSON.parse(localStorage.getItem("linkr"));
  const [follow, setFollow] = useState(null);
  const { setUpload, upload } = useContext(UploadContext);

  useEffect(() => {
    setTimeout(function () {
      listUserPosts(id)
        .then((res) => {
          setUpload(!upload);
          setPosts(res.data);
          if (res.data.length === 0) setEmpty(true);
        })
        .catch((error) => {
          setErrorServer(true);
        });
    }, 1000);
  }, [id]);

  useMemo(() => {
    isFollowing({ userId: auth.id, followeeId: Number(id) })
      .then((res) => {
        setFollow(res.data.follows);
      })
      .catch();
  }, [id, upload]);

  function loaderPosts() {
    setIsRendering(true);
    setNeedRender(false);
    if (posts.length === 0) setNeedRender(true);
    setTimeout(() => {
      setIsRendering(false);
      const partOfPosts = posts.slice(allPosts.length, allPosts.length + 10);
      setAllPosts(allPosts.concat(partOfPosts));

      if (posts.length > allPosts.length) {
        setNeedRender(true);
      }
    }, 2000);
  }

  return (
    <>
      <TimelineMainLayout userpage={true} follows={follow} followeeId={id}>
        <Homescreen>
          <Title id="title">{`${state.name}'s posts`}</Title>
          <InfiniteScroll
            pageStart={1}
            loadMore={loaderPosts}
            hasMore={needRender}
            threshold={150}
          >
            <>
              {allPosts.map((value, index) => (
                <PostsMainLayout
                  key={index}
                  id={value.id}
                  img={value.imageUrl}
                  url={value.url}
                  text={value.text}
                  userId={value.userId}
                  name={value.name}
                />
              ))}
            </>
            {isRendering ? (
              <Loading error={errorServer} empty={empty} />
            ) : (
              <></>
            )}
          </InfiniteScroll>
        </Homescreen>
      </TimelineMainLayout>
    </>
  );
}
