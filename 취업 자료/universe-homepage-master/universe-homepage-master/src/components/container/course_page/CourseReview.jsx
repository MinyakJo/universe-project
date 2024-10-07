import React, { useState } from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import commonDiv from "components/common/Div"
import H1 from "components/common/H1"
import P from "components/common/P"
import pencil from "../../../svg/pencil.svg"
import { useRecoilValue } from "recoil"
import CourseStructureTitle from "../../component/passes_page/CourseStructureTitle"
import { star } from "../passes_page/PassReview"
import DropdownBox from "../../component/DropdownBox"
import Review from "../../component/passes_page/Review"
import PageButtonBox from "../../component/PageButtonBox"
import { currentPageState, isMobileState } from "recoil/mainAtom"
import { fetch } from "modules/fetch"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import useRefetch from "hooks/useRefetch"
import { dateFormat } from "modules/dateFormat"

const Div = styled(commonDiv)`
    border: ${props => {
        return props.border ? `1px solid ${CommonStyle.setColor("orange")}` : null
    }};

    border-top: ${props => {
        return props.borderTop ? `1px solid ${CommonStyle.setColor(props.borderTop)}` : null
    }};

    border-bottom: ${props => {
        return props.borderBottom ? `1px solid ${CommonStyle.setColor(props.borderBottom)}` : null
    }};
`

const CourseReview = () => {

    //param
    const { id } = useParams()

    //state
    const [ review, setReview ] = useState({
        score: 0,
        num: 0,
        totalPage: 0,
        review: []
    })
    const [ dropSelect, setDropSelect ] = useState( 0 )

    //recoil
    const isMobile = useRecoilValue(isMobileState)
    const page = useRecoilValue( currentPageState )

    //query
    const { data, refetch } = useQuery(
        [ "reviewListFetchData" ],
        async () => await fetch("GET", `/lecture/list/${ id }/review?order=${ dropSelect }&page=${ page }`),
        { refetchOnWindowFocus: false }
    )

    //useEffect
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
                    thumbs_up: i.recommentCount,
                    userStatus: i.userRecommendStatus,
                    date: dateFormat( new Date( i.registrationDate ), "-" ),
                    id: i.id,
                })
            }

            setReview({
                review: list,
                score: d.avgStar,
                num: d.totalItem,
                totalPage: d.totalPage
            })
        }
    }, [ setReview, data ])

    useRefetch({ refetch, element: page })

    return(
        <Div flex="column_top" marginTop="50px" marginBottom="110px" >

            {/* 강좌구성 타이틀 */}
            <CourseStructureTitle>
                {{
                    img: pencil,
                    title: "수강평"
                }}
            </CourseStructureTitle>

            {/* 별점 */}
            <Div flex={ !isMobile ? "row_center" : "column_center" } height="100px" marginBottom="28px" backgroundColor="gray1">

                {/* 별 */}
                <Div flex="row" width="fit-content">
                    { star({ score: review.score, width: !isMobile ? "28px" : "22px", height: !isMobile ? "28px" : "22px" }) }
                </Div>

                {/* 점수 */}
                <Div flex="row" width="fit-content">
                    <Div flex="row" marginLeft="16px" paddingBottom="4px">
                        <H1 color="bk" weight="700" size={ !isMobile ? "large" : "medium_large" }>
                            { review?.score ? ( review.score * 10 ) % 10 === 0 ? `${ review.score }.0` : review.score : null  }
                        </H1>
                    </Div>

                    <Div flex="row" marginLeft={ !isMobile ? "12px" : "6px" }>
                        <P 
                            color={ !isMobile ? "grey6" : "grey2" } 
                            weight="400" 
                            lineHeight="23px" 
                            style={{ fontSize: !isMobile ? 16 : 12, whiteSpace: "nowrap" }}
                        >
                            총 { review.num }개
                        </P>
                    </Div>
                </Div>
            </Div>

            {/* 리뷰 */}
            {/* 드랍다운 */}
            {
                !isMobile &&
                <Div marginBottom="26px" paddingBottom="26px">
                    <DropdownBox width="100px" weight="600" size="small_large" lineHeight="34px" color="grey4" setSelect={ setDropSelect } refetch={ refetch }>
                        {
                            [ 
                                {  name: "최신순", id: "reviewNewest" },
                                {  name: "베스트순", id: "reviewBest" },
                            ]
                        }
                    </DropdownBox>
                </Div>
            }

            {/* 리뷰 */}
            <Div flex="column_center" paddingTop={ !isMobile ? "38px" : "60px" } borderTop={ !isMobile ? "grey3" : null }>
                <Div marginBottom="60px">
                    {
                        review.review.length !== 0 ?
                        review.review && review.review.map((e, i) =>
                            <Review key={i}>
                                {e}
                            </Review>
                        ):
                        <Div flex="row_center">
                            <P color="grey2" size="small_large">
                                수강평이 없습니다.
                            </P>
                        </Div>
                    }
                </Div>
                <Div>
                    <PageButtonBox>
                        {{
                            page: page,
                            pageCnt: data?.data ? data.data.totalPage : 1
                        }}
                    </PageButtonBox>
                </Div>
            </Div>
        </Div>
    )
}

export default CourseReview