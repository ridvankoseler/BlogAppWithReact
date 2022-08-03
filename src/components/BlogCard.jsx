import React from "react";
import { useGetData } from "../helpers/firebase";
import SingleBlog from "./SingleBlog";

const BlogCard = () => {
  const { blogList } = useGetData();
  // console.log(blogList);
  return (
    <div className='row container m-auto  d-flex justify-content-center align-items-center mt-3 gap-2'>
      {blogList?.map((item) => {
        return <SingleBlog item={item} />;
      })}
    </div>
  );
};

export default BlogCard;
