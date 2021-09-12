import React from "react";

const DataContext= React.createContext({
    
    emails:[],
    userData: {},
    usersData:[],
    posts:[],
    comments:[],
    userID:'',
    isLoggedin:false,
    getUserPosts:(userID)=>{},
    getCommintes:(postID)=>{},
    addPost:(data)=>{},
    removePost:(id)=>{},
    updatePost:(data)=>{},
    getId:(email)=>{},
    onLogout:()=>{},

})


export default DataContext

