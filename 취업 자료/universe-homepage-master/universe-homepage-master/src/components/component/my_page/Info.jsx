import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import CommonStyle from "components/style"
import Button from "components/common/Button"
import P from "components/common/P"
import default_profile from "../../../svg/default_profile.svg"
import { useRecoilState, useRecoilValue } from "recoil"
import { dialogState } from "../../../recoil/dialogAtom"
import { isMobileState } from "recoil/mainAtom"

const Div = styled(commonDiv)`
    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};

    border-bottom: ${props => {
        return props.borderBottom ? `1px solid ${CommonStyle.setColor(props.borderBottom)}` : null
    }};

    box-shadow: ${props => {
        return props.shadow ? props.shadow : null
    }};

    cursor: ${props => {
        return props.cursor ? props.cursor : null
    }};

    overflow: ${({ overflow }) => {
        return overflow ? overflow : null
    }};
`

const Img = styled.img`
    width: 100%;
    object-fit: contain;
`

const Guide = styled(P)`
    font-size: ${props => {
        return props.isMobile ? `${CommonStyle.setFontSize("small")}` : `${CommonStyle.setFontSize("small_large")}`
    }};
    font-weight: 500;
    color: ${CommonStyle.setColor("grey4")};
`

const Info = (props) => {

    const isMobile = useRecoilValue(isMobileState)
    const data = props.children
    const [ dialog, setDialog ] = useRecoilState(dialogState)

    const onClickEvent = (e) => {
        const id = e.target.id
        const copy = {...dialog}

        switch(id){
            case "pw":
                copy.textType = "pw"
                copy.btnType = "2"
                break
            case "tel":
                copy.textType = "tel"
                copy.btnType = "2"
                break
            case "date":
                copy.textType = "birthDate"
                copy.btnType = "2"
                break
            case "profile":
                copy.textType = "profile"
                copy.btnType = "2"
                break
            case "grade":
                copy.textType = "grade"
                copy.btnType = "2"
                break
            default:
                break
        }
        
        copy.isOpen = true
        setDialog(copy)
    }

    return(
        <Div flex="row">
            <Div 
                flex={ 
                    props.img ? "row_top" : 
                    props.profile ? "row_bottom":
                    "row" 
                } 
                width={ !isMobile ? "100px" : "96px" } 
                minWidth={ !isMobile ? "100px" : "96px" } 
                marginRight={ !isMobile ? "21px" : null }
                height={ !isMobile ? "70px" : "55px" }
            >
                <Guide isMobile={ isMobile }>
                    {
                        data && data.guide &&
                        data.guide
                    }
                </Guide>
            </Div>
            <Div flex="row_between" borderBottom="grey1" height={ !isMobile ? "70px" : "55px" } padding="1px">
                {
                    (props.img || props.profile) &&
                    <Div 
                        flex="row_center"
                        width={ !isMobile ? "53px" : "32px" } 
                        minWidth={ !isMobile ? "53px" : "32px" } 
                        height={ !isMobile ? "53px" : "32px" } 
                        borderColor={ data?.img ? "orange" : null } 
                        radius="50%" 
                        marginRight="13px"
                        overflow="hidden"
                    >
                        {
                            data?.img ?
                            <Img src={ `${ process.env.REACT_APP_API_URL }${ data.img }` }/>:
                            <Img src={ default_profile }/>
                        }
                    </Div>
                }
                {
                    !props.password ?
                    <Div>
                        <P 
                            weight={ props.img ? null : "500"} 
                            size={ !isMobile ? "small_large" : "small" } 
                            lineHeight="130%" 
                            color={ props.img ? "grey5" : "bk" }
                        >
                            {
                                data && data.text &&
                                data.text
                            }
                        </P>
                    </Div>:
                    <Div flex="row">
                        {password(data.text)}
                    </Div>
                }
                {
                    props.change &&
                    <Div 
                        id={ data.id ? data.id : null } 
                        flex="row_center" 
                        width={ !isMobile ? "94px" : "53px" } 
                        minWidth={ !isMobile ? "94px" : "53px" } 
                        height={ !isMobile ? "42px" : "30px" } 
                        radius="4px" 
                        borderColor="orange" 
                        onClick={onClickEvent}
                    >
                        <Button 
                            color="orange" 
                            weight="500"
                            style={{ fontSize: !isMobile ? 18 : 11 }}
                            id={ data.id ? data.id : null }
                        >
                            변경하기
                        </Button>
                    </Div>
                }
            </Div>
        </Div>
    )
}

const password = (data) => {
    const list = []

    if(data){
        for(let i = 0; i < data.length; i++){
            list.push(<Div key={i} width="7px" height="7px" radius="50%" marginRight="5px" backgroundColor="black"/>)
        }
    }

    return list
}

export default Info