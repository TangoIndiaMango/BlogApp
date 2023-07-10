import Link from "next/link"
import Search from "./Search"
import AddBlog from "./AddBlog"

const Header = () => {
    return <header>
        <Link href="/"><div className="brand">Blogs</div></Link>

        <div className="addButton">
            <AddBlog />
            <Search />
        </div>
    </header>
}

export default Header