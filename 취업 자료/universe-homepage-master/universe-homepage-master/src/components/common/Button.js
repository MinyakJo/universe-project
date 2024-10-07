// ======= Library =======

import styled from 'styled-components';

// ======= Module =======

import CommonStyle from "components/style"

// ======= Style =======

const Button = styled.button`

    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: none;
    cursor: pointer;
    outline: none;
    user-select: none;

    ${props => {
        return props.flex ? CommonStyle.setFlex(props.flex) : null
    }};
    
    color: ${props => {
        return props.color ? CommonStyle.setColor(props.color) : CommonStyle.setColor("black")
    }};
    font-family: ${props => {
        return props.family ? props.family : "regular"
    }};
    font-size: ${props => {
        return props.size ? CommonStyle.setFontSize(props.size) : CommonStyle.setFontSize("medium")
    }};
    font-weight: ${props => {
        return props.weight ? props.weight : "400"
    }};
    line-height: ${props => {
        return props.lineHeight ? props.lineHeight: null
    }};

    background-color: ${props => {
        return props.backgroundColor ? CommonStyle.setColor(props.backgroundColor) : CommonStyle.setColor("none")
    }};
    border: ${props => {
        return props.borderColor ? `1px solid ${CommonStyle.setColor(props.borderColor)}` : null
    }};
    border-radius: ${props => {
        return props.radius ? props.radius : null 
    }};
`

export default Button