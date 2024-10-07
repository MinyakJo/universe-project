import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import MainIntroText from "components/component/main_page/MainIntroText"
import pass_introduction_01 from "../../../svg/pass_introduction_01.svg"
import pass_introduction_02 from "../../../svg/book.svg"
import pass_introduction_03 from "../../../svg/phone.svg"
import pass_introduction_04 from "../../../svg/robot_purple.svg"
import IntroductionArticle from "../../component/repeat_u_pass_page/IntroductionArticle"
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
`

const ZeroPassBenefit = () => {

    const isMobile = useRecoilValue(isMobileState)
    const pointList = [
        { text: "AI 반복 솔루션 실행", img: pass_introduction_01 },
        { text: "무료 학습강좌 제공", img: pass_introduction_02 },
        { text: "나의 반복 랭킹 확인", img: pass_introduction_03 },
        { text: "AI 반복데이터 수집 가능", img: pass_introduction_04 }
    ]

    return(
        <Div padding={ !isMobile ? "74px 0px" : "50px 13px" } paddingBottom={ !isMobile ? "0px" : "40px" } marginBottom={ !isMobile ? "230px" : null } backgroundColor="orange">
            <MainIntroText>
                {{
                    top: {
                        text: "한정수량! 수강생 전원 특별 혜택",
                        margin: !isMobile ? "11px" : "9px"
                    },
                    bottom: {
                        text: "한눈에 보는 0원패스 혜택",
                        margin: !isMobile ? "40px" : "22px",
                    },
                    color: "white"
                }}
            </MainIntroText>
            <Div position={ !isMobile ? "relative" : null } height={ !isMobile ? "135px" : null } backgroundColor="orange">
                <Div flex="row_center" position={ !isMobile ? "absolute" : null } top="0" wrap={ !isMobile ? null : "wrap" }>
                    {
                        pointList && pointList.map((e, i) =>
                            <IntroductionArticle key={i} index={i}>
                                {e}
                            </IntroductionArticle>   
                        )
                    }
                </Div>
            </Div>
        </Div>
    )
}

export default ZeroPassBenefit