import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api/posts";

const PostsListOne = () => {
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    refetchInterval: 1000,
    // initialData: [{id:1, title:"Initial Data"}],
    placeholderData: [{id:1, title:"New Data"}]
  });

  if (postQuery.isLoading) return <p>Loading....</p>;
  if (postQuery.isError) {
    return <pre>{JSON.stringify(postQuery.error)}</pre>;
  }

  //   console.log(postQuery);
  return (
    <div>
      <h1>This is post number 1</h1>
      {postQuery.data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
};

export default PostsListOne;
