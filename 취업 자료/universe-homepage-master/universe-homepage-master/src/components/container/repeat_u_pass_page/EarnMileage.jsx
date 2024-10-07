import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import P from "components/common/P"
import MainIntroText from "../../component/main_page/MainIntroText"
import money_rain from "../../../svg/money_rain.svg"
import trophy from "../../../image/repeat_u_pass_page/trophy.png"
import default_profile from "../../../svg/default_profile.svg"
import money_rain_mobile from "../../../svg/money_rain_mobile.svg"
import trophy_mobile from "../../../svg/trophy_mobile.svg"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"

const Div = styled(commonDiv)`
    position: ${props => {
        return props.position ? props.position : null
    }};

    background: ${props =>{
        return props.background ? props.background : null
    }};

    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : null
    }};

    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};

    top: ${props => {
        return props.top ? props.top : null
    }};

    bottom: ${props => {
        return props.bottom ? props.bottom : null
    }};

    z-index: ${props => {
        return props.zIndex ? props.zIndex : null
    }};

    box-shadow: ${props =>{
        return props.shadow ? props.shadow : null
    }};

    right: ${props => {
        return props.right ? props.right : null
    }};

    left: ${props => {
        return props.left ? props.left : null
    }};

    justify-content: ${props => {
        return props.justify ? props.justify : null
    }};
`

const Img = styled.img`
    object-fit: contain;
    width: 100%;

    max-height: ${props => {
        return props.maxHeight ? props.maxHeight : null
    }};
`

const EarnMileage = () => {

    const isMobile = useRecoilValue(isMobileState)
    const mileageList = [
        { name: "홍*동", monthMileage: 20, dayRepeatAverage: 90, monthRepeatAverage: 3000, profile: default_profile },
        { name: "김*혁", monthMileage: 20, dayRepeatAverage: 90, monthRepeatAverage: 3000, profile: default_profile },
        { name: "이*연", monthMileage: 20, dayRepeatAverage: 90, monthRepeatAverage: 3000, profile: default_profile }
    ]

    return(
        <Div flex="column_center" position="relative" backgroundColor="sky_blue" src={ !isMobile ? trophy : null } height={ !isMobile ? "834px" : null } padding={ !isMobile ? "88px 0px" : "48px 20px" } paddingBottom="50px" justify="flex-start">
            <Div maxWidth="1180px" position="relative" top={ !isMobile ? "60px" : "136px" }>
                <Div position="absolute">
                    <Img src={ !isMobile ? money_rain : money_rain_mobile } maxHeight={ !isMobile ? "670px" : "315px" }/>
                </Div>
            </Div>
            <MainIntroText>
                {{
                    top: {
                        text: "스스로 더 강하고 꾸준하게 만들 수 있는 기회",
                        margin: !isMobile ? "22px" : "9px"
                    },
                    bottom: {
                        text: "반복 마일리지 쌓고\n장학금 받아가세요!",
                        margin: !isMobile ? "22px" : "11px"
                    },
                    color: "white"
                }}
            </MainIntroText>

            {
                isMobile &&
                <Div width="500px" marginBottom="8px">
                    <Img src={trophy_mobile}/>
                </Div>
            }
            
            <Div flex="column" position="relative" width={ !isMobile ? "100%" : null }>
                {
                    !isMobile ?
                    <Div position="absolute" flex="column_center" maxWidth="717px" top="84px" right="10%">
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
                                    {
                                        (i === mileageList.length - 1) &&
                                        <Div height="100%" position="absolute" left="0" bottom="0" background={"linear-gradient(360deg, #94A5F4 0%, rgba(148, 165, 244, 0) 100%)"}/>
                                    }
                                </Div>
                            )
                        }
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
                        <Div position="absolute" background="linear-gradient(360deg, #94A5F4 0%, rgba(148, 165, 244, 0) 100%)" height="70%" bottom="0"/>
                    </Div>
                }
            </Div>
        </Div>
    )
}

export default EarnMileage