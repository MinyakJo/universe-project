import React, { useEffect, useState } from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import CommonStyle from "components/style"
import H1 from "components/common/H1"
import commonP from "components/common/P"
import Button from "components/common/Button"
import small_logo from "../../../svg/small_logo.svg"
import right_grey_vector from "../../../svg/right_grey_vector.svg"
import PageButtonBox from "../../component/PageButtonBox"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { dialogState } from "../../../recoil/dialogAtom"
import { currentPageState, isMobileState } from "recoil/mainAtom"
import Title from "components/component/my_page/Title"
import { useQuery } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import useRefetch from "hooks/useRefetch"
import { useCookies } from "react-cookie"
import { paymentHistoryState } from "recoil/myPageAtom"
import { dateFormat } from "modules/dateFormat"

const Div = styled(commonDiv)`
    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};

    border-bottom: ${props => {
        return props.borderBottom ? `1px solid ${CommonStyle.setColor(props.borderBottom)}` : null
    }};

    box-shadow: ${props => {
        return props.shadow ? props.shadow : null
    }};

    cursor: ${props => {
        return props.cursor ? props.cursor : null
    }};
`

const P = styled(commonP)`
    white-space: nowrap;
`

const Img = styled.img`
    width: 100%;
    object-fit: contain;
`

const PaymentHistory = () => {

    //cookie
    const [ cookies ] = useCookies([ "token" ])

    //recoil
    const isMobile = useRecoilValue( isMobileState )

    const setDialog  = useSetRecoilState( dialogState )

    const page = useRecoilValue( currentPageState )

    const [ dataList, setDataList ] = useRecoilState( paymentHistoryState )

    //qurery
    const { data, refetch } = useQuery(
        [ "myPaymentFetchDataList" ],
        async() => await fetch("GET", `/student/myInfo/payment?page=${ page }`, null, { Authorization: cookies.token }),
        { refetchOnWindowFocus: false }
    )

    useEffect(() => {
        if(data?.data){
            const list = []
            const d = data.data
            
            for(let i of d.paymentArray){
                list.push({
                    id: i.id,
                    purchase_success: i.status === 2 ? true : false,
                    approval_num: i.univPaymentId,
                    pass_name: i.passName,
                    date: dateFormat( new Date( i.approvalDate ), "." ),
                    method: i.method ? `${ i.method }/${ i?.installment && ( i.installment > 1 ) ? i.installment : "일시불" }` : null,
                    cost: i.status ? i.price : 0
                })
            }

            setDataList( list )
        }
    }, [ data, setDataList ])

    useRefetch({ refetch: refetch, el: page })

    const onClickEvent = (e) => {
        const id = e.target.id
        if( id ){
            setDialog({
                textType: "purchase",
                data: { id: id },
                isOpen: true
            })
        }
    }

    return(
        <Div flex="column">
            <Div flex="column" marginBottom="30px">
                <Title>
                    결제내역
                </Title>
                <Div flex="column" marginTop={ !isMobile ? null : "7px" }>
                    {
                        dataList && dataList.map((e, i) =>
                            <Div 
                                key={ `paymentHistory_${ i }` } 
                                flex="row" 
                                marginTop={ !isMobile ? "20px" : "18px" } 
                                height={ !isMobile ? "120px" : "92px" } 
                                paddingBottom={ !isMobile ? "20px" : "18px" } 
                                borderBottom="grey1"
                            >
                                <Div 
                                    flex="row_cetner" 
                                    backgroundColor="admin_bg" 
                                    width={ !isMobile ? "180px" : "110px" }
                                    minWidth={ !isMobile ? "180px" : "110px" }
                                    height="100%"
                                    padding={ !isMobile ? "32px 54px" : "26px 33px" } 
                                    marginRight={ !isMobile ? "20px" : "8px" }
                                >
                                    <Img src={ small_logo }/>
                                </Div>
                                <Div flex="column_between" height="100%">
                                    <Div flex="row_between">
                                        <Div flex="row" width="fit-content">
                                            <Div marginRight={ !isMobile ? "11px" : "8px" }>
                                                <P color="orange" style={{ fontSize: !isMobile ? 18 : 12 }} weight="700" lineHeight="160%">
                                                    {
                                                        e.purchase_success ?
                                                        "결제완료":
                                                        "결제취소"
                                                    }
                                                </P>
                                            </Div>
                                            {
                                                !isMobile ?
                                                <Div flex="row" width="fit-content">
                                                    <Div width="52px" marginRight="6px">
                                                        <P color="grey3" size="extra_small" weight="400" lineHeight="160%">
                                                            승인번호
                                                        </P>
                                                    </Div>
                                                    <Div>
                                                        <P color="grey3" size="extra_small" weight="400" lineHeight="160%">
                                                            { e.approval_num && e.approval_num }
                                                        </P>
                                                    </Div>
                                                </Div>:
                                                <Div flex="row" width="fit-content">
                                                    <Div flex="row">
                                                        <Div marginRight="3px">
                                                            <P style={{ fontSize: 12 }} color="grey6" lineHeight="160%" weight="600">
                                                                결제일
                                                            </P>
                                                        </Div>
                                                        <Div>
                                                            <P style={{ fontSize: 12 }} color="grey6" lineHeight="160%" weight="400">
                                                                { e.date && e.date }
                                                            </P>
                                                        </Div>
                                                    </Div>
                                                </Div>
                                            }
                                        </Div>
                                        <Div width="fit-content" onClick={onClickEvent}>
                                            <Button flex="row" color="grey3" weight="400" size="small_medium" lineHeight="160%" id={ e.id }>
                                                { !isMobile && "상세보기" }
                                                <Div flex="row_center" width="20px" height="20px">
                                                    <Img src={right_grey_vector} id={e.id}/>
                                                </Div>
                                            </Button>
                                        </Div>
                                    </Div>
                                    <Div>
                                        <H1 size={ !isMobile ? "medium_small" : "small_medium" } lineHeight="160%" weight="700">
                                            { e.pass_name && e.pass_name }
                                        </H1>
                                    </Div>
                                    <Div flex="row_between">
                                        {
                                            !isMobile &&
                                            <Div flex="row" width="fit-content">
                                                <Div flex="row" marginRight="14px">
                                                    <Div marginRight="6px">
                                                        <P size="small_medium" color="grey6" lineHeight="160%" weight="600">
                                                            결제일
                                                        </P>
                                                    </Div>
                                                    <Div>
                                                        <P size="small_medium" color="grey6" lineHeight="160%" weight="400">
                                                            { e.date && e.date }
                                                        </P>
                                                    </Div>
                                                </Div>
                                                <Div flex="row">
                                                    <Div marginRight="6px">
                                                        <P size="small_medium" color="grey6" lineHeight="160%" weight="600">
                                                            지불수단
                                                        </P>
                                                    </Div>
                                                    <Div>
                                                        <P size="small_medium" color="grey6" lineHeight="160%" weight="400">
                                                            { e.method && e.method }
                                                        </P>
                                                    </Div>
                                                </Div>
                                            </Div>
                                        }
                                        <Div flex="row" width="fit-content">
                                            <Div marginRight="13px">
                                                <P color="grey6" size={ !isMobile ? "small_medium" : "extra_small" } lineHeight="160%" weight="700">
                                                    총 결제금액
                                                </P>
                                            </Div>
                                            <Div>
                                                <P color="orange" size={ !isMobile ? "small_medium" : "extra_small" } lineHeight="160%" weight="700">
                                                    { e.cost ? e.cost.toLocaleString() : "0" }원
                                                </P>
                                            </Div>
                                        </Div>
                                    </Div>
                                </Div>
                            </Div>
                        )
                    }
                </Div>
                <Div flex="row_center" marginTop="60px">
                    <PageButtonBox>
                        {{
                            page: page,
                            pageCnt: data?.data?.totalPage ? data.data.totalPage : 1
                        }}
                    </PageButtonBox>
                </Div>
            </Div>
        </Div>
    )
}

export default PaymentHistory