"use client";
import { useEffect, useRef, useState } from "react";
import CommentCard, { IComment } from "../CommentCard";
import { getData, postData } from "@/utils/server";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useModal } from "../Modal";

const Comment = ({ slug, id }: { slug: string; id: string }) => {
  const [comment, setComment] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [formSubmit, setFormSubmit] = useState(false);

  const { getModalContent, showModal, closeModal } = useModal();
  const formRef = useRef<any>();

  const getComment = async () => {
    const comments =
      (await getData<IComment[]>(`comment-url?blog__slug=${slug}`)) || [];
    console.log(comments);
    setComment(comments);
    setLoading(false);
  };

  useEffect(() => {
    getComment();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setFormSubmit(true);
    const data = {
      name: formRef.current.elements["name"].value,
      comment: formRef.current.elements["comment"].value,
      blog_id: id
    };
    // console.log(data)
    const res = await postData(`comment-url`, data);
    if (res) {
      setLoading(true);
      getComment();
      formRef.current.reset();
      closeModal();
    } else {
      alert("an error occured.....");
    }
    setFormSubmit(false);
  };

  return (
    <div className="comment-section">
      <div className="top-section">
        <div className="title">
          <h4>Comments</h4>

          {!loading && <div className="counter">{comment.length}</div>}
        </div>
        <button onClick={showModal}>Add Comment</button>
      </div>

      {loading ? (
        <div className="skLoading">
          <Skeleton className="title" />
          <Skeleton count={4} />
        </div>
      ) : comment.length < 1 ? (
        <div className="not-found">No comment for this blog</div>
      ) : (
        comment.map((commentData, i) => (
          <CommentCard key={i} {...commentData} />
        ))
      )}

      {getModalContent(
        <div>
          <div className="modalHeading">
            <div className="title">Add Comment</div>
          </div>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="modalBody">
              <div className="input-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  required
                  name="name"
                  placeholder="Enter your name"
                />
              </div>
              <div className="input-group">
                <label htmlFor="comment">Comment</label>
                <input
                  type="text"
                  required
                  name="comment"
                  placeholder="Enter your comment"
                />
              </div>
              <br />
            </div>
            <div className="modalFooter">
              <button type="submit" disabled={formSubmit}>
                {formSubmit ? "Submitting" : "Sumbit"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comment;
