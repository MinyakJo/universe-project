import React, { useEffect } from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import TopBar from "../container/TopBar"
import Banner from "../container/main_page/Banner"
import Tutorial from "../container/main_page/Tutorial"
import HowToStudy from "../container/main_page/HowToStudy"
import AmountOfLearning from "../container/main_page/AmountOfLearning"
import EarnMileage from "../container/main_page/EarnMileage"
import SchoolarShip from "../container/main_page/SchoolarShip"
import UniversePass from "../container/main_page/UniversePass"
import Patent from "../container/main_page/Patent"
import Footer from "../container/footer/Footer"
import FooterPass from "../container/footer/FooterPass"
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"
import { dialogState } from "recoil/dialogAtom"
import { dateState, promotionState } from "recoil/mainAtom"
import { useQuery } from "@tanstack/react-query"
import { fetch } from "modules/fetch"

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: ${props => {
        return props.height ? props.height : "fit-content"
    }};
    
    margin-top: ${ ({ marginTop }) => {
        return marginTop ? marginTop : "132px"
    }};

    background-color: ${props => {
        return props.backgroundColor ? `${CommonStyle.setColor(props.backgroundColor)}` : null
    }};

    @media screen and (max-width: 500px) {
        margin-top: 0px;
    }
`
export { Main }

const MainPage = () => {
    
    const setDialog = useSetRecoilState( dialogState )

    const [ promotion, setPromotion ] = useRecoilState( promotionState )
    const resetPromotion = useResetRecoilState( promotionState )

    const date = useRecoilValue( dateState )

    const { data } = useQuery(
        [ "popupFetchData" ],
        async () => await fetch( "GET", "/home/popup" ),
        { refetchOnWindowFocus: false }
    )
    const promotionData = useQuery(
        [ "promotionFetchData" ],
        async() => await fetch( "GET", "/home/promotion/upass" ),
        { refetchOnWindowFocus: false }
    )

    useEffect(() => {
        if( data?.data ){
            const d = data.data
            const list = []
            
            for( let i of d.popupArray ){
                if( localStorage.getItem( `popup_${ i.id }` ) ){
                    if( ( ( date.date.getTime() - new Date( localStorage.getItem( `popup_${ i.id }` ) ).getTime() ) < 0 ) || !i.usingPc ){
                        list.push(false)
                    }else{
                        localStorage.removeItem( `popup_${ i.id }` )
                        list.push(true)
                    }
                }else list.push(true)
            }

            setDialog({
                isOpen: true,
                textType: "popup",
                data: {
                    data: d.popupArray,
                    open: list,
                    length: d.popupArray.length
                }
            })
        }
    }, [ setDialog, data, date ])

    useEffect(() => {
        if( promotionData.data?.data ) setPromotion( promotionData.data.data.promotion )

        return () => resetPromotion()
    }, [ promotionData.data, setPromotion, resetPromotion ])

    return(
        <>
            {/* 상단바 */}
            <TopBar/>
            <Main marginTop="132px" mobileMargin="723px">
                {/* 배너 */}
                <Banner/>

                {/* 반복 튜토리얼 */}
                <Tutorial/>

                {/* 상위 1% 공부 방법 */}
                <HowToStudy/>

                {/* 상위 1%가 영어를 잘하는 이유 */}
                <AmountOfLearning/>

                {/* 반복 빅데이터, 마일리지 */}
                <EarnMileage/>

                {/* 반복 장학금 */}
                <SchoolarShip/>

                {/* 유니버스 반복 패스 */}
                <UniversePass/>

                {/* 특허 */}
                <Patent/>
            </Main>
            
            {
                promotion?.expose &&
                <FooterPass>
                    {{
                        text: "유니버스",
                        accent: "U패스 통합 All Pack"
                    }}
                </FooterPass>
            }
            <Footer marginBottom="80px"/>
        </>
    )
}

export default MainPage