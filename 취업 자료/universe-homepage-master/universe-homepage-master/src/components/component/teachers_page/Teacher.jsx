import React from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import commonDiv from "components/common/Div"
import commonH1 from "components/common/H1"
import P from "components/common/P"
import search from "../../../svg/search.svg"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import Img from "components/common/Img"

const Div = styled(commonDiv)`
    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : null
    }};

    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};

    align-items: ${props => {
        return props.align ? props.align : null
    }};

    margin: ${props => {
        return props.margin ? props.margin : null
    }};

    overflow: ${({ overflow }) => {
        return overflow ? overflow : null
    }};
`

const Profile = styled(Div)`
    position: relative;
    aspect-ratio: ${props => {
        return props.ratio ? props.ratio : null
    }};
    &:hover #hoverBox{
        display: flex;
    }
`

const HoverBox = styled(Div)`
    position: absolute;
    height: 100%;
    z-index: 2;
    top: 0;
    left: 0;
    display: none;
    border: 1px solid ${CommonStyle.setColor("orange")};
    cursor: pointer;
`

const Background = styled(Div)`
    position: absolute;
    height: 100%;
    opacity: 0.7;
    cursor: pointer;
`

const CoverImg = styled(Img)`
    object-position: bottom;
`

const Span = styled.span`
    color: ${CommonStyle.setColor("orange")};
`

const H1 = styled(commonH1)`
    display: -webkit-box;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    white-space: pre-line;
`

const Teacher = (props) => {

    const isMobile = useRecoilValue(isMobileState)
    const data = props.children
    const navigate = useNavigate()

    const onClickEvent = (e) => {
        const id = e.target.id
        
        if(id){
            navigate(`/teachers/${id}`)
        }
    }

    return(
        <Profile 
            flex="column_between" 
            width={ !isMobile ? "280px" : `calc(50% - 7.5px)` }
            marginRight={ props.marginRight ? props.marginRight : null }
            paddingTop={ !isMobile ? "32px" : "18px" }
            paddingLeft={ !isMobile ? "20px" : "11px" }
            backgroundColor="admin_bg"
            marginBottom={ !isMobile ? "20px" : "15px" }
            ratio="1 / 1.25"
        >
            <HoverBox id="hoverBox" flex="row_center" onClick={onClickEvent}>
                <Background id={ data.id } backgroundColor="admin_bg"/>
                <Div flex="row_center" width={ !isMobile ? "48px" : "28px" } height={ !isMobile ? "48px" : "28px" } radius="50%" backgroundColor="orange" style={{ position: "relative", zIndex: 3 }}>
                    <Div flex="row_center" width={ !isMobile ? "24px" : "12px" } height={ !isMobile ? "24px" : "12px" }>
                        <Img src={ search } id={data.id}/>
                    </Div>
                </Div>
            </HoverBox>
            <Div flex="row" paddingRight={ !isMobile ? "40px" : "14px" } marginBottom={ !isMobile ? "14px" : "4px" }>
                {
                    data && data.introduction &&
                    <H1 color="bk" weight="700" size={ !isMobile ? "medium_large" : "small_medium" } lineHeight={ !isMobile ? "36px" : "22px" }>
                        { data.introduction }
                    </H1>
                }
            </Div>
            <Div flex="row_between" align="end">
                <Div flex="row" paddingBottom={ !isMobile ? "43px" : "20px" }>
                    <Div flex="row" width="fit-content" marginRight="4px">
                    {
                        data && data.name &&
                        <P color="bk" weight="700" size={ !isMobile ? "small_medium" : "extra_small" } lineHeight={ !isMobile ? "23px" : "21px" }>
                            <Span>{ data.name }</Span>{ isMobile && <br/> }선생님
                        </P>
                    }
                    </Div>
                </Div>
                <Div flex="row_center" minWidth={ !isMobile ? "150px" : "85px" } height={ !isMobile ? "230px" : "132px" } width={ !isMobile ? "150px" : "85px" } overflow="hidden">
                    {
                        data && data.profile && 
                        <CoverImg width="fit-content" height="100%" src={ `${ process.env.REACT_APP_API_URL }${ data.profile }` } fit="cover"/>
                    }
                </Div>
            </Div>
        </Profile>
    )
}

export { Profile, HoverBox, Background }
export default Teacher