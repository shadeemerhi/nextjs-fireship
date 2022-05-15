import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { auth, firestore } from "../lib/firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { Box, Button, Input, Stack, Text } from "@mantine/core";
import { UserContext } from "../lib/context";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import { useDebouncedValue } from "@mantine/hooks";

const EnterPage = () => {
  const { user, username } = useContext(UserContext);
  return (
    <main>
      <Box p={80}>
        {user ? (
          username ? (
            <SignOutButton />
          ) : (
            <UsernameForm />
          )
        ) : (
          <SignInButton />
        )}
      </Box>
    </main>
  );
};

const UsernameForm = () => {
  const [formValue, setFormValue] = useState("");
  const [debounced] = useDebouncedValue(formValue, 500);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onSubmit = async (event) => {
    event.preventDefault();
    const userDoc = doc(firestore, "users", user.uid);
    const usernameDoc = doc(firestore, "usernames", formValue);

    try {
      const batch = writeBatch(firestore);
      batch.set(userDoc, {
        username: formValue,
        photoURL: user.photoURL,
        displayName: user.displayName,
      });
      batch.set(usernameDoc, { uid: user.uid });
      await batch.commit();
    } catch (error) {
      console.log("onSubmit error", error);
    }
  };

  const onChange = (event) => {
    const val = event.target.value.toLowerCase();

    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  const checkUsername = async (username) => {
    if (username.length >= 3) {
      const docRef = doc(firestore, "usernames", username);
      const usernameDoc = await getDoc(docRef);
      console.log("Firestore read executed");
      setIsValid(!usernameDoc.exists());
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUsername(debounced);
  }, [debounced]);

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <Input
            name="username"
            placeholder="username"
            value={formValue}
            onChange={onChange}
          />
          <UsernameMessage
            username={debounced}
            formValue={formValue}
            isValid={isValid}
            loading={loading}
          />
          <Button type="submit" color="green" disabled={!isValid}>
            Submit
          </Button>
        </form>
        <Stack mt={10}>
          <span>Loading: {loading ? "true" : "false"}</span>
          <span>Value: {formValue}</span>
          <span>Debounced Value: {debounced}</span>
        </Stack>
      </section>
    )
  );
};

const SignInButton = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  return (
    <Button color="white" variant="outline" onClick={() => signInWithGoogle()}>
      Continue with Google
    </Button>
  );
};

export const SignOutButton = () => {
  return (
    <Button variant="outline" onClick={() => signOut(auth)}>
      Sign Out
    </Button>
  );
};

const UsernameMessage = ({ username, formValue, isValid, loading }) => {
  if (loading) {
    return <Text>Checking...</Text>;
  }

  if (isValid) {
    return <Text color="green">{username} is available!</Text>;
  }

  if (username && formValue && !isValid) {
    return <Text color="red">That username is taken! Try another</Text>;
  }

  return <Text></Text>;
};

export default EnterPage;
