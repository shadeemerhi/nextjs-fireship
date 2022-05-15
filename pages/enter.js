import Head from "next/head";
import { auth } from "../lib/firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { Box, Button } from "@mantine/core";

const EnterPage = () => {
  const user = null;
  const username = null;
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

const SignOutButton = () => {
  return (
    <Button variant="outline" onClick={() => signOut()}>
      Sign Out
    </Button>
  );
};

export default EnterPage;
