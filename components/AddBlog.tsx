"use client";

import { getData, postData, postFileDataToCLD } from "@/utils/server";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import BackArrow from "./BackArrow";
import { IBlog } from "./BlogCard";
import { ITag } from "./TagMenu";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AddBlog = () => {
  const [formData, setFormData] = useState<Partial<IBlog>>({
    title: "",
    caption: "",
    content: "",
    tag: null,
    cover: undefined
  });
  const [tags, setTags] = useState<ITag[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [ismounted, setIsMounted] = useState(false);

  useEffect(() => {
    const getTags = async () => {
      const tags = (await getData<ITag[]>("tag-url")) || [];
      setTags(tags);
    };
    getTags();
    setIsMounted(true);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTag = tags.find(
      (tag) => parseFloat(tag.id) === parseFloat(e.target.value)
    );
    setFormData((prevData) => ({
      ...prevData,
      tag: selectedTag
    }));
  };

  const handleContentChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      content: value
    }));
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files) {
      setFormData((prevData) => ({
        ...prevData,
        cover: e.target.files![0] as any
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { tag, cover, ...rest } = formData;

    const tag_id = tag?.id;
    let payload = {
      ...rest,
      tag_id: tag_id,
      cover: undefined
    };
    if (cover) {
      const reader = new FileReader();
      reader.readAsDataURL(cover as any);
      reader.onload = async () => {
        // console.log(reader.result);
        const cloudinary_resp = await postFileDataToCLD(reader.result);
        payload = {
          ...payload,
          cover: cloudinary_resp
        };
        const res = await postData(`blog-url`, payload);
        handlePostResponse(res);
      };
    } else {
      const res = await postData(`blog-url`, payload);
      handlePostResponse(res);
    }
  };

  const handlePostResponse = (res: any) => {
    if (res) {
      setLoading(false);
      setFormData({
        title: "",
        caption: "",
        content: "",
        tag: null,
        cover: undefined
      });
      router.push("/");
    } else {
      alert("An error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="addBlogLayOut">
      <BackArrow />
      <form onSubmit={handleSubmit}>
        <div className="formBody">
          <div className="input-form">
            <label htmlFor="tag">Tag</label>
            <select
              name="tag"
              required
              value={formData.tag?.id || ""}
              onChange={handleTagChange}
            >
              <option value="" disabled hidden>
                Select Tag
              </option>
              {tags.map((tag) => (
                <option value={tag.id} key={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>
          <div className="input-form">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              required
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-form">
            <label htmlFor="cover">Cover</label>
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              name="cover"
              placeholder="Enter any cover"
              onChange={handleCoverChange}
            />
          </div>
          <div className="input-caption">
            <label htmlFor="caption">Caption</label>
            <textarea
              rows={8}
              required
              name="caption"
              placeholder="Enter your caption"
              value={formData.caption!}
              onChange={handleInputChange}
            />
          </div>
          {ismounted && (
            <div className="input-content">
              <label htmlFor="content">Content</label>
              <ReactQuill
                className="content-input"
                value={formData.content}
                onChange={handleContentChange}
                placeholder="Enter your content"
              />
            </div>
          )}
        </div>
        <div className="form-submit">
          <button type="submit" disabled={loading}>
            {loading ? "Processing" : "Add Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
