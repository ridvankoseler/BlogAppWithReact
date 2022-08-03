import { ref, update } from "firebase/database";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { db } from "../helpers/firebase";
import { toastErrorNotify } from "../helpers/toastify";
import { AuthContext } from "./AuthContext";

export const BlogContext = createContext();

const BlogContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  const initialValues = {
    title: "",
    url: "",
    content: "",
    userName: "",
    like: 0,
    date: new Date().toLocaleDateString("tr-TR"),
    usersId: [""],
    color: false,
  };
  const [blog, setBlog] = useState(initialValues);

  const increaseLike = (blog) => {
    // console.log(blog.usersId);
    if (currentUser) {
      if (!Object.values(blog.usersId).includes(currentUser.email)) {
        console.log(Object.values(blog.usersId));
        // console.log(currentUser);
        // const db = getDatabase(app);
        const updates = {};
        updates["blogs/" + blog.id] = {
          ...blog,
          like: blog.like + 1,
          color: true,
          usersId: [...blog.usersId, currentUser.email],
        };
        return update(ref(db), updates);
      } else {
        // toastErrorNotify("You have already clicked")
        const updates = {};
        updates["blogs/" + blog.id] = {
          ...blog,
          like: blog.like - 1,
          color: false,
          // usersId:[...blog.usersId,blog.id]
          usersId: [blog.usersId.filter((item) => item !== currentUser.email)],
        };
        return update(ref(db), updates);
      }
    } else {
      toastErrorNotify("Please login first");
    }
  };

  const editBlog = (blog) => {
    // setBlog({ id, title, url, content, userName: currentUser.displayName });
    setBlog({
      ...blog,
      id: blog.id,
      title: blog.title,
      url: blog.url,
      content: blog.content,
    });
    // setBlog(blog);
  };

  return (
    <BlogContext.Provider
      value={{ blog, setBlog, initialValues, editBlog, blog, increaseLike }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;


  // apiKey: "AIzaSyB4g-MDpCH36XQD4JON0oNrJOOeqBj80ME",
  // authDomain: "blogapp-e8c2d.firebaseapp.com",
  // databaseURL: "https://blogapp-e8c2d-default-rtdb.firebaseio.com",
  // projectId: "blogapp-e8c2d",
  // storageBucket: "blogapp-e8c2d.appspot.com",
  // messagingSenderId: "1091031352607",
  // appId: "1:1091031352607:web:795de4f7c40fb790d8dc2a",
  // measurementId: "G-C718811MGE"