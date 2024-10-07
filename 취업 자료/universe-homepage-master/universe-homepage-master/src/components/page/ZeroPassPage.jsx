import React, { useEffect } from "react"
import TopBar from "../container/TopBar"
import Footer from "../container/footer/Footer"
import { useSetRecoilState, useResetRecoilState, useRecoilValue, useRecoilState } from "recoil"
import { topBarSelectedState } from "../../recoil/topBarAtom"
import { Main } from "./MainPage"
import ZeroPassConfiguration from "../container/zero_pass_page/ZeroPassConfiguration"
import ZeroPassBenefit from "../container/zero_pass_page/ZeroPassBenefit"
import BigDataExperience from "../container/repeat_u_pass_page/BigDataExperience"
import FreeIteractiveSolution from "../container/repeat_u_pass_page/FreeIterativeSolution"
import ZeroPassRank from "../container/zero_pass_page/ZeroPassRank"
import FooterPass from "../container/footer/FooterPass"
import { isMobileState, promotionState } from "recoil/mainAtom"
import { useQuery } from "@tanstack/react-query"
import { fetch } from "modules/fetch"

const ZeroPassPage = () => {

    const setTopBar = useSetRecoilState(topBarSelectedState)
    const reset = useResetRecoilState(topBarSelectedState)

    const isMobile = useRecoilValue(isMobileState)

    const [ promotion, setPromotion ] = useRecoilState( promotionState )
    const resetPromotion = useResetRecoilState( promotionState )

     //query
     const promotionData = useQuery(
        [ "promotionFetchData" ],
        async() => await fetch( "GET", "/home/promotion/zero" ),
        { refetchOnWindowFocus: false }
    )
    
    useEffect(() => { 
        setTopBar("zeroPass") 

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

                {/* 0원패스 구성 */}
                <ZeroPassConfiguration/>

                {/* 0원패스 혜택 */}
                <ZeroPassBenefit/>

                {/* 반복 솔루션 */}
                <FreeIteractiveSolution backgroundColor="white"/>

                {/* 빅데이터 체험 */}
                <BigDataExperience/>

                {/* 랭킹 동기부여 */}
                <ZeroPassRank/>

            </Main>
           
            {
                promotion?.expose &&
                <FooterPass>
                    {{
                        text: "반복",
                        accent: "무제한 0원패스",
                        time: true,
                        count: 10,
                    }}
                </FooterPass>
            }
            <Footer/>
        </>
    )
}

export default ZeroPassPage