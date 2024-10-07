import React, { useEffect, useState } from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import commonDiv from "components/common/Div"
import document from "../../../svg/document.svg"
import { useRecoilState, useRecoilValue } from "recoil"
import { passDetailInfoState } from "../../../recoil/passAtom"
import CourseStructureTitle from "../../component/passes_page/CourseStructureTitle"
import VideoList from "../../component/passes_page/VideoList"
import PageButtonBox from "../../component/PageButtonBox"
import { currentPageState, isMobileState } from "recoil/mainAtom"
import { useQuery } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import { useParams } from "react-router-dom"
import useRefetch from "hooks/useRefetch"

const Div = styled(commonDiv)`
    border: ${props => {
        return props.border ? `1px solid ${CommonStyle.setColor("orange")}` : null
    }};
`

const PassStructure = () => {

    const { id } = useParams()
    
    const [ dataList, setDataList ] = useState([])

    const [ info, setInfo ] = useRecoilState(passDetailInfoState)

    const isMobile = useRecoilValue(isMobileState)

    const page = useRecoilValue(currentPageState)

    const { data, refetch } = useQuery(
        [ "courseStructureFetchData" ],
        async () => await fetch("GET", `/home/pass/${ id }/lecture?page=${ page }`),
        { refetchOnWindowFocus: false }
    )

    useEffect(() => {

        if(data?.data){
            const copyInfo = { ...info }
            const d = data.data
            const list = []

            for( let i of d.lectureArray ){
                list.push({
                    id: i.id,
                    img: i.thumbnail,
                    tag: i.lectureType.name,
                    views: `${ i.viewCount }`,
                    title: i.lectureName,
                    name: i.tutorName,
                    class: i.difficulty.name,
                    rank: i.star,
                    num: i.videoCount
                })
            }
            setDataList( list )

            copyInfo.num_courses = d.totalItem ? d.totalItem : 0
            setInfo( copyInfo ) 
        }
    }, [ data, setInfo ])

    useRefetch({ refetch: refetch, el: page })

    return(
        <Div flex="column_top" marginTop="50px" marginBottom="80px">

            {/* 강좌구성 타이틀 */}
            <CourseStructureTitle>
                {{
                    img: document,
                    title: "강좌구성",
                    color: !isMobile ? null : "black"
                }}
            </CourseStructureTitle>

            {/* 강좌구성 동영상 리스트 */}
            <Div marginTop={ !isMobile ? "40px" : "30px" }>
                <VideoList>
                    { dataList }
                </VideoList>
            </Div>

            {/* 페이지 */}
            <Div marginTop="38px">
                <PageButtonBox>
                    {{
                        pageCnt: data?.data?.totalPage ? data.data.totalPage : 1,
                        page: page
                    }}
                </PageButtonBox>
            </Div>
        </Div>
    )
}

export default PassStructure