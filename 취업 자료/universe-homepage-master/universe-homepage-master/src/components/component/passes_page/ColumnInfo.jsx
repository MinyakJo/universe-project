import React, { Suspense } from "react"
import { Cell } from "components/container/passes_page/PassCurriculum"
import Div from "components/common/Div"
import P from "components/common/P"
import Spinner from "../Spinner"

const ColumnInfo = ({ children }) => {
    return (
        <Suspense fallback={ <Spinner width="25px"/> }>
            <Div flex="row" radius="0px 10px 0px 0px" style={{ overflow: "hidden" }}>
                {
                    children?.column && children.column.map(( e, i ) =>
                        <Cell key={ i } flex="row" height="70px" backgroundColor={ i === 0 ? "light_washed_orange" : i === 1 ? "light_orange" : "orange" }>
                            <Div width="fit-content" marginRight="10px">
                                <P color="white" weight="700" size="medium_small" lineHeight="22px">
                                    { e?.name ? e.name : null }
                                </P>
                            </Div>
                            <Div width="fit-content">
                                <P color="white" weight="400" size="small_medium" lineheight="24px">
                                    { e?.description ? e.description : null }
                                </P>
                            </Div>
                        </Cell>
                    )
                }
            </Div>
        </Suspense>
    )
}

export default ColumnInfo