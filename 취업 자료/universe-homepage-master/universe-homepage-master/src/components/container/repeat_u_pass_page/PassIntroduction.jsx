import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import CommonStyle from "components/style"
import MainIntroText from "../../component/main_page/MainIntroText"
import pass_introduction_01 from "../../../svg/pass_introduction_01.svg"
import pass_introduction_02 from "../../../svg/pig_bank.svg"
import pass_introduction_03 from "../../../svg/robot_purple.svg"
import pass_introduction_04 from "../../../svg/bankroll.svg"
import IntroductionArticle from "../../component/repeat_u_pass_page/IntroductionArticle"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"

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

    flex-wrap: ${props => {
        return props.wrap ? props.wrap : null
    }};
`

const PassIntroduction = () => {

    const isMobile = useRecoilValue(isMobileState)
    const pointList = [
        { text: "AI 반복 솔루션 실행", img: pass_introduction_01 },
        { text: "반복 마일리지 100%적립", img: pass_introduction_02 },
        { text: "MY 반복데이터", img: pass_introduction_03 },
        { text: "마일리지 현금 환급", img: pass_introduction_04 }
    ]

    return(
        <Div flex="column_center" backgroundColor="light_grey" paddingTop={ !isMobile ? "78px" : "48px" } paddingBottom={ !isMobile ? "81px" : "48px" } padding={ !isMobile ? null : "0px 13px" }>
            <MainIntroText>
                {{
                    top: {
                        text: "영어 반복습관, 실력향상 두가지 모두 잡자!",
                        margin: !isMobile ? "11px" : "9px"
                    },
                    bottom: {
                        text: "U패스 혜택을 소개합니다!",
                        margin: !isMobile ? "38px" : "17px",
                        accent: "U패스 혜택",
                        accentPosition: "start"
                    },
                    color: "bk"
                }}
            </MainIntroText>
            <Div flex="row_center" wrap={ !isMobile ? "nowrap" : "wrap" }>
                {
                    pointList && pointList.map((e, i) =>
                        <IntroductionArticle key={i} index={i}>
                            {e}
                        </IntroductionArticle>
                    )
                }
            </Div>
        </Div>
    )
}

export default PassIntroduction