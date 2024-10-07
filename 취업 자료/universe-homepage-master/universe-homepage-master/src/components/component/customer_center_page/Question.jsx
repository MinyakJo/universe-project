import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import H1 from "components/common/H1"
import H2 from "components/common/H2"
import P from "components/common/H2"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"

const Div = styled(commonDiv)`
    box-shadow: ${props => {
        return props.shadow ? props.shadow : null
    }};
    cursor: pointer;
`

const Title = styled(H2)`
    display: -webkit-box;
    width: 100%;
    white-space: pre-line;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${props => {
        return props.isMobile ? 1 : 2
    }};
    cursor: pointer;
`

const Answer = styled(P)`
    display: -webkit-box;
    width: 100%;
    white-space: pre-line;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${props => {
        return props.isMobile ? 3 : 4
    }};
    cursor: pointer;
`

const Question = (props) => {

    const isMobile = useRecoilValue(isMobileState)
    const data = props.children
    const navigate = useNavigate()

    const onClickEvent = (e) => {
        const id = e.target.id

        if(id){
            navigate(`/faqs/${id}`)
        }
    }

    return(
        <Div 
            flex="column_top" 
            width={ !isMobile ? "280px" : "335px" }
            height={ !isMobile ? "250px" : "170px" }
            radius="10px" 
            padding={ !isMobile ? "28px 22px" : "20px 16px" }
            paddingBottom={ !isMobile ? "22px" : null } 
            marginBottom={ !isMobile ? "20px" : "16px" }
            backgroundColor="white"
            marginRight={ props.marginRight ? props.marginRight : null } 
            shadow="0px 0px 8px rgba(0, 0, 0, 0.1)"
            onClick={onClickEvent}
        >
            <Div flex="row" marginBottom={ !isMobile ? "17px" : "10px" } id={ data.id }>
                <Div 
                    flex="row_center" 
                    backgroundColor="orange" 
                    radius="50%" 
                    width={ !isMobile ? "28px" : "22px" } 
                    ratio="1/1" 
                    marginRight="7px" 
                    id={ data.id }
                >
                    <P 
                        lineHeight={ !isMobile ? "24px" : "22px" } 
                        weight="700" 
                        family="pretendard" 
                        style={{ 
                            color: "#FFF1ED",
                            fontSize: !isMobile ? 20 : 13
                        }} 
                        id={ data.id }
                    >
                        Q
                    </P>
                </Div>
                <Div width="fit-content">
                    <H1 
                        color="orange" 
                        weight="700" 
                        size={ !isMobile ? "medium_small" : "extra_small" } 
                        lineHeight={ !isMobile ? "29px" : "20px" } 
                        id={ data.id }
                    >
                        {
                            data && data.category &&
                            data.category
                        }
                    </H1>
                </Div>
            </Div>
            <Div flex="row" paddingBottom="12px" id={ data.id }>
                <Title 
                    color="grey6" 
                    size={ !isMobile ? "small_large" : "extra_small" } 
                    weight="700" 
                    lineHeight={ !isMobile ? "27px" : "21px" } 
                    id={ data.id }
                    isMobile={ isMobile }
                >
                    {
                        data && data.question &&
                        data.question
                    }
                </Title>
            </Div>
            <Div flex="row" id={ data.id }>
                <Answer 
                    color="grey6" 
                    lineHeight={ !isMobile ? "22px" : "21px" } 
                    weight="400" 
                    style={{ fontSize: !isMobile ? 14 : 13 }}
                    id={ data.id }
                    isMobile={ isMobile }
                >
                    {
                        data && data.answer &&
                        data.answer
                    }
                </Answer>
            </Div>
        </Div>
    )
}

export default Question