import DataContext from "../store/data-context";
import { useContext, useState, useEffect } from "react/cjs/react.development";
import "./Posts.css";

function Posts() {
  const dataCtx = useContext(DataContext);
  const [posts, setPosts] = useState([]);
  const [comments,setComments]=useState([])
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [formEmpty, setFormEmpty] = useState(false);
  const [showComments, setShowComments] = useState(false);

  function titleChangeHandler(event) {
    setTitle(event.target.value);
  }

  function bodyChangeHandler(event) {
    setBody(event.target.value);
  }

  useEffect(() => {
    setPosts(dataCtx.posts);
  }, [dataCtx.posts]);

  useEffect(() => {
    setComments(dataCtx.comments);
  }, [dataCtx.comments]);


  function removePostHandler(event) {
    dataCtx.removePost(event.target.value);
  }

  function addPostHandler(event) {
    event.preventDefault();
    if (title.trim().length === 0 || body.trim().length === 0) {
      setFormEmpty(true);
      return;
    } else {
      const data = {
        userId: dataCtx.userID,
        id: posts.length + 1,
        title: title,
        body: body,
      };

      dataCtx.addPost(data);

      setFormEmpty(false);
      setTitle("");
      setBody("");
    }
  }

  function showCommentsHandler(event){
    setShowComments(true)

    dataCtx.getCommintes(event.target.value)

  }

  function hideCommentsHandler(event){
    setShowComments(false)
  }
  return (
    <div className="posts">
      {!showComments && (
        <div>
          <form className="form" onSubmit={addPostHandler}>
            <h2> Add Post </h2>
            <label>Title</label>
            <input value={title} onChange={titleChangeHandler} type="text" />
            <label>Body</label>
            <textarea value={body} onChange={bodyChangeHandler}></textarea>
            <button>Add</button>
            {formEmpty && <p>The Form is Empty</p>}
          </form>
          {posts.map((post) => {
            return (
              <div className="post" key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <div>
                  <button value={post.id} onClick={removePostHandler}>
                    Delete
                  </button>
                  <button>Update</button>
                  <button onClick={showCommentsHandler} value={post.id}>comments</button>
                </div>
              </div>
            );
          })}
          {posts.length === 0 && <p>You don't have any post</p>}
        </div>
      )}
      {showComments&&(
          <div className='comments'>
              <h1>Post Comments</h1>
              {comments.map(comment=>{
                  return(
                    <div className="comment" key={comment.id}>
                        <p>{comment.body}</p>
                        <div>
                            <h4>Name: {comment.name}</h4>
                            <h4>Email: {comment.email}</h4>
                        </div>
                    </div>
                  )
              })}
              <button onClick={hideCommentsHandler}>Posts</button>
          </div>
      )}

    </div>
  );
}

export default Posts;
