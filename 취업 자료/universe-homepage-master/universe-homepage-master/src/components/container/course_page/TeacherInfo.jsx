import React, { useEffect, useState } from "react"
import Div from "components/common/Div"
import Introduction from "../../component/course_page/Introduction"
import Career from "../../component/course_page/Career"
import LatestNews from "../../component/course_page/LatestNews"
import { newsDataState, teacherIdState } from "recoil/coursesAtom"
import { useRecoilState, useRecoilValue } from "recoil"
import { useQuery } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import { currentPageState } from "recoil/mainAtom"
import useRefetch from "hooks/useRefetch"

const TeacherInfo = () => {

    const id = useRecoilValue( teacherIdState )

    const page = useRecoilValue(currentPageState)

    const [ fetchData, setFetchData ] = useState({
        name: "",
        profile: "",
        introduction: "",
        videoData: []
    })

    const [ careerData, setCareerData ] = useState({
        book: "",
        career: ""
    })

    const [ newsData, setNewsData ] = useRecoilState(newsDataState)

    const { data } = useQuery(
        [ "courseTeacherFetchData" ],
        async() => await fetch("GET", `/home/tutor/${ id }/detail`),
        { refetchOnWindowFocus: false }
    )

    const newsFetchData = useQuery(
        [ "courseNewsFetchData" ],
        async() => await fetch("GET", `/home/tutor/${ id }/news?page=${ page }`),
        { refetchOnWindowFocus: false }
    )

    useEffect(() => {
        if(data?.data){
            const d = data.data
            const list = []

            for( let i of d.introArray ){
                list.push({
                    id: i.id,
                    title: i.title,
                    contents: i.description,
                    src: i.videoKey
                })
            }

            setFetchData({
                name: d.tutor.name,
                profile: d.tutor.profileImage,
                introduction: d.tutor.introduction,
                videoData: list
            })

            setCareerData({
                book: d.tutor.writtenBook,
                career: d.tutor.tutorProfile
            })
        }

        if(newsFetchData.data?.data){
            const d = newsFetchData.data.data
            const list = []

            for( let i of d.newsArray ){
                list.push({
                    title: i.title,
                    date: i.registrationDate.split("T")[ 0 ],
                    contents: i.contents,
                    id: i.id
                })
            }

            setNewsData( list )
        }
    }, [ data, setNewsData, newsFetchData.data ])

    useRefetch({ refetch: newsFetchData.refetch, element: page })

    return(
        <Div flex="column_top" marginTop="50px" marginBottom="60px">
            
            {/* 강사정보 */}
            <Introduction>
                { fetchData }
            </Introduction>

            {/* 약력 및 저서 */}
            <Career>
                { careerData }
            </Career>

            {/* 최신 소식 */}
            <LatestNews page={ page } totalPage={ newsFetchData.data?.data?.totalPage }>
                { newsData }
            </LatestNews>
        </Div>
    )
}

export default TeacherInfo