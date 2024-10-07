import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import commonButton from "components/common/Button"
import commonP from "components/common/P"
import CommonStyle from "components/style"
import Timer from "../../component/Timer"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"

const Div = styled(commonDiv)`
    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : "none"
    }};
    background-color: ${props => {
        return props.backgroundColor ? `${CommonStyle.setColor(props.backgroundColor)}` : "transparent"
    }};
    border-bottom: ${props => {
        return props.borderBottom ? `1px solid ${CommonStyle.setColor(props.borderBottom)}` : null
    }};
    background: ${props => {
        return props.background ? props.background : null
    }};
`

const Footer = styled(Div)`
    position: fixed;
    bottom: 0;
    z-index: 4;
    min-width: 1180px;
    max-width: 1920px;

    @media screen and ( max-width: 1180px ){
        bottom: 10px;
    }
`

const Button = styled(commonButton)`
    width: ${props => {
        return props.width ? props.width : "100%"
    }};
    background-color: transparent;
    font-weight: 700;
    line-height: 160%;
`

const P = styled(commonP)`
    cursor: default;
    line-height: ${props => {
        return props.lineHeight ? props.lineHeight : null
    }};
`

const FooterPass = (props) => {

    const data = props.children
    const isMobile = useRecoilValue(isMobileState)

    return !isMobile && (
        <Footer flex="row_between" width="calc( 100% - 10px )"
            background="radial-gradient(59.58% 104.26% at 30.46% 38.7%, #3F3F3F 1.08%, #282828 45.61%, #0C0D0D 100%)"
            height="80px"
        >
            <Div flex="row_center" width="50%">
                <Div flex="row" width="fit-content" marginBottom="4px" marginRight="8px">
                    <P color="white" size="large" weight="600" lineHeight="33px">
                        {data.text} 
                    </P>
                </Div>
                <Div flex="row" width="fit-content">
                    <P color="orange" weight="700" size="large" family="esamanru" lineHeight="33px">
                        {data.accent}
                    </P>
                </Div>
            </Div>
            <Div flex="row_center" width="50%">
                {
                    data.time &&
                    <Div flex="row" width="fit-content" marginRight="16px">
                        <P weight="500" size="small_medium" color="white" lineHeight="23px">
                            판매종료까지 남은 시간
                        </P>
                    </Div>
                }
                <Div flex="row_center" width="fit-content">
                    <Timer/>
                </Div>
                <Div id="courseRegistrationDetail" flex="row_center" width="153px" height="50px" marginLeft="27px" backgroundColor="orange">
                    <Button family="pretendard" id="courseRegistrationDetail" color="white" size="small_large">
                        구매하기
                    </Button>
                </Div>
            </Div>
        </Footer>
    )
}

export default FooterPass