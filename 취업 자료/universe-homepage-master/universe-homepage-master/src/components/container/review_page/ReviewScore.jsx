import React from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import commonDiv from "components/common/Div"
import P from "components/common/P"
import { star } from "../passes_page/PassReview" 
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import { reviewTotalDataState } from "recoil/reviewAtom"

const Div = styled(commonDiv)`
    border-bottom: ${props => {
        return props.borderBottom ? `1px solid ${CommonStyle.setColor(props.borderBottom)}` : null
    }};

    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};

    overflow: ${props => {
        return props.overflow ? props.overflow : null
    }};
`

const Line = styled.div`
    height: ${props => {
        return props.isMobile ? null : "164px"
    }};
    width: ${props => {
        return props.isMobile ? "100%" : null
    }};
    margin-left: ${props => {
        return props.isMobile ? null : "101px"
    }};
    margin-right: ${props => {
        return props.isMobile ? null : "71px"
    }};
    margin-top: ${props => {
        return props.isMobile ? "26px" : null
    }};
    margin-bottom: ${props => {
        return props.isMobile ? "20px" : null
    }};
    border-left: ${props => {
        return props.isMobile ? null : `1px solid ${CommonStyle.setColor("grey2")}`
    }};

    border-bottom: ${props => {
        return props.isMobile ? `1px solid ${CommonStyle.setColor("grey2")}` : null
    }};
`

const Span = styled.span`
    font-weight: 700;
    color: ${CommonStyle.setColor("orange")};
`

const ReviewScore = () => {

    const isMobile = useRecoilValue(isMobileState)
    const data = useRecoilValue(reviewTotalDataState)

    const list = []

    if( data ){
        list.push(Math.floor((data.five / data.totalReview) * 1000) / 10)
        list.push(Math.floor((data.four / data.totalReview) * 1000) / 10)
        list.push(Math.floor((data.three / data.totalReview) * 1000) / 10)
        list.push(Math.floor((data.two / data.totalReview) * 1000) / 10)
        list.push(Math.floor((data.one / data.totalReview) * 1000) / 10)
    }

    return(
        <Div flex={ !isMobile ? "row_center" : "column_center" } padding={ !isMobile ? null : "0px 20px" }>
            <Div flex="column_center" width="fit-content">
                <Div flex="row" width="fit-content" marginBottom={ !isMobile ? "20px" : null }>
                    <P color="grey5" size={ !isMobile ? "medium_small" : "small_large" } weight="700" lineHeight="40px">
                        사용자 총 평점
                    </P>
                </Div>
                <Div flex={ !isMobile ? "row" : "column_center" } marginBottom="5px">
                    {
                        isMobile &&
                        <Div flex="row" width="fit-content" marginBottom="2px">
                            <P color="bk" weight="700" lineHeight="70px" style={{ fontSize: 48 }}>
                                { data?.totalScore ? ( data.totalScore * 10 ) % 10 === 0 ? `${ data.totalScore }.0` : data.totalScore : null }
                            </P>
                        </Div>
                    }
                    <Div flex="row" width="fit-content">
                        { 
                            star({ 
                                score: data?.totalScore, 
                                width: !isMobile ? "28px" : "23px" , 
                                height: !isMobile ? "28px" : "23px",
                                marginRight: !isMobile ? "11px" : "4px" , 
                                marginLeft: !isMobile ? "0px" : "4px" 
                            }) 
                        }
                    </Div>
                    {
                        !isMobile &&
                        <Div flex="row" width="fit-content" marginLeft="5px">
                            <P color="bk" weight="700" lineHeight="43px" size="large">
                            { data?.totalScore ? ( data.totalScore * 10 ) % 10 === 0 ? `${ data.totalScore }.0` : data.totalScore : null }
                            </P>
                        </Div>
                    }
                </Div>
                <Div flex="row" width="fit-content">
                    <Div flex="row" width="fit-content">
                        <P color="grey5" size={ !isMobile ? "small_medium" : "small_medium" } lineHeight="40px" weight="500">
                            <Span>총 { data?.totalReview ? data.totalReview : null }개</Span> 의 수강후기가 있습니다.
                        </P>
                    </Div>
                </Div>
            </Div>
            <Line isMobile={isMobile}/>
            <Div flex="column_center" width="fit-content">
                {
                    list && list.map((e, i) =>
                        <Div key={ `review_score_${ i }` } flex="row" width="fit-content">
                            <Div width="fit-content" marginRight="20px">
                                <P color="grey5" size="small" lineHeight="30px">
                                    { 5 - i }점
                                </P>
                            </Div>
                            <Div flex="row" width={ !isMobile ? "400px" : "240px" } height="11px" radius="30px" overflow="hidden" backgroundColor="white">
                                <Div backgroundColor="orange" width={`${ e ? e : 0 }%`} height="100%"></Div>
                            </Div>
                            <Div flex="row_end" width="32px" marginLeft="14px">
                                <P color="grey5" weight="400" size="small" lineHeight="30px">
                                    { `${ e ? e : 0 }%` }
                                </P>
                            </Div>
                        </Div>
                    )
                }
            </Div>
        </Div>
    )
}

export default React.memo(ReviewScore)