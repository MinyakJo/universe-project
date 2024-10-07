import React from "react"
import CommonStyle from "components/style"
import styled from "styled-components"
import P from "components/common/P"
import H2 from "components/common/H2"
import { Div, Title, CloseButton } from "components/container/Dialog"
import { fetch } from "modules/fetch"
import { useQuery } from "@tanstack/react-query"
import { useCookies } from "react-cookie"
import { dateFormat } from "modules/dateFormat"

const InfoBox = styled.div`
    ${props => {
        return props.flex ? CommonStyle.setFlex(props.flex) : null
    }};
    width: 100%;
    border-bottom: 1px solid ${CommonStyle.setColor("grey1")};
    height: ${props => {
        return props.isMobile ? "52px" : "60px"
    }};
`

const Info = styled(P)`
    color: ${CommonStyle.setColor("bk")};
    font-weight: 500;
    font-size: ${props => {
        return props.isMobile ? `${CommonStyle.setFontSize("small_medium")}` : `${CommonStyle.setFontSize("small_large")}`
    }};
    word-break: break-all;
    text-align: right;
`

const Purchase = ({ children, reset, isMobile }) => {

    //cookie
    const [ cookies ] = useCookies([ "token" ])

    //query
    const { data } = useQuery(
        [ "paymentHistoryDetailFetchData" ],
        async() => await fetch( "GET", `/student/myInfo/payment/${ children.id }`, null, { Authorization: cookies.token } ),
        { refetchOnWindowFocus: false }
    )

    const d = data?.data?.payment

    const onClickEvent = (e) => {
        const id = e.target.id

        switch(id){
            case "close":
                reset()
                break
            default:
        }
    }

    return(
        <Div 
            position="relative" 
            maxWidth="500px" 
            height="743px" 
            backgroundColor="white" 
            padding={ !isMobile ? "56px 40px" : "30px 20px" } 
            paddingBottom={ !isMobile ? "81px" : "50px" }
            paddingRight={ !isMobile ? "10px" : null } 
            radius="20px" 
            zIndex="9" 
            onClick={onClickEvent}
        >
            <CloseButton/>
            <Div flex="row" wrap="wrap" height="100%" paddingRight={ !isMobile ? "30px" : null } overflowY="scroll" scrollWidth={ !isMobile ? null : "0px" }>
                <Div flex="row_center" marginBottom={ !isMobile ? "47px" : "58px" }>
                    <Title isMobile={ isMobile }>
                        { d?.status === 2 ? "결제내역 상세" : "결제취소내역 상세" }
                    </Title>
                </Div>
                <InfoBox flex="row" isMobile={ isMobile }>
                    <H2 color="bk" size={ !isMobile ? "medium_small" : "small_large" } weight="700">
                        { d?.status === 2 ? "결제정보" : "결제취소정보" }
                    </H2>
                </InfoBox>
                <Div flex="column" marginBottom="25px">
                    <InfoBox flex="row_between" isMobile={ isMobile }>
                        <InfoContainer isMobile={ isMobile }>
                            { d?.status === 2 ? "총 결제금액" : "취소금액" }
                        </InfoContainer>
                        <InfoContainer isMobile={ isMobile }>
                                {
                                    d?
                                    d?.status === 2 ?
                                    `${ d.approvalPrice ? d.approvalPrice.toLocaleString() : "0" }원` :
                                    `${ d.cancelledPrice ? d.cancelledPrice.toLocaleString() : "0" }원` :
                                    ""
                                }
                        </InfoContainer>
                    </InfoBox>
                    <InfoBox flex="row_between" isMobile={ isMobile }>
                        <InfoContainer isMobile={ isMobile }>
                            거래일시
                        </InfoContainer>
                        
                        <InfoContainer isMobile={ isMobile }>
                            {
                                d ?
                                d?.status === 2 ?
                                timeDate( d?.approvalDate ) :
                                timeDate( d?.cancelledDate ) :
                                ""
                            }
                        </InfoContainer>
                    </InfoBox>
                    <InfoBox flex="row_between" isMobile={ isMobile }>
                        <InfoContainer minWidth={ !isMobile ? 66.25 : 60 } marginRight={ !isMobile ? "22px" : "8px" } isMobile={ isMobile }>
                            승인번호
                        </InfoContainer>
                        <InfoContainer flex="row_end" isMobile={ isMobile }>
                            {
                                d ?
                                d.univPaymentId :
                                ""
                            }
                        </InfoContainer>
                    </InfoBox>
                    <InfoBox flex="row_between" isMobile={ isMobile }>
                        <InfoContainer isMobile={ isMobile }>
                            카드종류
                        </InfoContainer>
                        <InfoContainer isMobile={ isMobile }>
                            {
                                d ?
                                `${ d.cardType ? d.cardType : "" } / ${ d.cardName ? d.cardName : "" }` :
                                ""
                            }
                        </InfoContainer>
                    </InfoBox>
                    <InfoBox flex="row_between" isMobile={ isMobile }>
                        <InfoContainer isMobile={ isMobile }>
                            거래유형
                        </InfoContainer>
                        <InfoContainer isMobile={ isMobile }>
                            {
                                d ?
                                d.method :
                                ""
                            }
                        </InfoContainer>
                    </InfoBox>
                    <InfoBox flex="row_between" isMobile={ isMobile }>
                        <InfoContainer isMobile={ isMobile }>
                            할부개월
                        </InfoContainer>
                        <InfoContainer isMobile={ isMobile }>
                            {
                                d ?
                                d.installment > 1 ?
                                `${ d.installment }개월` :
                                "일시불" :
                                ""
                            }
                        </InfoContainer>
                    </InfoBox>
                    <InfoBox flex="row_between" isMobile={ isMobile }>
                        <InfoContainer isMobile={ isMobile }>
                            카드번호
                        </InfoContainer>
                        <InfoContainer isMobile={ isMobile }>
                            {
                                d ?
                                d.cardNumber :
                                ""
                            }
                        </InfoContainer>
                    </InfoBox>
                    <InfoBox flex="row_between" isMobile={ isMobile }>
                        <InfoContainer isMobile={ isMobile }>
                            상품번호
                        </InfoContainer>
                        <InfoContainer isMobile={ isMobile }>
                            {
                                d ?
                                d.passCode :
                                ""
                            }
                        </InfoContainer>
                    </InfoBox>
                    <InfoBox flex="row_between" isMobile={ isMobile }>
                        <InfoContainer isMobile={ isMobile }>
                            상품명
                        </InfoContainer>
                        <InfoContainer isMobile={ isMobile }>
                            {
                                d ?
                                d.passName :
                                ""
                            }
                        </InfoContainer>
                    </InfoBox>
                </Div>
                <InfoBox flex="row">
                    <H2 color="bk" size={ !isMobile ? "medium_small" : "small_large" } weight="700">
                        판매자 정보
                    </H2>
                </InfoBox>
                <Div flex="column">
                    <InfoBox flex="row_between" isMobile={ isMobile }>
                        <InfoContainer isMobile={ isMobile }>
                            사업자 등록 번호
                        </InfoContainer>
                        <InfoContainer isMobile={ isMobile }>
                            {
                                d ?
                                d.company_num :
                                "123-12-12345"
                            }
                        </InfoContainer>
                    </InfoBox>
                    <InfoBox flex="row_between" isMobile={ isMobile }>
                        <InfoContainer isMobile={ isMobile }>
                            사업자 명
                        </InfoContainer>
                        <InfoContainer isMobile={ isMobile }>
                            (주)유니버스반복
                        </InfoContainer>
                    </InfoBox>
                </Div>
            </Div>
        </Div>
    )
}

const timeDate = ( date ) => {
    if( !date ) return ""

    const newDate = new Date( date )
    const hours = newDate.getHours() > 10 ? newDate.getHours() : `0${ newDate.getHours() }`
    const minutes = newDate.getMinutes() > 10 ? newDate.getMinutes() : `0${ newDate.getMinutes() }`
    const seconds = newDate.getSeconds() > 10 ? newDate.getSeconds() : `0${ newDate.getSeconds() }`

    return `${ dateFormat( newDate, "-" ) } ${ hours }:${ minutes }:${ seconds }`
}

const InfoContainer = ({ flex, children, isMobile, width, marginRight, minWidth }) => {
    return (
        <Div flex={ flex ? flex : "row" } width={ width ? width : "fit-content" } marginRight={ marginRight ? marginRight : null } style={{ minWidth: minWidth ? minWidth : null }}>
            <Info isMobile={ isMobile }>
                { children }
            </Info>
        </Div>
    )
}

export default Purchase