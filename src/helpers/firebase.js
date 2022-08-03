// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/toastify";
import { useEffect, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/*---------------------create new user----------------------*/

const auth = getAuth(app);

export const createUser = async (email, password, navigate, displayName) => {
  try {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });

    toastSuccessNotify("Registered successfully");
    // console.log(userCredential);
    navigate("/");
  } catch (error) {
    toastErrorNotify(error.message);
    // console.log(error);
  }
};
/*---------------------sign in----------------------*/

export const signIn = async (email, password, navigate, blog) => {
  try {
    let userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    navigate("/");
    // console.log(userCredential);
    toastSuccessNotify("Logged in successfully");
  } catch (error) {
    toastErrorNotify(error.message);
  }
};

// to prevent double register
export const userObserver = (setCurrentUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(false);
    }
  });
};

//to log out
export const logout = (bloglist) => {
  signOut(auth);
  toastSuccessNotify("Logged out successfully");
  bloglist.map((item) => updateColor(item));
};

const updateColor = (blog) => {
  const db = getDatabase(app);
  const updates = {};
  updates["blogs/" + blog.id] = { ...blog, color: false };
  return update(ref(db), updates);
};

export const signUpProvider = (navigate) => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      toastSuccessNotify("Logged in successfully");
      navigate("/");
    })
    .catch((error) => {
      toastErrorNotify(error.message);
    });
};

/*--------------------------------DATABASE--------------------------- */

export const db = getDatabase(app);

// add data
export const addBlog = (blog, currentUser) => {
  const blogRef = ref(db, "blogs/");
  const newBlogRef = push(blogRef);
  set(newBlogRef, {
    title: blog.title,
    url: blog.url,
    content: blog.content,
    userName: currentUser.displayName,
    like: blog.like,
    date: blog.date,
    usersId: blog.usersId,
    color: blog.color,
  });
};

//get data
export const useGetData = () => {
  const [blogList, setBlogList] = useState();
  useEffect(() => {
    const db = getDatabase(app);
    const blogRef = ref(db, "blogs/");
    onValue(blogRef, (snapshot) => {
      const data = snapshot.val();
      const blogArray = [];

      for (let id in data) blogArray.push({ id, ...data[id] });
      setBlogList(blogArray);
    });
  }, []);
  return { blogList };
};

//delete
export const deleteBlog = (id) => {
  const db = getDatabase(app);
  const blogRef = ref(db, "blogs/");
  remove(ref(db, "blogs/" + id));
  toastSuccessNotify("Deleted successfully");
};

//edit
export const updateBlog = (blog) => {
  const db = getDatabase(app);
  const updates = {};
  updates["blogs/" + blog.id] = blog;
  toastSuccessNotify("Edited successfully");
  return update(ref(db), updates);
};
