import {
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { getUserWithUsername, postToJSON } from ".";
import { firestore } from "../../lib/firebase";

const Post = () => {
  return <main></main>;
};

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = doc(firestore, `users/${userDoc.id}/posts`, slug);
    post = postToJSON(await getDoc(postRef));

    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  const postsQuery = query(collectionGroup(firestore, "posts"));
  const postDocs = await getDocs(postsQuery);

  const paths = postDocs.docs.map((doc) => {
    const { username, slug } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    paths,
    /**
     * If a user navigates to a page that has not been
     * rendered yet, tell Next to fallback to SSR until
     * caching is available
     */
    fallback: "blocking",
  };
}

export default Post;
