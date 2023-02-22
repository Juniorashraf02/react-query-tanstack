import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { getPostsPaginated } from "./api/posts";

const InfinitePostList = () => {
  const {
    status,
    error,
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", "infinite"],
    getNextPageParam: (prevData) => prevData.nextPage,
    queryFn: ({ pageParam = 2 }) => getPostsPaginated(pageParam),
  });

  if (status === "loading") {
    return <pre>Loading....</pre>;
  }
  if (status === "error") {
    return <p>{JSON.stringify(error)}</p>;
  }

  return (
    <div>
      <h1>Infinite post list</h1>
      {data.pages
        .flatMap((data) => data.posts)
        .map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default InfinitePostList;
