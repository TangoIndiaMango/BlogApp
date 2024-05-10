import BlogList from "@/components/HomePage/BlogList";
import TopBlog from "@/components/HomePage/TopBlog";
import TagMenu from "@/components/TagMenu";

export default async function BlogByTag(props: any) {
  const { tag } = props.params;
  return (
    <main>
      <TagMenu />
      <div className="blogLayout tag-layout">
        <section>
          <BlogList tag={tag} />
        </section>
        <section>
          <TopBlog tag={tag} />
        </section>
      </div>
    </main>
  );
}
