import { useState } from "react";
import "./App.css";
import Post from "./Post";
import PostsListOne from "./PostsListOne";
import PostsListTwo from "./PostsListTwo";
import CreatePost from "./CreatePost";
import PostListPagination from "./PostListPagination";

function App() {
  const [currentPage, setCurrentPage] = useState(<PostsListOne />);

  return (
    <div className="App">
      <button onClick={() => setCurrentPage(<PostsListOne />)}>Post One</button>
      <button onClick={() => setCurrentPage(<PostsListTwo />)}>Post Two</button>
      <button onClick={() => setCurrentPage(<Post id={1} />)}>
        First Post
      </button>
      <button
        onClick={() =>
          setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
        }
      >
        Crete Post
      </button>
      <button
        onClick={() =>
          setCurrentPage(<PostListPagination />)
        }
      >
        pagination
      </button>
      <br />
      <br />
      {currentPage}
    </div>
  );
}

// function wait(duration) {
//   return new Promise((resolve) => setTimeout(resolve, duration));
// }

export default App;
