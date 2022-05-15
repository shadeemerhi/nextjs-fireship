import { useState } from "react";
import { Box, Button } from "@mantine/core";
import {
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { firestore } from "../lib/firebase";
import { Timestamp } from "firebase/firestore";
import { postToJSON } from "./[username]";
import PostFeed from "../components/PostFeed";
import Spinner from "../components/Loader";

const Home = (props) => {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];
    const cursor =
      typeof last.createdAt === "number"
        ? Timestamp.fromMillis(last.createdAt)
        : last.createdAt;
    const postsQuery = query(
      collectionGroup(firestore, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      startAfter(cursor),
      limit(LIMIT)
    );

    const newPosts = (await getDocs(postsQuery)).docs.map((doc) => doc.data());

    setPosts((prev) => [...prev, ...newPosts]);
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <main>
      <Box p={80}>
        <PostFeed posts={posts} />

        <Box mt={20}>
          {!loading && !postsEnd && (
            <Button onClick={getMorePosts}>Load More</Button>
          )}
          <Spinner show={loading} />

          {postsEnd && "You have reached the end!"}
        </Box>
      </Box>
    </main>
  );
};

const LIMIT = 1;
export async function getServerSideProps(context) {
  const postsQuery = query(
    collectionGroup(firestore, "posts"),
    where("published", "==", true),
    orderBy("createdAt", "desc"),
    limit(LIMIT)
  );
  const posts = (await getDocs(postsQuery)).docs.map(postToJSON);

  return {
    props: { posts },
  };
}

export default Home;
