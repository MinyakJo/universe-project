import React from "react"
import styled from "styled-components"
import Div from "components/common/Div"
import MainIntroText from "../../component/main_page/MainIntroText"
import Certificate from "../../component/characteristic_page/Certificate"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import { useQuery } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import { useEffect } from "react"
import { useState } from "react"

const List = styled(Div)`
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    padding-bottom: 20px;
    overflow-x: auto;

    &::-webkit-scrollbar{
        height: ${props => {
            return props.isMobile ? "0px" : "10px"
        }};
    }
    &::-webkit-scrollbar-thumb{
        border-radius: 10px;
        background-color: #DBDBDB;
    }
`

const Patent = () => {

    const isMobile = useRecoilValue(isMobileState)

    const [ dataList, setDataList ] = useState([])

    const patentData = useQuery(
        [ "characteristicPatentFetchData" ],
        async () => await fetch("GET", "/profile"),
        { refetchOnWindowFocus: false }
    )

    useEffect(() => {
        if(patentData.data?.data){
            const d = patentData.data.data
            const list = []

            for(let i of d.profileArray){
                list.push({
                    id: i.id,
                    date: i.date,
                    title: i.title,
                    img: i.image
                })
            }

            setDataList(list)
        }
    }, [ setDataList, patentData.data ])

    return(
        <Div flex="column" padding={ !isMobile ? "87px 0px" : "48px 20px" } paddingBottom={ !isMobile ? "127px" : null }>
            <MainIntroText>
                {{
                    top: {
                        text: "정부 교육분야 K혁신 컨텐츠 선정",
                        margin: !isMobile ? "11px" : "9px",
                    },
                    bottom: {
                        text: !isMobile ? "유니버스 반복의 특허 및 수상내역" : "유니버스 반복의\n특허 및 수상내역",
                        accent: "특허 및 수상내역",
                        accentPosition: "end",
                        margin: !isMobile ? "51px" : "23px"
                    },
                    color: "black"
                }}
            </MainIntroText>
            <List width="100vw" isMobile={ isMobile } overflow={ dataList.length < 4 ? true : false }>
                {
                    dataList && dataList.map((e, i) =>
                        <Certificate key={i}>
                            {e}
                        </Certificate>
                    )
                }
            </List>
        </Div>
    )
}

export default Patent
// 진짜모름