import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Details = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { url, title, content } = state;
  return (
    <div className='bg-light m-auto detailContainer p-3 mt-3'>
      <div className='details-imgDiv m-auto'>
        <img src={url} alt={title} />
      </div>
      <h1 className='text-uppercase text-center p-1'>{title}</h1>
      <p className='text-dark fs-4 d-flex justify-content-end'>
        {new Date().getDate() +
          "/" +
          (new Date().getMonth() + 1) +
          "/" +
          new Date().getFullYear()}
      </p>
      <p>{content}</p>
      <div className='text-center'>
        <button
          onClick={() => navigate(-1)}
          className='border-0 rounded-3 bg-primary text-light p-2'
        >
          Back To Home
        </button>
      </div>
    </div>
  );
};

export default Details;
