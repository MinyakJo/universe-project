import React, { useEffect } from "react"
import styled from "styled-components"
import TopBar from "../container/TopBar"
import Footer from "../container/footer/Footer"
import commonDiv from "components/common/Div"
import { useSetRecoilState, useResetRecoilState, useRecoilValue } from "recoil"
import { topBarSelectedState } from "../../recoil/topBarAtom"
import { Main } from "./MainPage"
import { courseCurrentPageState } from "../../recoil/coursesAtom"
import TeacherIntro from "../container/teachers_page/TeacherIntro"
import { isMobileState } from "recoil/mainAtom"

const Div = styled(commonDiv)`
    max-width: 1180px;
`

const TeacherInfoPage = () => {

    const setTopBar = useSetRecoilState(topBarSelectedState)
    const resetBar = useResetRecoilState(topBarSelectedState)
    const resetPage = useResetRecoilState(courseCurrentPageState)
    const isMobile = useRecoilValue(isMobileState)

    useEffect(() => { 
        setTopBar("teachers")

        return () => {
            resetBar()
            resetPage()
        }
    }, [ resetBar, resetPage, setTopBar ])

    return(
        <>
            {/* 상단바 */}
            <TopBar menu="orange"/>
            <Main>
                <Div padding={ !isMobile ? "42px 0px" : "100px 20px" } paddingBottom="72px">
                   {/* 강사소개 */}
                   <TeacherIntro/>
                </Div>
            </Main>
            <Footer/>
        </>
    )
}

export default TeacherInfoPage