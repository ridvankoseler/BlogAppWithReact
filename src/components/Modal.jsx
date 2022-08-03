import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { logout, useGetData } from "../helpers/firebase";

const Modal = () => {
  const { currentUser } = useContext(AuthContext);
  const { blogList } = useGetData();
  return (
    <div className='modalDiv rounded-3 mt-2'>
      {currentUser ? (
        <ul className='m-0 d-flex justify-content-center align-items-center flex-column p-2 '>
          <li className='list-unstyled'>
            <Link
              to='/profile'
              className='text-dark text-decoration-none fw-bold'
            >
              Profile
            </Link>{" "}
          </li>
          <li className='list-unstyled'>
            <Link
              to='/newblog'
              className='text-dark text-decoration-none fw-bold'
            >
              New
            </Link>{" "}
          </li>
          <li className='list-unstyled'>
            <Link
              to='/login'
              className='text-dark text-decoration-none fw-bold'
              onClick={() => logout(blogList)}
            >
              Logout
            </Link>{" "}
          </li>
        </ul>
      ) : (
        <ul className='text-center p-2 m-0'>
          <li className='list-unstyled'>
            <Link
              to='/login'
              className='text-dark text-decoration-none fw-bold'
            >
              Login
            </Link>{" "}
          </li>
          <li className='list-unstyled'>
            <Link
              to='/register'
              className='text-dark text-decoration-none fw-bold'
            >
              Register
            </Link>{" "}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Modal;
