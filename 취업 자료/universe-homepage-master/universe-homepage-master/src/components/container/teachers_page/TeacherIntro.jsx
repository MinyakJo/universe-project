import React, { useEffect, useState } from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import commonDiv from "components/common/Div"
import H1 from "components/common/H1"
import P from "components/common/P"
import default_profile from "../../../svg/default_profile.svg"
import VideoList from "../../component/course_page/VideoList"
import Career from "../../component/course_page/Career"
import CourseStructureTitle from "../../component/passes_page/CourseStructureTitle"
import document from "../../../svg/document.svg"
import VideoGrid from "../../component/passes_page/VideoList"
import PageButtonBox from "../../component/PageButtonBox"
import LatestNews from "../../component/course_page/LatestNews"
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"
import { currentPageState, isMobileState } from "recoil/mainAtom"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { newsDataState } from "recoil/coursesAtom"
import { lecturePageState } from "recoil/teachersAtom"
import { fetch } from "modules/fetch"
import useRefetch from "hooks/useRefetch"

const Div = styled(commonDiv)`
    border-bottom: ${props => {
        return props.borderBottom ? `1px solid ${props.borderBottom}` : null
    }};

    overflow: ${({ overflow }) => {
        return overflow ? overflow : null
    }};
`

const TitleBox = styled(commonDiv)`
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`

const Img = styled.img`
    width: 100%;
    object-fit: contain;
`

const Span = styled.span`
    color: ${CommonStyle.setColor("orange")};
`

const TeacherIntro = () => {

    const { id } = useParams()
    const isMobile = useRecoilValue(isMobileState)
    
    const page = useRecoilValue(currentPageState)
    const resetPage = useResetRecoilState(currentPageState)

    const lecturePage = useRecoilValue(lecturePageState)
    const resetLecturePage = useResetRecoilState(lecturePageState)

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

    
    const [ videoGridData, setVideoGridData ] = useState([])

    const { data } = useQuery(
        [ "teacherDetailFetchData" ],
        async() => await fetch("GET", `/home/tutor/${ id }/detail`),
        { refetchOnWindowFocus: false }
    )

    const newsFetchData = useQuery(
        [ "teacherDetailNewsFetchData" ],
        async() => await fetch("GET", `/home/tutor/${ id }/news?page=${ page }`),
        { refetchOnWindowFocus: false }
    )

    const lectureData = useQuery(
        [ "teacherDetailLectureFetchData" ],
        async() => await fetch("GET", `/home/tutor/${ id }/lecture?page=${ lecturePage }`),
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

        if(lectureData.data?.data){
            const d = lectureData.data.data
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
                    rank: i?.rank,
                    num: i?.num
                })
            }

            setVideoGridData( list )
        }

        return () => {
            resetPage()
            resetLecturePage()
        }
    }, [ data, setNewsData, newsFetchData.data, resetPage, resetLecturePage, lectureData.data ])

    useRefetch({ refetch: newsFetchData.refetch, el: page })
    useRefetch({ refetch: lectureData.refetch, el: lecturePage })
    
    return(
        <Div flex="column">
            <Div paddingBottom={ !isMobile ? "21px" : "12px" } marginBottom={ !isMobile ? null : "12px" } borderBottom="orange">
                <H1 color="bk" weight="700" size={ !isMobile ? "large_medium" : "small_large" } lineHeight={ !isMobile ? "40px" : "26px" }>
                    강사소개 영상
                </H1>
            </Div>
            <TitleBox flex={ !isMobile ? "row" : "column" } backgroundColor="white" marginBottom="27px" radius={ !isMobile ? "0px 0px 10px 10px" : "10px" } padding={ !isMobile ? "24px 20px" : "16px 14px" } paddingRight="5px">
                <Div flex="row" width="fit-content" marginBottom={ !isMobile ? null : "15px" }>
                    <Div flex="row" width={ !isMobile ? "80px" : "48px" } height={ !isMobile ? "80px" : "48px" } marginRight={ !isMobile ? "20px" : "9px" } radius="50%" overflow="hidden">
                        {
                            fetchData?.profile && fetchData.profile ?
                            <Img src={ `${ process.env.REACT_APP_API_URL }${ fetchData.profile }` }/>:
                            <Img src={ default_profile }/>
                        }
                    </Div>
                    {
                        fetchData?.name && isMobile &&
                        <Div width="fit-content">
                            <P color="bk" weight="400" size="small_large">
                                <Span>{ fetchData.name }</Span>선생님
                            </P>
                        </Div>
                    }
                </Div>
                <Div width="fit-content">
                    <Div width="fit-content" marginBottom="3px">
                        <P color="bk" weight="700" lineHeight="150%" style={{ fontSize: !isMobile ? 23 : 18 }}>
                            “{ fetchData?.introduction && fetchData.introduction }”
                        </P>
                    </Div>
                    {
                        !isMobile &&
                        <Div flex="row" width="fit-content" paddingLeft="12px">
                            {
                                fetchData?.name &&
                                <Div width="fit-content">
                                    <P color="bk" weight="400" size="small_large">
                                        <Span>{ fetchData?.name && fetchData.name }</Span>선생님
                                    </P>
                                </Div>
                            }
                        </Div>
                    }
                </Div>
            </TitleBox>

            {/* 영상 */}
            <VideoList teacher>
                { fetchData?.videoData }
            </VideoList>

            {/* 약력 */}
            <Career>
                { careerData }
            </Career>

            {/* 개설 강좌 */}
            <Div flex="column" marginTop={ !isMobile ? "58px" : "40px" }>
                <CourseStructureTitle>
                    {{
                        img: document,
                        title: "개설 강좌"
                    }}
                </CourseStructureTitle>
                <Div marginTop="40px">
                    <VideoGrid>
                        { videoGridData }
                    </VideoGrid>
                </Div>

                <Div marginTop={ !isMobile ? "60px" : "40px" }>
                    <PageButtonBox lecture>
                        {{
                            pageCnt: lectureData.data?.data?.totalPage ? lectureData.data.data.totalPage : 1,
                            page: lecturePage
                        }}
                    </PageButtonBox>
                </Div>
            </Div>

            <LatestNews page={ page } pageCnt={ newsFetchData.data?.data?.totalPage }>
                { newsData }
            </LatestNews>
        </Div>
    )
}

export default TeacherIntro