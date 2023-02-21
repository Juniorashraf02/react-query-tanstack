import { useState } from "react";
import "./App.css";
import PostsListOne from "./PostsListOne";
import PostsListTwo from "./PostsListTwo";


function App() {
 const [currentPage, setCurrentPage] = useState(<PostsListOne/>)
  
  return (
    <div className="App">
      <button onClick={()=>setCurrentPage(<PostsListOne/>)}>Post One</button>
      <button onClick={()=>setCurrentPage(<PostsListTwo/>)}>Post Two</button>
      <br /><br />
      {currentPage}
    </div>
  );
}

// function wait(duration) {
//   return new Promise((resolve) => setTimeout(resolve, duration));
// }

export default App;
