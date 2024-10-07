import React, { useEffect, useState } from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import Buttons from "../../component/passes_page/Buttons"
import { useRecoilState, useRecoilValue } from "recoil"
import Teacher from "../../component/teachers_page/Teacher"
import PageButtonBox from "../../component/PageButtonBox"
import { currentPageState, isMobileState } from "recoil/mainAtom"
import { useQuery } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import useRefetch from "hooks/useRefetch"
import { selectedButtonSelector, selectedIdState, typeButtonListState, typeSelectedState } from "recoil/tagAtom"

const Div = styled(commonDiv)`
    flex-wrap: ${props => {
        return props.wrap ? props.wrap : null
    }};
`

const TeacherList = () => {

    const [ dataList, setDataList ] = useState([])

    //recoil
    const isMobile = useRecoilValue(isMobileState)

    const [ buttonList, setButtonList ] = useRecoilState( typeButtonListState )
    const [ boolList, setBoolList ] = useRecoilState( typeSelectedState )

    const selected = useRecoilValue( selectedButtonSelector )
    const selectedId = useRecoilValue( selectedIdState )

    const page = useRecoilValue( currentPageState )

    const tagData = useQuery(
        [ "reviewTagFetchData" ],
        async () => await fetch("GET", "/property?page=0&type=3"),
        { refetchOnWindowFocus: false }
    )
    const { data, refetch } = useQuery(
        [ "teachersFetchData" ],
        async() => await fetch(
            "GET", 
            selectedId ?
            `/home/tutor?page=${ page }&grade=${ selected[ 0 ] }` :
            `/home/tutor?page=${ page }`
            ),
        { refetchOnWindowFocus: false }
    )
    
    useEffect(() => {
        if(data?.data){
            const list = []

            for( let i of data.data.tutorArray ){
                list.push({
                    id: i.id,
                    profile: i.gateImage,
                    name: i.name,
                    introduction: i.gateIntroduction,
                })
            }

            setDataList( list )
        }
    }, [ data ])
    useEffect(() => {
        if( tagData.data?.data && ( buttonList.length === 1 ) ){
            const td = tagData.data.data.propertyArray
            const copyButtonList = [ { name: "전체", order: 0 } ]
            const copyBoolList = [ true ]
            
            for(let i of td){
                copyButtonList.push({
                    name: i.name,
                    id: i.id
                })
                copyBoolList.push( true )
            }
            setButtonList( copyButtonList )
            setBoolList( copyBoolList )
        }
    }, [ tagData.data, buttonList.length ])

    useRefetch({ refetch, el: page })
    useRefetch({ refetch, el: selectedId })

    return(
        <>
            {/* 검색타입 */}
            <Div flex="row" marginBottom="40px">
                <Buttons>
                    {{
                        button: buttonList,
                        selected: boolList
                    }}
                </Buttons>
            </Div>

            <Div flex="row" wrap="wrap" marginBottom={ !isMobile ? "40px" : "30px" }>
                {
                    dataList && dataList.map((e, i) =>
                        <Teacher 
                            key={i} 
                            marginRight={ 
                                !isMobile && (i === 0 || (( i + 1 ) % 4 !== 0 && i !== 0)) ? 
                                "20px":
                                isMobile && (i % 2 === 0) ? 
                                "15px":
                                null
                            }
                        >
                            {e}
                        </Teacher>
                    )
                }
            </Div>

            <PageButtonBox refetch={ refetch }>
                {{
                    page: page,
                    pageCnt: data?.data?.totalPage ? data.data.totalPage : 1
                }}
            </PageButtonBox>
        </>
    )
}

export default TeacherList