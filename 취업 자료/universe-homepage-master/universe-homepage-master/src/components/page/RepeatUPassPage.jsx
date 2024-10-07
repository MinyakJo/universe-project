import React, { useEffect } from "react"
import TopBar from "../container/TopBar"
import Footer from "../container/footer/Footer"
import { useSetRecoilState, useResetRecoilState, useRecoilState } from "recoil"
import { topBarSelectedState } from "../../recoil/topBarAtom"
import { Main } from "./MainPage"
import PassRecommendations from "../container/repeat_u_pass_page/PassRecommendations"
import PassIntroduction from "../container/repeat_u_pass_page/PassIntroduction"
import PassSolution from "../container/repeat_u_pass_page/PassSolution"
import BigDataExperience from "../container/repeat_u_pass_page/BigDataExperience"
import FreeIteractiveSolution from "../container/repeat_u_pass_page/FreeIterativeSolution"
import EarnMileage from "../container/repeat_u_pass_page/EarnMileage"
import PriceAdvance from "../container/repeat_u_pass_page/PriceAdvance"
import Passes from "../container/repeat_u_pass_page/Passes"
import FooterPass from "../container/footer/FooterPass"
import { useQuery } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import { promotionState } from "recoil/mainAtom"

const RepeatUPasPage = () => {

    const setTopBar = useSetRecoilState(topBarSelectedState)
    const reset = useResetRecoilState(topBarSelectedState)

    const [ promotion, setPromotion ] = useRecoilState( promotionState )
    const resetPromotion = useResetRecoilState( promotionState )

    //query
    const promotionData = useQuery(
        [ "promotionFetchData" ],
        async() => await fetch( "GET", "/home/promotion/upass" ),
        { refetchOnWindowFocus: false }
    )

    useEffect(() => {
        setTopBar("repeatUPass")

        return () => {
            reset()
        }
    }, [ reset, setTopBar ])

    useEffect(() => {
        if( promotionData.data?.data ) setPromotion( promotionData.data.data.promotion )

        return () => resetPromotion()
    }, [ promotionData.data, setPromotion, resetPromotion ])

    return(
        <>
            {/* 상단바 */}
            <TopBar/>
            <Main>

                {/* U Pass 추천 */}
                <PassRecommendations/>

                {/* U Pass 소개 */}
                <PassIntroduction/>

                {/* U Pass 이유 */}
                <PassSolution/>

                {/* 빅데이터 체험 */}
                <BigDataExperience/>

                {/* 반복 솔루션 제공 */}
                <FreeIteractiveSolution/>

                {/* 마일리지 쌓고 장학금 */}
                <EarnMileage/>

                {/* 가격 인상 */}
                <PriceAdvance/>

                {/* U Pass */}
                <Passes/>

            </Main>
            {
                promotion?.expose &&
                <FooterPass>
                    {{
                        text: "유니버스",
                        accent: "U패스 통합 All Pack"
                    }}
                </FooterPass>
            }
            <Footer marginBottom="80px"/>
        </>
    )
}

export default RepeatUPasPage