import Link from "next/link";
import { ITag } from "./TagMenu";
import BlogCardDate from "./BlogCardDate";


export interface IBlog {
    id: string;
    created_at: string;
    title: string;
    caption?: string;
    cover?: string;
    slug: string;
    content: string;
    tag: ITag;
    className? : string;
}

const BlogCard = (blog: IBlog) => {
    return <div className={`blogCard ${blog.className ? blog.className : ""}`}>
        <div className="blogContent">
            <div className="top">
                <div className="badge">{blog.tag.name}</div>
                <BlogCardDate {...blog}/>
            </div>
            <div className="body">
                <h3>{blog.title}</h3>
                {blog.caption && <div dangerouslySetInnerHTML={{__html:blog.caption}}></div>}
            </div>
            <Link href={`/${blog.slug}`}>Continue Reading....</Link>
        </div>
    </div>
}

export default BlogCard