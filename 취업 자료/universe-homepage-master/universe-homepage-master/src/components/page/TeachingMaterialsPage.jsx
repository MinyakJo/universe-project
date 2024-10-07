import React, { useEffect } from "react"
import styled from "styled-components"
import TopBar from "../container/TopBar"
import Footer from "../container/footer/Footer"
import commonDiv from "components/common/Div"
import { useSetRecoilState, useResetRecoilState, useRecoilValue } from "recoil"
import { topBarSelectedState } from "../../recoil/topBarAtom"
import { Main } from "./MainPage"
import MainIntroText from "../component/main_page/MainIntroText"
import BookList from "../container/teaching_materails_page/BookList"
import { currentPageState, isMobileState } from "recoil/mainAtom"

const Div = styled(commonDiv)`
    max-width: 1180px;
`

const TeachingMaterialsPage = () => {

    const setTopBar = useSetRecoilState(topBarSelectedState)
    const reset = useResetRecoilState(topBarSelectedState)
    const resetPage = useResetRecoilState(currentPageState)
    const isMobile = useRecoilValue(isMobileState)

    useEffect(() => { 
        setTopBar("textbook")

        return () => {
            reset()
            resetPage()
        }
    }, [ setTopBar, reset, resetPage ])

    return(
        <>
            {/* 상단바 */}
            <TopBar menu="orange"/>
            <Main backgroundColor="gray1">
                <Div flex="column_center" padding={ !isMobile ? "71px 0px" : "98px 20px" } paddingBottom="110px">
                    <MainIntroText>
                        {{
                            top: {
                                text: !isMobile ? "최고의 연구진이 만든 교재와 함께 학습하면 효과가 N배" : "최고의 연구진이 만든 교재와\n함께 학습하면 효과가 N배",
                                margin: !isMobile ? "12px" : "5px"
                            },
                            bottom: {
                                text: "실력의 차이를 경험해보세요",
                                accent: "실력의 차이",
                                accentPosition: "start",
                                margin: !isMobile ? "84px" : "43px"
                            },
                            color: "black"
                        }}
                    </MainIntroText>
                    <BookList/>
                </Div>
            </Main>
            <Footer/>
        </>
    )
}

export default TeachingMaterialsPage