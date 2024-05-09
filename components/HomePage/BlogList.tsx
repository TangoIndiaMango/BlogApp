import { getData } from "@/utils/server";
import BlogCard, { IBlog } from "../BlogCard";

const BlogList = async ({ tag }: { tag?: string }) => {
  let endpoint = "blog-url";
  if (tag) {
    endpoint += `?tag__name__iexact=${tag}`;
  }
  const blogs = (await getData<IBlog[]>(endpoint)) || [];

  return (
    <div className="">
      <h3>
        {tag ? (
          <>
            Showing Blog post for <span className="capitalize">{tag}</span>
          </>
        ) : (
          "Latest News"
        )}
      </h3>
      {blogs.map((blog, i) => (
        <BlogCard className="blog-card-list" key={i} {...blog} />
      ))}
      {blogs.length < 1 && <div className="not-found">No blog Found</div>}
    </div>
  );
};

export default BlogList;
