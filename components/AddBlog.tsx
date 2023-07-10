"use client"
import { useEffect, useRef, useState } from "react";
import CommentCard, { IComment } from "./CommentCard";
import { getData, postData } from "@/utils/server";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useModal } from "./Modal";
import { IBlog } from "./BlogCard";


const AddBlog = () => {
    const [comment, setComment] = useState<IBlog[]>([]);
    const [loading, setLoading] = useState(true);
    const [formSubmit, setFormSubmit] = useState(false);

    const { getModalContent, showModal, closeModal } = useModal();
    const formRef = useRef<any>();


    // const getComment = async () => {
    //     const comments = await getData<IBlog[]>(`blog-url?blog__slug=${slug}`) || [];
    //     console.log(comments)
    //     setComment(comments)
    //     setLoading(false);
    // }

    // useEffect(() => {
    //     getComment();

    // }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setFormSubmit(true);
        const data = {
            tag_id: formRef.current.elements["tag"].value,
            title: formRef.current.elements["title"].value,
            cover: formRef.current.elements["cover"].value,
            caption: formRef.current.elements["caption"].value,
            content: formRef.current.elements["content"].value,
        }
        // console.log(data)
        const res = await postData(`blog-url`, data)
        if (res) {
            setLoading(true)
            // getComment()
            formRef.current.reset()
            closeModal()
        }
        else {
            alert("an error occured.....")
        }
        setFormSubmit(false)
    }

    return (
        <div>

            <button onClick={showModal}>Add Blog</button>



            {
                getModalContent(
                    <div>
                        <div className="modalHeading">
                            <div className="title">Add Blog</div>
                        </div>
                        <form ref={formRef} onSubmit={handleSubmit}>
                            <div className="modalBody">
                                <div className="input-group">
                                    <label htmlFor="tag">Tag</label>
                                    <input type="text" required name="tag" placeholder="Enter any tag numerically btw 1-10" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" required name="title" placeholder="Title" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="cover">Cover</label>
                                    <input type="file" name="cover" placeholder="Enter any cover" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="caption">Caption</label>
                                    <input type="text" required name="caption" placeholder="Enter your caption" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="content">Content</label>
                                    <input type="text" required name="content" placeholder="Enter your content" />
                                </div>

                                <br />
                            </div>
                            <div className="modalFooter">
                                <button type="submit" disabled={formSubmit}>{formSubmit ? "Submitting" : "Sumbit"}</button>
                            </div>
                        </form>
                    </div>
                )
            }

        </div>

    )

}


export default AddBlog;