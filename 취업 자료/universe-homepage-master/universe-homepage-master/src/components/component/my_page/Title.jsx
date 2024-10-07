import React from "react"
import Div from "components/common/Div"
import H1 from "components/common/H1"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import CommonStyle from "components/style"

const Title = (props) => {

    const isMobile = useRecoilValue(isMobileState)

    return(
        <Div 
            paddingBottom={ !isMobile ? "14px" : "12px" }
            style={{ 
                borderBottom: `1px solid ${CommonStyle.setColor( props.borderColor ? props.borderColor : "grey2" )}`
            }}
        >
            <H1 color="bk" size={ !isMobile ? "medium_small" : "small_large" } weight="700" lineHeight="130%">
                { props.children }
            </H1>
        </Div>
    )
}

export default Title