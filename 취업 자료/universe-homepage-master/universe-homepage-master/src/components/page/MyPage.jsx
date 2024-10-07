import React, { useEffect } from "react"
import styled from "styled-components"
import TopBar from "../container/TopBar"
import Footer from "../container/footer/Footer"
import { Main } from "./MainPage"
import commonDiv from "components/common/Div"
import Menu from "../container/my_page/Menu"
import AccountInfo from "../container/my_page/AccountInfo"
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import { topBarSelectedState } from "recoil/topBarAtom"
import { dialogState } from "recoil/dialogAtom"
import { loginAlert } from "modules/loginAlert"
import { useCookies } from "react-cookie"

const Div = styled(commonDiv)`
    max-width: 1180px;
`

const MyPage = () => {

    const isMobile = useRecoilValue(isMobileState)

    const setTopBar = useSetRecoilState( topBarSelectedState )
    const resetTopBar = useResetRecoilState( topBarSelectedState )

    useEffect(() => {
        setTopBar("my")

        return () => {
            resetTopBar()
        }
    }, [ setTopBar, resetTopBar ])

    return(
        <>
            {/* 상단바 */}
            <TopBar menu="orange"/>
            <Main>

                <Div flex={ !isMobile ? "row_top" : "column" } padding={ !isMobile ? "88px 0px" : "100px 20px" } paddingBottom={ !isMobile ? "128px" : null }>
                    <Menu select={"info"}/>
                    <AccountInfo/>
                </Div>

            </Main>
            <Footer/>
        </>
    )
}

export default MyPage