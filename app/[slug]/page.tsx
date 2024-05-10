import { IBlog } from "@/components/BlogCard";
import Header from "@/components/Header";
import Comment from "@/components/SingleBlogPage/Comment";
import Content from "@/components/SingleBlogPage/Content";
import { getData } from "@/utils/server";

const SingleBlog = async (props: any) => {
  const { slug } = props.params;
  const blogCont = await getData<IBlog>(`blog-url/${slug}`);

  if (!blogCont) {
    return <div>Blog Not found</div>;
  }

  return (
    <div>
      <div className="singleBlogLayout">
        <section>
          <Content {...blogCont} />
        </section>

        <section>
          <Comment slug={slug} id={blogCont.id} />
        </section>
      </div>
    </div>
  );
};

export default SingleBlog;
