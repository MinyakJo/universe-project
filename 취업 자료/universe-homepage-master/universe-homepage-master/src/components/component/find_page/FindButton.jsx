import React from "react"
import Div from "components/common/Div"
import Button from "components/common/Button"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"

const FindButton = (props) => {

    const isMobile = useRecoilValue(isMobileState)

    return(
        <Div radius="4px" backgroundColor="orange" height={ !isMobile ? "50px" : "45px" }>
            <Button 
                color="white" 
                size={ !isMobile ? "small_medium" : "small" }
                id={ props.id }
                onClick={ props.onClick }
            >
                { props.children }
            </Button>
        </Div>
    )
}

export default FindButton