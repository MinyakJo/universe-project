import React from "react"
import styled from "styled-components"
import Div from "components/common/Div"
import P from "components/common/P"
import CommonStyle from "components/style"
import { InputGuideBox, StyledInput } from "../find_page/InputBox"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import InputAlert from "../InputAlert"
import Button from "components/common/Button"

const Guide = styled(P)`
    color: ${CommonStyle.setColor("bk")};
    font-size: ${props => {
        return props.isMobile ? `${CommonStyle.setFontSize("small")}` : `${CommonStyle.setFontSize("small_medium")}`
    }};
    line-height: 130%;
    font-weight: 600;
`

const Span = styled.span`
    color: ${props => {
        return props.color ? `${CommonStyle.setColor(props.color)}` : `${CommonStyle.setColor("orange")}`
    }};
`

const AccountInputBox = (props) => {

    const isMobile = useRecoilValue(isMobileState)
    const childrenIsArray = Array.isArray(props.children)

    return (
        <Div flex="column" marginBottom={ props.children ? "30px" : null }>
            {
                props.children &&
                <InputGuideBox flex="row_between">
                    <Div width="fit-content">
                        <Guide isMobile={ isMobile }>
                            { 
                                childrenIsArray ? 
                                props.children[0] : 
                                props.children  
                            }
                            { props.required && <Span>*</Span> }
                        </Guide>
                    </Div>
                    {
                        props.required && props.first &&
                        <Div width="fit-content">
                            <Guide isMobile={ isMobile }>
                                (<Span>*</Span>)표시 필수 입력
                            </Guide>
                        </Div>
                    }
                </InputGuideBox>
            }
            <Div flex={ props.code ? "row" : null }>
                <StyledInput 
                    isMobile={ isMobile }
                    type={ props.type ? props.type : "text" } 
                    id={ props.id } 
                    placeholder={ props.placeholder }
                    onChange={ props.onChange }
                    onBlur={ props.onBlur }
                    disabled={ props.disabled ? props.disabled : null }
                    maxLength={ props.maxLength }
                    value={ props.value ? props.value : props.type === "password" ? null : "" }
                    autoComplete="off"
                />
                {
                    props.code &&
                    <Div 
                        width={ !isMobile ? "126px" : "80px" } 
                        height="100%" 
                        backgroundColor="orange"
                        radius="4px" 
                        style={{ 
                            minWidth: !isMobile ? "126px" : "80px", 
                            whiteSpace: "nowrap" 
                        }}
                        marginLeft="15px"
                    >
                        <Button weight="500" style={{ fontSize: !isMobile ? 16 : 12 }} color="white" id={ props.code.id }>
                            { props.code.text }
                        </Button>
                    </Div>
                }
            </Div>
            <Div 
                marginBottom={
                    Array.isArray(props.children) ?
                    !isMobile ? "17px" : "14px" : 
                    props.code ? "15px" : null
                }
            >
                {
                    props.alert && 
                    Array.isArray(props.alert.message) ?
                    <>
                        {   
                            props.alert.message.map((e, i) =>
                                <React.Fragment  key={i}>
                                    {
                                        props.alert.hidden[i] === false &&
                                        <InputAlert>
                                            { e }
                                        </InputAlert>
                                    }
                                </React.Fragment>
                            )
                        }
                    </>:
                    props.alert.hidden === false &&
                    <InputAlert>
                        { props.alert.message }
                    </InputAlert>
                }
            </Div>
            {
                childrenIsArray &&
                props.children[1]
            }
        </Div>
    )
}

export default AccountInputBox