// ===== Library =====

import styled from 'styled-components'

// ===== Module =====

import CommonStyle from 'components/style'

// ===== Style =====

const Icon = styled.div`
    ${props => {
        return props.flex ? CommonStyle.setFlex(props.flex) : "display: flex"
    }};

    width: ${props => {
        return props.width ? props.width : null
    }};

    min-width: ${props => {
        return props.width ? props.width : null
    }};

    padding: ${props => {
        return props.padding ? props.padding : null
    }};

    padding-left: ${props => {
        return props.paddingLeft ? props.paddingLeft : null
    }};

    padding-right: ${props => {
        return props.paddingRight ? props.paddingRight : null
    }};

    padding-top: ${props => {
        return props.paddingTop ? props.paddingTop : null
    }};

    padding-bottom: ${props => {
        return props.paddingBottom ? props.paddingBottom : null
    }};

    margin-left: ${props => {
        return props.marginLeft ? props.marginLeft : null
    }};

    margin-right: ${props => {
        return props.marginRight ? props.marginRight : null
    }};

    aspect-ratio: ${props => {
        return props.ratio ? props.ratio : "1/1"
    }};;

    border-radius: ${props => {
        return props.radius ? props.radius : null
    }};

    background-color: ${props => {
        return props.backgroundColor ? CommonStyle.setColor(props.backgroundColor) : null
    }};

    overflow: hidden;
    box-sizing: border-box;
`

export default Icon