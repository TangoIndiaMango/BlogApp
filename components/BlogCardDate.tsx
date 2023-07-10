"use client"

import { formatDate } from "@/utils/function";
import { IBlog } from "./BlogCard";

interface Dateprops {
    created_at : string
}

const BlogCardDate = (dates: Dateprops) => {
    const {day, date, month, year} = formatDate(dates.created_at)
    const lessdate = date < 10 ? `0${date}` : date
    return (
        <div className="date">{`${month} ${lessdate}, ${year}`}</div>
    )
}

export default BlogCardDate