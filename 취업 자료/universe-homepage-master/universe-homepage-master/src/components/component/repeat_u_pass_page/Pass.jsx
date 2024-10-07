import React from "react"
import pass_img from "../../../svg/pass_img.svg"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import commonP from "components/common/P"
import check from "../../../svg/check_orange.svg"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"

const Div = styled(commonDiv)`
    position: ${props => {
        return props.position ? props.position : null
    }};

    background: ${props => {
        return props.background ? props.background : null
    }};

    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : null
    }};

    max-height: ${props => {
        return props.maxHeight ? props.maxHeight : null
    }};

    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};

    box-shadow: ${props => {
        return props.shadow ? props.shadow : null
    }};

    opacity: ${props => {
        return props.opacity ? props.opacity : null
    }};

    overflow: ${props => {
        return props.overFlow ? props.overFlow : null
    }};
`

const Img = styled.img`
    object-fit: contain;
    width: 100%;
`

const P = styled(commonP)`
    line-height: ${props => {
        return props.lineHeight ? props.lineHeight : null
    }};

    cursor: ${props => {
        return props.cursor ? props.cursor : null
    }};
`

const Pass = (props) => {

    // 부모 컴포넌트의 height을 고정해야함

    const data = props.children
    const passList = data.passList
    const isMobile = useRecoilValue(isMobileState)

    return(
        <>
            <Div flex="row_center" padding={ !isMobile ? null : "0px 20px" }>
                <Div minWidth="244px" maxWidth={ !isMobile ? "244px" : "295px" } backgroundColor="black" radius="10px" height={ props.height ? props.height : null } maxHeight="258px">
                    <Div position="relative" top="0" height="100%" overFlow="hidden">
                        <Div position="relative" backgroundColor="black" opacity="0.3">
                            <Div position="absolute" backgroundColor="white">
                                <Img src={pass_img}/>
                            </Div>
                        </Div>
                        <Div flex="column_center" position="relative" zIndex="3" height="100%">
                            <P weight="800" family="esamanru" size="medium_large" color="white">유니버스반복</P>
                            <P weight="800" family="esamanru" size="medium_large" color="orange">{data.passName}</P>
                        </Div>
                    </Div>
                </Div>
            </Div>
            <Div flex="column_center" marginLeft={ !isMobile ? "24px" : null } padding={ !isMobile ? null : "0px 20px" } height="100%">
                <Div flex={ !isMobile ? "row" : "column_center" }>
                    {
                        props.sale &&
                        <Div flex="row_center" radius="4px" style={{background: "rgba(255, 92, 0, 0.1)"}} maxWidth={ !isMobile ? "96px" : "80px" } height={ !isMobile ? "33px" : "24px" } marginRight={ !isMobile ? "10px" : null } marginTop={ !isMobile ? null : "10px" }>
                            <P color="orange" weight="700" size={ !isMobile ? "extra_small" : null } style={{ fontSize: !isMobile ? null : 12 }} lineHeight="210%">할인적용 패스</P>
                        </Div>
                    }
                    <Div flex={ !isMobile ? null : "row_center" } marginTop={ !isMobile ? null : "15px" }>
                        <P weight="700" size={ !isMobile ? "medium_large" : "medium" } color="bk" lineHeight="35px">{data.title}</P>
                    </Div>
                </Div>
                <Div flex="column" marginTop={ !isMobile ? "7px" : "11px" }>
                    {
                        passList && passList.map((e, i) =>
                        <Div key={i} flex={ !isMobile ? "row" : "row_center" } marginTop="7.5px" marginBottom="7.5px" >
                            <Div minWidth="20px" maxWidth="20px" height="20px" marginRight="6px">
                                <Img src={check}/>
                            </Div>
                            <Div width="170px">
                                <P size="small_medium" weight="600">{e}</P>
                            </Div>
                        </Div>
                        )
                    }
                </Div>
            </Div>
        </>
    )
}

export default Pass