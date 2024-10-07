import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import commonButton from "components/common/Button"
import commonP from "components/common/P"
import CommonStyle from "components/style"
import check from "../../../svg/check.svg"
import { useNavigate } from "react-router-dom"

const Div = styled(commonDiv)`
    background-color: ${props => {
        return props.backgroundColor ? `${CommonStyle.setColor(props.backgroundColor)}` : "transparent"
    }};

    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : null
    }};

    padding: ${props => {
        return props.padding ? props.padding : null
    }};
`

const Img = styled.img`
    object-fit: contain;
`

const Button = styled(commonButton)`
`

const P = styled(commonP)`
    line-height: ${props => {
        return props.lineHeight ? props.lineHeight : null
    }};

    font-size: ${props => {
        return props.fontSize ? props.fontSize : null
    }};

    white-space: nowrap;
`

const Pass = (props) => {

    const data = props.children
    const navigate = useNavigate()

    const onClickEvent = (e) => {
        const id = e.target.id

        if(id){
            navigate(id)
        }
    }

    return(
        <Div flex="column_center" maxWidth="380px" height="650px" padding="38px 70px 42px 70px" backgroundColor={props.backgroundColor} marginRight="10px" marginLeft="10px" radius="10px" marginBottom={props.marginBottom}>
            <Div flex="row_center" radius="20px" backgroundColor="white" maxWidth="92px" height="33px" marginBottom="20px">
                <P weight="500" size="extra_small">
                    {data.top}
                </P>
            </Div>
            <Div flex="column_center" marginBottom="28px">
                <Div width="fit-content" marginBottom="11px">
                    <P weight="500" size="small_large" color="white">{data.subTitle}</P>
                </Div>
                <Div width="fit-content">
                    <P weight="500" fontSize="38px" color="white" family="esamanru">{data.title}</P>
                </Div>
            </Div>
            <Div flex="row_center" marginBottom="19px" height="155px">
                <Img src={data.img}/>
            </Div>
            <Div marginBottom="30px">
                {
                    data.checkList && data.checkList.map((e, i) => 
                        <Div flex="row" key={i}>
                            <Div flex="row_center" width="fit-content" marginRight="16px">
                                <Img src={check}/>
                            </Div>
                            <Div flex="row_center" width="fit-content">  
                                <P weight="500" size="small_large" color="white" lineHeight="210%">{e}</P>
                            </Div>
                        </Div>
                    )
                }
            </Div>
            <Div width="180px" height="48px" onClick={onClickEvent}>
                <Button id={props.href} size="small_medium" radius="4px" backgroundColor={data.btn.background} color={data.btn.color}>
                    자세히보기
                </Button>
            </Div>
        </Div>
    )
}

export default Pass