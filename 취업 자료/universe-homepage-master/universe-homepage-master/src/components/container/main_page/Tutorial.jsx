import React from "react"
import styled from "styled-components"
import Div from "components/common/Div"
import ButtonBox from "../../component/main_page/ButtonBox"
import { useRecoilValue } from "recoil"
import { isMobileState } from "../../../recoil/mainAtom"
import backgroundImg from "../../../image/main_page/main_page_01.png"
import MainIntroText from "../../component/main_page/MainIntroText"
import { useQuery } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import { useEffect } from "react"
import { useState } from "react"
import TutorialViedo from "components/component/main_page/TutorialVideo"

const TutorialDiv = styled(Div)`
    align-items: center;
`

const Tutorial = () => {

    //state
    const [ trainingData, setTraningData ] = useState([])

    //recoil
    const isMobile = useRecoilValue(isMobileState)

    //query
    const { data } = useQuery(
        [ "trainingFetchData" ],
        async() => await fetch( "GET", "/home/training" ),
        { refetchOnWindowFocus: false }
    )

    useEffect(() => {
        if( data?.data ) setTraningData( data.data.training )
    }, [ data ])

    return(
        <TutorialDiv flex="column_top" src={ backgroundImg } padding={ isMobile ? "0px 20px" : null }>

            {/* 튜토리얼 제목 */}
            <Div flex="column_center" marginTop={ !isMobile ? "106px" : "48px" } marginBottom= { !isMobile ? "55px" : "33px" }>
                <MainIntroText>
                    {{
                        top: {
                            text: "‘영어 습관’도 찾고 ‘반복 학습법’도 얻는 영어훈련",
                            margin: !isMobile ? "11px" : "9px"
                        },
                        bottom: {
                            text: "U반복 트레이닝",
                            accent: "U반복",
                            accentPosition: "start"
                        },
                        color: "bk"
                    }}
                </MainIntroText>
            </Div>
            <ButtonBox main backgroundColor="gray01" height={ !isMobile ? "60px" : "50px" }>
                { trainingData }
            </ButtonBox>

            <TutorialViedo>
                { trainingData }
            </TutorialViedo>
        </TutorialDiv>
    )
}

export default Tutorial