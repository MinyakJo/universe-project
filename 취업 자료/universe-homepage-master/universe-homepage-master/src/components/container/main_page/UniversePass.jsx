import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import MenuIntroText from "../../component/main_page/MainIntroText"
import star from "../../../svg/star.svg"
import Pass from "../../component/main_page/Pass"
import repeat_upass from "../../../svg/repeat_upass.svg"
import zero_pass from "../../../svg/zero_pass.svg"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"

const Div = styled(commonDiv)`

    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : null
    }};

    position: ${props => {
        return props.position ? props.position : null
    }};

    top: ${props => {
        return props.top ? props.top : null
    }};

    z-index: ${props => {
        return props.zIndex ? props.zIndex : null
    }};

    flex-wrap: ${props => {
        return props.wrap ? props.wrap : null
    }};

    align-items: ${props => {
        return props.alignItems ? props.alignItems : null
    }};
`

const Img = styled.img`
    object-fit: contain;
`

const UniversePass = () => {

    const isMobile = useRecoilValue(isMobileState)

    return(
        <Div flex="column_center" backgroundColor="light_grey" paddingTop={ !isMobile ? "101px" :  "50px" } paddingBottom={ !isMobile ? "144px" : "50px" }>
            <Div flex="row_center" marginBottom={ !isMobile ? "25px" : "19px" }>
                <Div width="fit-content" marginLeft="4px" marginRight="4px">
                    <Img src={star}/>
                </Div>
                <Div width="fit-content" marginLeft="4px" marginRight="4px">
                    <Img src={star}/>
                </Div>
                <Div width="fit-content" marginLeft="4px" marginRight="4px">
                    <Img src={star}/>
                </Div>
                <Div width="fit-content" marginLeft="4px" marginRight="4px">
                    <Img src={star}/>
                </Div>
                <Div width="fit-content" marginLeft="4px" marginRight="4px">
                    <Img src={star}/>
                </Div>
            </Div>
            <MenuIntroText>
                {{
                    top: {
                        text: "영어 반복습관, 실력향상 두가지 모두 잡는",
                        margin: !isMobile ? "11px" : "9px"
                    },
                    bottom: {
                        text: "2022 유니버스반복 패스",
                        accent: [ "2022", "패스" ],
                        accentPosition: "both",
                        margin: !isMobile ? "44px" : "50px"
                    },
                    color: "black"
                }}
            </MenuIntroText>
            <Div flex={ !isMobile ? "row_center" : "column_center" }>
                {/* 패스 하나 */}
                <Pass backgroundColor="orange" href="u-pass" marginBottom={ !isMobile ? null : "50px" }>
                    {{
                        top: "U패스",
                        subTitle: "반복 솔루션 무한 수강 가능",
                        title: "반복 U 패스",
                        img: repeat_upass,
                        checkList: [ "AI 반복 솔루션 실행", "마일리지 100% 적립", "MY 반복데이터 확인가능", "적립된 마일리지 현금 환급" ],
                        btn: { background: "white", color: "bk" }
                    }}
                </Pass>
                <Pass backgroundColor="bk" href="/zero-pass">
                    {{
                        top: "0원 패스",
                        subTitle: "이 모든것이 모두 0원!",
                        title: "0원 패스",
                        img: zero_pass,
                        checkList: [ "반복 솔루션 실행", "무료 학습강좌 제공", "나의 반복 랭킹 확인", "AI 반복데이터 수집" ],
                        btn: { background: "orange", color: "white" }
                    }}
                </Pass>
            </Div>
        </Div>
    )
}

export default UniversePass