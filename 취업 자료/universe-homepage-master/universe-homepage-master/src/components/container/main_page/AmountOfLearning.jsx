import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import commonP from "components/common/P"
import CommonStyle from "components/style"
import clock from "../../../image/main_page/clock.png"
import robot from "../../../image/main_page/robot.png"
import bank_book from "../../../image/main_page/bank_book.png"
import MainIntroText from "../../component/main_page/MainIntroText"
import UnderLine from "../../component/main_page/UnderLine"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"

const Div = styled(commonDiv)`
    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : null
    }};
    
    align-items: ${props => {
        return props.align ? props.align : null
    }};
`

const P = styled(commonP)`
    text-align: center;
    white-space: pre-line;
`

const Span = styled.span`
    position: relative;
    color: ${CommonStyle.setColor("orange")};
    font-size: 1em;
`

const Article = styled.article`
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 30px;
    overflow: hidden;
    background-color: white;
    box-sizing: border-box;
    padding: ${props => {
        return props.padding ? props.padding : null
    }};
`

const Img = styled.img`
    width: 100%;
    object-fit: contain;
`

const AmountOfLearning = () => {

    const isMobile = useRecoilValue(isMobileState)

    return(
        <Div flex="column_center" backgroundColor="light_blue" padding={ !isMobile ? null : "0px 20px" }>
            <Div paddingTop={ !isMobile ? "100px" : "50px" } paddingBottom={ !isMobile ? "42px" : "48px" }>
                <MainIntroText>
                    {{
                        top: {
                            text: "상위1%가 영어를 잘하는 이유는 바로",
                            margin: !isMobile ? "11px" : "9px"
                        },
                        bottom: {
                            text: "절대적 학습량에 있습니다.",
                            margin: !isMobile ? "8px" : "17px",
                            accent: "절대적 학습량",
                            accentPosition: "start"
                        },
                        color: "bk"
                    }}
                </MainIntroText>
               
                <Div flex="row_center">
                    {/* 띄어쓰기를 하기 위해 {}를 씌움 */}
                    <P weight="500" size={ !isMobile ? "small_large" : "extra_small" } color="bk">
                        많은 시간을 투자하여 자기주도 학습을 진행하고,비싼 사교육비를 쓰는 등
                        { !isMobile ? <br/> : null }
                        다양한 방법으로 학습량을 늘릴 수 있습니다.
                    </P>
                </Div>
            </Div>
            <Div flex="column_center" maxWidth="980px" paddingBottom={ !isMobile ? "101px" : "50px" }>
                <Div flex="row_between" align={ !isMobile ? null : "start" } paddingBottom="36px">
                    <Div  maxWidth={ !isMobile ? "230px" : "105px" }>
                        <Article padding={ !isMobile ? "59px 41px 54px 64px" : "24px 15px 21px 26px" }>
                            <Img src={clock}/>
                        </Article>
                        <Div flex="row_center" marginTop="14px">
                            <P color="bk" size={ !isMobile ? "medium" : "extra_small" } weight="700">주입식 1타강의</P>
                        </Div>
                    </Div>
                    <Div maxWidth={ !isMobile ? "230px" : "105px" }>
                        <Article padding={ !isMobile ? "54px 44px 49px 44px" : "21px 18px" }>
                            <Img src={robot}/>
                        </Article>
                        <Div flex="row_center" marginTop="14px">
                            <P color="bk" size={ !isMobile ? "medium" : "extra_small" } weight="700">검증되지않은 AI 관리</P>
                        </Div>
                    </Div>
                    <Div maxWidth={ !isMobile ? "230px" : "105px" }>
                        <Article padding={ !isMobile ? "60px 51px" : "18px" }>
                            <Img src={bank_book}/>
                        </Article>
                        <Div flex="row_center" marginTop="14px">
                            <P color="bk" size={ !isMobile ? "medium" : "extra_small" } weight="700">고액 적중 광고</P>
                        </Div>
                    </Div>
                </Div>
                <Div flex="row_center" backgroundColor="white" width="fit-content" paddingTop="11px" paddingBottom="11px" paddingRight="52px" paddingLeft="52px" radius="14px">
                    <P size={ !isMobile ? "medium" : "extra_small"  } family="pretendard" weight="700">
                        하지만 이것만으로 학습량을
                        { !isMobile ? null : <br/> }
                        <Span> 
                            절대적으로 늘리는 데 한계가 있습니다
                            {/* 밑줄 */}
                            <UnderLine/>
                        </Span>
                    </P>
                </Div>
            </Div>
        </Div>
    )
}

export default AmountOfLearning