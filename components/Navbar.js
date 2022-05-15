import { useContext } from "react";
import { Box, Button, Image, Stack } from "@mantine/core";
import Link from "next/link";
import { UserContext } from "../lib/context";
import { SignOutButton } from "../pages/enter";

const Navbar = () => {
  const { user, username } = useContext(UserContext);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 80px",
        height: "60px",
        background: "black",
        color: "white",
      }}
    >
      <Link href="/">
        <Button>Feed</Button>
      </Link>
      <Box>
        {username ? (
          <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
            <SignOutButton />
            <Link href="/admin">
              <Button>Write Posts</Button>
            </Link>
            <Link href={`/${username}`}>
              <Image src={user?.photoURL} />
            </Link>
          </Stack>
        ) : (
          <>
            <Link href="/enter">
              <Button variant="outline" color="green">
                Log In
              </Button>
            </Link>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
