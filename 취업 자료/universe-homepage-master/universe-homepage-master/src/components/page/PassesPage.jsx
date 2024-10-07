import React, { Suspense, useEffect } from "react"
import styled from "styled-components"
import TopBar from "../container/TopBar"
import Footer from "../container/footer/Footer"
import { useSetRecoilState, useRecoilValue, useResetRecoilState } from "recoil"
import { topBarSelectedState } from "../../recoil/topBarAtom"
import { Main } from "./MainPage"
import commonDiv from "components/common/Div"
import MainIntroText from "components/component/main_page/MainIntroText"
import PassList from "../container/passes_page/PassList"
import { passIdState, passListState } from "recoil/passAtom"
import { currentPageState, isMobileState } from "recoil/mainAtom"
import Spinner from "components/component/Spinner"
import { typeButtonListState, typeSelectedState } from "recoil/tagAtom"

const Div = styled(commonDiv)`
    max-width: 1180px;
`

const CourseRegistrationPage = () => {

    const setTopBar = useSetRecoilState(topBarSelectedState)
    const resetBar = useResetRecoilState(topBarSelectedState)
    const resetPage = useResetRecoilState(passListState)
    const resetPageNum = useResetRecoilState(currentPageState)
    const resetBoolList = useResetRecoilState( typeSelectedState )
    const resetButtonList = useResetRecoilState( typeButtonListState )
    const isMobile = useRecoilValue(isMobileState)

    useEffect(() => { 
        setTopBar("courseRegistration")

        return () => {
            resetBar()
            resetPage()
            resetPageNum()
            resetBoolList()
            resetButtonList()
        }
    }, [ setTopBar, resetBar, resetPage, resetPageNum, resetBoolList, resetButtonList ])

    return(
        <>
            {/* 상단바 */}
            <TopBar menu="orange"/>
            <Main backgroundColor="gray1">

                {/* 제목 */}
                <Div paddingTop={ !isMobile ? "71px" : "98px" }>
                    <MainIntroText>
                        {{
                            top: {
                                text: "유니버스반복 패스를 만나보세요",
                                margin: !isMobile ? "12px" : "9px"
                            },
                            bottom: {
                                text: "수강신청",
                                margin: !isMobile ? "50px" : "30px"
                            },
                            color: "bk"
                        }}
                    </MainIntroText>
                </Div>
                
                <Suspense fallback={
                    <Div flex="row_center" marginBottom="50px">
                        <Spinner width="200px"/>
                    </Div>
                }>
                    <Div paddingTop="0px" padding={ !isMobile ? "110px 0px" : "50px 20px" }>
                        {/* 강의 */}
                        <PassList/>
                    </Div>
                </Suspense>


            </Main>
            {
                !isMobile &&
                <Footer/>
            }
        </>
    )
}

export default CourseRegistrationPage