import React, { useState, useEffect } from "react"
import styled from "styled-components"
import TopBar from "../container/TopBar"
import Footer from "../container/footer/Footer"
import { Main } from "./MainPage"
import commonDiv from "components/common/Div"
import H1 from "components/common/H1"
import H2 from "components/common/H2"
import Button from "components/common/Button"
import { useNavigate } from "react-router-dom" 
import QuestionList from "../container/customer_center_page/QuestionList"
import PageButtonBox from "../component/PageButtonBox"
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"
import { currentPageState, isMobileState } from "recoil/mainAtom"
import { useQuery } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import useRefetch from "hooks/useRefetch"
import { useCookies } from "react-cookie"
import { loginAlert } from "modules/loginAlert"
import { dialogState } from "recoil/dialogAtom"
import InquiryList from "components/component/customer_center_page/InquiryList"
import { dateFormat } from "modules/dateFormat"

const Div = styled(commonDiv)`
    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : "1180px"
    }};

    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};
`

const ButtonBox = styled(Div)`
    cursor: pointer;
`

const CustomerCenterPage = () => {

    //cookie
    const [ cookies ] = useCookies([ "token" ])

    //state
    const [ data, setData ] = useState([])

    //navigate
    const navigate = useNavigate()

    //recoil
    const isMobile = useRecoilValue(isMobileState)

    const page = useRecoilValue( currentPageState )
    const resetPage = useResetRecoilState( currentPageState )

    const setDialog = useSetRecoilState( dialogState )

    //query
    const inquiryData = useQuery(
        [ "inquiryFetchData" ],
        async () => await fetch("GET", `/question/list?page=${ page }`),
        { refetchOnWindowFocus: false }
    )

    //useEffect
    useEffect(() => {
        return ()=> {
            resetPage()
        }
    }, [])

    useEffect(() => {

        if(inquiryData.data?.data){
            const d = inquiryData.data.data
            const list = []

            for(let i of d.questionArray){
                list.push({
                    title: i.secret ? "비밀글 입니다."  : i.title,
                    isWait: i.answerDate ? false : true,
                    isSecret: i.secret,
                    name: i.userName,
                    date: dateFormat( new Date( i.registrationDate ), "-" ),
                    id: i.id,
                    answer: i.answer
                })
            }
            setData(list)
        }
    }, [ setData, inquiryData.data, resetPage ])

    useRefetch({ refetch: inquiryData.refetch, el: page })

    //event
    const onClickEvent = (e) => {
        const id = e.target.id

        if( id ) {
            if( cookies.token ) navigate(`/${id}`)
            else {
                loginAlert( setDialog, cookies.token )
            }
        }
    }

    return(
        <>
            {/* 상단바 */}
            <TopBar menu="orange"/>
            <Main backgroundColor="gray1">
                <Div flex="column_center" padding={ !isMobile ? "71px 0px" : "94px 20px" } paddingBottom={ !isMobile ? "75px" : "null" }>
                    {/* 타이틀 */}
                    <Div flex="row_center" marginBottom={ !isMobile ? "59px" : "18px" }>
                        <H1 
                            size={ !isMobile ? "extra_large" : "large_small" } 
                            color="black" 
                            weight="500" 
                            family="esamanru" 
                            lineHeight={ !isMobile ? "47px" : "36px" }
                        >
                            고객센터
                        </H1>
                    </Div>

                    {/* 자주묻는 질문 */}
                    <Div flex="column">
                        <Div flex="row" marginBottom={ !isMobile ? "12px" : "14px" }>
                            <H2 color="bk" size="medium" weight="700" lineHeight="32px">
                                자주묻는 질문
                            </H2>
                        </Div>
                        <QuestionList/>
                    </Div>

                    {/* 1:1문의하기 */}
                    <Div flex="column">
                        <Div flex="row_between" marginBottom={ !isMobile ? "14px" : "18px" }>
                            <Div width="fit-content">
                                <H2 
                                    color="bk" 
                                    size={ !isMobile ? "medium" : "small_medium" } 
                                    weight="700" 
                                    lineHeight={ !isMobile ? "32px" : "23px" }
                                >
                                    1:1 문의하기
                                </H2>
                            </Div>
                            <ButtonBox width="fit-content" padding={ !isMobile ? "9.5px 16.5px" : "6px 16px" } backgroundColor="orange" radius="4px">
                                <Button 
                                    color="white" 
                                    weight="700" 
                                    lineHeight="23px" 
                                    backgroundColor="none"
                                    style={{ fontSize: !isMobile ? 16 : 13 }}
                                    id="create-inquiry" 
                                    onClick={onClickEvent}
                                >
                                    1:1 문의하기
                                </Button>
                            </ButtonBox>
                        </Div>
                        <InquiryList backgroundColor={ !isMobile ? null : "none" }>
                            { data }
                        </InquiryList>
                        <Div flex="row" marginTop="60px">
                            <PageButtonBox>
                                {{
                                    page: page,
                                    pageCnt: inquiryData.data?.data?.totalPage ? inquiryData.data?.data?.totalPage : 1
                                }}
                            </PageButtonBox>
                        </Div>
                    </Div>
                </Div>
            </Main>
            <Footer/>
        </>
    )
}

export default React.memo(CustomerCenterPage)