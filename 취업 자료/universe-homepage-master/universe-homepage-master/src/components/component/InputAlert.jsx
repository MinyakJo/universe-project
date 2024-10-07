import React from "react"
import info from "../../svg/info.svg"
import Div from "components/common/Div"
import P from "components/common/P"
import styled from "styled-components"

const Img = styled.img`
    width: 100%;
    object-fit: 100%;
`

const InputAlert = (props) => {
    return (
        <Div flex="row" marginTop="9px">
            <Div width="22px" minWidth="22px" height="22px" marginRight="6px">
                <Img src={info}/>
            </Div>
            <Div flex="row" paddingBottom="2px">
                <P color="red" weight="500" lineHeight="150%" style={{ fontSize: 13 }}>
                    { props.children }
                </P>
            </Div>
        </Div>
    )
}

export default InputAlert