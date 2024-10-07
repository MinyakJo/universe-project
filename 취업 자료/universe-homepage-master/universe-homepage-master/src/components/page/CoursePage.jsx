import React, { useEffect } from "react"
import styled from "styled-components"
import TopBar from "../container/TopBar"
import Footer from "../container/footer/Footer"
import commonDiv from "components/common/Div"
import { useSetRecoilState, useResetRecoilState, useRecoilValue, useRecoilState } from "recoil"
import { topBarSelectedState } from "../../recoil/topBarAtom"
import { Main } from "./MainPage"
import CourseInfo from "../container/course_page/CourseInfo"
import DetailButtons from "../component/passes_page/DetailButtons"
import { courseCurrentPageState, courseInfoState, courseRepresentativeState, roundInfoState, teacherIdState, textbookInfoState } from "../../recoil/coursesAtom"
import RoundInfo from "../container/course_page/RoundInfo"
import TeacherInfo from "../container/course_page/TeacherInfo"
import BookInfo from "../container/course_page/BookInfo"
import CourseReview from "../container/course_page/CourseReview"
import { isMobileState } from "recoil/mainAtom"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { fetch } from "modules/fetch"
import { dateFormat } from "modules/dateFormat"
import useRefetch from "hooks/useRefetch"

const Div = styled(commonDiv)`
    max-width: 1180px;
`

const CoursePage = () => {

    const { id } = useParams()

    const setTopBar = useSetRecoilState(topBarSelectedState)
    const resetBar = useResetRecoilState(topBarSelectedState)

    const currentPage = useRecoilValue(courseCurrentPageState)
    const resetPage = useResetRecoilState(courseCurrentPageState)

    const isMobile = useRecoilValue(isMobileState)

    const setCourseInfo = useSetRecoilState( courseInfoState )
    const resetCourseInfo = useResetRecoilState( courseInfoState )

    const [ roundInfo, setRoundInfo ] = useRecoilState( roundInfoState )
    const setRepresentative = useSetRecoilState( courseRepresentativeState )
    const resetRoundInfo = useResetRecoilState( roundInfoState )

    const setTeacherId = useSetRecoilState( teacherIdState )
    const resetTeacherId = useResetRecoilState( teacherIdState )

    const setTextbookInfo = useSetRecoilState( textbookInfoState )
    const resetTextbookInfo = useResetRecoilState( textbookInfoState )

    const videoList = useQuery(
        [ "courseVideoFetchData" ],
        async() => await fetch("GET", `/home/lecture/${ id }/video`),
        { refetchOnWindowFocus: false }
    )
    const { data, refetch } = useQuery(
        [ "courseFetchData" ],
        async () => await fetch("GET", `/lecture/list/${ id }`),
        { refetchOnWindowFocus: false }
    )

    useEffect(() => { 
        setTopBar("courseRegistration")

        return () => {
            resetBar()
            resetPage()
        }
    }, [ resetBar, resetPage, setTopBar ])

    useEffect(() => {
        if(data?.data){
            const d = data.data.lecture
            const t = data.data.textBook

            const list = []
            
            setCourseInfo({
                img: d.thumbnail,
                category: [ d.category.first.name, d.category.second.name, d.category.third.name ],
                title: d.lectureName,
                type: [ d.lectureType.name, d.difficulty.name, dateFormat( new Date( d.registrationDate ), "-" ) ],
                contents: d.description,
                name: d.tutorName,
                score: d.star,
                representiveVideo: d.representingVideo
            })

            setRoundInfo({
                ...roundInfo,
                ot: {
                    name: d.otTitle,
                    video: d.otVideo
                }
            })

            setTeacherId( d.tutorId )

            for( let i of t ){
                list.push({
                    img: i.thumbnail,
                    title: i.bookName,
                    contents: i.description,
                    id: i.id,
                    place: i.issuer,
                    date: dateFormat( new Date( i.issuedDate ), "-" ),
                    size: i.size,
                    page: i.pageCount
                })
            }
            setTextbookInfo( list )
        }

        return () => {
            resetCourseInfo()
            resetRoundInfo()
            resetTeacherId()
            resetTextbookInfo()
        }
    }, 
    [ 
        data, setCourseInfo, resetCourseInfo, 
        setRoundInfo, resetRoundInfo, setTeacherId, 
        resetTeacherId, setTextbookInfo, resetTextbookInfo, 
    ])

    useEffect(() => {
        if( videoList.data?.data ){

            const d = videoList.data.data.videoArray
            const list = []

            d.forEach(( e, i ) =>{
                list.push({
                    name: e.videoName,
                    id: e.id,
                    src: e.videoKey,
                    img: e.thumbnail,
                    representative: e.videoKey ? true : false
                })
                if( e.videoKey ) setRepresentative( i )
            })

            setRoundInfo({
                ...roundInfo,
                roundInfo: list
            })
        }
    }, [ videoList.data, setRepresentative, setRoundInfo ])

    useRefetch({ refetch, el: id })
    useRefetch({ refetch: videoList.refetch, el: id })

    return(
        <>
            {/* 상단바 */}
            <TopBar menu="orange"/>
            <Main>
                <Div paddingTop={ !isMobile ? null : "50px" } padding={ !isMobile ? null : "0px 20px" }>
                    {/* 강좌 정보 */}
                    <CourseInfo/>

                    {/* 강좌 정보 버튼들 */}
                    <DetailButtons course marginTop="77px">
                        {
                            [ 
                                { name: "회차정보", id: 0 },
                                { name: "강사정보", id: 1 },
                                { name: "교재정보", id: 2 },
                                { name: "수강평", id: 3 },
                            ]
                        }
                    </DetailButtons>

                    {/* 회차정보, 강사정보,  */}
                    {
                        currentPage === "0" ?
                        <RoundInfo/>:
                        currentPage === "1"?
                        <TeacherInfo/>:
                        currentPage === "2"?
                        <BookInfo/>:
                        currentPage === "3"?
                        <CourseReview/>:
                        <></>
                    }
                </Div>
            </Main>
            <Footer/>
        </>
    )
}

export default CoursePage