import React, { useEffect, useState } from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import TopBar from "components/container/TopBar"
import { Main } from "./MainPage"
import Footer from "components/container/footer/Footer"
import MainIntroText from "components/component/main_page/MainIntroText"
import PageButtonBox from "components/component/PageButtonBox"
import { useRecoilValue } from "recoil"
import { currentPageState, isMobileState } from "recoil/mainAtom"
import { useQuery } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import useRefetch from "hooks/useRefetch"
import RecruitList from "components/component/recruitings_page/RecruitList"

const Div = styled(commonDiv)`
    max-width: 1180px;
`

const RecruitingsPage = () => {

    const { data, refetch } = useQuery(
        [ "recruitingFetchData" ],
        async () => await fetch("GET", "/recruitment?page=1"),
        { refetchOnWindowFocus: false, }
    )

    const [ listData, setListData ] = useState([])
    const isMobile = useRecoilValue(isMobileState)
    const nowPage = useRecoilValue(currentPageState)

    useEffect(() => {
        if(data?.data){
            const list = []
            for(let i of data.data.recruitmentArray){
                list.push({ 
                    area: i.field, 
                    job: i.duty, 
                    startDate: i.startDate.split("T")[ 0 ].replace(/-/g, "."), 
                    endDate: i.endDate.split("T")[ 0 ].replace(/-/g, "."),  
                    inProgress: i.onGoing, 
                    id: i.id 
                })
            }
            setListData(list)
        }
    }, [ setListData, data ])

    useRefetch({ refetch: refetch, el: nowPage })

    return(
        <>
            {/* 상단바 */}
            <TopBar menu="orange"/>
            <Main>

                <Div flex="column_center" padding={ !isMobile ? "70px 0px" : "98px 20px" } paddingBottom={ !isMobile ? "100px" : null }>
                    <MainIntroText>
                        {{
                            top: {
                                text: "towards a bigger universe",
                                margin: "12px"
                            },
                            bottom: {
                                text: "유니버스반복 채용센터",
                                accent: "유니버스반복",
                                accentPosition: "start",
                                margin: "40px"
                            },
                            color: "black"
                        }}
                    </MainIntroText>
                    <RecruitList>
                        { listData }
                    </RecruitList>
                    <Div marginTop="60px">
                        <PageButtonBox>
                            {{
                                page: nowPage,
                                pageCnt: data?.data?.totalPage ? data.data.totalPage : 1
                            }}
                        </PageButtonBox>
                    </Div>
                </Div>

            </Main>
            <Footer/>
        </>
    )
}

export default RecruitingsPage