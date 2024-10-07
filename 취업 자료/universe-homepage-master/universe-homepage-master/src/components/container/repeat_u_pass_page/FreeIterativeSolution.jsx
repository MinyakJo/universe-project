import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import MainIntroText from "../../component/main_page/MainIntroText"
import solution_01 from "../../../image/repeat_u_pass_page/solution_01.png"
import solution_02 from "../../../image/repeat_u_pass_page/solution_02.png"
import solution_03 from "../../../image/repeat_u_pass_page/solution_03.png"
import Solution from "../../component/repeat_u_pass_page/Solution"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"

const Div = styled(commonDiv)`

    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : null
    }};

    box-shadow: ${props => {
        return props.shadow ? props.shadow : null
    }};
`

const FreeIteractiveSolution = (props) => {

    const isMobile = useRecoilValue(isMobileState)
    const solutionList = [
        { 
            title: "원클릭 1등급 반복 학습", 
            contents: "1타 유명 교재 집필 방식 분석, 반복 솔루션에 적용함으로써\n0원 패스, U패스 수강시 모든 학생들이 직접 1타가 되어 무한 반복 학습.",
            img: solution_01
        },
        { 
            title: !isMobile ? "업계 최초 등급별 인강 수강 방식 차별화" : "업계 최초 등급별\n인강 수강 방식 차별화",
            accent: "업계 최초 등급별",
            contents: "등급별 꼭 필요한 강의 구간을 추천 함과 동시에\n솔루션 화면에 인터넷 강의, 전자책, 반복 학습 3가지 화면을 동시에 제공",
            img: solution_02
        },
        { 
            title: "AI 음성 기반 원클릭 반복 학습", 
            contents: "1타 강사들의 비싼 강의에만 제공 되던 원어 MP3, 반복 수능 전 지문 자동 적용 제공 되는\n구문 분석에서 원하는 단어 /구문/문장 클릭 무한 반복",
            img: solution_03
        },
    ]

    return(
        <Div flex="column_center" padding={ !isMobile ? "77px 0px" : "48px 0px" } paddingBottom={ !isMobile ? "80px" : "50px" } backgroundColor={ props.backgroundColor ? props.backgroundColor : "light_grey"}>
            <MainIntroText>
                {{
                    top:{
                        text: "U패스로 단기간 최대 효과를 끌어올리세요!",
                        margin: !isMobile ? "11px" : "9px"
                    },
                    bottom:{
                        text:"반복 솔루션 무료제공",
                        margin: !isMobile ? "37px" : "22px" ,
                        accent: "무료제공",
                        accentPosition: "end"
                    },
                    color: "bkwwwwww"
                }}
            </MainIntroText>
            <Div flex="column_center" maxWidth="780px" paddingTop={ !isMobile ? "67px" : "26px" } paddingBottom={ !isMobile ? "36px" : "20px" } padding={ !isMobile ? null : "0px 20px"} radius={ !isMobile ? "10px" : null } backgroundColor="white" shadow="0px 2px 8px rgba(0, 0, 0, 0.1)">
                {
                    solutionList && solutionList.map((e, i) =>
                        <Solution key={i} index={i}>
                            {e}
                        </Solution>
                    )
                }
            </Div>
        </Div>
    )
}

export default FreeIteractiveSolution