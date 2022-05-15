import { Card } from "@mantine/core";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

const PostContent = ({ post }) => {
  const createdAt =
    typeof post?.createdAt === "number"
      ? new Date(post.createdAt)
      : post.createdAt.toDate();

  return (
    <Card sx={{ border: "1px solid gray" }}>
      <h1>{post?.title}</h1>
      <span>Written by: </span>
      <Link href={`/${post.username}`}>
        <a>@{post?.username}</a>
      </Link>{" "}
      on {createdAt.toISOString()}
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </Card>
  );
};

export default PostContent;
