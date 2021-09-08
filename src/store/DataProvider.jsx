import DataContext from "./data-context";

import { useState, useEffect } from "react";

function DataProvider(props) {
  const [emails, SetEmails] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [userId, setUserID] = useState(0);
  const [posts, setPosts] = useState([]);

  async function getEmailsHandler() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();

    let emails1 = [];

    data.forEach((item) => {
      emails1.push(item.email);
    });

    SetEmails(emails1);
  }

  useEffect(() => {
    getEmailsHandler();
  }, []);

  function loginHandler() {
    setIsLogged(true);
  }

  function getIdHandler(email) {
    let num = 0;

    emails.forEach((item, i) => {
      if (item === email) {
        num = i + 1;
      }
    });

    setUserID(num);
  }

  async function getUserPostsHandler(id) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      const filteredData = [];
      data.forEach((post) => {
        if (post.userId === id) {
          filteredData.push(post);
        }
      });

      setPosts(filteredData);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function removePostHandler(postID) {
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
  }

  async function addPostHandler(post) {
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
  }

  async function getCommintesHandler(postid) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postid}/comments`
      );
      const data = await response.json();

      setComments(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function updatePostHandler(post){

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
      updatedPosts[index]=data;

      setPosts(updatedPosts)
      console.log("Updated Successfully");
      console.log(response.status);
    } catch (error) {
      console.log(error.message);
    }

  }

  const dataContext = {
    emails: emails,
    posts: posts,
    comments: comments,
    userID: userId,
    isLoggedin: isLogged,
    onLogin: loginHandler,
    getUserPosts: getUserPostsHandler,
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
