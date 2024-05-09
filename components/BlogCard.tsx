import Link from "next/link";
import { ITag } from "./TagMenu";
import BlogCardDate from "./BlogCardDate";
import DOMPurify from "isomorphic-dompurify";

export interface IBlog {
  id: string;
  created_at: string;
  title: string;
  caption?: string | null;
  cover?: string;
  slug: string;
  content: string;
  tag: ITag | null;
  className?: string;
}

const BlogCard = (blog: IBlog) => {
  const sanitizedBlogs = DOMPurify.sanitize(blog.caption || "");
  return (
    <div className={`blogCard ${blog.className ? blog.className : ""}`}>
      <div className="blogContent">
        <div className="top">
          <div className="badge">{blog.tag?.name}</div>
          <BlogCardDate {...blog} />
        </div>
        <div className="body">
          <h3>{blog.title}</h3>
          {sanitizedBlogs.length <= 200 ? (
            <div dangerouslySetInnerHTML={{ __html: sanitizedBlogs }}></div>
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizedBlogs.substring(0, 197)
              }}
            ></div>
          )}
        </div>
        <Link href={`/${blog.slug}`}>Continue Reading....</Link>
      </div>
    </div>
  );
};

export default BlogCard;
