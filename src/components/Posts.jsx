import DataContext from "../store/data-context";
import { useContext, useState, useEffect } from "react/cjs/react.development";
import "./Posts.css";

const Posts = () => {
  const dataCtx = useContext(DataContext);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [updatetitle, setUpdateTitle] = useState("");
  const [updatebody, setUpdateBody] = useState("");
  const [formEmpty, setFormEmpty] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [postUpdate, setPostUpdate] = useState("");

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const bodyChangeHandler = (event) => {
    setBody(event.target.value);
  };

  const updateTitleChangeHandler = (event) => {
    setUpdateTitle(event.target.value);
  };

  const updateBodyChangeHandler = (event) => {
    setUpdateBody(event.target.value);
  };

  useEffect(() => {
    setPosts(dataCtx.posts);
  }, [dataCtx.posts]);

  useEffect(() => {
    setComments(dataCtx.comments);
  }, [dataCtx.comments]);

  const removePostHandler = (event) => {
    dataCtx.removePost(event.target.value);
  };

  const addPostHandler = (event) => {
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
  };
  const showCommentsHandler = (event) => {
    setShowComments(event.target.value);
    setPostUpdate("");

    dataCtx.getCommintes(event.target.value);
  };

  const hideCommentsHandler = (event) => {
    setShowComments(false);
  };

  const showUppdateHandler = (event) => {
    setShowComments(false);
    console.log();
    setPostUpdate(event.target.value);
  };

  const updatePostHandler = (event) => {
    if (updatetitle.trim().length === 0 || updatebody.trim().length === 0) {
      setPostUpdate("");
      return;
    } else {
      const data = {
        userId: dataCtx.userID,
        id: event.target.value,
        title: updatetitle,
        body: updatebody,
      };
      dataCtx.updatePost(data);
      setPostUpdate("");
      setUpdateTitle("");
      setUpdateBody("");
    }
  };
  return (
    <div className="posts">
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
                <button onClick={showUppdateHandler} value={post.id}>
                  Update
                </button>
                <button onClick={showCommentsHandler} value={post.id}>
                  comments
                </button>
              </div>
              {+showComments === post.id && (
                <div className="comments">
                  {comments.map((comment) => {
                    return (
                      <div className="comment" key={comment.id}>
                        <p>{comment.body}</p>
                        <div>
                          <h4>Name: {comment.name}</h4>
                          <h4>Email: {comment.email}</h4>
                        </div>
                      </div>
                    );
                  })}
                  <button onClick={hideCommentsHandler}>Hide</button>
                </div>
              )}
              {+postUpdate === post.id && (
                <div className="update">
                  <label>Title</label>
                  <input
                    placeholder={post.title}
                    onChange={updateTitleChangeHandler}
                    type="text"
                  />
                  <label>Body</label>

                  <textarea
                    placeholder={post.body}
                    onChange={updateBodyChangeHandler}
                  ></textarea>
                  <form>
                    <input type="hidden" name="id" value={post.id} />
                    <button value={post.id} onClick={updatePostHandler}>
                      Save
                    </button>
                  </form>
                </div>
              )}
            </div>
          );
        })}
        {posts.length === 0 && <p>You don't have any post</p>}
      </div>
    </div>
  );
};

export default Posts;
