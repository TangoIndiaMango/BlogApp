"use client"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { ITag } from "./TagMenu"
import useDropdown from "./dropdown"
import Link from "next/link"


const TagMenuDropdown = async ({ tags }: { tags: ITag[] }) => {
    const { wrapperRef, setOpen, setClose, getDropdown } = useDropdown('tagMenuDrop');
    return (
        <>
            <div className="toggle" onClick={() => setOpen()}>
                <HiOutlineDotsHorizontal />
            </div>
            {
                getDropdown(
                    <div className="tagMenuDropdown" ref={wrapperRef}>
                        {tags.map((tag, i) => <Link href={`/tag/${tag.name.toLowerCase()}`} className="item" key={i}>{tag.name}</Link>)}
                    </div>
                )
            }
        </>
    )
}

export default TagMenuDropdown