import React, { useEffect } from "react"
import styled from "styled-components"
import TopBar from "../container/TopBar"
import Footer from "../container/footer/Footer"
import commonDiv from "components/common/Div"
import { useSetRecoilState, useResetRecoilState, useRecoilValue } from "recoil"
import { topBarSelectedState } from "../../recoil/topBarAtom"
import { Main } from "./MainPage"
import MainIntroText from "../component/main_page/MainIntroText"
import EventList from "../container/event_page/EventList"
import { currentPageState, isMobileState } from "recoil/mainAtom"

const Div = styled(commonDiv)`
    max-width: 1180px;
`

const EventPage = () => {

    const isMobile = useRecoilValue(isMobileState)
    const setTopBar = useSetRecoilState(topBarSelectedState)
    const reset = useResetRecoilState(topBarSelectedState)
    const resetPage = useResetRecoilState(currentPageState)

    useEffect(() => { 
        setTopBar("event")

        return () => {
            reset()
            resetPage()
        }
    }, [ reset, setTopBar, resetPage ])

    return(
        <>
            {/* 상단바 */}
            <TopBar menu="orange"/>
            <Main backgroundColor="gray1">
                <Div padding={ !isMobile ? "71px 0px" : "98px 20px" } paddingBottom={ !isMobile ? "88px" : null }>
                    <MainIntroText>
                        {{
                            top: {
                                text: "누구나 쉽게 참여하실 수 있습니다!",
                                margin: !isMobile ? "12px" : "9px"
                            },
                            bottom: {
                                text: "유니버스반복 이벤트",
                                margin: !isMobile ? "65px" : "22px",
                                accent: "유니버스반복",
                                accentPosition: "start"
                            },
                            color: "bk"
                        }}
                    </MainIntroText>
                    <EventList/>
                </Div>
            </Main>
            <Footer/>
        </>
    )
}

export default EventPage