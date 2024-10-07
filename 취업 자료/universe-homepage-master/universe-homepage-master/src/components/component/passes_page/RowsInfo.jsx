import React, { Suspense } from "react"
import { Cell } from "components/container/passes_page/PassCurriculum"
import Div from "components/common/Div"
import P from "components/common/P"
import Spinner from "../Spinner"

const RowsInfo = ({ children }) => {
    return (
        <Suspense fallback={ <Spinner width="50px"/> }>
            <Div flex="column_top" width="20%">
                <Div height="70px" radius="10px 0px 0px 0px" backgroundColor="light_washed_orange"/>
                {
                    children?.rows && children.rows.map(( e, i ) =>
                        <Cell key={ i } flex="column" backgroundColor={ ( i % 2 === 0 ) ? "admin_bg" : "white" }>
                            <Div marginBottom="3px">
                                <P color="bk" weight="700" size="small4" lineHeight="23px">
                                    { e?.name ? e.name : null }
                                </P>
                            </Div>
                            <Div>
                                <P color="bk" weight="400" size="x_small3" lineheight="24px">
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

export default RowsInfo