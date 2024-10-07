import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import commonP from "components/common/P"
import CommonStyle from "components/style"
import { useRecoilValue } from "recoil"
import { promotionState } from "recoil/mainAtom"

const Div = styled(commonDiv)`
    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : "none"
    }};
    background-color: ${props => {
        return props.backgroundColor ? `${CommonStyle.setColor(props.backgroundColor)}` : "transparent"
    }};
    border-bottom: ${props => {
        return props.borderBottom ? `1px solid ${CommonStyle.setColor(props.borderBottom)}` : null
    }};
    background: ${props => {
        return props.background ? props.background : null
    }};
`

const P = styled(commonP)`
    cursor: default;
    font-family: "esamanru";
`


const Timer = () => {

    const overDate = useRecoilValue( promotionState )
    const [ day, setDay ] = useState(0)
    const [ hour, setHour ] = useState(0)
    const [ min, setMin ] = useState(0)
    const [ sec, setSec ] = useState(0)
    const [ milSec, setMilSec ] = useState(0)
    const timer = useCallback(() => {
        if( overDate?.end ){
            const now = new Date().getTime()
            const over = new Date( overDate.end )
            const newDate = new Date(over.getTime() - now)
            setDay(Math.floor((newDate % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)))
            setHour(Math.floor((newDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
            setMin(Math.floor((newDate % (1000 * 60 * 60)) / (1000 * 60)))
            setSec(Math.floor((newDate % (1000 * 60)) / 1000))
            setMilSec((Math.floor((newDate % 1000) / 10)))
        }
    }, [ overDate ])

    useEffect(() => {
        const countdown = setInterval(timer, 10)

        return () => clearInterval(countdown)
    }, [ timer ])

    return(
        <Div flex="row" width="220px">
            <Div flex="row" width="fit-content">
                <P size="medium_small" color="orange" weight="300">
                    { day < 10 ? `0${day}` : day }
                </P>
            </Div>
            <Div flex="row" width="fit-content" marginTop="4px">
                <P size="extra_small" color="orange" weight="300">
                    일
                </P>
            </Div>
            <Div flex="row" width="fit-content" marginLeft="8px">
                <P size="medium_small" color="orange" weight="300">
                    { hour < 10 ? `0${hour}` : hour }
                </P>
            </Div>
            <Div flex="row" width="fit-content" marginTop="4px">
                <P size="extra_small" color="orange" weight="300">
                    시
                </P>
            </Div>
            <Div flex="row" width="fit-content" marginLeft="8px">
                <P size="medium_small" color="orange" weight="300">
                    { min < 10 ? `0${min}` : min }
                </P>
            </Div>
            <Div flex="row" width="fit-content" marginTop="4px">
                <P size="extra_small" color="orange" weight="300">
                    분
                </P>
            </Div>
            <Div flex="row" width="fit-content" marginLeft="8px">
                <P size="medium_small" color="orange" weight="300">
                    { sec < 10 ? `0${sec}` : sec }
                </P>
            </Div>
            <Div flex="row" width="fit-content" marginTop="4px">
                <P size="extra_small" color="orange" weight="300">
                    초
                </P>
            </Div>
            <Div flex="row" width="fit-content" marginLeft="8px">
                <P size="medium_small" color="orange" weight="300">
                    { milSec < 10 ? `0${milSec}` : milSec }
                </P>
            </Div>
        </Div>
    )
}

export default Timer