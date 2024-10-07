import React, { Suspense } from "react"
import { Cell, CellIcon } from "components/container/passes_page/PassCurriculum"
import Div from "components/common/Div"
import P from "components/common/P"
import Img from "components/common/Img"
import play_button from "../../../svg/small_play_button.svg"
import Spinner from "../Spinner"

const TableContents = ({ children, index }) => {
    return (
        <Suspense fallback={ <Spinner width="200px"/> }>
            <Div flex="column_top" >
                {
                    children?.cell && children.cell.map(( e, i ) =>
                        <Div key={ i } flex="row" backgroundColor={ ( i  % 2 === 0 ) ? "white" : "admin_bg" }>
                            {
                                e && e.map(( el, idx ) =>
                                    <Cell key={ `table_${ i }_${ idx }` } flex="row_center" width={ `calc( 100% / ${ el?.length ? el.length : 1 } )` }>
                                        <Div>
                                            <P color="bk" weight="400" size="small3" lineHeight="27px">
                                                { el?.contents ? el.contents : null }
                                            </P>
                                        </Div>
                                        {
                                            el?.video &&
                                            <CellIcon width="20px">
                                                <Img src={ play_button } id={ `videoOpen_${ index }_${ i }_${ idx }` }/>
                                            </CellIcon>
                                        }
                                    </Cell>
                                )
                            }
                        </Div>
                    )
                }
            </Div>
        </Suspense>
    )
}

export default TableContents