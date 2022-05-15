import { Box } from "@mantine/core";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const { user, username } = useUserData();
  return (
    <UserContext.Provider value={{ user, username }}>
      <Box
        sx={(theme) => ({
          background: theme.colors.dark[0],
          minHeight: "100vh",
        })}
      >
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
      </Box>
    </UserContext.Provider>
  );
}

export default MyApp;
