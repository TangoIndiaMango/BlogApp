import AddBlog from "@/components/AddBlog";
import TopBlog from "@/components/HomePage/TopBlog";
import React from "react";

type Props = {};

const AddBlogs = (props: Props) => {
  return (
    <main>
      <div className="singleAddBlogLayout">
        <section>
          <AddBlog />
        </section>
        <section>
          <TopBlog />
        </section>
      </div>
    </main>
  );
};

export default AddBlogs;
