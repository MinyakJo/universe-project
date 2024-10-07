import Button from "components/common/Button"
import Div from "components/common/Div"
import P from "components/common/P"
import React from "react"

const DialogErrorBoundary = ({error, resetErrorBoundary}) => {
    return(
        <Div flex="column_center" width="150px" backgroundColor="white" radius="10px">
            <Div marginBottom="4px">
                <P color="bk" size="medium" weight="500" family="esamanru">
                    ERROR!
                </P>
                <P color="bk" size="small_large" weight="500" family="pretendard">
                    { error?.message }
                </P>
                </Div>
            <Button color="bk" size="small" weight="300" family="esamanru" onClick={ resetErrorBoundary }>
                다시하기
            </Button>
        </Div>
    )
}

export default DialogErrorBoundary