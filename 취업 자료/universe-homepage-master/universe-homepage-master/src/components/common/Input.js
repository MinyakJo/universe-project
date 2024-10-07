// ======= Library =======

import styled from 'styled-components';

// ======= Module =======

import CommonStyle from "components/commonStyle"

// ======= Style =======

const Input = styled.input`

    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    
    color: ${props => {
        return CommonStyle.setColor(props.color)
    }};
    font-family: ${props => {
        return props.family ? props.family : "regular"
    }};
    font-size: ${props => {
        return CommonStyle.setFontSize(props.size)
    }};
    font-weight: ${props => {
        return props.weight ? props.weight : "400"
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

export default Input