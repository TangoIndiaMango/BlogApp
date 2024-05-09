import Link from "next/link";
import { IBlog } from "./BlogCard";
import BlogCardDate from "./BlogCardDate";

const BlogCardTop = (blog: IBlog) => {
    return <div className={`blogCard ${blog.className ? blog.className : ""}`}>
        <div className="blogContent">
            <div className="top">
                <div className="badge">{blog.tag?.name}</div>
                <BlogCardDate {...blog}/>
            </div>
            <div className="body">
                <h3>{blog.title}</h3>
            </div>
            <Link href={`/${blog.slug}`}>Continue Reading....</Link>
        </div>
        {blog.cover && <div className="cover" style={{ backgroundImage: `url(${blog.cover})` }}> </div>}
    </div>
}

export default BlogCardTop