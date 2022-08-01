import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
const Modal = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className='modalDiv border border-1 border-dark d-flex justify-content-center align-items-center p-2 rounded-4 '>
      {!currentUser ? (
        <ul className=' d-flex justify-content-center align-items-center flex-column list-unstyled p-2 m-0'>
          <li>
            <Link
              to='/profile'
              className='fw-bold text-light text-decoration-none'
            >
              Profile
            </Link>{" "}
          </li>
          <li>
            <Link
              to='/login'
              className='fw-bold text-light text-decoration-none'
            >
              New
            </Link>{" "}
          </li>
          <li>
            <Link
              to='/login'
              className='fw-bold text-light text-decoration-none'
            >
              Logout
            </Link>{" "}
          </li>
        </ul>
      ) : (
        <ul className=' d-flex justify-content-center align-items-center flex-column text-center p-0 m-0'>
          <li className='list-unstyled'>
            <Link
              to='/login'
              className='fw-bold text-light text-decoration-none'
            >
              Login
            </Link>{" "}
          </li>
          <li className='list-unstyled'>
            <Link
              to='/register'
              className='fw-bold text-light text-decoration-none'
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
