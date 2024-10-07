import React, { useEffect, useState } from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import Book from "../../component/teaching_materials_page/Book"
import { useRecoilValue } from "recoil"
import { currentPageState, isMobileState } from "recoil/mainAtom"
import { useQuery } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import PageButtonBox from "components/component/PageButtonBox"
import useRefetch from "hooks/useRefetch"

const Div = styled(commonDiv)`
    flex-wrap: ${props => {
        return props.wrap ? props.wrap : null
    }};
`

const BookList = () => {

    const isMobile = useRecoilValue(isMobileState)

    const [ dataList, setDataList ] = useState([])

    const page = useRecoilValue(currentPageState)

    const { data, refetch } = useQuery(
        [ "textBookListFetchData" ],
        async () => await fetch("GET", `/textbook?page=${ page }`),
        { refetchOnWindowFocus: false }
    )

    useEffect(() => {
        if(data?.data){
            const d = data.data
            const list = []

            for(let i of d.bookArray){
                list.push({
                    id: i.id,
                    img: i.thumbnail,
                    name: i.bookName,
                    introduction: i.description,
                })
            }

            setDataList(list)
        }
    }, [ data, setDataList ])

    useRefetch({ refetch: refetch, el: page })

    return(
        <Div flex="row" wrap="wrap" marginBottom={ !isMobile ? "40px" : "50px" }>
            {
                dataList && dataList.map((e, i) =>
                    <Book 
                        key={i} 
                        marginRight={ 
                            !isMobile && (i === 0 || ((i + 1) % 3 !== 0 && i !== 0)) ?
                            "20px":
                            isMobile && (i % 2 === 0) ?
                            "15px":
                            null
                    }>
                        {e}
                    </Book>
                )
            }
            <PageButtonBox>
                {{
                    page: page,
                    pageCnt: data?.data?.totalPage ? data?.data.totalPage : 1
                }}
            </PageButtonBox>
        </Div>
    )
}

export default BookList