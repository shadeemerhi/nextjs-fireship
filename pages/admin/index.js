import { Box, Button, Input } from "@mantine/core";
import {
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import kebabCase from "lodash.kebabcase";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import AuthCheck from "../../components/AuthCheck";
import PostFeed from "../../components/PostFeed";
import { UserContext } from "../../lib/context";
import { firestore, auth } from "../../lib/firebase";

const AdminPage = () => {
  return (
    <main>
      <Box p={80}>
        <AuthCheck>
          <PostList />
          <CreateNewPost />
        </AuthCheck>
      </Box>
    </main>
  );
};

const PostList = () => {
  const userPostsRef = collection(
    firestore,
    `users/${auth.currentUser.uid}/posts`
  );
  const postQuery = query(userPostsRef, orderBy("createdAt"));
  const [postSnapshot] = useCollection(postQuery);
  const posts = postSnapshot?.docs.map((doc) => doc.data());
  console.log("HERE ARE THE POSTS", posts);

  return (
    <>
      <h1>Manage your posts</h1>
      <PostFeed posts={posts} admin />
    </>
  );
};

const CreateNewPost = () => {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");

  // ensure slug is URL-safe
  const slug = encodeURI(kebabCase(title));

  const isValid = title.length > 3 && title.length < 100;

  const createPost = async (event) => {
    event.preventDefault();

    const { uid } = auth.currentUser;
    const newPostRef = doc(
      firestore,
      `users/${auth.currentUser.uid}/posts`,
      slug
    );

    const newPost = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: "# hello world!",
      heartCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    try {
      await setDoc(newPostRef, newPost);

      toast.success("Post successfully created!");

      router.push(`/admin/${slug}`);
    } catch (error) {
      console.log("Error creating post", error);
    }
  };

  return (
    <Box mt={20}>
      <form onSubmit={createPost}>
        <Input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Create new post"
        />
        <p>Slug: {slug}</p>
        <Button type="submit" mt={10} disabled={!isValid} color="green">
          Create Post
        </Button>
      </form>
    </Box>
  );
};

export default AdminPage;
