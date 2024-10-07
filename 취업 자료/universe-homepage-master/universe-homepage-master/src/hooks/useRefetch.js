import { useEffect } from "react"

const useRefetch = ({ refetch, el }) => {
    useEffect(() => {
        refetch()
    }, [ refetch, el ])
}

export default useRefetch