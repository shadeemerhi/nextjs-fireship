import { Box, Button, Image } from "@mantine/core";
import Link from "next/link";

const Navbar = () => {
  const { user, username } = {};
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
          <>
            <Link href="/admin">Write Posts</Link>
            <Link href={`/${username}`}>
              <Image src={user?.photoURL} />
            </Link>
          </>
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
