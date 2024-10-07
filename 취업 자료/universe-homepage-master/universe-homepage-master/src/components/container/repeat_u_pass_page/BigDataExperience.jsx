import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import commonP from "components/common/P"
import CommonStyle from "components/style"
import MainIntroText from "../../component/main_page/MainIntroText"
import powder from "../../../svg/main_powder.svg"
import backgroundImg from "../../../image/repeat_u_pass_page/big_data_background.png"
import slideImg01 from "../../../image/main_page/slide_01.png"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"

const Div = styled(commonDiv)`
    position: ${props => {
        return props.position ? props.position : null
    }};

    background-color: ${props => {
        return props.backgroundColor ? `${CommonStyle.setColor(props.backgroundColor)}` : "transparent"
    }};

    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : null
    }};

    top: ${props => {
        return props.top ? props.top : null
    }};

    z-index: ${props => {
        return props.zIndex ? props.zIndex : null
    }};
`

const P = styled(commonP)`
    text-align: center;
`

const Img = styled.img`
    object-fit: contain;
    width: 100%;
    height: 100%;
    border-radius: ${props => {
        return props.radius ? props.radius : null
    }};
    max-height: ${props => {
        return props.maxHeight ? props.maxHeight : null
    }};
`

const BigDataExperience = () => {

    const isMobile = useRecoilValue(isMobileState)

    return(
        <Div flex="column_center" position="relative" src={backgroundImg} padding={ !isMobile ? "85px 0px" : "48px 20px" } paddingBottom={ !isMobile ? "87px" : "50px" }>
            {
                !isMobile &&
                <Div width="700px" marginTop="74px" position="absolute" top="0px" zIndex="2">
                    <Img src={powder} alt=""/>
                </Div>
            }
            <MainIntroText>
                {{
                    top: {
                        text: "단순한 반복에서만 끝나지 않습니다.",
                        margin: !isMobile ? "11px" : "9px"
                    },
                    bottom: {
                        text: !isMobile ? "유니버스반복 빅데이터 체험까지" : "유니버스반복\n빅데이터 체험까지",
                        accent: "빅데이터 체험",
                        accentPosition: "center",
                        margin: !isMobile ? "38px" : "23px"
                    }
                }}
            </MainIntroText>
            <Div flex="column_center" maxWidth="782px">
                <Img src={slideImg01} radius="10px"/>
                <Div flex="row_center" marginTop={ !isMobile ? "38px" : "20px" } height={ !isMobile ? "68px" : "82px" } radius="10px" backgroundColor="orange" padding="0px 20px">
                    <Div width="fit-content">
                        <P weight="700" size={ !isMobile ? "medium" : "small_medium" } color="white">어휘, 문장 유형 별 내가 학습한 모든 데이터를 반복데이터에서 다시 학습 가능</P>
                    </Div>
                </Div>
            </Div>
        </Div>
    )
}

export default BigDataExperience