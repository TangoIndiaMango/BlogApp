"use client"

import BackArrow from "../BackArrow";
import { IBlog } from "../BlogCard";
import BlogCardDate from "../BlogCardDate";
import DOMPurify from "isomorphic-dompurify";

const Content = (blog: IBlog) => {
  const sanitizedBlogContent = DOMPurify.sanitize(blog.content || "");
  console.log(blog)

  return (
    <div className="single-content">
      <BackArrow/>
      <div className="top">
        <div className="badge">{blog.tag?.name}</div>
        <BlogCardDate {...blog} />
      </div>
      {blog.cover && (
        <div
          className="cover"
          style={{ backgroundImage: `url(${blog.cover})` }}
        ></div>
      )}
      <h2>{blog.title}</h2>

      <div dangerouslySetInnerHTML={{ __html: sanitizedBlogContent }}></div>
    </div>
  );
};

export default Content;
