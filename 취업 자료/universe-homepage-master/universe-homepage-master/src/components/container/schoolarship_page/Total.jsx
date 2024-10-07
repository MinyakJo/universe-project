import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import H1 from "components/common/H1"
import H2 from "components/common/H2"
import P from "components/common/P"
import money_rain from "../../../svg/money_rain_02.svg"
import money_rain_mobile from "../../../svg/money_rain_mobile_02.svg"
import check from "../../../svg/check.svg"
import orange_infinity from "../../../svg/orange_infinity.svg"
import background from "../../../image/schoolarship_page/background_01.png"
import pig_bank from "../../../svg/pig_bank.svg"
import coin_tower from "../../../svg/coin_tower.svg"
import bankroll from "../../../svg/bankroll.svg"
import flag from "../../../svg/flag_02.svg"
import mo_background from "../../../image/main_page/patent_mobile.png"
import SchoolarShipArticle from "../../component/main_page/SchoolarShipArticle"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import { useQuery } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import { useEffect } from "react"
import { useState } from "react"

const Div = styled(commonDiv)`

    position: ${props => {
        return props.position ? props.position : null
    }};

    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};

    flex-wrap: ${props => {
        return props.wrap ? props.wrap : null
    }};

    top: ${props => {
        return props.top ? props.top : null
    }};

    left: ${props => {
        return props.left ? props.left : null
    }};

    z-index: ${props => {
        return props.zIndex ? props.zIndex : null
    }};
`

const Img = styled.img`
    object-fit: contain;
    width: 100%;
`

const Total = () => {

    const isMobile = useRecoilValue(isMobileState)
    const [ data, setData ] = useState({
        totalMileage: "0",
        totalMoney: "0",
        monthSchoolarship: "0",
        nowTotalSchoolarship: "0",
        lastMonthSchoolarship: "0",
        nowTotalMoney: "0"
    })

    const articleList = [
        { img: bankroll, txt: { txt: "이번달 쌓인\n반복 장학금" }, backgroundColor: "orange", num: data.monthSchoolarship },
        { img: pig_bank, txt: { txt: "지금까지 누적된\n총 반복 장학금" }, num: data.nowTotalSchoolarship },
        { img: coin_tower, txt: { txt: "지난달 쌓인\n반복 장학금" }, num: data.lastMonthSchoolarship },
        { img: coin_tower, txt: { txt: "총 인출된\n반복 장학금" }, num: data.nowTotalMoney },
    ]
    
    const totalData = useQuery(
        [ "schoolarShipTotalFetchData" ],
        async () => await fetch("GET", `/mileage/amount/total-mileage`),
        { refetchOnWindowFocus: false }
    )
    const moneyData = useQuery(
        [ "schoolarShipMoneyFetchData" ],
        async () => await fetch("GET", `/mileage/amount/total-withdrawal`),
        { refetchOnWindowFocus: false }
    )
    const monthData = useQuery(
        [ "schoolarShipMonthFetchData" ],
        async () => await fetch( "GET", "/mileage/amount/thisMonth"),
        { refetchOnWindowFocus: false }
    )
    const lastMonthData = useQuery(
        [ "schoolarShipLastMonthFetchData" ],
        async () => await fetch( "GET", "/mileage/amount/lastMonth"
        ),
        { refetchOnWindowFocus: false }
    )

    useEffect(() => {
        const copyData = { ...data }
        
        if(totalData.data?.data) {
            copyData.totalMileage = totalData.data?.data?.mileage ? totalData.data.data.mileage : "0"
            copyData.nowTotalSchoolarship = totalData.data?.data?.mileage ? totalData.data.data.mileage : "0"
        }
        if(moneyData.data?.data) {
            copyData.totalMoney = moneyData.data?.data?.totalWithdrawal ? moneyData.data.data.totalWithdrawal : "0"
            copyData.nowTotalMoney = moneyData.data?.data?.totalWithdrawal ? moneyData.data.data.totalWithdrawal : "0"
        }
        if(monthData.data?.data) {
            copyData.monthSchoolarship = monthData.data?.data?.mileage ? monthData.data.data.mileage : "0"
        }
        if(lastMonthData.data?.data) {
            copyData.lastMonthSchoolarship = lastMonthData.data?.data?.totalMileage ? lastMonthData.data.data.totalMileage : "0"
        }

        setData(copyData)
    }, [ setData, totalData.data, moneyData.data, monthData.data, lastMonthData.data ])

    return(
        <>
            {/* total */}
            <Div flex="column_center" position="relative" backgroundColor="orange" padding={ !isMobile ? "82px 0px" : "128px 20px" } paddingBottom={ !isMobile ? "80px" : "63px" }>

                <Div position ="absolute" width={ !isMobile ? "1128px" : null } top={ !isMobile ? "105px" : "74px" }>
                    <Img src={ !isMobile ? money_rain : money_rain_mobile }/>
                </Div>

                {/* 타이틀 */}
                <Div flex="column_center">
                    <Div flex="row_center">
                        <H2 
                            color="white" 
                            family="esamanru" 
                            size={ !isMobile ? "large" : "medium_large" } 
                            lineHeight={ !isMobile ? "75px" : "36px" } 
                            weight="500"
                        >
                            영어를 반복할수록
                        </H2>
                    </Div>
                    <Div flex="row_center">
                        <H1 color="white" family="esamanru" lineHeight={ !isMobile ? "75px" : "55px" } weight="500" style={{ fontSize: !isMobile ? 60 : 37 }}>
                            반복 장학금이 쌓인다!
                        </H1>
                    </Div>
                </Div>
                {/* 문구 */}
                <Div 
                    flex="row_center" 
                    position="relative" 
                    width={ !isMobile ? "580px" : null } 
                    marginTop={ !isMobile ? "72px" : "80px" } 
                    backgroundColor="bk" 
                    radius="10px" 
                    padding={ !isMobile ? "15px 0px" : "13px 18px" }
                >
                    <Div position="absolute" width={ !isMobile ? "76px" : "68px" } height="60px" top="-60px" left="0px" style={{ overflow: "hidden" }}>
                        <Img src={ flag }/>
                    </Div>
                    <Div 
                        flex="row" 
                        width={ !isMobile ? "28px" : "24px" } 
                        minWidth={ !isMobile ? "28px" : "24px" } 
                        height={ !isMobile ? "28px" : "24px" } 
                        radius="50%" 
                        backgroundColor="orange" 
                        marginRight={ !isMobile ? "14px" : "11px" }
                    >
                        <Img src={ check }/>
                    </Div>
                    <Div flex="row" width="fit-conetent">
                        <P color="white" family="pretendard" lineHeight="34px" weight="500" size={ !isMobile ? "medium_small" : "small_medium" }>
                            패스 수강신청하고 장학금을 받아보세요!
                        </P>
                    </Div>
                </Div>
                {/* 장학금 */}
                <Div flex="column" marginTop="27px" width={ !isMobile ? "580px" : null }>
                    {/* 총 적립된 반복 마일리지 */}
                    <Div flex="column" padding={ !isMobile ? "33px 26px" : "18px" } backgroundColor="white" radius="10px">
                        <Div flex="row">
                            <Div 
                                flex="row" 
                                width={ !isMobile ? "34px" : "24px" } 
                                minWidth={ !isMobile ? "34px" : "24px" } 
                                height={ !isMobile ? "34px" : "24px" } 
                                marginRight={ !isMobile ? "14px" : "8px" }
                            >
                                <Img src={orange_infinity}/>
                            </Div>
                            <Div width="fit-content">
                                <H1 color="orange" size={ !isMobile ? "medium_large" : "small_medium" } weight="700" lineHeight="29px" family="pretendard">
                                    총 적립된 반복 마일리지
                                </H1>
                            </Div>
                        </Div>
                        <Div flex="row_end" marginTop="15px" paddingRight={ !isMobile ? "16px" : null }>
                            {
                                data.totalMileage &&
                                <P weight="800" lineHeight="40px" family="pretendard" style={{ fontSize: !isMobile ? 34 : 22 }}>
                                    { Number( data.totalMileage ).toLocaleString() }
                                </P>
                            }
                        </Div>
                    </Div>
                    {/* 총 인출된 현금 마일리지 */}
                    <Div flex="column" padding={ !isMobile ? "33px 26px" : "18px" } backgroundColor="white" radius="10px" marginTop={ !isMobile ? "30px" : "20px" }>
                        <Div flex="row">
                            <Div 
                                width={ !isMobile ? "34px" : "24px" } 
                                minWidth={ !isMobile ? "34px" : "24px" } 
                                height={ !isMobile ? "34px" : "24px" } 
                                marginRight={ !isMobile ? "14px" : "8px" }
                            >
                                <Img src={ orange_infinity }/>
                            </Div>
                            <Div width="fit-content">
                                <H1 color="orange" size={ !isMobile ? "medium_large" : "small_medium" } weight="700" lineHeight="29px" family="pretendard">
                                    총 인출된 현금 마일리지
                                </H1>
                            </Div>
                        </Div>
                        <Div flex="row_end" marginTop="15px" paddingRight={ !isMobile ? "16px" : null }>
                            {
                                data.totalMoney &&
                                <P weight="800" lineHeight="40px" family="pretendard" style={{ fontSize: !isMobile ? 34 : 22 }}>
                                    { Number( data.totalMoney ).toLocaleString() }
                                </P>
                            }
                        </Div>
                    </Div>
                </Div>
            </Div>

            {/* total article */}
            <Div src={ !isMobile ? background : mo_background } flex="column_center" padding={ !isMobile ? "95px 0px" : "50px 20px" } paddingBottom={ !isMobile ? "112px" : "46px" }>
                <Div flex={ !isMobile ? "row_between" : "row" } style={{ justifyContent: !isMobile ? null : "space-around" }} width={ !isMobile ? "620px" : null } wrap="wrap">
                    {
                        articleList && articleList.map((e, i) =>
                            <Div key={i} flex="row" width="fit-content" marginBottom={ !isMobile ? "30px" : "15px" }>
                                <SchoolarShipArticle num>
                                    { e }
                                </SchoolarShipArticle>
                            </Div>
                        )
                    }
                </Div>
                <Div flex="row_center" marginTop={ !isMobile ? null : "10px" }>
                    <P color="white" weight="500" family="pretendard" lineHeight="30px" style={{ fontSize: !isMobile ? 15 : 11 }}>
                        *쌓인 마일리지는 모두 현금인출 가능합니다.
                    </P>
                </Div>
            </Div>
        </>
    )
}

export default Total