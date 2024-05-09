"use client"

import { useEffect, useRef, useState } from "react";
import useDropdown from "./dropdown"
import { IBlog } from "./BlogCard";
import Loader from "./Loader";
import { getData } from "@/utils/server";
import Link from "next/link";

const Search = () => {

    const [search, setSearch] = useState("");
    const [searchblogs, setSearchBlogs] = useState<IBlog[]>([]);

    const [loading, setLoading] = useState(false);
    const inputRef = useRef<any>()
    let debounce: any
    const onChange = (e: any) => {
        if (debounce) {
            clearTimeout(debounce)
        }
        debounce = setTimeout(() => {
            setSearch(inputRef.current?.value)
        }, 2000);
    }

    const makeSearch = async () => {
        setLoading(true)
        const blogs = await getData<IBlog[]>(`blog-url?keyword=${search}`) || [];
        setLoading(false)
        setSearchBlogs(blogs)
    }

    useEffect(() => {
        if (search) {
            makeSearch()
        }
    }, [search])

    const getSearchInfo = () => {
        if (!search) {
            return <div className="placeholder">Start Typing....</div>

        }
        if (loading) {
            return <Loader />
        }

        if (searchblogs.length > 0) {
            return searchblogs.map((item, index) => (
                <div className="searchItem" key={index}>
                    <Link href={`/${item.slug}`} >
                        {item.title}
                    </Link>
                </div>
            ))
        } else {
           return <div className="not-found">Not found</div>
        }

    }


    const { wrapperRef, setOpen, setClose, getDropdown } = useDropdown('search')
    return <div className="search" ref={wrapperRef}>
        <input placeholder="search" onFocus={() => setOpen()} ref={inputRef} onChange={onChange} />

        {
            getDropdown(
                <div>
                    {getSearchInfo()}
                </div>)
        }
    </div>
}

export default Search