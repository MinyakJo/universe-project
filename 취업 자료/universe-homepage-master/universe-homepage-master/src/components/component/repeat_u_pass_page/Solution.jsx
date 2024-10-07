import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import commonP from "components/common/P"
import CommonStyle from "components/style"
import { isMobileState } from "recoil/mainAtom"
import { useRecoilValue } from "recoil"

const Div = styled(commonDiv)`
    aspect-ratio: ${props => {
        return props.ratio ? props.ratio : null
    }};
`

const P = styled(commonP)`
    white-space: pre-wrap;
    text-align: center;
`

const H3 = styled.h3`
    text-align: center;
    font-weight: 700;
    font-size: ${props=> {
        return props.size ? `${CommonStyle.setFontSize(props.size)}` : `${CommonStyle.setFontSize("medium")}`
    }};
    color: ${CommonStyle.setColor("bk")};
    margin: 0;
    line-height: 130%;
    white-space: pre-line;
`

const Img = styled.img`
    object-fit: contain;
    width: 100%;
    height: 100%;

    max-height: ${props => {
        return props.maxHeight ? props.maxHeight : null
    }};
`

const Span = styled.span`
    color: ${CommonStyle.setColor("orange")};
`

const Solution = (props) => {

    const isMobile = useRecoilValue(isMobileState)
    const data = props.children

    return(
        <Div flex="column_center" marginBottom="30px">
            <Div flex="row_center" backgroundColor="orange" width={ !isMobile ? "40px" : "36px" } ratio="1/1" radius="50%" marginBottom={ !isMobile ? "17px" : "12px" }>
                <P color="white" size={ !isMobile ? "small_large" : "extra_small" }>
                    0{props.index + 1}
                </P>
            </Div>
            <Div flex="column_center">
                <Div flex="row_center" marginBottom={ !isMobile ? "9px" : "14px" }>
                    <H3 size={ !isMobile ? "large_medium" : "medium" }>
                        {
                            !data.accent?
                            data.title:
                            <>
                                <Span>{data.accent}</Span>
                                {data.title.split(data.accent)[1]}
                            </>
                        }
                    </H3>
                </Div>
                <Div flex="row_center" marginBottom={ !isMobile ? "30px" : "25px" }>
                    <P weight="600" size={ !isMobile ? "small_large" : "extra_small" } color="bk">
                        {data.contents}
                    </P>
                </Div>
            </Div>
            <Div padding={ !isMobile ? "0px 100px" : null }>
                <Img src={data.img}/>
            </Div>
        </Div>
    )
}

export default Solution