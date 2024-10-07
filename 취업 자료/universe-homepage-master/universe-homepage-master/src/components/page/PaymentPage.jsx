import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import TopBar from "../container/TopBar"
import Footer from "../container/footer/Footer"
import { useSetRecoilState, useRecoilValue } from "recoil"
import { topBarSelectedState } from "../../recoil/topBarAtom"
import { Main } from "./MainPage"
import commonDiv from "components/common/Div"
import commonP from "components/common/P"
import H1 from "components/common/H1"
import Button from "components/common/Button"
import MainIntroText from "components/component/main_page/MainIntroText"
import { isMobileState } from "recoil/mainAtom"
import { passIdState } from "recoil/passAtom"
import { fetch } from "modules/fetch"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useCookies } from "react-cookie"
import { dialogState } from "recoil/dialogAtom"
import PaymentState from "components/component/payment_page/PaymentState"

const Div = styled(commonDiv)`
    max-width: 1180px;

    box-shadow: ${props => {
        return props.shadow ? props.shadow : null
    }};

    flex-basis: ${props => {
        return props.basis ? props.basis : null
    }};

    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};

    border-left: ${props => {
        return props.borderLeft ? `1px solid ${CommonStyle.setColor(props.borderLeft)}` : null
    }};

    border-bottom: ${props => {
        return props.borderBottom ? `1px solid ${CommonStyle.setColor(props.borderBottom)}` : null
    }};

    border-top: ${props => {
        return props.borderTop ? `1px solid ${CommonStyle.setColor(props.borderTop)}` : null
    }};
`

const P = styled(commonP)`
    text-align: start;

    cursor: ${props => {
        return props.cursor ? props.cursor : null
    }};

    user-select: none;

    white-space: ${props => {
        return props.whiteSpace ? props.whiteSpace : "nowrap"
    }};
`

const Input = styled.input`
    width: 20px;
    height: 20px;
    border: 1px solid ${CommonStyle.setColor("grey3")};
    border-radius: 4px;
    margin-right: 6px;
`

const Text = styled(commonDiv)`
    height: 100%;
    border: 1px solid ${CommonStyle.setColor("grey1")};
    border-radius: 4px;
    overflow-y: auto;

    &::-webkit-scrollbar{
        width: 3px;
    }
    &::-webkit-scrollbar-thumb{
        background-color: #D9D9D9;
        border-radius: 10px;
    }
`

export { P }

const PaymentPage = () => {

    //ref
    const inputRef = useRef()

    //cookie
    const [ cookies ] = useCookies([ "token" ])

    //state
    const [ check, setCheck ] = useState(false)

    const [ paymentCost, setPaymentCost ] = useState({
        passName: "",
        name: "",
        division: "",
        price: "",
        delivery_cost: "",
        cost: ""
    })

    const [ paymentInfo, setPaymentInfo ] = useState({
        price: "",
        delivery_cost: "",
        sale: "",
        cost: ""
    })

    const [ policy, setPolicy ] = useState("")

    //recoil
    const isMobile = useRecoilValue(isMobileState)

    const setTopBar = useSetRecoilState(topBarSelectedState)
    const resetTopBar = useSetRecoilState( topBarSelectedState )

    const passId = useRecoilValue( passIdState )

    const setDialog = useSetRecoilState( dialogState )

    //query
    const header = { Authorization: cookies.token }
    const { data } = useQuery(
        [ "paymentPassFetchData" ],
        async () => await fetch("GET", `/home/pass/${ passId }/detail`),
        { refetchOnWindowFocus: false }
    )
    const policyData = useQuery(
        [ "paymentPolicyFetchData" ],
        async() => await fetch( "GET", "/policy/3", null, header ),
        { refetchOnWindowFocus: false }
    )
    const mutation = useMutation(
        async data => await fetch( "POST", "/toss/create", data, header ),
        {
            onSuccess: ({ data }) => {
                window.open( data.url, "_self" )
            },
            onError: error => {
                setDialog({
                    isOpen: true,
                    btnType: 1,
                    data: { message: error.message },
                    textType: "alert"
                })
            }
        }
    )

    //useEffect
    useEffect(() => { 
        setTopBar("courseRegistration")
    }, [ setTopBar ])

    useEffect(() => {
        if( data?.data ){
            const d = data.data.pass

            setPaymentCost({
                passName: d.passName,
                name: d.tutorName,
                division: d.tag.length !== 0 ? d.tag[ 0 ].name : "",
                price: d.regularPrice,
                delivery_cost: 0,
                cost: d.regularPrice
            })
            setPaymentInfo({
                price: d.salesPrice,
                delivery_cost: 0,
                sale: d.regularPrice - d.salesPrice,
                cost: d.regularPrice
            })
        }

        return () => {
            resetTopBar()
        }
    }, [ data, resetTopBar ])

    useEffect(() => {
        if( policyData.data?.data ) setPolicy( policyData.data.data.policy.contents )
    }, [ policyData.data ])

    useEffect(() => {
        if( !passId ) {
            setDialog({
                isOpen: true,
                textType: "alert",
                btnType: 1,
                data: { message: "다시 결제 해주세요.", navigate: "passes" }
            })
        }
    }, [ passId, setDialog ])

    const onClickEvent = (e) => {
        const id = e.target.id

        switch(id){
            case "check":
                inputRef.current.click()
                break
            case "payment":
                mutation.mutate({
                    pass_id: Number( passId ),
                    amount: Number( paymentInfo.price ),
                    orderName: paymentCost.passName,
                    successUrl: `${ window.location.protocol }//${ window.location.host }/purchase-pass-done`,
                    failUrl: `${ window.location.protocol }//${ window.location.host }/purchase-pass-failed`
                })
                break
            case "notChecked":
                setDialog({
                    isOpen: true,
                    textType: "alert",
                    btnType: 1,
                    data: { message: "동의 항목에 체크해 주세요." }
                })
                break
            default:
        }
    }
    const onChageEvent = e => {
        setCheck( e.target.checked )
    }
    return(
        <>
            {/* 상단바 */}
            <TopBar menu="orange"/>
            <Main>

                {/* 제목 */}
                <Div flex="column_center" paddingTop={ !isMobile ? "71px" : "98px" } padding={ !isMobile ? "110px 0px" : "90px 20px" }>
                    <MainIntroText>
                        {{
                            top: {
                                text: "유니버스반복 패스를 만나보세요",
                                margin: !isMobile ? "12px" : "10px"
                            },
                            bottom: {
                                text: "수강신청",
                                margin: !isMobile ? "43px" : "35px"
                            },
                            color: "bk"
                        }}
                    </MainIntroText>
                
                    {/* 현황 */}
                    <PaymentState/> 

                    {/* 최종 결제 금액 */}
                    <Div flex="column_center" marginBottom={ !isMobile ? "71px" : "23px" }>
                        <Div marginBottom="10px">
                            <H1 size={ !isMobile ? "small_large" : "small_medium" } weight="700">
                                최종 결제금액
                            </H1>
                        </Div>
                        <Div flex={ !isMobile ? "row" : "column_center" }
                            padding={ !isMobile ? "10px 0px" : "0px 14px" }
                            shadow="0px 0px 4px rgba(0, 0, 0, 0.15)" 
                            borderTop="grey1"
                        >
                            <Div flex={ !isMobile ? "column_center" : "row_between" } 
                                minWidth={ !isMobile ? "350px" : null } 
                                width={ !isMobile ? "350px" : null }
                                padding={ !isMobile ? null : "15px 0px" }
                                borderBottom={ !isMobile ? null : "grey1" }
                            >
                                <Div width="fit-content" marginBottom={ !isMobile ? "3px" : null }>
                                    <P color="grey4" size="small" weight="400" lineHeight="160%">
                                        패스명
                                    </P>
                                </Div>
                                <Div width="fit-content">
                                    <P size={ !isMobile ? "small_large" : "small" } weight="600" lineHeight="160%">
                                        {paymentCost.passName}
                                    </P>
                                </Div>
                            </Div>
                            <Div flex={ !isMobile ? "column_center" : "row_between" } 
                                borderLeft={ !isMobile ? "grey1" : null }
                                padding={ !isMobile ? null : "15px 0px" }
                                borderBottom={ !isMobile ? null : "grey1" }
                            >
                                <Div width="fit-content" marginBottom={ !isMobile ? "3px" : null }>
                                    <P color="grey4" size="small" weight="400" lineHeight="160%">
                                        선생님
                                    </P>
                                </Div>
                                <Div width="fit-content">
                                    <P size={ !isMobile ? "small_medium" : "small" } weight="600" lineHeight="160%">
                                        {paymentCost.name}
                                    </P>
                                </Div>
                            </Div>
                            <Div flex={ !isMobile ? "column_center" : "row_between" } 
                                borderLeft={ !isMobile ? "grey1" : null }
                                padding={ !isMobile ? null : "15px 0px" }
                                borderBottom={ !isMobile ? null : "grey1" }
                            >
                                <Div width="fit-content" marginBottom={ !isMobile ? "3px" : null }>
                                    <P color="grey4" size="small" weight="400" lineHeight="160%">
                                        구분
                                    </P>
                                </Div>
                                <Div width="fit-content">
                                    <P size={ !isMobile ? "small_medium" : "small" } weight="600" lineHeight="160%">
                                        {paymentCost.division}
                                    </P>
                                </Div>
                            </Div>
                            <Div flex={ !isMobile ? "column_center" : "row_between" } 
                                borderLeft={ !isMobile ? "grey1" : null }
                                padding={ !isMobile ? null : "15px 0px" }
                                borderBottom={ !isMobile ? null : "grey1" }
                            >
                                <Div width="fit-content" marginBottom={ !isMobile ? "3px" : null }>
                                    <P color="grey4" size="small" weight="400" lineHeight="160%">
                                        정가
                                    </P>
                                </Div>
                                <Div width="fit-content">
                                    <P size={ !isMobile ? "small_medium" : "small" } weight="600" lineHeight="160%">
                                        { paymentCost.price.toLocaleString() }
                                    </P>
                                </Div>
                            </Div>
                            <Div flex={ !isMobile ? "column_center" : "row_between" } 
                                borderLeft={ !isMobile ? "grey1" : null }
                                padding={ !isMobile ? null : "15px 0px" }
                                borderBottom={ !isMobile ? null : "grey1" }
                            >
                                <Div width="fit-content" marginBottom={ !isMobile ? "3px" : null }>
                                    <P color="grey4" size="small" weight="400" lineHeight="160%">
                                        배송비
                                    </P>
                                </Div>
                                <Div width="fit-content">
                                    <P size={ !isMobile ? "small_medium" : "small" } weight="600" lineHeight="160%">
                                        { paymentCost.delivery_cost? paymentCost.delivery_cost.toLocaleString() : "무료배송" }
                                    </P>
                                </Div>
                            </Div>
                            <Div flex={ !isMobile ? "column_center" : "row_between" } 
                                borderLeft={ !isMobile ? "grey1" : null }
                                padding={ !isMobile ? null : "15px 0px" }
                                borderBottom={ !isMobile ? null : "grey1" }
                            >
                                <Div width="fit-content" marginBottom={ !isMobile ? "3px" : null }>
                                    <P color="grey4" size="small" weight="400" lineHeight="160%">
                                        판매가
                                    </P>
                                </Div>
                                <Div width="fit-content">
                                    <P size={ !isMobile ? "small_medium" : "small" } weight="600" lineHeight="160%" color="orange">
                                        { paymentCost.cost.toLocaleString() }
                                    </P>
                                </Div>
                            </Div>
                        </Div>
                    </Div>

                    <Div flex="column_center" marginBottom={ !isMobile ? "71px" : "30px" }>
                        <Div marginBottom="10px">
                            <H1 size={ !isMobile ? "small_large" : "small_medium" } weight="700" color="red">
                                최종 결제 정보
                            </H1>
                        </Div>
                        <Div flex={ !isMobile ? "row" : "column_center" }
                            padding={ !isMobile ? "10px 0px" : "0px 14px" }
                            borderTop="red"
                            backgroundColor="light_orange2"
                        >
                            <Div flex={ !isMobile ? "column_center" : "row_between" } 
                                borderLeft={ !isMobile ? "grey1" : null }
                                padding={ !isMobile ? null : "15px 0px" }
                                borderBottom={ !isMobile ? null : "grey1" }
                            >
                                <Div width="fit-content" marginBottom={ !isMobile ? "3px" : null }>
                                    <P color="grey4" size="small" weight="400" lineHeight="160%">
                                        주문금액
                                    </P>
                                </Div>
                                <Div width="fit-content">
                                    <P size={ !isMobile ? "small_medium" : "small" } weight="600" lineHeight="160%" color="orange">
                                        { paymentInfo.cost ? paymentInfo.cost.toLocaleString() : "0" }
                                    </P>
                                </Div>
                            </Div>
                            <Div flex={ !isMobile ? "column_center" : "row_between" } 
                                borderLeft={ !isMobile ? "grey1" : null }
                                padding={ !isMobile ? null : "15px 0px" }
                                borderBottom={ !isMobile ? null : "grey1" }
                            >
                                <Div width="fit-content" marginBottom={ !isMobile ? "3px" : null }>
                                    <P color="grey4" size="small" weight="400" lineHeight="160%">
                                        배송비
                                    </P>
                                </Div>
                                <Div width="fit-content">
                                    <P size={ !isMobile ? "small_medium" : "small" } weight="600" lineHeight="160%">
                                        { paymentInfo.delivery_cost? paymentInfo.delivery_cost.toLocaleString() : "무료배송" }
                                    </P>
                                </Div>
                            </Div>
                            <Div flex={ !isMobile ? "column_center" : "row_between" } 
                                borderLeft={ !isMobile ? "grey1" : null }
                                padding={ !isMobile ? null : "15px 0px" }
                                borderBottom={ !isMobile ? null : "grey1" }
                            >
                                <Div width="fit-content" marginBottom={ !isMobile ? "3px" : null }>
                                    <P color="grey4" size="small" weight="400" lineHeight="160%">
                                        총 할인금액
                                    </P>
                                </Div>
                                <Div width="fit-content">
                                    <P size={ !isMobile ? "small_medium" : "small" } weight="600" lineHeight="160%">
                                        { paymentInfo.sale ? paymentInfo.sale.toLocaleString() : "0" }
                                    </P>
                                </Div>
                            </Div>
                            <Div flex={ !isMobile ? "column_center" : "row_between" } 
                                borderLeft={ !isMobile ? "grey1" : null }
                                padding={ !isMobile ? null : "15px 0px" }
                                borderBottom={ !isMobile ? null : "grey1" }
                            >
                                <Div width="fit-content" marginBottom={ !isMobile ? "3px" : null }>
                                    <P color="grey4" size="small" weight="400" lineHeight="160%">
                                        최종 결제금액
                                    </P>
                                </Div>
                                <Div width="fit-content">
                                    <P size={ !isMobile ? "small_medium" : "small" } weight="600" lineHeight="160%">
                                        { paymentInfo.price.toLocaleString() }
                                    </P>
                                </Div>
                            </Div>
                        </Div>
                    </Div>

                    <Div flex="column_center" 
                        marginBottom={ !isMobile ? "50px" : "30px" } 
                        shadow={ !isMobile ? "0px 0px 4px rgba(0, 0, 0, 0.15)" : null } 
                        padding={ !isMobile ? "30px" : "13px" }
                        paddingTop={ !isMobile ? "22px" : null }
                        paddingBottom={ !isMobile ? null : "19px" }
                        borderTop="grey1"
                        borderBottom={ !isMobile ? null : "grey1" }
                    >
                        <Div flex="row_between" marginBottom="15px">
                            <Div width="fit-content">
                                <P color="bk" size="small" lineHeight="160%" weight="700">
                                    구매안내 사항
                                </P>
                            </Div>
                            <Div flex="row" width="fit-content" onClick={ onClickEvent }>
                                <Div width="fit-content">
                                    <Input ref={ inputRef } type="checkbox" onChange={ onChageEvent }/>
                                </Div>
                                <Div width="fit-content">
                                    <P id="check" color="grey4" weight="500" size="small" lineHeight="160%" cursor="pointer">
                                        개인정보 활용 동의
                                    </P>
                                </Div>
                            </Div>
                        </Div>
                        <Div height={ !isMobile ? "104px" : "160px" }>
                            <Text padding={ !isMobile ? "13px 17px" : "12px 8px" } paddingBottom={ !isMobile ? null : "22px" }>
                                <P color="grey4" weight="400" lineHeight="150%" style={{ fontSize: 12 }} whiteSpace="pre-line">
                                    { policy }
                                </P>
                            </Text>
                        </Div>
                    </Div>

                    <Div flex="row_center" width={ !isMobile ? "224px" : null } height={ !isMobile ? "50px" : "45px" } onClick={onClickEvent}>
                        <Button id={ check ? "payment" : "notChecked" } 
                                color="white" 
                                backgroundColor="orange" 
                                size={ !isMobile ? "small_medium" : "small" } 
                                weight="700"
                                radius="4px"
                            >
                            결제하기
                        </Button>
                    </Div>
                    
                </Div>
            </Main>
            <Footer/>
        </>
    )
}

export default PaymentPage