import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { BlogContext } from "../contexts/BlogContext";
import { AiFillHeart } from "react-icons/ai";

const SingleBlog = ({ item }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { increaseLike } = useContext(BlogContext);
  // console.log(currentUser.email);
  const { title, url, content, userName, date, like, color, usersId } = item;
  console.log(usersId.includes(currentUser.email));
  return (
    <div className='  col-md-5 single '>
      <div className='bg-light p-2 card'>
        <div className='img-div'>
          <img
            src={url ? url : "https://picsum.photos/1600/900?random=2"}
            alt={title}
          />
        </div>
        <h1 className='text-dark header text-center text-capitalize title'>
          {title.length > 11 ? title.slice(0, 8) + "..." : title}
        </h1>
        <p className='text-dark fs-4'>{date}</p>
        <p className='text-dark content-div'>{content.slice(0, 80)}...</p>
        <h5 className='text-dark'>@{userName}</h5>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='btnDiv d-flex justify-content-center '>
            <button
              onClick={() =>
                navigate("/details", { state: item, replace: false })
              }
              className='bg-primary border-0 text-light rounded-3 p-1'
            >
              DETAILS
            </button>
          </div>
          <div>
            <span
              className={`${
                !color
                  ? usersId.includes(currentUser.email)
                    ? "text-danger"
                    : "text-secondary"
                  : "text-danger"
              } fs-4`}
              style={{ cursor: "pointer" }}
              onClick={() => increaseLike(item)}
            >
              <AiFillHeart />
            </span>
            <span className='text-dark fs-5'> {like}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
