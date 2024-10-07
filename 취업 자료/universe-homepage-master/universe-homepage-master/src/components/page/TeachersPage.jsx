import React, { useEffect } from "react"
import styled from "styled-components"
import TopBar from "../container/TopBar"
import Footer from "../container/footer/Footer"
import commonDiv from "components/common/Div"
import { useSetRecoilState, useResetRecoilState, useRecoilValue } from "recoil"
import { topBarSelectedState } from "../../recoil/topBarAtom"
import { Main } from "./MainPage"
import { courseCurrentPageState } from "../../recoil/coursesAtom"
import TeacherList from "../container/teachers_page/TearcherList"
import MainIntroText from "../component/main_page/MainIntroText"
import { isMobileState } from "recoil/mainAtom"
import { selectedIdState, typeButtonListState, typeSelectedState } from "recoil/tagAtom"

const Div = styled(commonDiv)`
    max-width: 1180px;
`

const TeachersPage = () => {
    const isMobile = useRecoilValue(isMobileState)
    const setTopBar = useSetRecoilState(topBarSelectedState)
    const resetBar = useResetRecoilState(topBarSelectedState)
    const resetPage = useResetRecoilState(courseCurrentPageState) 
    const resetBoolList = useResetRecoilState( typeSelectedState )
    const resetButtonList = useResetRecoilState( typeButtonListState )
    const resetSelectId = useResetRecoilState( selectedIdState )

    useEffect(() => { 
        setTopBar("teachers")

        return () => {
            resetBar()
            resetPage()
            resetBoolList()
            resetButtonList()
            resetSelectId()
        }
    }, [ resetPage, resetBar, setTopBar, resetBoolList, resetButtonList, resetSelectId ])

    return(
        <>
            {/* 상단바 */}
            <TopBar menu="orange"/>
            <Main backgroundColor="gray1">
                <Div padding={ !isMobile ? "71px 0px" : "98px 20px" } paddingBottom="110px">
                    <MainIntroText>
                        {{
                            top: {
                                text: "영어 실력향상의 꿈을 이뤄드립니다.",
                                margin: !isMobile ? "12px" : "10px"
                            },
                            bottom: {
                                text: "유니버스반복 강사",
                                margin: !isMobile ? "50px" : "30px"
                            },
                            color: "bk"
                        }}
                    </MainIntroText>
                    <TeacherList/>
                </Div>
            </Main>
            <Footer/>
        </>
    )
}

export default TeachersPage