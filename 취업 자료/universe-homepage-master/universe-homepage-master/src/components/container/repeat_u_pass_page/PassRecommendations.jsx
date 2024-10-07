import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import P from "components/common/P"
import CommonStyle from "components/style"
import MainIntroText from "../../component/main_page/MainIntroText"
import repeat_u_pass_01 from "../../../image/repeat_u_pass_page/repeat_u_pass_01.png"
import repeat_u_pass_02 from "../../../image/repeat_u_pass_page/repeat_u_pass_02.png"
import background from "../../../image/main_page/main_page_01.png"
import UnderLine from "../../component/main_page/UnderLine"
import orange_check from "../../../svg/orange_check.svg"
import right_vector from "../../../svg/right_vector.svg"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import repeat_u_pass_mobile_01 from "../../../image/repeat_u_pass_page/repeat_u_pass_mobile_01.png"
import repeat_u_pass_mobile_02 from "../../../image/repeat_u_pass_page/repeat_u_pass_mobile_02.png"

const Div = styled(commonDiv)`
    background-color: ${props => {
        return props.backgroundColor ? `${CommonStyle.setColor(props.backgroundColor)}` : "transparent"
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

    z-index: ${props => {
        return props.zIndex ? props.zIndex : null
    }};

    aspect-ratio: ${props => {
        return props.ratio ? props.ratio : null
    }};
`

const Img = styled.img`
    object-fit: ${props => {
        return props.fit ? props.fit : "contain"
    }};
    width: 100%;
    height: ${props => {
        return props.height ? props.height : null
    }};
`

const RecommendP = styled(P)`
    font-weight: 600;
    line-height: 160%;
    color: ${CommonStyle.setColor("bk")};
    white-space: pre-line;
`

const Span = styled.span`
    position: relative;
    color: ${props => {
        return props.color ? props.color : null
    }};
`

const PassRecommendations = () => {

    const isMobile = useRecoilValue(isMobileState)

    const recommendationList = [ 
        { txt: !isMobile ? "VOD 시청과 1타 학습 솔루션을 융합해 나만의 고득점 비법" : "VOD 시청과 1타 학습 솔루션을 융합해\n나만의 고득점 비법" , accent: "1타 학습 솔루션을 융합해", accentPosition: "center" },
        { txt: "1타 선생님의 적중 스킬이 내 모니터로 공유", accent: "1타 선생님의 적중 스킬", accentPosition: "start" },
        { txt: "자동 반복 시스템으로 매일 100 회독하기", accent: "자동 반복 시스템으로", accentPosition: "start" },
    ]

    const mileageList = [
        { txt: !isMobile ? "U패스 수강신청" : "U패스\n수강신청" , accent: "U패스" },
        { txt: !isMobile ? "현금 마일리지 적립" : "현금\n마일리지 적립" , accent: "현금" },
        { txt: "현금 출금", accent: "현금 출금" }
    ]

    return(
        <Div>
            <Div height={ !isMobile ? null : "667px" }>
                <Img src={ !isMobile ? repeat_u_pass_01 : repeat_u_pass_mobile_01 } fit={ !isMobile ? null : "cover" } height={ !isMobile ? null : "100%" }/>
            </Div>
            <Div flex="column_center" paddingTop={ !isMobile ? "80px" : "48px" } paddingBottom={ !isMobile ? "83px" : "50px" } padding={ !isMobile ? null : "0px 20px" } src={background}>
                <MainIntroText>
                    {{
                        top: {
                            text: "2022 유니버스반복 패스",
                            margin: !isMobile ? "14px" : "9px",
                        },
                        bottom: {
                            text: "이런분들께 U패스를 추천드려요",
                            margin: !isMobile ? "30px" : "23px",
                            accent: "U패스",
                            accentPosition: "center",
                            whiteSpace: !isMobile ? null : "nowrap"
                        },
                        color: "dark_purple"
                    }}
                </MainIntroText>
                <Div flex="column_center" maxWidth="780px">
                    {
                        recommendationList && recommendationList.map((e, i) =>
                            <Div key={i} flex={ !isMobile ? "row_center" : "row" } height="67px" padding="0px 26px" backgroundColor="white" radius="60px" marginBottom="24px">
                                <Div width={ !isMobile ? "28px" : "24px" } height={ !isMobile ? "28px" : "24px" } marginRight="13px">
                                    <Img src={orange_check}/>
                                </Div>
                                <Div width="fit-content">
                                    {
                                        e.accentPosition === "start"?
                                        <RecommendP size={ !isMobile ? "small_large" : "extra_small" }>
                                            <Span>{e.accent}<UnderLine/></Span>
                                            {e.txt.split(e.accent)[1]}
                                        </RecommendP>:
                                        e.accentPosition === "center"?
                                        <RecommendP size={ !isMobile ? "small_large" : "extra_small" }>
                                            {e.txt.split(e.accent)[0]}
                                            <Span>{e.accent}<UnderLine/></Span>
                                            {e.txt.split(e.accent)[1]}
                                        </RecommendP>:
                                        <RecommendP size={ !isMobile ? "small_large" : "extra_small" }>
                                            {e.txt.split(e.accent)[0]}
                                            <Span>{e.accent}<UnderLine/></Span>
                                        </RecommendP>
                                    }
                                </Div>
                            </Div>
                        )
                    }
                </Div>
            </Div>
            <Div flex="column_center" paddingTop={ !isMobile ? "75px" : null } paddingBottom={ !isMobile ? "87px" : null } padding={ !isMobile ? null : "50px 13px" } src={ !isMobile ? repeat_u_pass_02 : repeat_u_pass_mobile_02 }>
                <Div maxWidth="780px">
                    <Div>
                        <MainIntroText>
                            {{
                                top: {
                                    text: "U패스 수강신청 시 현금 마일리지 무조건 적립",
                                    margin: !isMobile ? "11px" : "9px"
                                },
                                bottom: {
                                    text: !isMobile ? "수강신청하고 현금 마일리지 받자!" : "수강신청하고\n현금 마일리지 받자!" ,
                                    margin: !isMobile ? "36px" : "23px",
                                    accent: "현금 마일리지 받자!",
                                    accentPosition: "end"
                                },
                                color: "white"
                            }}
                        </MainIntroText>
                    </Div>
                    <Div flex={ !isMobile ? "row_center" : "row_between" }>
                        {
                            mileageList && mileageList.map((e, i) =>
                                <Div key={i} flex="row_between">
                                    <Div 
                                        flex="column_center" 
                                        radius="50%" 
                                        backgroundColor="white" 
                                        maxWidth={ !isMobile ? "206px" : null } 
                                        minWidth={ !isMobile ? null : "103px" } 
                                        padding="11px" 
                                        paddingTop="12px" 
                                        ratio="1/1"
                                        marginRight={ !isMobile ? null : "7px" }
                                        marginLeft={ !isMobile ? null : "7px" }
                                    >
                                        <Div flex="row_center">
                                            <Div flex="row_center" width={ !isMobile ? "42px" : "20px" } ratio="1/1" backgroundColor="purple" radius="50%" marginBottom={ !isMobile ? "10px" : "6px" }>
                                                <P size={ !isMobile ? "medium_small" : null } style={{ fontSize: !isMobile ? null : 12 }} color="white" family="esamanru">
                                                    {i + 1}
                                                </P>
                                            </Div>
                                        </Div>
                                        <Div flex="row_center" height={ !isMobile ? null : "40px" }>
                                            <P size={ !isMobile ? "medium_small" : "extra_small" } color="dark_purple" family="esamanru" style={{ whiteSpace: "pre-line", textAlign: "center" }}>
                                                <Span color="purple">
                                                    {e.accent}
                                                </Span>
                                                {e.txt.split(e.accent)[1]}
                                            </P>
                                        </Div>
                                    </Div>
                                    {
                                        i + 1 !== mileageList.length && !isMobile &&
                                        <Div flex="row_center" width="78px">
                                            <Div flex="row_center" maxWidth="6px">
                                                <Img src={right_vector}/>
                                            </Div>
                                        </Div>
                                    }
                                </Div>
                            )
                        }
                    </Div>
                </Div>
            </Div>
        </Div>
    )
}

export default PassRecommendations