import DataContext from "./data-context";

import { useState, useEffect } from "react";

function DataProvider(props) {
  const [emails, SetEmails] = useState([]);
  const [usersData, SetUsersData] = useState([]);
  const [userData, SetUserData] = useState({});
  const [comments, setComments] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [userId, setUserID] = useState(0);
  const [posts, setPosts] = useState([]);

  const getEmailsHandler = async () => {
    const data = await (await fetch("https://jsonplaceholder.typicode.com/users")).json();

    SetUsersData(data);
    const emails1 = data.map((item) => {
      return item.email;
    });

    SetEmails(emails1);
  };

  useEffect(() => {
    getEmailsHandler();
  }, []);

  useEffect(() => {
    getUserPostsHandler(userId);
  }, [userId]);

  const loginHandler = () => {
    setIsLogged(true);
  };

  const getIdHandler = (email) => {
    const data = usersData.filter((user) => user.email === email);
    setUserID(data[0].id);
    SetUserData(data[0]);
    loginHandler();
  };

  const getUserPostsHandler = async (id) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      const filteredData = data.filter((post) => post.userId === id);
      setPosts(filteredData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const removePostHandler = async (postID) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postID}`,
        {
          method: "DELETE",
        }
      );

      let updatedPosts = [...posts];
      const ides = updatedPosts.map((item) => {
        return item.id;
      });

      let index = 0;
      ides.forEach((item, i) => {
        if (item === +postID) {
          index = i;
        }
      });
      updatedPosts.splice(index, 1);
      setPosts(updatedPosts);
      console.log("Deleted Successfully");
      console.log(response.status);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addPostHandler = async (post) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: JSON.stringify(post),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      let updatedPosts = [...posts, data];
      setPosts(updatedPosts);

      console.log("Added Successfully");
      console.log(response.status);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCommintesHandler = async (postid) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postid}/comments`
      );
      const data = await response.json();

      setComments(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updatePostHandler = async (post) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${post.id}`,
        {
          method: "PUT",
          body: JSON.stringify(post),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      let updatedPosts = [...posts];
      let index = 0;
      posts.forEach((item, i) => {
        if (item.id === +data.id) {
          index = i;
        }
      });
      updatedPosts[index] = data;

      setPosts(updatedPosts);
      console.log("Updated Successfully");
      console.log(response.status);
    } catch (error) {
      console.log(error.message);
    }
  };

  const dataContext = {
    emails: emails,
    userData: userData,
    usersData: usersData,
    posts: posts,
    comments: comments,
    userID: userId,
    isLoggedin: isLogged,
    getCommintes: getCommintesHandler,
    addPost: addPostHandler,
    removePost: removePostHandler,
    updatePost: updatePostHandler,
    getId: getIdHandler,
  };
  return (
    <DataContext.Provider value={dataContext}>
      {props.children}
    </DataContext.Provider>
  );
}

export default DataProvider;
