import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import P from "components/common/P"
import background from "../../../svg/squares.svg"
import mo_background from "../../../svg/squares_mobile.svg"
import MainIntroText from "../../component/main_page/MainIntroText"
import img1 from "../../../image/characteristic_page/solution_01.png"
import img2 from "../../../image/characteristic_page/solution_02.png"
import img3 from "../../../image/characteristic_page/solution_03.png"
import { isMobileState } from "recoil/mainAtom"
import { useRecoilValue } from "recoil"

const Div = styled(commonDiv)`
    position: ${props => {
        return props.position ? props.position : null
    }};

    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};

    background: ${props => {
        return props.background ? props.background : null
    }};

    overflow: ${props => {
        return props.overflow ? props.overflow : null
    }};
`

const Img = styled.img`
    width: 100%;
    object-fit: contain;

    border-radius: ${props => {
        return props.radius ? props.radius : null
    }};
`

const Contents = styled(P)`
    word-break: break-all;
    white-space: pre-line;
`

const Solution = () => {

    const isMobile = useRecoilValue(isMobileState)

    return(
        <Div flex="column_center" src={ !isMobile ? background : mo_background } padding={ !isMobile ? "78px 0px" : "48px 10px" } paddingBottom={ !isMobile ? "150px" : null }>
            <MainIntroText>
                {{
                    top: {
                        text: !isMobile ? "간편하고 쉽게! 절대적으로 학습량을 늘려주는 솔루션" : "간편하고 쉽게! 절대적으로 학습량을\n늘려주는 솔루션",
                        margin: !isMobile ? "11px" : "8px",
                    },
                    bottom: {
                        text: "반복하면 등급은 반드시 올라간다",
                        accent: "반드시",
                        accentPosition: "center",
                        margin: !isMobile ? "88px" : "23px"
                    },
                    color: "black"
                }}
            </MainIntroText>

            {/* 01 */}
            <Div flex={ !isMobile ? "row_center" : "column_center" } marginBottom={ !isMobile ? "110px" : "47px" } padding={ !isMobile ? null : "0px 20px" }>
                {
                    isMobile &&
                    <Div flex="row_center" background="linear-gradient(91.33deg, #653FDA 48.86%, #8462ED 99.16%)" height="45px" radius="4px" marginBottom="13px">
                        <P color="white" size="small_medium" weight="700">
                            AI 원클릭 기술로 학습하는 반복솔루션
                        </P>
                    </Div>
                }
                <Div width={ !isMobile ? "572px" : null } minWidth={ !isMobile ? "572px" : null } radius="10px" padding="10px" marginRight={ !isMobile ? "74px" : null } style={{ backgroundColor: "#DEDEDE" }}>
                    <Img radius="10px" src={img1}/>
                </Div>
                <Div flex="column" width={ !isMobile ? "fit-content" : null }>
                    {
                        !isMobile &&
                        <Div width="fit-content" background="linear-gradient(91.33deg, #653FDA 48.86%, #8462ED 99.16%)" padding="15px 26px" radius="4px" marginBottom="33px">
                            <P color="white" size="medium" weight="700">
                                AI 원클릭 기술로 학습하는 반복솔루션
                            </P>
                        </Div>
                    }
                    <Div width="fit-content" marginTop={ !isMobile ? null : "13px" }>
                        <Contents color="grey6" weight="600" size={ !isMobile ? "small_large" : "extra_small" } lineHeight={ !isMobile ? "29px" : "19px" }>
                            {"강의, 구문반복, 학습자료 이 세가지 모든것을\n한번에 해결할 수 있습니다.\n최고의 1타강사가 직접 특허낸 AI 기술과\n영어 학습법 원클릭 반복학습의 성공을 경험해보세요."}
                        </Contents>
                    </Div>
                </Div>
            </Div>
            {/* 02 */}
            <Div flex={ !isMobile ? "row_center" : "column_center" } marginBottom={ !isMobile ? "110px" : "47px" } padding={ !isMobile ? null : "0px 20px" }>
                {
                    isMobile &&
                    <>
                        <Div flex="row_center" background="linear-gradient(91.33deg, #653FDA 48.86%, #8462ED 99.16%)" height="45px" radius="4px" marginBottom="13px">
                            <P color="white" size="small_medium" weight="700">
                                짧은 시간 투자로 최대 효과를 얻는 반복학습
                            </P>
                        </Div>
                        <Div radius="10px" padding="10px" style={{ backgroundColor: "#DEDEDE" }}>
                            <Img radius="10px" src={img2}/>
                        </Div>
                    </>
                }
                <Div flex="column" width={ !isMobile ? "fit-content" : null } marginRight={ !isMobile ? "127px" : null }>
                    {
                        !isMobile &&
                        <Div width="fit-content" background="linear-gradient(91.33deg, #653FDA 48.86%, #8462ED 99.16%)" padding="15px 26px" radius="4px" marginBottom="33px">
                            <P color="white" size="medium" weight="700">
                                짧은 시간 투자로 최대 효과를 얻는 반복학습
                            </P>
                        </Div>
                    }
                    <Div width="fit-content" marginTop={ !isMobile ? null : "13px" }>
                        <Contents color="grey6" weight="600" size={ !isMobile ? "small_large" : "extra_small" } lineHeight={ !isMobile ? "29px" : "19px" }>
                            {"무조건 배워야만 성적이 오르는것이 아닙니다.\n반복 솔루션은 눈으로만 보는 강의가 아닌\n스스로 직접 반복학습할 수 있게 설계되어\n자기주도학습 + 실력향상 모두 체험할 수 있습니다."}
                        </Contents>
                    </Div>
                </Div>
                {
                    !isMobile &&
                    <Div width="572px" minWidth="572px" radius="10px" padding="10px" style={{ backgroundColor: "#DEDEDE" }}>
                        <Img radius="10px" src={img2}/>
                    </Div>
                }
            </Div>
            {/* 03 */}
            <Div flex={ !isMobile ? "row_center" : "column_center" } marginBottom={ !isMobile ? null : "47px" } padding={ !isMobile ? null : "0px 20px" }>
                {
                    isMobile &&
                    <Div flex="row_center" background="linear-gradient(91.33deg, #653FDA 48.86%, #8462ED 99.16%)" height="45px" radius="4px" marginBottom="13px">
                        <P color="white" size="small_medium" weight="700">
                            AI 원클릭 기술로 학습하는 반복솔루션
                        </P>
                    </Div>
                }
                {/* 그래프 */}
                <Div position="relative" width={ !isMobile ? "572px" : null } minWidth={ !isMobile ? "572px" : null } radius="10px" padding="10px" marginRight={ !isMobile ? "74px" : null } style={{ backgroundColor: "#DEDEDE" }}>
                    {/* 그래프 가운데 이미지 */}
                    <Div flex="row" backgroundColor="white" radius="10px">
                        <Img radius="10px" src={img3}/>
                    </Div>
                    {/* 그래프 가로 세로, 그래프 안 텍스트 */}
                    <Div position="absolute" height="100%" padding={ !isMobile ? "38px 57px 42px 64px" : "26px 37px 34px 41px" } style={{ top: 0, left: 0 }}>
                        <Div flex="column_between" height="100%" style={{ borderBottom: "1px solid black", borderLeft: "1px solid black" }}>
                            <Div flex="row" marginLeft="6px">
                                <P color="bk" weight="700" size="small_large" lineHeight="29px">누적반복횟수</P>
                            </Div>
                            <Div flex="row_end" marginBottom="7px">
                                <P color="bk" weight="700" size="small_large" lineHeight="29px">성취도</P>
                            </Div>
                        </Div>
                    </Div>
                </Div>
                <Div flex="column" width={ !isMobile ? "fit-content" : null }>
                    {
                        !isMobile &&
                        <Div width="fit-content" background="linear-gradient(91.33deg, #653FDA 48.86%, #8462ED 99.16%)" padding="15px 26px" radius="4px" marginBottom="33px">
                            <P color="white" size="medium" weight="700">AI 원클릭 기술로 학습하는 반복솔루션</P>
                        </Div>
                    }
                    <Div width="fit-content" marginTop={ !isMobile ? null : "13px" }>
                        <Contents color="grey6" weight="600" size={ !isMobile ? "small_large" : "extra_small" } lineHeight={ !isMobile ? "29px" : "19px" }>
                            {"강의, 구문반복, 학습자료 이 세가지 모든것을\n한번에 해결할 수 있습니다.\n최고의 1타강사가 직접 특허낸 AI 기술과\n영어 학습법 원클릭 반복학습의 성공을 경험해보세요."}
                        </Contents>
                    </Div>
                </Div>
            </Div>
        </Div>
    )
}

export default Solution