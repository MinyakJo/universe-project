import React, { useEffect } from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import TopBar from "../container/TopBar"
import Footer from "../container/footer/Footer"
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"
import { topBarSelectedState } from "../../recoil/topBarAtom"
import { Main } from "./MainPage"
import commonDiv from "components/common/Div"
import { P } from "./PaymentPage"
import Button from "components/common/Button"
import MainIntroText from "components/component/main_page/MainIntroText"
import particle_01 from "../../svg/particle_01.svg"
import check from "../../svg/large_check.svg"
import large_monitor from "../../svg/large_monitor.svg"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { isMobileState } from "recoil/mainAtom"
import { useCookies } from "react-cookie"
import PaymentState from "components/component/payment_page/PaymentState"
import { useMutation } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import { dialogState } from "recoil/dialogAtom"

const Div = styled(commonDiv)`
    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : null
    }};

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

    border-top: ${props => {
        return props.borderTop ? `1px solid ${CommonStyle.setColor(props.borderTop)}` : null
    }};
`

const Line = styled.div`
    width: 100%;
    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : null
    }};
    margin: ${props => {
        return props.margin ? props.margin : null
    }};
    border-bottom: 1px solid ${CommonStyle.setColor("grey1")};
`

const Img = styled.img`
    width: 100%;
    object-fit: contain;
`

const Span = styled.span`
    color: ${CommonStyle.setColor("orange")};
`

const Link = styled.a`
    width: 100%;
    height: 100%;
    font-family: regular;

    ${ CommonStyle.setFlex( "row_center" ) };

    border-radius: ${({ radius }) => {
        return radius ? radius : null
    }};

    background-color: ${({ backgroundColor }) => {
        return backgroundColor ? CommonStyle.setColor( backgroundColor ) : null
    }};

    font-weight: ${({ weight }) => {
        return weight ? weight : null
    }};

    font-size: ${({ size }) => {
        return size ? CommonStyle.setColor( size ) : null
    }};

    line-height: ${({ lineHeight }) => {
        return lineHeight ? lineHeight : null
    }};

    color: ${({ color }) => {
        return color ? CommonStyle.setColor( color ) : null
    }};

    text-decoration: none;
`

const PaymentDonePage = ({ failed }) => {

    //params
    const { search } = useLocation()

    //cookie
    const [ cookies ] = useCookies([ "token" ])

    //navigate
    const navigate = useNavigate()

    //recoil
    const isMobile = useRecoilValue(isMobileState)

    const setTopBar = useSetRecoilState( topBarSelectedState )
    const resetTop = useResetRecoilState( topBarSelectedState )

    const setDialog = useSetRecoilState( dialogState )

    //query
    const mutation = useMutation(
        async data => await fetch( "POST", "/toss/approve", data, { Authorization: cookies.token } ),
        {
            onError: error => {
                setDialog({
                    isOpen: true,
                    btnType: 1,
                    data: { message: error.message, navigate: "passes" },
                    textType: "alert"
                })
            }
        }
    )

    //useEffect
    useEffect(() => { 
        setTopBar("courseRegistration")

        return () => { resetTop() }
    }, [ setTopBar, resetTop ])

    useEffect(() => {
        const searchParam = new URLSearchParams( search )

        if( searchParam.size > 0 && !failed ){
            mutation.mutate({
                paymentKey: searchParam.get( "paymentKey" ),
                orderId: searchParam.get( "orderId" ),
                amount: Number( searchParam.get( "amount" ) ),
            }) 
        }
    }, [ search, failed ])

    //event
    const onClickEvent = (e) => {
        const id = e.target.id

        switch(id){
            case "back":
                navigate("/passes")
                break
            default:
                break
        }
    }

    return(
        <>
            {
                search ?
                <>
                    <TopBar/>
                    <Main>

                        {/* 제목 */}
                        <Div flex="column_center" paddingTop={ !isMobile ? "71px" : "98px" } padding={ !isMobile ? "110px 0px" : "90px 20px" }>
                            <MainIntroText>
                                {{
                                    top: {
                                        text: "유니버스반복 패스를 만나보세요",
                                        margin: "12px"
                                    },
                                    bottom: {
                                        text: "수강신청",
                                        margin: "43px"
                                    },
                                    color: "bk"
                                }}
                            </MainIntroText>

                            {/* 현황 */}
                            <PaymentState success={ failed ? false : true }/>
                            
                            {/* 수강신청 완료 */}
                            <Div flex="column_center" 
                                width="fit-content" 
                                shadow="0px 2px 8px rgba(0, 0, 0, 0.1)" 
                                padding={ !isMobile ? "42px 34px" : "40px 7px" } 
                                paddingTop={ !isMobile ? "0px" : "10px" }
                                marginBottom={ !isMobile ? "110px" : null } 
                                radius="10px"
                            >
                                <Div paddingLeft="13px" paddingRight="13px" marginBottom="16px">
                                    <Div flex="column_center" 
                                        width="fit-content" 
                                        src={ !failed ? particle_01 : null }
                                        padding={ !isMobile ? "35px 66px" : "30px" }
                                        paddingBottom={ !isMobile ? "38px" : null }
                                        marginBottom={ !isMobile ? null : "45px" }
                                    >
                                        {
                                            !failed &&
                                            <Div width="56px" height="56px" marginBottom={ !isMobile ? "28px" : "20px" }>
                                                <Img src={check}/>
                                            </Div>
                                        }
                                        <Div>
                                            <P color="bk" weight="500" lineHeight="30px" family="esamanru" size={ !isMobile ? "large" : "medium" }>
                                                수강신청이 <Span>{ !failed ? "완료" : "실패" }</Span>되었습니다.
                                            </P>
                                        </Div>
                                    </Div>
                                </Div>

                                {/* 버튼 */}
                                {
                                    !failed ?
                                    <Div flex="column" padding={ !isMobile ? null : "0px 20px" } onClick={ onClickEvent }>
                                        <Div flex={ !isMobile ? "row_between" : "column_center" } marginBottom={ !isMobile ? null : "15px" }>
                                            <Div flex="row" width="fit-content" marginBottom={ !isMobile ? null : "9px" }>
                                                <Div flex="row" width={ !isMobile ? "24px" : "20px" } height={ !isMobile ? "24px" : "20px" } marginRight="8px" paddingTop="4px">
                                                    <Img src={large_monitor}/>
                                                </Div>
                                                <Div flex="row" width="fit-content">
                                                    <P color="grey5" weight="600" size={ !isMobile ? "small_large" : "small_medium" } lineHeight="34px">
                                                        지금 바로 강의 수강할래요!
                                                    </P>
                                                </Div>
                                            </Div>
                                            <Div height={ !isMobile ? "50px" : "45px" } width={ !isMobile ? "190px" : null }>
                                                <Link 
                                                    color="white" 
                                                    weight="700" 
                                                    size={ !isMobile ? "small_medium" : "small" } 
                                                    lineHeight="23px" 
                                                    backgroundColor="orange" 
                                                    radius="4px" 
                                                    href={ `${ process.env.REACT_APP_SOLUTION_URL }/${ cookies.token }` }
                                                    target="_blank"
                                                >
                                                    솔루션 실행하기
                                                </Link>
                                            </Div>
                                        </Div>
                                        <Line margin="15px 0px"/>
                                        <Div flex={ !isMobile ? "row_between" : "column_center" }>
                                            <Div flex="row" width="fit-content" marginBottom={ !isMobile ? null : "9px" }>
                                                <Div flex="row" width={ !isMobile ? "24px" : "20px" } height={ !isMobile ? "24px" : "20px" } marginRight="8px" paddingTop="4px">
                                                    <Img src={large_monitor}/>
                                                </Div>
                                                <Div flex="row" width="fit-content">
                                                    <P color="grey5" weight="600" size={ !isMobile ? "small_large" : "small_medium" } lineHeight="34px">
                                                        나중에 수강할래요!
                                                    </P>
                                                </Div>
                                            </Div>
                                            <Div height={ !isMobile ? "50px" : "45px" } width={ !isMobile ? "190px" : null }>
                                                <Button color="white" weight="700" size={ !isMobile ? "small_medium" : "small" } lineHeight="23px" backgroundColor="grey2" radius="4px" id="back">
                                                    돌아가기
                                                </Button>
                                            </Div>
                                        </Div>
                                    </Div> :
                                    <Div flex="row_center" onClick={ onClickEvent }>
                                        <Div height={ !isMobile ? "50px" : "45px" } width={ !isMobile ? "190px" : null }>
                                            <Button color="white" weight="700" size={ !isMobile ? "small_medium" : "small" } lineHeight="23px" backgroundColor="grey2" radius="4px" id="back">
                                                돌아가기
                                            </Button>
                                        </Div>
                                    </Div>
                                }
                            </Div>
                        </Div>
                    </Main>
                    <Footer/>
                </> :
                <Navigate to="/passes" replace/>
            }
        </>
    )
}

export default PaymentDonePage