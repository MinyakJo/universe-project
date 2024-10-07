import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import commonP from "components/common/P"
import CommonStyle from "components/style"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"

const Div = styled(commonDiv)`
    background-color: ${props => {
        return props.backgroundColor ? `${CommonStyle.setColor(props.backgroundColor)}` : "transparent"
    }};

    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : null
    }};

    max-height: ${props => {
        return props.maxWidth ? props.maxWidth : null
    }};

    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};

    box-shadow: ${props => {
        return props.shadow ? props.shadow : null
    }};

    aspect-ratio: ${props => {
        return props.ratio ? props.ratio : null
    }};
`

const Img = styled.img`
    object-fit: contain;
    height: 100%;
`

const Point = styled(commonP)`
    font-weight: 900;
    line-height: 210%;
    color: ${CommonStyle.setColor("orange")};
`

const P = styled(commonP)`
    line-height: 22px;
`

const IntroductionArticle = (props) => {

    const data = props.children
    const isMobile = useRecoilValue(isMobileState)

    return(
        <Div 
            flex="column_between" 
            radius="20px" 
            backgroundColor="white" 
            maxWidth={ !isMobile ? "280px" : "160px" } 
            ratio="1/1"
            padding={ !isMobile ? "19px 23px" : "10px 13px" }
            paddingBottom={ !isMobile ? "30px" : "22px" }
            marginLeft={ !isMobile ? "10px" : "7px" } 
            marginRight={ !isMobile ? "10px" : "7px" }
            marginBottom={ !isMobile ? null : "14px" }
            shadow="0px 1px 8px rgba(0, 0, 0, 0.1)"
        >
            <Div>
                <Div marginBottom={ !isMobile ? "5px" : null }>
                    <Point size={ !isMobile ? "extra_small" : null } style={{ fontSize: !isMobile ? null : 12 }}>
                        {`Point${props.index + 1}`}
                    </Point>
                </Div>
                <Div>
                    <P weight="500" family="esamanru" size={ !isMobile ? "medium" : "small" }>
                        {data.text}
                    </P>
                </Div>
            </Div>
            <Div flex="row_center" maxWidth={ !isMobile ? "118px" : null } height={ !isMobile ? null : "65px" }>
                <Img src={data.img}/>
            </Div>
        </Div>
    )
}

export default IntroductionArticle