import { useContext } from "react";
import Head from "next/head";
import { auth } from "../lib/firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { Box, Button } from "@mantine/core";
import { UserContext } from "../lib/context";

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

const UsernameForm = () => {};

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
    <Button variant="outline" onClick={() => signOut()}>
      Sign Out
    </Button>
  );
};

export default EnterPage;
