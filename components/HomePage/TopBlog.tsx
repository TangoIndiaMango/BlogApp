import { getData } from "@/utils/server";
import BlogCardTop from "../BlogCardTop";
import { IBlog } from "../BlogCard";

const TopBlog = async ({ tag }: { tag?: string }) => {
  let endpoint = "top-blog-url";
  if (tag) {
    endpoint += `?tag__name__iexact=${tag}`;
  }
  const blogs = (await getData<IBlog[]>(endpoint)) || [];
  return (
    <div className="">
      <h3>
        {tag ? (
          <>
            Top Post for <span className="capitalize">{tag}</span>
          </>
        ) : (
          "Top Blogs"
        )}
      </h3>
      {blogs.map((blog, i) => (
        <BlogCardTop className="blog-card-list" key={i} {...blog} />
      ))}
      {blogs.length < 1 && <div className="not-found">No blog Found</div>}
    </div>
  );
};

export default TopBlog;
