import React, { useEffect, useState } from "react"
import TopBar from "../container/TopBar"
import Footer from "../container/footer/Footer"
import { Main } from "./MainPage"
import { Div, EventDiv } from "./EventDetailPage"
import Title from "components/container/event_page/Title"
import ButtonBox from "components/container/event_page/ButtonBox"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import { Img } from "components/container/Dialog"
import useRefetch from "hooks/useRefetch"

const RecruitingsDetailPage = () => {

    const { id } = useParams()
    
    const { data, refetch } = useQuery(
        [ "recruitingDetailFetchData" ],
        async () => await fetch("GET", `/recruitment/${ id }`),
        { refetchOnWindowFocus: false, }
    )

    const [ detailData, setDetailData ] = useState({
        id: "",
        area: "",
        title: "",
        image: null,
        startDate: "",
        endDate: "",
        prevId: null,
        nextId: null,
        inProgress: false
    })
    const isMobile = useRecoilValue(isMobileState)

    useEffect(() => {
        if(data?.data){
            const d = data.data.recruitment
            
            setDetailData({
                id: d.id,
                area: d.field,
                title: d.duty,
                image: d.recrumentContents,
                startDate: d.startDate,
                endDate: d.endDate,
                prevId: data.data.nextId,
                nextId: data.data.previousId,
                inProgress: d.onGoing
            })
        }
    }, [ setDetailData, data ])

    useRefetch({ refetch, el: id })
    
    return(
        <>
            {/* 상단바 */}
            <TopBar menu="orange"/>
            <Main>
                <Div flex="column" paddingTop={ !isMobile ? "71px" : "98px" } paddingBottom="75px">
                    {/* 타이틀 */}
                    <Div padding={ !isMobile ? null : "0px 20px" }>
                        <Title recruit>
                            { detailData }
                        </Title>
                    </Div>
                    {/* 채용 상세페이지 */}
                    <EventDiv isMobile={ isMobile }>
                        <Div height={ detailData.image ? null : "1074px" } backgroundColor={ detailData.image ? null : "grey1" }>
                            {
                                detailData?.image &&
                                <Img src={ `${ process.env.REACT_APP_API_URL }${ detailData?.image }` }/>
                            }
                        </Div>
                    </EventDiv>
                    {/* 버튼 */}
                    <Div padding={ !isMobile ? null : "0px 20px" }>
                        <ButtonBox recruit>
                            { detailData }
                        </ButtonBox>
                    </Div>
                </Div>
            </Main>
            <Footer/>
        </>
    )
}

export default RecruitingsDetailPage