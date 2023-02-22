import React from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPostsPaginated } from "./api/posts";

const PostListPagination = () => {
  const [page, setPage] = useState(1);

  const { status, error, data, isPreviousData } = useQuery({
    queryKey: ["posts", { page }],
    keepPreviousData: true,
    queryFn: () => getPostsPaginated(page),
  });

  if (status === "loading") return <h1>Loading...</h1>;
  if (status === "error") return <pre>{JSON.stringify(error)}</pre>;

  return (
    <div>
      <h3>Page list pagination</h3>
      <small>{isPreviousData && "previous data"}</small>
      <div>
        {data.posts.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
        );
        <br /><br />
        {data.previousPage && (
          <button onClick={() => setPage(data.previousPage)}>Previous</button>
        )}{" "}
        {data.nextPage && (
          <button onClick={() => setPage(data.nextPage)}>Next</button>
        )}
      </div>
    </div>
  );
};

export default PostListPagination;
