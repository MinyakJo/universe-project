import React from "react"
import P from "components/common/P"
import { Div, CloseButton, Img } from "components/container/Dialog"
import styled from "styled-components"

const Contents = styled(P)`
    width: 100%;
    white-space: pre-line;
    word-break: break-all;
`

const Patent = (props) => {

    const data = props.children
    const reset = props.reset

    const onClickEvent = (e) => {
        if(e.target.id){
            reset()
        }
    }

    return(
        <Div position="relative" flex="column" maxWidth="580px" maxHeight="830px" backgroundColor="white" radius="10px" onClick={onClickEvent}>
            <CloseButton/>
            <Div height="100%" overflow="hidden" overflowY="auto" padding="25px 30px">
                <Div flex="row" marginBottom="11px">
                    <Div flex="row" minWidth="50px" backgroundColor="orange" radius="4px" width="fit-content" padding="3px 13px" marginRight="8px">
                        <P color="white" weight="400" lineHeight="19px" style={{ fontSize: 13 }}>특허</P>
                    </Div>
                    <Div flex="row" width="calc( 100% - 50px )" minHeight="40px" wrap="wrap"> 
                        <Contents color="grey7" size="small_medium" weight="700">
                            { data?.title ? data.title : null }
                        </Contents>
                    </Div>
                </Div>
                <Div flex="row">
                    {
                        data?.img && data.img &&
                        <Img src={ data.img }/>
                    }
                </Div>
            </Div>
        </Div>
    )
}

export default Patent