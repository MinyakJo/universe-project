import React from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import commonDiv from "components/common/Div"
import Button from "components/common/Button"
import background from "../../../image/schoolarship_page/background_03.png"
import MainIntroText from "../../component/main_page/MainIntroText"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"

const Div = styled(commonDiv)`
    flex-wrap: ${props => {
        return props.wrap ? props.wrap : null
    }};

    box-shadow: ${props => {
        return props.shadow ? props.shadow : null
    }};

    border: ${props => {
        return props.border ? `1px solid ${CommonStyle.setColor(props.border)}` : null
    }};
`

const NavigateCourse = () => {

    const isMobile = useRecoilValue(isMobileState)
    const navigate = useNavigate()

    const onClickEvnet = (e) => {
        navigate("/passes")
    }

    return(
        <Div flex="column_center" src={background} padding={ !isMobile ? "92px 0px" : "45px 20px" } paddingBottom={ !isMobile ? "80px" : "35px" }>
            <MainIntroText>
                {{
                    top: {
                        text: "영어 실력 향상을 향한 반복 장학금",
                        margin: "11px"
                    },
                    bottom: {
                        text: "지금 바로 도전 하세요!",
                        margin: !isMobile ? "38px" : "24px"
                    },
                    color: "white"
                }}
            </MainIntroText>
            <Div width={ !isMobile ? "224px" : "195px" } height={ !isMobile ? "50px" : "45px" }>
                <Button color="bk" backgroundColor="white" size={ !isMobile ? "small_medium" : "extra_small" } weight="700" radius="4px" onClick={onClickEvnet}>
                    수강신청 하러가기
                </Button>
            </Div>
        </Div>
    )
}

export default NavigateCourse