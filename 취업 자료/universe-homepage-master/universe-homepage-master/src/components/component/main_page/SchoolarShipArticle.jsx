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

    position: ${props => {
        return props.position ? props.position : null
    }};

    top: ${props => {
        return props.top ? props.top : null
    }};

    z-index: ${props => {
        return props.zIndex ? props.zIndex : null
    }};

    align-items: ${props => {
        return props.alignItems ? props.alignItems : null
    }};

    aspect-ratio: ${props => {
        return props.ratio ? props.ratio : null
    }};
`

const Img = styled.img`
    object-fit: contain;
    width: 100%;
`

const Article = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: ${props => {
        return props.padding ? props.padding : null
    }};
    box-sizing: border-box;
`

const P = styled(commonP)`
    font-family: ${props => {
        return props.family ? props.family : "esamanru"
    }};
    white-space: pre-line;
`
const Span = styled.span`
    position: relative;
    color: ${CommonStyle.setColor("orange")};
`

const SchoolarShipArticle = (props) => {

    const data = props.children
    let txt = data.txt.txt
    const accent = data.txt.accent
    const isMobile = useRecoilValue(isMobileState)
    
    return(
        <Div width={ !isMobile ? "296px" : "155px" } ratio="1 / 1" backgroundColor={ data.backgroundColor ? "orange" : "white" } radius="20px">
            <Article padding={ !isMobile ? "30px 18px 20px 25px" : isMobile && props.num ? "14px" : "18px 6px 10px 13px" } paddingTop={ isMobile && props.num ? "17px" : null }>
                <Div>
                    {
                        accent?
                        <P size={ !isMobile ? "medium" : "small" }>
                            { txt.split(accent)[0] && txt.split(accent)[0] }
                            <Span>{accent}</Span>
                            { txt.split(accent)[1] && txt.split(accent)[1] }
                        </P>:
                        <P 
                            size={ !isMobile ? "medium" : "small" } 
                            color={ data.backgroundColor ? "white" : "black" }
                        >
                            {txt}
                        </P>
                    }
                </Div>
                <Div flex={ !props.num ? "row_between" : "column_between" }>
                    <Div 
                        width={ 
                            !props.num && !isMobile ? 
                            "fit-content": 
                            !props.num && isMobile ? 
                            "82px":
                            props.num && !isMobile?
                            "100px":
                            "45px" 
                        } 
                        maxWidth={ !isMobile ? null : "82px" } 
                        flex="row_center"
                    >
                        <Img src={data.img}/>
                    </Div>
                    {
                        data.stamp && data.stamp.bool &&
                        <Div flex="column_between" alignItems="flex-end" height="100%" width="fit-content">
                            <Div></Div>
                            <Div flex="row_center" radius="50%" backgroundColor="orange" width={ !isMobile ? "64px" : "35px" } height={ !isMobile ? "64px" : "35px" }>
                                <P color="white" family="pretendard" weight="700" size={ !isMobile ? "medium" : null }  style={{ fontSize: !isMobile ? null : 10 }}>
                                    { data.stamp.content }
                                </P>
                            </Div>
                        </Div>
                    }
                    {
                        props.num && data.num &&
                        <Div flex="row_end" marginTop={ !isMobile ? "22px" : "8px" }>
                            <P color={ data.backgroundColor ? "bk" : "orange" } size={ !isMobile ? "medium" : "small_medium" } lineHeight="32px" weight="500">
                                { Number( data.num ).toLocaleString() }
                            </P>
                        </Div>
                    }
                </Div>
            </Article>
        </Div>
    )
}

export default SchoolarShipArticle