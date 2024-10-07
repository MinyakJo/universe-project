import React, { useState } from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import background from "../../../image/schoolarship_page/background_02.png"
import trophy from "../../../svg/trophy.svg"
import MainIntroText from "../../component/main_page/MainIntroText"
import Rank from "../../component/schoolarship_page/Rank"
import { useRecoilValue } from "recoil"
import { dateState, isMobileState, thisMonthFirstDaySelector } from "recoil/mainAtom"
import { useQuery } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import { useEffect } from "react"

const Div = styled(commonDiv)`
    padding: ${props => {
        return props.padding ? props.padding : null
    }};
`

const Img = styled.img`
    object-fit: contain;
    width: 100%;
`

const Ranking = () => {

    const isMobile = useRecoilValue(isMobileState)
    
    const [ data, setData ] = useState([
        { profile: null, name: "홍*동", monthMileage: "20", dayRepeat: "90", monthRepeat: "3000" },
        { profile: null, name: "김*혁", monthMileage: "20", dayRepeat: "90", monthRepeat: "3000" },
        { profile: null, name: "이*연", monthMileage: "20", dayRepeat: "90", monthRepeat: "3000" },
        { profile: null, name: "김*후", monthMileage: "20", dayRepeat: "90", monthRepeat: "3000" },
        { profile: null, name: "최*수", monthMileage: "20", dayRepeat: "90", monthRepeat: "3000" },
    ])
    
    const startDate = useRecoilValue(thisMonthFirstDaySelector)
    const endDate = useRecoilValue(dateState)

    // const rankingData = useQuery(
    //     [ "schoolarShipRankingFetchData" ],
    //     async () => await fetch(
    //         "GET", 
    //         `/mileage/rank?start=${ startDate.year }.${ startDate.month }.${ startDate.day }&end=${ endDate.year }.${ endDate.month }.${ endDate.day }&count=5`
    //     ),
    //     { refetchOnWindowFocus: false },
    // )

    // useEffect(() => {
    //     if(rankingData.data?.data){
    //         const list = []
    //         const d = rankingData.data.data
            
    //         for(let i of d.mileageArray){
    //             list.push({
    //                 id: i.userId,
    //                 name: i.userName,
    //                 profile: i.profileImage,
    //                 monthMileage: i.total,
    //                 dayRepeat: "0",
    //                 monthRepeat: "0"
    //             })
    //         }

    //         setData(list)
    //     }
    // }, [ setData, rankingData.data ])

    return(
        <Div flex="column_center" src={background} padding={ !isMobile ? "54px 0px" : "43px 20px" } paddingBottom={ !isMobile ? "75px" : "50px" }>
            <Div flex="row" width={ !isMobile ? "578px" : "173px" } marginBottom={ !isMobile ? null : "6px" }>
                <Img src={trophy}/>
            </Div>
            <MainIntroText>
                {{
                    top: {
                        text: "스스로 더 강하고 꾸준하게 만드는 학습법",
                        margin: !isMobile ? "11px" : "7px"
                    },
                    bottom: {
                        text: !isMobile ? "반복을 시작하는 순간 포기는 없습니다." : "반복을 시작하는 순간\n포기는 없습니다." ,
                        accent: "포기는 없습니다.",
                        accentPosition: "end",
                        margin: !isMobile ? "17px" : "22px"
                    },
                    color: "black"
                }}
            </MainIntroText>
            {/* 랭킹 */}
            <Div flex="column_center">
                {
                    data && data.map((e, i) =>
                        <Rank key={i} num={i + 1}>
                            {e}
                        </Rank>
                    )
                }
            </Div>
        </Div>
    )
}

export default Ranking