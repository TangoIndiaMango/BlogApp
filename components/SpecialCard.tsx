import Link from "next/link";
import { IBlog } from "./BlogCard";
import BlogCardDate from "./BlogCardDate";

export interface ISpecialBlog extends IBlog {
    cover: string,
    caption: string,
}

const SpecialCard = (blog: ISpecialBlog) => {
    return <div className="specialCard">
        <div className="cover" style={{ backgroundImage: `url(${blog.cover})` }}> </div>
        <div className="blogContent">
            <div className="top">
                <BlogCardDate {...blog} />
            </div>
            <div className="body">
                <h3>{blog.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: blog.caption }} />
            </div>
            <Link href={`/${blog.slug}`}>Continue Reading....</Link>
        </div>
    </div>
}

export default SpecialCard