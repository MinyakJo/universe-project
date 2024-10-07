import React from "react"
import Div from "components/common/Div"
import H1 from "components/common/H1"
import H2 from "components/common/H2"
import background from "../../../image/login_page/background.png"

const LeftDisplay = (props) => {
    
    return (
        <Div flex="column" src={ background } height="100vh">
            <Div flex="row_center" marginBottom="17px">
                <H1 
                    color="white" 
                    weight={ props.login ? "700" : "500" } 
                    size={ props.login ? "extra_large" : "large" } 
                    lineHeight={ props.login ? "47px" : "45px" } 
                    family="esamanru" 
                    style={{ whiteSpace: "pre-line", textAlign: "center" }}
                >
                    { 
                        props.children && props.children.title ?
                        props.children.title :
                        props.children
                    }
                </H1>
            </Div>
            {
                props.children.title &&
                <Div flex="row_center">
                    <H2 color="white" size="small_large" lineHeight="24px" weight="500" >
                        { props.children.subtitle }
                    </H2>
                </Div>
            }
        </Div>
    )
}

export default React.memo( LeftDisplay )