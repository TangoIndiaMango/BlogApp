"use client"

import { useRouter } from "next/navigation"
import {IoChevronBackOutline} from "react-icons/io5"

const BackArrow = () => {

    const router = useRouter()

    const handleGoBack = () => {
        router.back()
    }

    return (
        <div className="backArrow" onClick={handleGoBack}>
            <IoChevronBackOutline />
        </div>
    )
}

export default BackArrow