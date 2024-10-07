import React, { useEffect } from "react"
import styled from "styled-components"
import TopBar from "../container/TopBar"
import Footer from "../container/footer/Footer"
import commonDiv from "components/common/Div"
import { useSetRecoilState, useResetRecoilState, useRecoilValue } from "recoil"
import { topBarSelectedState } from "../../recoil/topBarAtom"
import { Main } from "./MainPage"
import MainIntroText from "../component/main_page/MainIntroText"
import background from "../../image/review_page/background_01.png"
import slideNext from "../../svg/slideNext.svg"
import slideBack from "../../svg/slideBack.svg"
import ReviewScore from "../container/review_page/ReviewScore"
import ReviewList from "../container/review_page/ReviewList"
import { currentPageState, isMobileState } from "recoil/mainAtom"
import { selectedIdState, typeButtonListState, typeSelectedState } from "recoil/tagAtom"
import ReviewSlide from "components/container/review_page/ReviewSlide"

const Div = styled(commonDiv)`
    max-width: 1180px;
    position: ${props => {
        return props.position ? props.position : null
    }};
`

const Background = styled(commonDiv)`
    max-width: 1920px;
`

const ReviewPage = () => {

    const isMobile = useRecoilValue(isMobileState)
    
    const setTopBar = useSetRecoilState( topBarSelectedState )
    const reset = useResetRecoilState( topBarSelectedState )
    const resetButton = useResetRecoilState( typeButtonListState )
    const resetBoolList = useResetRecoilState( typeSelectedState )
    const resetSelectId = useResetRecoilState( selectedIdState )

    const resetPage = useResetRecoilState(currentPageState)

    const nextBtn = {
        img: slideNext,
        backgroundColor: "orange"
    }
    
    const backBtn = {
        img: slideBack,
        backgroundColor: "grey1"
    }

    const btnStyle = {
        width: !isMobile ? "40px" : "24px",
        height: !isMobile ? "40px" : "24px",
        distance: !isMobile ? "-50px" : "20px",
        radius: "50%",
        top: !isMobile ? null : "-32px"
    }

    useEffect(() => { 
        setTopBar("courseReview")

        return () => {
            reset()
            resetPage()
            resetButton()
            resetBoolList()
            resetSelectId()
        }
    }, [ setTopBar, reset, resetPage, resetButton, resetBoolList, resetSelectId ])

    return(
        <>
            {/* 상단바 */}
            <TopBar menu="orange"/>
            <Main>

                {/* 리뷰 슬라이드 */}
                <Background 
                    flex="column_center"
                    padding={ !isMobile ? "71px 0px" : "98px 20px" } 
                    paddingBottom={ !isMobile ? "65px" : "50px" }
                    src={ background }
                >
                    <MainIntroText>
                        {{
                            top: {
                                text: "실제 수강생들의 유니버스반복 수강후기",
                                margin: !isMobile ? "12px" : "9px"
                            },
                            bottom: {
                                text: "BEST 수강후기",
                                accent: "BEST",
                                accentPosition: "start",
                                margin: !isMobile ? "37px" : null
                            },
                            color: "white"
                        }}
                    </MainIntroText>
                    <Div flex="row_center" position="relative">
                        <ReviewSlide width={ !isMobile ? "1180px" : "100%" }>
                            {{
                                next: nextBtn,
                                back: backBtn,
                                btnStyle: btnStyle
                            }}
                        </ReviewSlide>
                    </Div>
                </Background>
                
                <Background flex="row_center" backgroundColor="light_blue" paddingTop={ !isMobile ? "68px" : "42px" } paddingBottom={ !isMobile ? "68px" : "26px" }>
                    {/* 총 평점 */}
                    <ReviewScore/>
                </Background>
                {/* 리뷰 */}
                <Div flex="column_center" paddingTop={ !isMobile ? "60px" : "30px" } padding={ !isMobile ? null : "0px 20px" }>
                    <ReviewList/>
                </Div>
            </Main>
            <Footer/>
        </>
    )
}

export default ReviewPage