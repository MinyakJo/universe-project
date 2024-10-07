import React from "react"
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"
import Div from "components/common/Div"
import TopBar from "components/container/TopBar"
import { isMobileState } from "recoil/mainAtom"
import Title from "components/component/find_page/Title"
import FindId from "components/container/find_page/FindId"
import FindPw from "components/container/find_page/FindPw"
import ResetPw from "components/container/find_page/ResetPw"
import { topBarSelectedState } from "recoil/topBarAtom"
import { useEffect } from "react"

const FindPage = (props) => {

    const isMobile = useRecoilValue(isMobileState)
    const setTopBar = useSetRecoilState( topBarSelectedState )
    const reset = useResetRecoilState( topBarSelectedState )

    useEffect(() => {
        setTopBar("login")

        return () => {
            reset()
        }
    }, [ setTopBar, reset ])

    return(
        <>
            <TopBar join/>
            <main>
                <Div flex="row_center" padding={ !isMobile ? "180px 0px" : "90px 20px" }>
                    <Div flex="column" width={ !isMobile ? "420px" : null }>
                        <Title>
                            {
                                props.id?
                                "아이디 찾기":
                                props.pw?
                                "비밀번호 찾기":
                                props.resetPw?
                                "비밀번호 재설정":
                                null
                            }
                        </Title>
                        {
                            props.id?
                            <FindId/>:
                            props.pw?
                            <FindPw/>:
                            props.pwCheck ?
                            <ResetPw/>:
                            <></>
                        }
                    </Div>
                </Div>
            </main>
        </>
    )
}
export default FindPage