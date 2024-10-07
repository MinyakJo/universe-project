import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import commonP from "components/common/P"
import commonButton from "components/common/Button"
import CommonStyle from "components/style"
import MainIntroText from "components/component/main_page/MainIntroText"
import zero_pass_01 from "../../../image/zero_pass_page/zero_pass_01.png"
import zero_pass_mobile_01 from "../../../image/zero_pass_page/zero_pass_mobile_01.png"
import default_small_profile from "../../../svg/default_small_profile.svg"
import clock from "../../../svg/clock.svg"
import bookmark from "../../../svg/bookmark.svg"
import arrow from "../../../svg/long_arrow_right.svg"
import Pass from "../../component/repeat_u_pass_page/Pass"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"

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

    right: ${props => {
        return props.right ? props.right : null
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

    margin: ${props => {
        return props.margin ? props.margin : null 
    }};

    flex-wrap: ${props => {
        return props.wrap ? props.wrap : null
    }};
`

const Img = styled.img`
    object-fit: contain;
    width: 100%;
`

const P = styled(commonP)`
    white-space: nowrap;
`

const Line = styled.div`
    width: ${props => {
        return props.isMobile ? "calc(100% - 40px)" : "0px"
    }};
    height: ${props => {
        return props.isMobile ? "0px" : "100%"
    }};
    border-bottom: 1px solid ${CommonStyle.setColor("grey1")};
    margin-right: ${props => {
        return props.isMobile ? "0px" : "30px"
    }};
    margin-top: ${props => {
        return props.isMobile ? "17px" : null
    }};
    margin-bottom: ${props => {
        return props.isMobile ? "24px" : null
    }};
`

const FreeMark = styled.div`  
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${CommonStyle.setColor("orange")};
    position: absolute;
    top: 0;
    left: 0;
    width: fit-content;
    height: fit-content;
    padding: ${props => {
        return props.padding ? props.padding : null
    }};
    border-radius: 0px 0px 20px 0px;
`

const Button = styled(commonButton)`
    background: linear-gradient(116.86deg, #FF5C00 0%, #FFA959 104.7%);
    border-radius: 4px;
    font-weight: 700;
    font-size: ${CommonStyle.setFontSize("small_large")};
    line-height: 180%;
    color: white;
    height: 48px;
`

const ZeroPassConfiguration = () => {

    const isMobile = useRecoilValue(isMobileState)
    const passList = [ "반복 솔루션 실행", "무료 학습강좌", "나의 반복 랭킹", "AI 반복데이터 수집" ]
    const configList = [ "2022 수능특강", "2022 9월 모의고사", !isMobile ? "2022년 6월 모의고사" : "2022년 6월\n모의고사" , "10개년 수능기출" ]

    return(
        <Div>

            {/* 배경 이미지 */}

            <Div flex="row" height={ !isMobile ? null : "597px" }>
                <Img src={ !isMobile ? zero_pass_01 : zero_pass_mobile_01 }/>
            </Div>

            {/* pass */}

            <Div position="relative" flex="column_center" style={{ backgroundColor: "#141317" }} height={ !isMobile ? "134px" : "60px" }>
                <Div flex="row_center" position="absolute"  top="8px" padding={ !isMobile ? null : "0px 20px" }>
                    <Div flex={ !isMobile ? "row" : "column_center" } 
                        position="relative"
                        radius="8px" 
                        shadow="0px 2px 8px rgba(0, 0, 0, 0.1)" 
                        maxWidth="980px" 
                        height={ !isMobile ? "320px" : null } 
                        padding={ !isMobile ? "34px 30px" : "23px 0px" }
                        paddingBottom={ !isMobile ? null : "30px" }
                        backgroundColor="white"
                    >
                        <Div flex="row" position="absolute" maxWidth={ !isMobile ? "108px" : "90px" } zIndex="3" backgroundColor="none" left="-5px" top="13px">
                            <Div backgroundColor="none">
                                <Img src={bookmark}/>
                            </Div>
                            <Div flex="row_center" position="absolute" top="0" backgroundColor="none" height="100%" paddingTop="3px">
                                <P color="white" weight="700" size={ !isMobile ? "small_large" : "extra_small" } lineHeight="160%">마감임박!</P>
                            </Div>
                        </Div>
                        <Div flex={ !isMobile ? "row" : "column_center" } maxWidth="560px" minWidth={ !isMobile ? "560px" : null } height="100%" radius="8px">
                            <Pass height={ !isMobile ? "252px" : "164px" }>
                                {{
                                    passName: "0원패스",
                                    title: "수능 기출문제 한번에 해결!",
                                    passList: passList
                                }}
                            </Pass>
                        </Div>
                        <Line isMobile={isMobile}/>
                        <Div flex="column_between" marginRight="8px" height="100%" padding={ !isMobile ? null : "0px 20px" }>
                            <Div>
                                <Div flex="row_center" marginBottom={ !isMobile ? "30px" : "28px" }>
                                    <Div flex="row_center" padding="2px 10px" width="fit-content" backgroundColor="gray1" radius="4px" marginRight={ !isMobile ? "8px" : "4px" } height="33px">
                                        <Div flex="row" minWidth="16px" maxWidth="16px" height="16px" radius="50%" backgroundColor="orange">
                                            <Img src={clock}/>
                                        </Div>
                                        <Div flex="row" backgroundColor="none" marginLeft={ !isMobile ? "8px" : "6px" }>
                                            <P size={ !isMobile ? "extra_small" : null } style={{ fontSize: !isMobile ? null : 13 }} weight="600" color="grey4" lineHeight="210%">
                                                수강기간 : 무제한
                                            </P>
                                        </Div>
                                    </Div>
                                    <Div flex="row_center" padding="2px 10px" width="fit-content"  backgroundColor="gray1" radius="4px">
                                        <Div flex="row" minWidth="16px" maxWidth="16px" height="16px" radius="50%" backgroundColor="orange">
                                            <Img src={default_small_profile}/>
                                        </Div>
                                        <Div flex="row" backgroundColor="none" marginLeft={ !isMobile ? "8px" : "6px" }>
                                            <P size={ !isMobile ? "extra_small" : null } style={{ fontSize: !isMobile ? null : 13 }} weight="600" color="grey4" lineHeight="210%">
                                                수강대상 : 모든 수강생
                                            </P>
                                        </Div>
                                    </Div>
                                </Div>
                                <Div flex="column" marginBottom={ !isMobile ? null : "16px" }>
                                    <Div flex="row_between">
                                        <Div flex="row">
                                            <P color="bk" size={ !isMobile ? "small_large" : "small_medium" } weight="600" lineHeight="210%">
                                                정가
                                            </P>
                                        </Div>
                                        <Div position="relative" flex="row_end">
                                            <Div position="absolute" backgroundColor="none" marginTop={ !isMobile ? "4px" : null } paddingLeft="33%">
                                                <Img src={arrow}/>
                                            </Div>
                                            <P size={ !isMobile ? "medium" : "medium_small" } weight="600" lineHeight="210%">
                                                200,000원
                                            </P>
                                        </Div>
                                    </Div>
                                    <Div flex="row_between">
                                        <Div flex="row">
                                            <P color="bk" size={ !isMobile ? "medium_small" : "small_large" } weight="700" lineHeight="210%">
                                                판매가 Total
                                            </P>
                                        </Div>
                                        <Div flex="row" width="fit-content">
                                            <Div marginRight={ !isMobile ? "7px" : "4px" }>
                                                <P color="orange" weight="700" lineHeight="42px" style={{ fontSize: !isMobile ? 34 : 32 }}>
                                                    0
                                                </P>
                                            </Div>
                                            <P weight="500" size={ !isMobile ? "medium" : "medium_small" } lineHeight="42px">
                                                원
                                            </P>
                                        </Div>
                                    </Div>
                                </Div>
                            </Div>
                            <Div>
                                <Button>
                                    수강신청
                                </Button>
                            </Div>
                        </Div>
                    </Div>
                </Div>
            </Div>

            {/* 0원 패스구성 */}

            <Div paddingTop={ !isMobile ? "255px" : "704px" } padding={ !isMobile ? "92px 0px" : "40px 16px" }>
                <MainIntroText>
                    {{
                        top: {
                            text: "고3, 고2, 고1 별 수능 기출 특강",
                            margin: !isMobile ? "11px" : "9px"
                        },
                        bottom: {
                            text: "파격적인 0원패스 구성",
                            margin: !isMobile ? "46px" : "22px"
                        }
                    }}
                </MainIntroText>
                <Div flex="row_center" wrap={ !isMobile ? null : "wrap" }>
                    {
                        configList && configList.map((e, i) =>
                            <Div 
                                key={i} 
                                flex="column_center" 
                                position="relative" 
                                maxWidth={ !isMobile ? "280px" : "163px" } 
                                marginRight={ !isMobile ? "10px" : "4px" } 
                                marginLeft={ !isMobile ? "10px" : "4px" } 
                                backgroundColor="bk" 
                                radius="10px" 
                                height={ !isMobile ? "152px" : "88px" }
                                marginBottom={ !isMobile ? null : "10px" }
                            >
                                <FreeMark padding={ !isMobile ? "9px 17px" : "9px 10px" }>
                                    <P size={ !isMobile ? "medium_small" : null } style={{ fontSize: !isMobile ? null : 12 }} family="esamanru" color="white" lineHeight="120%" weight="300">
                                        Free
                                    </P>
                                </FreeMark>
                                <Div flex="row_center" backgroundColor="none" marginTop="22px">
                                    <P size={ !isMobile ? "medium_small" : "small_medium" } family="esamanru" color="white" lineHeight="120%" weight="300" style={{ whiteSpace: "pre-line", textAlign: "center" }}>
                                        {e}
                                    </P>
                                </Div>
                            </Div>
                        )
                    }
                </Div>
            </Div>
        </Div>
    )
}

export default ZeroPassConfiguration