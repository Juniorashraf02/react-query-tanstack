import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api/posts";

const PostsListTwo = () => {
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    staleTime:1000,  //staleTime delay the fetchings
  });

  if (postQuery.isLoading) return <p>Loading....</p>;
  if (postQuery.isError) {
    return <pre>{JSON.stringify(postQuery.error)}</pre>;
  }

  // console.log(postQuery);
  return (
    <div>
      <h1>This is post number 2</h1>
      {postQuery.data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
};

export default PostsListTwo;
