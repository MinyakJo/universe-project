import React, { useEffect, useState } from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import commonDiv from "components/common/Div"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import Buttons from "../../component/passes_page/Buttons"
import Review from "../../component/passes_page/Review"
import DropdownBox from "../../component/DropdownBox"
import PageButtonBox from "../../component/PageButtonBox"
import { reviewTotalDataState } from "../../../recoil/reviewAtom"
import { currentPageState, isMobileState } from "recoil/mainAtom"
import { useQuery } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import useRefetch from "hooks/useRefetch"
import { selectedButtonSelector, selectedIdState, typeButtonListState, typeSelectedState } from "recoil/tagAtom"

const Div = styled(commonDiv)`
    border-bottom: ${props => {
        return props.borderBottom ? `1px solid ${CommonStyle.setColor(props.borderBottom)}` : null
    }};

    padding: ${props => {
        return props.padding ? props.padding : null
    }};

    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};

    overflow: ${props => {
        return props.overflow ? props.overflow : null
    }};
`

const ReviewList = () => {

    //state
    const [ dataList, setDataList ] = useState([])

    //recoil
    const isMobile = useRecoilValue(isMobileState)
    const setTotalData = useSetRecoilState(reviewTotalDataState)

    const [ buttonList, setButtonList ] = useRecoilState( typeButtonListState )
    const [ boolList, setBoolList ] = useRecoilState( typeSelectedState )
    const selected = useRecoilValue( selectedButtonSelector )
    const selectedId = useRecoilValue( selectedIdState )

    const page = useRecoilValue( currentPageState )

    const [ nowDropSelect, setNowDropSelect ] = useState(0)

    const tagData = useQuery(
        [ "reviewTagFetchData" ],
        async () => await fetch("GET", "/property?page=0&type=3"),
        { refetchOnWindowFocus: false }
    )
    const { data, refetch } = useQuery(
        [ "reviewFetchData" ],
        async () => await fetch(
            "GET", 
            selectedId ? 
            `/home/review/list?order=${ nowDropSelect }&page=${ page }&grade=${ selected[ 0 ] }` : 
            `/home/review/list?order=${ nowDropSelect }&page=${ page }` 
        ),
        { refetchOnWindowFocus: false }
    )

    useEffect(() => {
        if(data?.data){
            const list = []
            const d = data.data
            
            for(let i of d.reviewArray){
                list.push({
                    profile: i.userProfileImage,
                    name: i.userName,
                    score: i.star,
                    title: i.title,
                    contents: i.contents,
                    thumbs_up: i.recommendingCount,
                    userStatus: i.userRecommendStatus,
                    date: i.registrationDate,
                    id: i.id,
                })
            }
            
            setTotalData({
                totalScore: d.avgStar,
                totalReview: d.totalItem,
                one: d.numberByStar.one,
                two: d.numberByStar.two,
                three: d.numberByStar.three,
                four: d.numberByStar.four,
                five: d.numberByStar.five,
            })
            setDataList(list)
        }
    }, [ data, setTotalData ])
   
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
            <Div flex="row" marginBottom={ !isMobile ? "40px" : "20px" }>
                <Buttons>
                    {{
                        button: buttonList,
                        selected: boolList
                    }}
                </Buttons>
            </Div>
            <Div flex="column">
                {/* 리뷰 */}
                {/* 드랍다운 */}
                <Div paddingBottom={ !isMobile ? "26px" : "7px" } borderBottom="grey3">
                    <DropdownBox 
                        width={ !isMobile ? "100px" : "80px" } 
                        weight="600" 
                        size={ !isMobile ? "small_large" : "small_medium" } 
                        lineHeight="34px" 
                        color="grey4"
                        setSelect={ setNowDropSelect }
                        refetch={ refetch }
                    >
                        {
                            [ 
                                {  name: "최신순", id: "reviewNewest" },
                                {  name: "베스트순", id: "reviewBest" },
                            ]
                        }
                    </DropdownBox>
                </Div>

                {/* 리뷰 */}
                <Div flex="column_center" paddingTop={ !isMobile ? "38px" : "16px" }>
                    <Div marginBottom={ !isMobile ? "60px" : "30px" }>
                        {
                            dataList && dataList.map((e, i) =>
                                <Review key={i} course>
                                    { e }
                                </Review>
                            )
                        }
                    </Div>
                    <Div marginBottom={ !isMobile ? "110px" : "50px" }>
                        <PageButtonBox refetch={ refetch }>
                            {{
                                page: page,
                                pageCnt: data?.data?.totalPage ? data.data.totalPage : 1
                            }}
                        </PageButtonBox>
                    </Div>
                </Div>
            </Div>
        </>
    )
}

export default ReviewList