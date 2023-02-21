import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "./api/posts";
import { getUser } from "./api/users";

const Post = ({ id }) => {
  const postQuery = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
  });

  const userQuery = useQuery({
    queryKey: ["users", postQuery?.data?.userId],
    enabled: postQuery?.data?.userId != null,
    queryFn: () => getUser(postQuery.data.userId),
  });

  if (postQuery.isLoading) {
    return <pre>Loading...</pre>;
  }
  if (postQuery.isError) {
    return <pre>{JSON.stringify(postQuery.error)}</pre>;
  }

  return (
    <div>
      <h1>{postQuery.data.title}</h1>
      <p>
        user:{" "}
        {userQuery.isLoading
          ? "Loading..."
          : userQuery.isError
          ? "Error loading user"
          : userQuery.data.name}
      </p>
      <p>{postQuery.data.body}</p>
    </div>
  );
};

export default Post;
