import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import TopBar from "components/container/TopBar"
import { Main } from "./MainPage"
import Menu from "components/container/my_page/Menu"
import Footer from "components/container/footer/Footer"
import PaymentHistory from "components/container/my_page/PaymentHistory"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"

const Div = styled(commonDiv)`
    max-width: 1180px;
`

const PurchaseHistoryPage = () => {

    //recoil
    const isMobile = useRecoilValue(isMobileState)

    return(
        <>
            {/* 상단바 */}
            <TopBar menu="orange"/>
            <Main>

                <Div flex={ !isMobile ? "row_top" : "column" } padding={ !isMobile ? "88px 0px" : "100px 20px" } paddingBottom={ !isMobile ? "128px" : null }>
                    <Menu select={"paymentHistory"}/>
                    <PaymentHistory/>
                </Div>

            </Main>
            <Footer/>
        </>
    )
}

export default PurchaseHistoryPage