import DataContext from "../store/data-context";
import { useContext, useState, useEffect } from "react/cjs/react.development";
import Button from "@material-ui/core/Button";
import Comment from "./Comment";
import { makeStyles, createTheme , ThemeProvider } from "@material-ui/core/styles";
import { TextField, Box } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import { orange } from "@material-ui/core/colors";


const useStyles = makeStyles((theme) => ({
  comments: {
    maxWidth: 1000,
    minWidth: 200,
    display: "flex",
    flexDirection: "column ",
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
    alignItems: "center",
    margin: "auto",
  },
  buttonGroup: {
    maxWidth: 1000,
    minWidth: 200,
    display: "flex",
    alignItems: "center",
    margin: "auto",
  },
  addPost: {
    maxWidth: 1000,
    minWidth: 200,
    display: "flex",
    flexDirection: "column ",
    alignItems: "center",
    margin: "auto",
  },
}));


const theme = createTheme({

  palette: {
    primary: {
      main: orange[800],
    },
  },
});

const Posts = () => {
  const classes = useStyles();

  const dataCtx = useContext(DataContext);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [updatetitle, setUpdateTitle] = useState("");
  const [updateBody, setUpdateBody] = useState("");
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

  const removePostHandler = (e, idValue) => {
    dataCtx.removePost(idValue);
  };

  const addPostHandler = (event) => {
    event.preventDefault();
    if (title.trim().length === 0 || body.trim().length === 0) {
      setFormEmpty(true);
      return;
    } else {
      const data = {
        userId: dataCtx.userID,
        title: title,
        body: body,
      };

      dataCtx.addPost(data);

      setFormEmpty(false);
      setTitle("");
      setBody("");
    }
  };
  const showCommentsHandler = (e, idValue) => {
    dataCtx.getCommintes(idValue);
    setShowComments(idValue);
    setPostUpdate("");
  };

  const hideCommentsHandler = (event) => {
    setShowComments(false);
  };

  const showUppdateHandler = (e, idValue, t, b) => {
    setShowComments(false);
    setUpdateTitle(t);
    setUpdateBody(b);
    setPostUpdate(idValue);
  };

  const updatePostHandler = (e, idValue) => {
    const data = {
      userId: dataCtx.userID,
      id: idValue,
      title: updatetitle,
      body: updateBody,
    };
    dataCtx.updatePost(data);
    setPostUpdate("");
    setUpdateTitle("");
    setUpdateBody("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor="#b0b0b0"
      boxShadow={3}
      maxWidth={1000}
      padding={3}
      margin="auto"
      minWidth={700}
    >
      <div className={classes.addPost}>
        <Typography variant="h3" gutterBottom>
          {" "}
          New Post{" "}
        </Typography>
        <TextField
          variant="filled"
          value={title}
          onChange={titleChangeHandler}
          type="text"
          label="Title"
          margin="dense"
          fullWidth
        />
        <TextField
          className={classes.textarea}
          value={body}
          variant="filled"
          label="Body"
          type="textarea"
          margin="dense"
          multiline={true}
          onChange={bodyChangeHandler}
          minRows="5"
          fullWidth
        ></TextField>
        <Button
          onClick={addPostHandler}
          size="large"
          variant="contained"
          color="primary"
          fullWidth
        >
          Add
        </Button>
        {formEmpty && <p>The Form is Empty</p>}
      </div>
      {posts.map((post) => {
        return (
          <Box
            key={post.id}
            boxShadow={3}
            maxWidth='100%'
            margin="auto"
            minWidth={200}
            marginTop={2}
            padding={3}
            paddingBottom={3}
            marginBottom={2}
            borderRadius={16}

          >
            <Box
              display="flex"
              width='100%'
              minWidth={200}
              margin="auto"
              flexDirection="column"
              alignItems="center"
              padding={1}
              textAlign="left"
            >
              <Typography variant="h6">{post.title}</Typography>
              <Typography  variant="h6" gutterBottom>{post.body} </Typography>
            </Box>

            <ButtonGroup
              className={classes.buttonGroup}
              size="large"
              variant="contained"
              color="primary"
              fullWidth
            >
              <Button onClick={(e) => removePostHandler(e, post.id)}>
                Delete
              </Button>
              <Button
                onClick={(e) =>
                  showUppdateHandler(e, post.id, post.title, post.body)
                }
              >
                Update
              </Button>
              <Button onClick={(e) => showCommentsHandler(e, post.id)}>
                comments
              </Button>
            </ButtonGroup>
            {+showComments === post.id && (
              <div className={classes.comments}>
                {comments.map((comment) => {
                  return <Comment key={comment.id} comment={comment} />;
                })}
                <Button
                  onClick={hideCommentsHandler}
                  size="large"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Hide
                </Button>
              </div>
            )}
            {+postUpdate === post.id && (
              <div className={classes.addPost}>
                <TextField
                  variant="filled"
                  value={updatetitle}
                  onChange={updateTitleChangeHandler}
                  type="text"
                  label="Title"
                  margin="dense"
                  fullWidth
                />
                <TextField
                  className={classes.textarea}
                  value={updateBody}
                  variant="filled"
                  label="Body"
                  type="textarea"
                  margin="dense"
                  multiline={true}
                  onChange={updateBodyChangeHandler}
                  minRows="5"
                  fullWidth
                ></TextField>

                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  fullWidth
                  value={post.id}
                  onClick={(e) => updatePostHandler(e, post.id)}
                >
                  Save
                </Button>
              </div>
            )}
          </Box>
        );
      })}
      </Box>
      {posts.length === 0 && <p>You don't have any post</p>}
    </ThemeProvider >
  );
};

export default Posts;
