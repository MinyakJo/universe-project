import React from "react"
import styled from "styled-components"
import Div from "components/common/Div"
import commonP from "components/common/P"
import CommonStyle from "components/style"
import backgroundImg from "../../../image/main_page/main_page_02.png"
import MainIntroText from "../../component/main_page/MainIntroText"
import small_circle from "../../../svg/small_circle.svg"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import graph from "../../../svg/main_graph.svg"
import graph_mobile from "../../../svg/main_graph_mobile.svg"

const P = styled(commonP)`
    margin: ${props => {
        return props.margin ? props.margin : null
    }};
    white-space: pre-line;
    text-align: center;
`

const Span = styled.span`
    color: ${CommonStyle.setColor("orange")};
    font-size: 1em;
`

const Img = styled.img`
    width: 100%;
    object-fit: contain;
`

const HowToStudy = () => {

    const isMobile = useRecoilValue(isMobileState)

    return(
        <Div flex="column_center" src={backgroundImg} padding={ !isMobile ? null : "0px 20px" }>
            <Div paddingTop={ !isMobile ? "80px" : "48px" } >
                <MainIntroText>
                    {{
                        top: {
                            text: "여러분은 영어공부를 잘 하고 계신가요?",
                            margin: !isMobile ? "12px" : "9px"
                        },
                        bottom: {
                            text: !isMobile ? "상위1%는 영어공부를 이렇게 합니다" : "상위1%는 영어공부를\n이렇게 합니다" ,
                            margin: !isMobile ? "37px" : "14px",
                        },
                        color: "white"
                    }}
                </MainIntroText>
            </Div>
            {
                !isMobile ?
                <Div width="840px">
                    <Img src={graph}/>
                </Div>:
                <Div>
                    <Img src={graph_mobile}/>
                </Div>
            }
            <Div marginTop={ !isMobile ? "42px" : "32px" } paddingBottom={ !isMobile ? "80px" : "48px" }>
                <Div flex="row_center" marginBottom={ !isMobile ? "12px" : "8px" }>
                    {
                        !isMobile &&
                        <Div width="18px" style={{ minWidth: 18 }}>
                            <Img src={small_circle}/>
                        </Div>
                    }
                    <P color="white" size={ !isMobile ? "medium_small" : "small" } weight="500" margin="0px 20px">
                        A학생과 <Span>B학생</Span>의 공부습관에 따라{ isMobile && <br/>  }다른 학습량 비교 그래프 분석
                    </P>
                    {
                        !isMobile &&
                        <Div width="18px" style={{ minWidth: 18 }}>
                            <Img src={small_circle}/>
                        </Div>
                    }
                </Div>
                <Div flex="row_center">
                    <P color="white" size={ !isMobile ? "small_medium" : null } style={{ fontSize: !isMobile ? null : 10 }} weight="700">출처:에빙하우스의 망각 곡선</P>
                </Div>
            </Div>
        </Div>
    )
}

export default HowToStudy