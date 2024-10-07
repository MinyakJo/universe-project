// ===== Library =====

import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import { useMediaQuery } from "react-responsive"
import { useSetRecoilState } from "recoil"

// ===== Components =====

import Router from "components/Router"
import Menu from "components/container/Menu"

// ===== Module =====

import GlobalFonts from "font/font"
import Dialog from "components/container/Dialog"
import { isMobileState } from "recoil/mainAtom"
import useScrollToTop from "hooks/useScrollToTop"

// ===== Code =====

const Div = styled(commonDiv)`
    position: fixed;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
    overflow-x: ${({ overflowX }) => {
        return overflowX ? overflowX : null
    }};
    overflow-y: auto;
    z-index: 5;
    
    @media screen and (max-width: 1180px) {
        display: block;
    }

    &::-webkit-scrollbar{
        width: 10px;
        height: 10px;

        @media screen and (max-width: 500px) {
            width: 0px;
            height: 0px;
        }
    }
    &::-webkit-scrollbar-thumb{
        background-color: #D7D7D7;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track-piece{
        background-color: #00000000;
    }
`

const StyledApp = styled(commonDiv)`
    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : null
    }};
    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};
`

const App = () => {

    const ref = useRef()
    const setIsMobile = useSetRecoilState( isMobileState )
    const mq = useMediaQuery({
        query: "(max-width: 500px)"
    })

    useScrollToTop( ref )

    useEffect(() => {
        setIsMobile( mq )
    }, [ setIsMobile, mq ])

    return(
        <Div flex="row_top" ref={ ref } maxWidth={ mq ? null : "1920px" } minWidth={ mq ? "360px" : "1180px" } overflowX={ mq ? "hidden" : "auto" }>
            <StyledApp maxWidth={ mq ? null : "1920px" } minWidth={ mq ? "360px" : "1180px" }>
                <GlobalFonts/>
                <Router/>
            </StyledApp>
            <Dialog/>
            {
                mq &&
                <Menu/>
            }
        </Div>
    )
}

export default App