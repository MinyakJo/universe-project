import React from "react"
import { useRecoilValue } from "recoil"
import styled from "styled-components"
import { isMobileState } from "recoil/mainAtom"
import commonDiv from "components/common/Div"
import Button from "components/common/Button"
import P from "components/common/P"
import { Input } from "components/container/Dialog"
import CommonStyle from "components/style"
import InputAlert from "../InputAlert"

const Div = styled(commonDiv)`
    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};
    
    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : null
    }};
`

const StyledInput = styled(Input)`
    font-size: ${props => {
        return props.isMobile ? `${CommonStyle.setFontSize("extra_small")}` : null
    }};
    padding: ${props => {
        return props.isMobile ? "9.5px 11px" : null
    }};
`

const InputGuide = styled(P)`
    color: ${CommonStyle.setColor("bk")}; 
    font-size: ${props => {
        return props.isMobile ? `${CommonStyle.setFontSize("small")}` : `${CommonStyle.setFontSize("small_medium")}`
    }};
    font-weight: 500;
    line-height: 130%;
`

const InputGuideBox = styled(commonDiv)`
    margin-bottom: ${props => {
        return props.isMobile ? "10px" : "12px"
    }};
`

export { StyledInput, InputGuide, InputGuideBox }

const InputBox = (props) => {

    const isMobile = useRecoilValue(isMobileState)

    return(
        <Div flex="column" marginBottom={ props.marginBottom }>
            <InputGuideBox isMobile={ isMobile }>
                <InputGuide isMobile={ isMobile }>
                    { props.children }
                </InputGuide>
            </InputGuideBox>
            <Div flex="row" height={ !isMobile ? "50px" : "45px" }>
                <Div height="100%">
                    <StyledInput
                        isMobile={ isMobile }
                        type={ props.type ? props.type : "text" }
                        placeholder={ props.placeholder }
                        id={ props.id } 
                        onChange={ props.onChange } 
                        autoComplete="off" 
                        maxLength={ props.maxLength }
                        disabled={ props.disabled ? props.disabled : null } 
                        value={ props.value ? props.type !== "password" ? props.value : "" : null }
                    />
                </Div>
                {
                    props.code &&
                    <Div flex="row_center" width="110px" minWidth="110px" height="100%" backgroundColor="orange" radius="4px" marginLeft="12px">
                        <Button color="white" size="small_medium" weihgt="500" id={ props.code } onClick={ props.onClick }>
                            인증번호 요청
                        </Button>
                    </Div>
                }
            </Div>
            {
                props.alert && props.alert.hidden === false &&
                <InputAlert>
                    { props.alert.message }
                </InputAlert>
            }
        </Div>
    )
}

export default InputBox