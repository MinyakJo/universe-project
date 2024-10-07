import React, { useEffect } from "react"
import styled from "styled-components"
import TopBar from "../container/TopBar"
import Footer from "../container/footer/Footer"
import commonDiv from "components/common/Div"
import { useSetRecoilState, useRecoilValue, useResetRecoilState } from "recoil"
import { topBarSelectedState } from "../../recoil/topBarAtom"
import { Main } from "./MainPage"
import { passDetailCurrentPageState, passDetailInfoState } from "../../recoil/passAtom"
import PassInfo from "../container/passes_page/PassInfo"
import DetailButtons from "../component/passes_page/DetailButtons"
import PassStructure from "../container/passes_page/PassStructure"
import PassCurriculum from "../container/passes_page/PassCurriculum"
import PassReview from "../container/passes_page/PassReview"
import { isMobileState } from "recoil/mainAtom"

const Div = styled(commonDiv)`
    max-width: 1180px;
`

const CurriculumContainer = styled( commonDiv )`
    overflow-x: auto;

    ::-webkit-scrollbar{
        height: 10px;
    }
    ::-webkit-scrollbar-thumb{
        background-color: #D7D7D7;
        border-radius: 10px;
    }
`

const PassDetailPage = () => {

    const setTopBar = useSetRecoilState(topBarSelectedState)
    const resetTopBar = useResetRecoilState(topBarSelectedState)

    const currentPage = useRecoilValue(passDetailCurrentPageState)
    const resetPage = useResetRecoilState(passDetailCurrentPageState)

    const resetInfo = useResetRecoilState(passDetailInfoState)

    const isMobile = useRecoilValue(isMobileState)

    useEffect(() => { 
        setTopBar("courseRegistration")

        return () => {
            resetPage()
            resetTopBar()
            resetInfo()
        }

    }, [ setTopBar, resetPage, resetTopBar, resetInfo ])

    return(
        <>
            {/* 상단바 */}
            <TopBar menu="orange"/>
            <Main>
                <Div padding={ !isMobile ? null : "50px 20px" }>
                    {/* 패스 정보 ( 이미지, 이름, 가격 등 ) */}
                    <PassInfo/>

                    {/* 강좌구성, 커리큘럼, 수강평 버튼 */}
                    <DetailButtons>
                        {
                            [ 
                                { name: "강좌구성", id: 0 },
                                { name: "커리큘럼", id: 1 },
                                { name: "수강평", id: 2 },
                            ]
                        }
                    </DetailButtons>

                    {/* 버튼에 따라 보여질 목록 */}
                    {
                        currentPage === "0" ?
                        <PassStructure/>:
                        currentPage === "1" ?
                        <CurriculumContainer>
                            <PassCurriculum/>
                        </CurriculumContainer>:
                        currentPage === "2" ?
                        <PassReview/>:
                        <></>
                    }
                </Div>
            </Main>
            <Footer/>
        </>
    )
}

export default PassDetailPage