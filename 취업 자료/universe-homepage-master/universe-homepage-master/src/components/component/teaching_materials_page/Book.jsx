import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import H1 from "components/common/H1"
import commonP from "components/common/P"
import search from "../../../svg/search.svg"
import { Profile, HoverBox, Background } from "../teachers_page/Teacher"
import { useNavigate } from "react-router-dom"
import { isMobileState } from "recoil/mainAtom"
import { useRecoilValue } from "recoil"

const Title = styled(H1)`
    display: -webkit-box;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    white-space: pre-line;
    text-align: center;
`

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
    overflow: ${({ overflow }) => {
        return overflow ? overflow : null;
    }};
`

const Img = styled.img`
    width: 100%;
    object-fit: contain;
`

const P = styled(commonP)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
`

const Book = (props) => {

    const isMobile = useRecoilValue(isMobileState)
    const data = props.children
    const navigate = useNavigate()

    const onClickEvent = (e) => {
        const id = e.target.id
        
        if(id){
            navigate(`/teaching-materials/${id}`)
        }
    }

    return(
        <Profile
            flex="column_between"
            width={ !isMobile ? "380px" : `calc(50% - 7.5px)` }
            marginRight={ props.marginRight ? props.marginRight : null } 
            padding={ !isMobile ? "19px 39px" : "12px 16px" }
            paddingBottom={ !isMobile ? "33px" : "16px" }
            backgroundColor="white" 
            marginBottom={ !isMobile ? "20px" : "15px" }
            ratio={ !isMobile ? "1 / 1.07" : "1 / 1.41" }
        >
            <HoverBox id="hoverBox" flex="row_center" onClick={onClickEvent}>
                <Background id={data.id} backgroundColor="admin_bg"/>
                <Div flex="row_center" width={ !isMobile ? "48px" : "28px" } height={ !isMobile ? "48px" : "28px" } radius="50%" backgroundColor="orange" style={{ position: "relative", zIndex: 3 }}>
                    <Div flex="row_center" width={ !isMobile ? "24px" : "12px" } height={ !isMobile ? "24px" : "12px" }>
                        <Img src={ search } id={ data.id }/>
                    </Div>
                </Div>
            </HoverBox>
            <Div flex="row_center">
                <Title weight="700" size={ !isMobile ? "medium" : "extra_small" } lineHeight="140%" color="bk">
                    { data?.name && data.name }
                </Title>
            </Div>
            <Div flex="row_center" maxWidth={ !isMobile ? "180px" : "93px" } backgroundColor="grey1">
                {
                    data?.img && data.img &&
                    <Img src={`${ process.env.REACT_APP_API_URL }${ data.img }`}/>
                }
            </Div>
            <Div flex="row_center">
                <P color="bk" weight="400" style={{ fontSize: !isMobile ? 16 : 12 }} lineHeight="140%">
                    { data?.introduction && data.introduction }
                </P>
            </Div>
        </Profile>
    )
}

export default Book