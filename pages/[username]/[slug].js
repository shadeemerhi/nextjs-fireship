import {
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { getUserWithUsername, postToJSON } from ".";
import { firestore } from "../../lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import PostContent from "../../components/PostContent";
import { Box } from "@mantine/core";

const PostPage = (props) => {
  const postRef = doc(firestore, props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;

  return (
    <main>
      <Box p={40} sx={{ display: "flex" }}>
        <Box mr={20} sx={{ width: "70%" }}>
          <section>
            <PostContent post={post} />
          </section>
        </Box>

        <Box
          pl={20}
          pr={20}
          sx={{ border: "1px solid gray", flexGrow: 1, borderRadius: "10px" }}
        >
          <aside>
            <p>
              <strong>{post.heartCount || 0} 💗</strong>
            </p>
          </aside>
        </Box>
      </Box>
    </main>
  );
};

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = doc(firestore, `users/${userDoc.id}/posts`, slug);
    post = postToJSON(await getDoc(postRef));
    console.log("HERE IS POST", post);

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

export default PostPage;
