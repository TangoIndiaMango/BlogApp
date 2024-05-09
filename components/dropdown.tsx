

import { useEffect, useRef } from "react"

const useDropdown = (type:any) => {
    const wrapperRef = useRef<any>()

    const getDropdownElement = () => {
        return document.getElementById(`dropdownContainer${type}`)
    }

    const handleCloseClass = () => {
        return getDropdownElement()?.classList.contains("close")

    }

    const setOpen = () => {
        if (!handleCloseClass()) return
        getDropdownElement()?.classList.remove("close")
    }

    const setClose = () => {
        if (handleCloseClass()) return

        getDropdownElement()?.classList.add("close")

    }

    const handleOutsideClick = (event: any) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setClose()
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick)

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick)

        }
    }, [])




    const getDropdown = (children: React.ReactNode) => {
        return (
            <div className="dropdown close" id={`dropdownContainer${type}`}>
                {children}

            </div>
        )
    }

    return {
        getDropdown,
        wrapperRef,
        setOpen,
        setClose,
    }
}

export default useDropdown