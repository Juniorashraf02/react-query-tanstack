import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";
import { createPost } from "./api/posts";
import Post from "./Post";

const CreatePost = ({ setCurrentPage }) => {
  const queryClient = useQueryClient();
  const titleRef = useRef();
  const bodyRef = useRef();
  const createNewPost = useMutation({
    mutationFn: createPost,
    onSuccess: (data)=>{
      queryClient.setQueryData(['posts', data.id], data)
        queryClient.invalidateQueries(["posts"], {exact: true})
        setCurrentPage(<Post id={data.id}/>)
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    createNewPost.mutate({
      title: titleRef.current.value,
      body: bodyRef.current.value,
    });
  }

  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" ref={titleRef} />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <input id="body" ref={bodyRef} />
        </div>
        <button disabled={createNewPost.isLoading}>
          {createNewPost.isLoading ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
