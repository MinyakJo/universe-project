import React from "react"
import Div from "components/common/Div"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import P from "components/common/P"
import styled from "styled-components"
import CommonStyle from "components/style"
import Icon from "components/common/Icon"

const Line = styled.div`
    width: 100%;
    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : null
    }};
    margin: ${props => {
        return props.margin ? props.margin : null
    }};
    border-bottom: 1px solid ${ CommonStyle.setColor("grey1") };
`
const Text = styled(P)`
    white-space: nowrap;
`

const PaymentState = ({ success }) => {

    const isMobile = useRecoilValue( isMobileState )

    return (
        <Div flex="row_center" marginBottom={ !isMobile ? "30px" : "24px" } padding={ !isMobile ? null : "0px 23px" }>
            <Div flex="row" width="fit-content">
                <Icon flex="row_center" width={ !isMobile ? "34px" : "24px" } radius="50%" backgroundColor="orange" marginRight={ !isMobile ? "8px" : "6px" }>
                    <P color="white" family="pretendard" size={ !isMobile ? "medium_small" : "small_medium" } weight="700">
                        1
                    </P>
                </Icon>
                <Div flex="row" width="fit-content">
                    <Text size={ !isMobile ? "medium_small" : "small_medium" } weight="700" lineHeight="34px">
                        상품/결제
                    </Text>
                </Div>
            </Div>
            <Line maxWidth="111px" margin="0px 10px"/>
            <Div flex="row" width="fit-content">
                <Icon flex="row_center" width={ !isMobile ? "34px" : "24px" } radius="50%" backgroundColor={ success ? "orange" : "grey2"} marginRight={ !isMobile ? "8px" : "6px" }>
                    <P color="white" family="pretendard" size={ !isMobile ? "medium_small" : "small_medium" } weight="700">
                        2
                    </P>
                </Icon>
                <Div flex="row" width="fit-content">
                    <Text size={ !isMobile ? "medium_small" : "small_medium" } weight="700" lineHeight="34px">
                        { success || ( success === undefined ) ? "수강신청 완료" : "수강신청 실패" }
                    </Text>
                </Div>
            </Div>
        </Div>
    )
}

export default PaymentState