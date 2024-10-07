import React from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import TopBar from "../container/TopBar"
import Footer from "../container/footer/Footer"
import { Main } from "./MainPage"
import commonDiv from "components/common/Div"
import Menu from "../container/my_page/Menu"
import { useRecoilValue, useResetRecoilState } from "recoil"
import { currentPageState, isMobileState } from "recoil/mainAtom"
import { useEffect } from "react"
import InquiryHistory from "components/container/my_page/InquiryHistory"

const Div = styled(commonDiv)`
    max-width: 1180px;

    border-bottom: ${props => {
        return props.borderBottom ? `1px solid ${CommonStyle.setColor(props.borderBottom)}` : null
    }};
`

const MyInquiriesPage = () => {

    const isMobile = useRecoilValue(isMobileState)
    
    const resetPage = useResetRecoilState(currentPageState)

    useEffect(() => {
        return () => {
            resetPage()
        }
    }, [ resetPage ])

    return(
        <>
            {/* 상단바 */}
            <TopBar menu="orange"/>
            <Main>

                <Div flex={ !isMobile ? "row_top" : "column" } padding={ !isMobile ? "88px 0px" : "100px 20px" } paddingBottom={ !isMobile ? "128px" : null }>
                    <Menu select="myInquiry"/>
                    <InquiryHistory/>
                </Div>

            </Main>
            <Footer/>
        </>
    )
}

export default MyInquiriesPage