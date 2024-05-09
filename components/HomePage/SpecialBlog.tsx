import { getData } from "@/utils/server"
import SpecialCard, { ISpecialBlog } from "../SpecialCard"

interface ISpecialBlogV2 {
    blog: ISpecialBlog
}

const SpecialBlog = async () => {
    const specialBlog = await getData<ISpecialBlogV2[]>("specialblog-url")
    // console.log(specialBlog)
    if (!specialBlog) {
        return null
    }
    return (
    <div className="">
       <h3>{specialBlog[0].blog.tag?.name}</h3>
       <SpecialCard {...specialBlog[0].blog}/>
    </div>
    )
}

export default SpecialBlog