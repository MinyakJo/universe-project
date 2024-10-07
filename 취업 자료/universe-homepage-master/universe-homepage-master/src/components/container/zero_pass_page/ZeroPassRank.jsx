import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import MainIntroText from "components/component/main_page/MainIntroText"
import trophy_02 from "../../../svg/trophy_02.svg"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import default_profile from "../../../svg/default_profile.svg"
import P from "components/common/P"

const Div = styled(commonDiv)`
    position: ${props => {
        return props.position ? props.position : null
    }};

    z-index: ${props => {
        return props.zIndex ? props.zIndex : null
    }};

    top: ${props => {
        return props.top ? props.top : null
    }};

    left: ${props => {
        return props.left ? props.left : null
    }};

    bottom: ${props => {
        return props.bottom ? props.bottom : null
    }};

    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : null
    }};

    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};

    box-shadow: ${props => {
        return props.shadow ? props.shadow : null
    }};

    flex-wrap: ${props => {
        return props.wrap ? props.wrap : null
    }};

    background: ${props => {
        return props.background ? props.background : null
    }};
`

const Img = styled.img`
    object-fit: contain;
    width: 100%;
`

const ZeroPassRank = () => {

    const isMobile = useRecoilValue(isMobileState)
    const mileageList = [
        { name: "홍*동", monthMileage: 20, dayRepeatAverage: 90, monthRepeatAverage: 3000, profile: default_profile },
        { name: "김*혁", monthMileage: 20, dayRepeatAverage: 90, monthRepeatAverage: 3000, profile: default_profile },
        { name: "이*연", monthMileage: 20, dayRepeatAverage: 90, monthRepeatAverage: 3000, profile: default_profile }
    ]

    return(
        <Div 
            flex="column_top" 
            position="relative" 
            padding={ !isMobile ? "70px 0px" : "50px 20px" } 
            paddingTop={ !isMobile ? "88px" : "48px" } 
            height={ !isMobile ? "834px" : "736px" } 
            backgroundColor="orange" 
            style={{ alignItems: "center" }}
        >
            <MainIntroText>
                {{
                    top: {
                        text: "스스로 더 강하고 꾸준하게 만들 수 있는 기회",
                        margin: !isMobile ? "22px" : "9px"
                    },
                    bottom: {
                        text: "나의 랭킹을 확인하고\n동기부여 받으세요!",
                        margin: !isMobile ? "253px" : "160px"
                    },
                    color: "white"
                }}
            </MainIntroText>
            <Div maxWidth={ !isMobile ? "472px" : "268px" } position="absolute" top={ !isMobile ? "263px" : "148px" }>
                <Img src={trophy_02}/>
            </Div>
            <Div flex="column_center" position="relative" width={ !isMobile ? "100%" : null }>
                {
                    !isMobile ?
                    <Div position="absolute" flex="column_center" maxWidth="717px" top="0px">
                        {
                            mileageList && mileageList.map((e, i) =>
                                <Div key={i} 
                                    position="relative"
                                    flex="row_between" 
                                    paddingLeft="38px" 
                                    paddingRight="42px" 
                                    paddingTop="14px" 
                                    paddingBottom="19px" 
                                    marginBottom="8.5px" 
                                    marginTop="8.5px" 
                                    backgroundColor="white"
                                    radius="10px"
                                    shadow="0px 2px 8px rgba(0, 0, 0, 0.1)"
                                >
                                    <Div flex="row">
                                        <Div flex="row_center" width="30px" height="32px" marginRight="30px">
                                            <P color="black" weight="600" size="small_large">{i + 1}</P>
                                        </Div>
                                        <Div flex="row">
                                            <Div flex="row_center" minWidth="38px" maxWidth="38px" minHeight="36px" maxHeight="36px" marginRight="28px">
                                                <Img src={e.profile}/>
                                            </Div>
                                            <Div flex="row">
                                                <P weight="600" size="small">{e.name}</P>
                                            </Div>
                                        </Div>
                                    </Div>
                                    <Div flex="row_center" minWidth="400px">
                                        <P weight="400" size="extra_small" color="grey4">
                                            {
                                                `월 누적 마일리지 : ${e.monthMileage} / 일 평균 반복 : ${e.dayRepeatAverage}회 / 월 평균 반복 : ${e.monthRepeatAverage}회`
                                            }
                                        </P>
                                    </Div>
                                </Div>
                            )
                        }
                        <Div position="absolute" background="linear-gradient(360deg, #FF5C00 0%, rgba(255, 92, 0, 0) 100%)" height="70%" bottom="0"/>
                    </Div>:
                    <Div position="relative" flex="column_top">
                        {
                            mileageList && mileageList.map((e, i) =>
                                <Div key={i} flex="column" padding="16px" paddingTop="18px" backgroundColor="white" marginBottom="12px" radius="10px" shadow="0px 2px 8px rgba(0, 0, 0, 0.1)">
                                    <Div flex="row" marginBottom="16px">
                                        <Div flex="row_center" width="fit-content" height="25px" marginRight="16px">
                                            <P color="black" weight="600" size="small_large">{i + 1}</P>
                                        </Div>
                                        <Div flex="row">
                                            <Div flex="row_center" minWidth="32px" maxWidth="32px" minHeight="32px" maxHeight="32px" marginRight="14px">
                                                <Img src={e.profile}/>
                                            </Div>
                                            <Div flex="row">
                                                <P weight="600" size="small_medium">{e.name}</P>
                                            </Div>
                                        </Div>
                                    </Div>
                                    <Div flex="row">
                                        <P weight="400" size="extra_small" color="grey4">
                                            { `월 누적 마일리지 : ${e.monthMileage} / 일 평균 반복 : ${e.dayRepeatAverage}회` }
                                            <br/>
                                            { `/ 월 평균 반복 : ${e.monthRepeatAverage}회` }
                                        </P>
                                    </Div>
                                </Div>
                            )
                        }
                        <Div position="absolute" background="linear-gradient(360deg, #FF5C00 0%, rgba(255, 92, 0, 0) 100%)" height="70%" bottom="0"/>
                    </Div>
                }
            </Div>
        </Div>
    )
}

export default ZeroPassRank