import { Avatar, Center, Stack, Text } from "@mantine/core";

const UserProfile = ({ user }) => {
  return (
    <Center pt={80}>
      <Stack spacing={2} align="center">
        <Avatar
          src={user.photoURL}
          sx={{ height: "120px", width: "auto", borderRadius: "50%" }}
        />
        <Text>@{user.username}</Text>
        <h1>{user.displayName}</h1>
      </Stack>
    </Center>
  );
};

export default UserProfile;
