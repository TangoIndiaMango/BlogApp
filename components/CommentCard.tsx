import Link from "next/link";
import BlogCardDate from "./BlogCardDate";


export interface IComment {
    created_at: string;
    name: string;
    comment: string;
}

const CommentCard = (comment: IComment) => {
    return <div className="commentCard">
        <div className="top">
            <div className="name">{comment.name}</div>
            <div className="dash"/>
            <BlogCardDate {...comment}/>
        </div>
        <div className="body"><p>
            {comment.comment}
            {/* <Link href={""}>Read more</Link> */}
            </p>
        </div>

    </div>
}

export default CommentCard