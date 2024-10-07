import React from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import commonDiv from "components/common/Div"
import P from "components/common/P"
import arrow from "../../../svg/long_arrow_right.svg"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"

const Div = styled(commonDiv)`
    border: ${props => {
        return props.border ? `1px solid ${CommonStyle.setColor(props.border)}` : null
    }};

    position: ${props => {
        return props.position ? props.position : null
    }};

    z-index: ${props => {
        return props.zIndex ? props.zIndex : null
    }};

    left: ${props => {
        return props.left ? props.left : null
    }};

    cursor: ${props => {
        return props.cursor ? props.cursor : null
    }};
`

const Img = styled.img`
    object-fit: contain;
    width: 100%;
`

const PassPrice = (props) => {

    const data = props.children
    const isMobile = useRecoilValue(isMobileState)

    return(
        <>
            <Div flex="row_between">
                <Div flex="row">
                    <P color="bk" weight="700" lineHeight="160%" size="small_large">
                        수강료
                    </P>
                </Div>
                <Div flex="row_end">
                    <Div width="fit-content">
                        <P color="orange" weight="700" lineHeight="160%" size={ !isMobile ? "large" : "large_small" }>
                            { data.cost.toLocaleString() }
                        </P>
                    </Div>
                    <Div width="fit-content" marginTop="4px" marginLeft="3px">
                        <P color="bk" weight="700" lineHeight="160%" size="small_large">
                            원
                        </P>
                    </Div>
                </Div>
            </Div>
            <Div flex={ !isMobile ? "row_between" : "row" } paddingTop="6px">
                <Div flex="row" width={ !isMobile ? null : "fit-content" }>
                    <Div border="orange" backgroundColor="gray1" width="fit-content" radius="4px" paddingTop="3px" paddingBottom="4px" paddingRight="4px" paddingLeft="4px">
                        <P color="orange" weight="700" style={{ fontSize: !isMobile ? 13 : 12, whiteSpace: "nowrap" }}>
                            할인적용
                        </P>
                    </Div>
                    <Div width="fit-content" marginLeft="8px">
                        <P color="grey2" weight="500" style={{ fontSize: !isMobile ? 13 : 10, whiteSpace : "nowrap" }}>
                            *12개월 할부시
                        </P>
                    </Div>
                </Div>
                <Div flex="row_end">
                    {
                        data.price &&
                        <Div flex="row_center" width="fit-content" position="relative" marginRight={ data.sale_price ? "14px" : "10px" }>
                            <Div flex="row" width="calc(100% + 10px)" height="100%" marginTop="4px" position="absolute">
                                <Img src={arrow}/>
                            </Div>
                            <Div width="fit-content">
                                <P color="grey7" weight="600" lineHeight="20px" size="extra_small">
                                    { data.price.toLocaleString() }원
                                </P>
                            </Div>
                        </Div>
                    }
                    {
                        data.sale_price &&
                        <Div flex="row" width="fit-content">
                            <Div width="fit-content">
                                <P color="grey7" weight="600" lineHeight="20px" size="extra_small">
                                    { data.sale_price.toLocaleString() }원
                                </P>
                            </Div>
                        </Div>
                    }
                </Div>
            </Div>
        </>
    )
}

export default PassPrice