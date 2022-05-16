import { Box, Button, Card, Checkbox } from "@mantine/core";
import RichTextEditor from "../../components/RichText";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import AuthCheck from "../../components/AuthCheck";
import Metatags from "../../components/Metatags";
import { auth, firestore } from "../../lib/firebase";

const AdminPostEdit = () => {
  return (
    <main>
      <Box p={80}>
        <AuthCheck>
          <PostManager />
        </AuthCheck>
      </Box>
    </main>
  );
};

const PostManager = () => {
  const [preview, setPreview] = useState(false);
  const [value, onChange] = useState("");
  const [published, setPublished] = useState(false);
  const router = useRouter();

  const { slug } = router.query;

  const postRef = doc(firestore, `users/${auth.currentUser.uid}/posts`, slug);
  const [post] = useDocumentData(postRef);

  const updatePost = async () => {
    try {
      await updateDoc(postRef, {
        content: value,
        published,
        updatedAt: serverTimestamp(),
      });
      toast.success("Post successfully updated!");
    } catch (error) {
      console.log("Error updating post", error);
    }
  };

  // Not sure if this works
  useEffect(() => {
    if (post) {
      onChange(post.content);
      setPublished(post.published);
    }
  }, [post]);

  return (
    post && (
      <>
        <section>
          <h1>
            Title: <i>{post.title}</i>
          </h1>
          <p>ID: {post.slug}</p>
          <RichTextEditor value={value} onChange={onChange} />
        </section>

        <aside></aside>
        <Checkbox
          checked={published}
          label={published ? "Published" : "Private"}
          onChange={(event) => setPublished(event.target.checked)}
          mt={10}
        />

        <Button mt={20} onClick={updatePost}>
          Save Post
        </Button>

        <Box mt={40}>
          <h1>Post Preview</h1>
          <Card>
            <div dangerouslySetInnerHTML={{ __html: value }}></div>
          </Card>
        </Box>
      </>
    )
  );
};

export default AdminPostEdit;
