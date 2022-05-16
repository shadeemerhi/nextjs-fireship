import { Button } from "@mantine/core";
import { doc, increment, writeBatch } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { auth, firestore } from "../lib/firebase";

const HeartButton = ({ postRef }) => {
  const heartRef = doc(
    firestore,
    `${postRef?.path}/hearts`,
    auth?.currentUser?.uid
  );
  const [heartDoc] = useDocument(heartRef);

  // Create a user-to-post relationship
  const addHeart = async () => {
    const batch = writeBatch(firestore);
    const { uid } = auth?.currentUser;

    batch.update(postRef, { heartCount: increment(1) });
    batch.set(heartRef, { uid });

    try {
      await batch.commit();
    } catch (error) {
      console.log("Error creating heart");
    }
  };

  const removeHeart = async () => {
    const batch = writeBatch(firestore);
    batch.update(postRef, { heartCount: increment(-1) });
    batch.delete(heartRef);

    try {
      await batch.commit();
    } catch (error) {
      console.log("Error removing heart");
    }
  };

  return heartDoc?.exists() ? (
    <Button color="red" onClick={removeHeart}>
      💔 Unheart
    </Button>
  ) : (
    <Button color="red" variant="outline" onClick={addHeart}>
      Heart
    </Button>
  );
};

export default HeartButton;
