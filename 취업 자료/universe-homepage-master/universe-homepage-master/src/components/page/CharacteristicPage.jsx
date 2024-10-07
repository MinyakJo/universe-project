import React, { useEffect } from "react"
import TopBar from "../container/TopBar"
import Footer from "../container/footer/Footer"
import { useSetRecoilState, useResetRecoilState } from "recoil"
import { topBarSelectedState } from "../../recoil/topBarAtom"
import { Main } from "./MainPage"
import Banner from "../container/characteristic_page/Banner"
import Solution from "../container/characteristic_page/Solution"
import Memory from "../container/characteristic_page/Memory"
import Motivation from "../container/characteristic_page/Motivation"
import BigDataExperience from "../container/repeat_u_pass_page/BigDataExperience"
import Patent from "../container/characteristic_page/Patent"

const CharacteristicPage = () => {

    const setTopBar = useSetRecoilState(topBarSelectedState)
    const reset = useResetRecoilState(topBarSelectedState)

    useEffect(() => { 
        setTopBar("characteristic")

        return () => {
            reset()
        }
    }, [ setTopBar, reset ])

    return(
        <>
            {/* 상단바 */}
            <TopBar/>
            <Main>
                {/* 배너 */}
                <Banner/>

                {/* 솔루션 */}
                <Solution/>

                {/* 장기기억 */}
                <Memory/>

                {/* 동기부여 */}
                <Motivation/>

                {/* 빅데이터 체험 */}
                <BigDataExperience/>

                {/* 특허 */}
                <Patent/>
            </Main>
            <Footer/>
        </>
    )
}

export default CharacteristicPage