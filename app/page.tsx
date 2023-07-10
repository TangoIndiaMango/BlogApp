
import CommentCard, { IComment } from '@/components/CommentCard'
import BlogList from '@/components/HomePage/BlogList'
import SpecialBlog from '@/components/HomePage/SpecialBlog'
import TopBlog from '@/components/HomePage/TopBlog'
import TagMenu from '@/components/TagMenu'


export default function Home() {
  return (
    <main>
      <TagMenu />
      <div className="blogLayout">
        <section>
          <SpecialBlog />
        </section>
        <section>
          <BlogList />
        </section>
        <section>
          <TopBlog />
        </section>
      </div>
    </main>
  )
}
