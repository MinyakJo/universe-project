import React from "react"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import Div from "components/common/Div"
import H1 from "components/common/H1"

const Title = (props) => {

    const isMobile = useRecoilValue(isMobileState)

    return(
        <Div flex="row_center" marginBottom={ !isMobile ? "50px" : "30px" }>
            <H1 color="bk" size={ !isMobile ? "large" : "medium" } weight="500" lineHeight="44px" family="esamanru">
                { props.children }
            </H1>
        </Div>
    )
}

export default Title