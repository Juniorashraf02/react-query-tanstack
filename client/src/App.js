import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./App.css";

const POSTS = [
  { id: 1, title: "demo post no 1" },
  { id: 2, title: "demo post no 2" },
  { id: 3, title: "demo post no 3" },
];

function App() {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
  });

  const newPostsQuery = useMutation({
    mutationFn: (title) =>
      wait(2000).then(() =>
        POSTS.push({
          id: crypto.randomUUID(),
          title,
        })
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  if (postsQuery.isLoading) return <p>Loading......</p>;
  if (postsQuery.isError) {
    return <pre>{JSON.stringify(postsQuery.error)}</pre>;
  }

  console.log(POSTS);
  return (
    <div className="App">
      {postsQuery.data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}

      <button onClick={() => newPostsQuery.mutate("Hello world!")}>
        Add a post
      </button>
    </div>
  );
}

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default App;
