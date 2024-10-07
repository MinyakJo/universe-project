import React, { useState } from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import commonDiv from "components/common/Div"
import H1 from "components/common/H1"
import P from "components/common/P"
import pencil from "../../../svg/pencil.svg"
import { useRecoilValue } from "recoil"
import CourseStructureTitle from "../../component/passes_page/CourseStructureTitle"
import star_icon from "../../../svg/star.svg"
import yellow_star_icon from "../../../svg/yellow_star.svg"
import grey_star_icon from "../../../svg/grey_star.svg"
import DropdownBox from "../../component/DropdownBox"
import Review from "../../component/passes_page/Review"
import PageButtonBox from "../../component/PageButtonBox"
import { currentPageState, isMobileState } from "recoil/mainAtom"
import { useQuery } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useRefetch from "hooks/useRefetch"
import { dateFormat } from "modules/dateFormat"

const Div = styled(commonDiv)`
    border: ${props => {
        return props.border ? `1px solid ${CommonStyle.setColor("orange")}` : null
    }};

    padding: ${props => {
        return props.padding ? props.padding : null
    }};

    border-top: ${props => {
        return props.borderTop ? `1px solid ${CommonStyle.setColor(props.borderTop)}` : null
    }};

    border-bottom: ${props => {
        return props.borderBottom ? `1px solid ${CommonStyle.setColor(props.borderBottom)}` : null
    }};
`

const Img = styled.img`
    object-fit: contain ;
    width: 100%;
`

const star = ( data ) => {
    const list = []
    for(let i = 0; i < 5; i++){
        if(Math.round(parseFloat(data.score * 10) / 10) > i){
            list.push(
                <Div width={data.width} height={ data.height } key={i} marginLeft={ data.marginLeft ? data.marginLeft : "5px" } marginRight={ data.marginRight ? data.marginRight : "5px" } id={ data.id || ( data.id === 0 ) ? data.id : null }>
                    <Img src={ data.yellow ? yellow_star_icon : star_icon } id={ data.id || ( data.id === 0 ) ? data.id : null }/>
                </Div>
            )
        }else{
            list.push(
                <Div width={ data.width } height={ data.height } key={i} marginLeft={ data.marginLeft ? data.marginLeft : "5px" } marginRight={ data.marginRight ? data.marginRight : "5px" } id={ data.id || ( data.id === 0 ) ? data.id : null }>
                    <Img src={grey_star_icon} id={ data.id || ( data.id === 0 ) ? data.id : null }/>
                </Div>
            )
        }
    }
    return list
}

const PassReview = () => {

    const { id } = useParams()
    const isMobile = useRecoilValue(isMobileState)
    const [ review, setReview ] = useState({
        score: 0,
        num: 0,
        totalPage: 0,
        review: []
    })

    const [ nowDropSelect, setNowDropSelect ] = useState(0)
    const page = useRecoilValue(currentPageState)

    const { data, refetch } = useQuery(
        [ "courseReviewFetchData" ],
        async () => await fetch("GET", `/home/pass/${ id }/review?page=${ page }&order=${ nowDropSelect }`),
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
    }, [ data, setReview ])

    
    useRefetch({ refetch: refetch, el: page })

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
            <Div flex={ !isMobile ? "row_center" : "column_center" } height={ !isMobile ? "100px" : "102px" } marginBottom="28px" backgroundColor="gray1">

                {/* 별 */}
                <Div flex="row" width="fit-content">
                    { star({ score: review.score, width: !isMobile ? "28px" : "22px", height: !isMobile ? "28px" : "22px" }) }
                </Div>

                {/* 점수 */}
                <Div flex="row" width="fit-content">
                    <Div flex="row" marginLeft={ !isMobile ? "16px" : null } paddingBottom="4px">
                        <H1 color="bk" weight="700" size="large">
                            { ( ( review.score * 10 ) % 10 ) === 0 ? `${ review.score }.0` : review.score }
                        </H1>
                    </Div>

                    <Div flex="row" marginLeft={ !isMobile ? "12px" : "6px" } paddingTop={ !isMobile ? null : "4px" }>
                        <P color={ !isMobile ? "grey6" : "grey2" } weight="400" lineHeight="23px" size="small_medium" style={{ whiteSpace: "nowrap" }}>
                            총 { review.num }개
                        </P>
                    </Div>
                </Div>
            </Div>

            {/* 리뷰 */}
            {/* 드랍다운 */}
            <Div paddingBottom={ !isMobile ? "26px" : "6px" }>
                <DropdownBox 
                    width={ !isMobile ? "100px" : "70px" } 
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
            <Div flex="column_center" paddingTop="38px" borderTop="grey3">
                <Div marginBottom="60px">
                    {
                        review.review && review.review.map((e, i) =>
                            <Review key={i} course>
                                { e }
                            </Review>
                        )
                    }
                </Div>
                <Div>
                    <PageButtonBox>
                        {{
                            page: page,
                            pageCnt: review.totalPage ? review.totalPage : 1
                        }}
                    </PageButtonBox>
                </Div>
            </Div>
        </Div>
    )
}

export { star } 
export default PassReview