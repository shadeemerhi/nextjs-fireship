import { Box, Button } from "@mantine/core";
import toast from "react-hot-toast";

export default function Home() {
  return (
    <Box p={80}>
      {/* <Link
        href={{ pathname: "/[username]", query: { username: "shadmerhi" } }}
      >
        <Button>Profile</Button>
      </Link> */}
      <Button onClick={() => toast.success("Successfully saved")}>
        Send Message
      </Button>
    </Box>
  );
}
