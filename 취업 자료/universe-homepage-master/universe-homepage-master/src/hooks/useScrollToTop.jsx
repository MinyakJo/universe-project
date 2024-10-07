import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const useScrollToTop = ( useRef ) => {
    const { pathname } = useLocation()

    useEffect(() => {
        useRef.current.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    }, [ pathname, useRef ])
}

export default useScrollToTop