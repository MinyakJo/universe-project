import React, { useEffect } from "react"
import styled from "styled-components"
import TopBar from "../container/TopBar"
import Footer from "../container/footer/Footer"
import { useSetRecoilState, useResetRecoilState, useRecoilValue } from "recoil"
import { topBarSelectedState } from "../../recoil/topBarAtom"
import { Main } from "./MainPage"
import commonDiv from "components/common/Div"
import Title from "components/container/event_page/Title"
import ButtonBox from "components/container/event_page/ButtonBox"
import { isMobileState } from "recoil/mainAtom"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import { useParams } from "react-router-dom"
import { Img } from "components/container/Dialog"
import useRefetch from "hooks/useRefetch"

const Div = styled(commonDiv)`
    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : "1180px"
    }};

    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};
`

const EventDiv = styled(commonDiv)`
    padding-top: ${props => {
        return props.isMobile ? "24px" : "40px"
    }};
    padding-bottom: ${props => {
        return props.isMobile ? "24px" : "38px"
    }};
`

export { Div, EventDiv }

const EventDetailPage = () => {

    const { id } = useParams()
    const isMobile = useRecoilValue(isMobileState)
    const setTopBar = useSetRecoilState(topBarSelectedState)
    const reset = useResetRecoilState(topBarSelectedState)

    const [ data, setData ] = useState({
        id: null,
        isEnd: false,
        title: "",
        startDate: "",
        endDate: "",
        prevId: null,
        nextId: null,
    })

    const eventData = useQuery(
        [ "eventDetailFetchData" ],
        async () => await fetch("GET", `/event/${ id }`),
        { refetchOnWindowFocus: false }
    )

    useEffect(() => { 
        setTopBar("event")

        if(eventData.data?.data){
            const d = eventData.data.data.event
            
            setData({
                id: d.id,
                isEnd: !d.onGoing,
                title: d.title,
                startDate: d.startDate,
                img: d.detailPage,
                endDate: d.endDate,
                nextId: eventData.data.data.next_id,
                prevId: eventData.data.data.previous_id,
            })
        }

        return () => {
            reset()
        }
    }, [ setTopBar, reset, setData, eventData.data ])

    useRefetch({ refetch: eventData.refetch, el: id })

    return(
        <>
            {/* 상단바 */}
            <TopBar menu="orange"/>
            <Main>
                <Div flex="column" paddingTop={ !isMobile ? "71px" : "98px" } paddingBottom={ !isMobile ? "75px" : "48px" }>
                    {/* 타이틀 */}
                    <Div padding={ !isMobile ? null : "0px 20px" }>
                        <Title event>
                            { data }
                        </Title>
                    </Div>
                    {/* 이벤트 상세페이지 */}
                    <EventDiv isMobile={ isMobile }>
                        <Div height={ data?.img ? null : "1074px" } backgroundColor={ data?.img ? null : "grey1" }>
                            {
                                data?.img &&
                                <Img src={ `${ process.env.REACT_APP_API_URL }${ data.img }` }/>
                            }
                        </Div>
                    </EventDiv>
                    {/* 버튼 */}
                    <Div padding={ !isMobile ? null : "0px 20px" }>
                        <ButtonBox refetch={ eventData.refetch } event>
                            { data }
                        </ButtonBox>
                    </Div>
                </Div>
            </Main>
            <Footer/>
        </>
    )
}

export default EventDetailPage