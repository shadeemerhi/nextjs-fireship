import { Box, Button, Center, Container } from "@mantine/core";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Spinner from "../components/Loader";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Box p={80}>
      <Link
        href={{ pathname: "/[username]", query: { username: "shadmerhi" } }}
      >
        <Button>Profile</Button>
      </Link>
    </Box>
  );
}
