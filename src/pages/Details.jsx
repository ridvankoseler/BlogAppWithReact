import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { deleteBlog } from "../helpers/firebase";
import { AuthContext } from "../contexts/AuthContext";
import { BlogContext } from "../contexts/BlogContext";

const Details = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { editBlog } = useContext(BlogContext);
  const { url, title, content, date, id, userName } = state;
  return (
    <div className='bg-light m-auto detailContainer p-3 mt-3'>
      <div className='details-imgDiv m-auto'>
        <img
          src={url ? url : "https://picsum.photos/200/300?random=2"}
          alt={title}
        />
      </div>
      <h1 className='text-uppercase text-center p-1'>{title}</h1>
      <p className='text-dark fs-4 d-flex justify-content-end'>{date}</p>
      <p>{content}</p>
      <div className='d-flex justify-content-between'>
        <button
          onClick={() => navigate(-1)}
          className='border-0 fs-1 bg-transparent'
        >
          <TiArrowBack />
        </button>
        {currentUser.displayName === userName && (
          <div className='d-flex align-items-center'>
            <button
              onClick={() => {
                deleteBlog(id);
                navigate("/");
              }}
              className='text-danger border-0 fs-3 px-1 bg-transparent'
            >
              <FaTrashAlt />
            </button>
            <button
              onClick={() => {
                editBlog(state);
                navigate("/updateblog");
              }}
              className='text-success border-0 fs-3 px-1 bg-transparent'
            >
              <FaEdit />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
