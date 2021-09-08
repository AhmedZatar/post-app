import React from "react";

const DataContext= React.createContext({
    
    emails:[],
    posts:[],
    comments:[],
    userID:'',
    isLoggedin:false,
    onLogin:()=>{},
    getUserPosts:(userID)=>{},
    getCommintes:(postID)=>{},
    addPost:(data)=>{},
    removePost:(id)=>{},
    updatePost:(data)=>{},
    getId:(email)=>{}



})


export default DataContext

