import { Box } from "@mantine/core";
import Metatags from "../../components/Metatags";

const AdminPostEdit = () => {
  return (
    <main>
      <Metatags title="admin page" />
      <Box p={80}>
        <h1>Edit Post</h1>
      </Box>
    </main>
  );
};

export default AdminPostEdit;
