import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import commonP from "components/common/P"
import CommonStyle from "components/style"
import MainIntroText from "../../component/main_page/MainIntroText"
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

    aspect-ratio: ${props => {
        return props.ratio ? props.ratio : null
    }};
`

const SolutionBox = styled(Div)`
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
`

const H3 = styled.h3`
    display: flex;
    align-items: center;
    text-align: center;
    font-weight: 700;
    font-size: ${props => {
        return props.size ? `${CommonStyle.setFontSize(props.size)}` : null
    }};
    line-height: 34px;
    color: ${CommonStyle.setColor("orange")};
    margin: 0;
    justify-content: center;
    font-family: "regular";
`

const P = styled(commonP)`
    text-align: center;
`

const PassSolution = () => {

    const isMobile = useRecoilValue(isMobileState)
    const solutionList = [
        { title: "실제 출제된 최신 문제유형", contents: "최신 출제 문제들과 모의고사 기출 문제들로 실전에 바로\n적용할 수 있도록 구성되어있습니다." },
        { title: "세분화된 구성", contents: "빈칸, 구조, 어휘, 해석, 문법 등으로 다양하게 구성된\n영역들을 반복 학습할 수 있습니다." },
        { title: "다양한 자료 활용", contents: "일방적 강의와 다르게 원하는 단어/구/문장을 클릭하여 반복하고\n출제문제와 이미지 학습자료를 동시에 확인할 수 있습니다." },
        { title: "문장 암기법", contents: "단순 단어 암기뿐만 아니라 ‘문장’과 이미지에 연결고리를 부여한\n연상학습법을 통해 암기의 어려움을 극복할 수 있습니다." },
    ]

    return(
        <Div flex="column_center" paddingTop={ !isMobile ? "80px" : "48px" } paddingBottom={ !isMobile ? "60px" : "50px" } padding={ !isMobile ? null : "0px 20px" }>
            <MainIntroText>
                {{
                    top: {
                        text: "유니버스반복 영어 반복학습 솔루션",
                        margin: !isMobile ? "11px" : "9px"
                    },
                    bottom: {
                        text: "U패스가 정답인 이유",
                        margin: !isMobile ? "40px" : "22px",
                        accent: "정답인 이유",
                        accentPosition: "end"
                    },
                    color: "bk"
                }}
            </MainIntroText>
            <Div flex="row_center" maxWidth="1180px" wrap="wrap">
                {
                    solutionList && solutionList.map((e, i) =>
                    <SolutionBox flex="column_top" key={i} maxWidth="580px" marginLeft={ !isMobile && (i % 2 === 1) ? "20px" : null } marginBottom={ !isMobile ? "20px" : "12px" } height={ !isMobile ? null : "150px" } >
                        <Div>
                            <Div flex="row_center" backgroundColor="bk" width={ !isMobile ? "45px" : "26px" } ratio="1/1">
                                <P color="white" weight="700" size={ !isMobile ? "medium_large" : "small_medium" }>
                                    {i + 1}
                                </P>
                            </Div>
                        </Div>
                        <Div flex="column_top" padding={ !isMobile ? "24px 55px" : "0px 30px" } paddingBottom={ !isMobile ? "49px" : null }>
                            <Div marginBottom={ !isMobile ? "12px" : "11px" }>
                                <H3 size={ !isMobile ? "large_small" : "small_large" }>{e.title}</H3>
                            </Div>
                            <Div>
                                <P weight="600" size={ !isMobile ? "small_large" : "extra_small" } color="black">{e.contents}</P>
                            </Div>
                        </Div>
                    </SolutionBox>
                    )
                }
            </Div>
        </Div>
    )
}

export default PassSolution