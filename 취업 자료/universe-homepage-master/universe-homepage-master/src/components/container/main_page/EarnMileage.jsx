import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import backgroundImg from "../../../image/main_page/main_tutorial_background.png"
import powder from "../../../svg/main_powder.svg"
import MainIntroText from "../../component/main_page/MainIntroText"
import slideImg01 from "../../../image/main_page/slide_01.png"
import slideNext from "../../../svg/slideNext.svg"
import slideBack from "../../../svg/slideBack.svg"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import MileageSlideBox from "components/component/main_page/MileageSlideBox"

const Div = styled(commonDiv)`
    background-color: transparent;

    position: ${props => {
        return props.position ? props.position : null
    }};

    top: ${props => {
        return props.top ? props.top : null
    }};

    z-index: ${props => {
        return props.zIndex ? props.zIndex : null
    }};
`

const EarnMileage = () => {

    const isMobile = useRecoilValue(isMobileState)

    const imgList = [
        {
            pcImage: slideImg01,
            mobileImage: slideImg01,
            text: "내가 학습한 모든 데이터를 반복데이터에서 다시 학습 가능1"
        },
        {
            pcImage: slideImg01,
            mobileImage: slideImg01,
            text: "내가 학습한 모든 데이터를 반복데이터에서 다시 학습 가능2"
        },
        {
            pcImage: slideImg01,
            mobileImage: slideImg01,
            text: "내가 학습한 모든 데이터를 반복데이터에서 다시 학습 가능3"
        },
    ]

    const nextBtn = {
        img: slideNext,
        backgroundColor: "orange"
    }
    
    const backBtn = {
        img: slideBack,
        backgroundColor: "orange"
    }

    const btnStyle = !isMobile ? {
        width: "40px",
        height: "40px",
        distance: "-77px",
        radius: "50%",
        top: "calc( 50% - 53px )"
    }:{
        width: "30px",
        height: "30px",
        distance: "-11px",
        radius: "50%",
        top: "calc( 50% - 53px )"
    }
    
    return(
        <Div flex="column_center" position="relative" src={backgroundImg} padding={ !isMobile ? null : "0px 20px" }>
            {
                !isMobile &&
                <Div width="fit-content" marginTop="74px" position="absolute" top="0px" zIndex="4">
                    <img src={powder} alt=""/>
                </Div>
            }
            <Div paddingTop="85px" paddingBottom="45px">
                <MainIntroText>
                    {{
                        top: {
                            text: "단순히 반복에서만 끝나지 않습니다.",
                            margin: !isMobile ? "11px" : "9px"
                        },
                        bottom: {
                            text: !isMobile ?  "반복 빅데이터부터 마일리지까지!" : "반복 빅데이터부터\n마일리지까지!" ,
                            accent: "마일리지까지!",
                            accentPosition: "end"
                        },
                        color: "bk"
                    }}
                </MainIntroText>
            </Div>
            <Div flex="row_center" height="587px" paddingBottom="87px">
                <MileageSlideBox maxWidth={ !isMobile ? "730px" : "calc(100vw - 40px)" }>
                    {{
                        imgList: imgList,
                        next: nextBtn,
                        back: backBtn,
                        btnStyle: btnStyle
                    }}
                </MileageSlideBox>
            </Div>
        </Div>
    )
}

export default EarnMileage