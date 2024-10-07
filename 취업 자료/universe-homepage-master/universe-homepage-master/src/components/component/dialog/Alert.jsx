import React from "react"
import P from "components/common/P"
import { Div, CloseButton, ButtonComponent, Title } from "components/container/Dialog"
import { useNavigate } from "react-router-dom"

const Alert = (props) => {

    const data = props.children.data
    const bt = props.children.bt
    const reset = props.reset

    const navigate = useNavigate()

    const onClickEvent = (e) => {
        const id = e.target.id

        switch(id){
            case "close":
                reset()
                return
            case "back":
                navigate( -1 )
                reset()
                return
            case "login":
                navigate( `/${ id }`, { replace: true } )
                reset()
                return
            case "home":
                navigate( "/", { replace: true } )
                reset()
                return
            case "passes":
                navigate( "/passes", { replace: true } )
                reset()
                return
            case "pwCheck":
                navigate( "/find-password", { replace: true } )
                reset()
                return
            default:
        }
    }

    return(
        <Div position="relative" maxWidth="500px" backgroundColor="white" radius="20px" onClick={ onClickEvent }>
            <CloseButton id={ data?.navigate ? data.navigate : null }/>
            <Div flex="column_between" padding="56px 40px" paddingBottom="0px">
                <Div flex="row_center" marginBottom="21px">
                    <Title>알림</Title>
                </Div>
                <Div flex="row_center">
                    <P color="bk" size="small_large" lineHeight="23px" weight="500">
                        { data?.message ? data.message : null }
                    </P>
                </Div>
            </Div>
            <ButtonComponent>
                {{
                    id: data?.navigate ? data.navigate : "close", 
                    type: bt,
                }}
            </ButtonComponent>
        </Div>
    )
}

export default Alert