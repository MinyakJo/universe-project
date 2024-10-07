import React from "react"
import styled from "styled-components"
import Div from "components/common/Div"
import P from "components/common/P"
import background from "../../../image/characteristic_page/background_02.png"
import MainIntroText from "../../component/main_page/MainIntroText"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"

const Contents = styled(P)`
    word-break: break-all;
    white-space: pre-line;
    text-align: center;
`

const Memory = () => {

    const isMobile = useRecoilValue(isMobileState)

    return(
        <Div flex="column_center" src={background} padding={ !isMobile ? "123px 0px" : "53px 20px" } paddingBottom={ !isMobile ? "101px" : "45px" }>
            <MainIntroText>
                {{
                    top: {
                        text: "영어 반복습관, 실력 향상 두가지 모두 잡다!",
                        margin: !isMobile ? "13px" : "9px",
                    },
                    bottom: {
                        text: !isMobile ? "절대 까먹을 수가 없는 장기기억화" : "절대 까먹을 수가 없는\n장기기억화",
                        margin: !isMobile ? "9px" : "16px"
                    },
                    color: "white"
                }}
            </MainIntroText>
            <Div flex="row_center">
                <Contents color="white" weight="500" size={ !isMobile ? "small_large" : "extra_small" } lineHeight="150%">
                    {"반복 = 장기기억화로 유니버스반복은\n절대적인 학습량을 늘려주는 영어반복 솔루션입니다."}
                </Contents>
            </Div>
        </Div>
    )
}

export default Memory