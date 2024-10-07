import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import P from "components/common/P"
import background from "../../../image/characteristic_page/background_01.png"
import mo_background from "../../../image/characteristic_page/background_mobile_01.png"
import MainIntroText from "../../component/main_page/MainIntroText"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"

const Div = styled(commonDiv)`
    background: ${props => {
        return props.background ? props.background : null
    }};
`

const Banner = () => {

    const isMobile = useRecoilValue(isMobileState)

    return(
        <Div flex="row" padding={ !isMobile ? "154px 0px" : "237px 10px" } paddingBottom={ !isMobile ? "158px" : "268px" } height={ !isMobile ? null : "667px" } src={ !isMobile ? background : mo_background }>
            <Div width={ !isMobile ? "fit-content" : null } paddingLeft={ !isMobile ? "420px" : null }>
                <MainIntroText>
                    {{
                        top: {
                            text: "영어등급이 변하는 원클릭 반복학습!",
                            margin: !isMobile ? "20px" : "24px",
                            justify: !isMobile ? "start" : null
                        },
                        bottom: {
                            text: "강의, 구문반복, 학습자료\n이 세가지 모든것을 한번에",
                            margin: !isMobile ? "41px" : "21px",
                            justify: !isMobile ? "start" : null
                        },
                        color: "white"
                    }}
                </MainIntroText>
                <Div flex={ !isMobile ? "row_end" : "row_center" }>
                    <P color="white" weight="500" size={ !isMobile ? "medium_small" : "extra_small" } lineHeight="29px">
                        유니버스 반복은 참여형, 맞춤형, 소통형 강의플랫폼입니다.
                    </P>
                </Div>
            </Div>
        </Div>
    )
}

export default Banner