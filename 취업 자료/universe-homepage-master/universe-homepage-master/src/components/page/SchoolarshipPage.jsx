import React, { useEffect } from "react"
import TopBar from "../container/TopBar"
import Footer from "../container/footer/Footer"
import { Main } from "./MainPage"
import { useSetRecoilState, useResetRecoilState } from "recoil"
import { topBarSelectedState } from "../../recoil/topBarAtom"
import Total from "../container/schoolarship_page/Total"
import Ranking from "../container/schoolarship_page/Ranking"
import Description from "../container/schoolarship_page/Description"
import NavigateCourse from "../container/schoolarship_page/NavigateCourse"

const SchoolarshipPage = () => {

    const setTopBar = useSetRecoilState(topBarSelectedState)
    const reset = useResetRecoilState(topBarSelectedState)

    useEffect(() => { 
        setTopBar("schoolarship")

        return () => {
            reset()
        }
    }, [ setTopBar, reset ])

    return(
        <>
            {/* 상단바 */}
            <TopBar/>
            <Main>

                {/* 반복 장학금, 마일리지 */}
                <Total/>

                {/* 랭킹 */}
                <Ranking/>

                {/* 마일리지 설명 */}
                <Description/>

                {/* 수강신청 페이지 이동 */}
                <NavigateCourse/>
            </Main>
            <Footer/>
        </>
    )
}

export default SchoolarshipPage