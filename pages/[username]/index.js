import { Box } from "@mantine/core";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import PostFeed from "../../components/PostFeed";
import UserProfile from "../../components/UserProfile";
import { firestore } from "../../lib/firebase";

const UserProfilePage = ({ user, posts }) => {
  // console.log("HERE ARE THE POSTS", posts);
  return (
    <main>
      <Box pl={80} pr={80}>
        <UserProfile user={user} />
        <PostFeed posts={posts} />
      </Box>
    </main>
  );
};

export async function getServerSideProps({ query: urlQuery }) {
  const { username } = urlQuery;
  const userDoc = await getUserWithUsername(username);

  let user = null;
  let posts = null;

  if (userDoc) {
    console.log("HERE IS USER DOCS", userDoc);
    user = userDoc.data();
    console.log("USERID", userDoc.id);
    const postsQuery = query(
      collection(firestore, `users/${userDoc.id}/posts`),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(5)
    );
    posts = (await getDocs(postsQuery)).docs.map(postToJSON);
    console.log("HERE ARE POSTS", posts);
  }

  return {
    props: { user, posts },
  };
}

export const getUserWithUsername = async (username) => {
  const usersRef = collection(firestore, "users");
  const userQuery = query(
    usersRef,
    where("username", "==", username),
    limit(1)
  );
  const userDoc = (await getDocs(userQuery)).docs[0];
  return userDoc;
};

export const postToJSON = (doc) => {
  const data = doc.data();
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
};

export default UserProfilePage;
