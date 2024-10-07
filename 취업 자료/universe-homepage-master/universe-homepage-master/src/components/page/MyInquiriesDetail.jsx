import React, { useEffect } from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import TopBar from "../container/TopBar"
import Footer from "../container/footer/Footer"
import { Main } from "./MainPage"
import commonDiv from "components/common/Div"
import Menu from "../container/my_page/Menu"
import H1 from "components/common/H1"
import P from "components/common/P"
import Answer from "components/component/customer_center_page/Answer"
import { Contents } from "components/page/InquiryPage"
import Button from "components/common/Button"
import { useNavigate, useParams } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import Title from "components/component/my_page/Title"
import { useQuery } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import { useCookies } from "react-cookie"
import { useState } from "react"
import Img from "components/common/Img"


const Div = styled(commonDiv)`
    max-width: 1180px;

    border-bottom: ${props => {
        return props.borderBottom ? `1px solid ${CommonStyle.setColor(props.borderBottom)}` : null
    }};
`

const MyInquiriesDetailPage = () => {

    const { id } = useParams()
    const [ cookies ] = useCookies([ "token" ])

    const [ inquiryData, setInquiryData ] = useState({
        title: "",
        date: "",
        text: "",
        answer: "",
        file: null
    })
    const isMobile = useRecoilValue(isMobileState)
    const navigate = useNavigate()

    const { data } = useQuery(
        [ "myInquiryinquiryData" ],
        async () => await fetch("GET", `/question/list/${ id }`, null, { Authorization: cookies.token }),
        { refetchOnWindowFocus: false }
    )

    useEffect(() => {
        if(data?.data){
            const d = data.data.question

            setInquiryData({
                title: d.title,
                date: d.registrationDate.split("T")[ 0 ],
                text: d.contents,
                answer: d.answer,
                file: d.attached
            })
        }
    }, [ data, setInquiryData ])

    const onClickEvent = () => {
        navigate("/my-inquiries")
    }

    return(
        <>
            {/* 상단바 */}
            <TopBar menu="orange"/>
            <Main>
                <Div 
                    flex={ !isMobile ? "row_top" : "column" } 
                    padding={ !isMobile ? "88px 0px" : "100px 20px" } 
                    paddingBottom={ !isMobile ? "128px" : null }
                >
                    <Menu select="myInquiry"/>
                    <Div flex="column">
                        <Title borderColor="m_grey">
                            내가 쓴 문의
                        </Title>
                        <Div 
                            flex="row_between" 
                            marginTop={ !isMobile ? "34px" : "22px" } 
                            paddingBottom={ !isMobile ? "14px" : "17px" } 
                            borderBottom="bk"  
                            marginBottom={ !isMobile ? "20px" : "22px" }
                        >
                            <Div width="fit-content">
                                <H1 color="bk" size={ !isMobile ? "small_medium" : "extra_small" } weight="700" lineHeight="26px">
                                    { inquiryData?.title && inquiryData.title }
                                </H1>
                            </Div>
                            <Div flex="row" width="fit-content">
                                <Div marginRight={ !isMobile ? "14px" : "6px" }>
                                    <P color="dark_grey" weight="700" style={{ fontSize: !isMobile ? 16 : 12 }} lineHeight="26px">
                                        작성일
                                    </P>
                                </Div>
                                <Div>
                                    <P color="dark_grey" weight="400" style={{ fontSize: !isMobile ? 16 : 12, whiteSpace: "nowrap" }} lineHeight="26px">
                                        { inquiryData?.date && inquiryData.date }
                                    </P>
                                </Div>
                            </Div>
                        </Div>
                        <Div flex="column" paddingBottom="34px" borderBottom="grey1" marginBottom="30px">
                            <Div marginBottom={ !isMobile ? "11px" : "20px" }>
                                <Contents size={ !isMobile ? "small_medium" : "extra_small" } color="bk" weight="400" lineHeight="190%">
                                    { inquiryData?.text && inquiryData.text }
                                </Contents>
                            </Div>
                            {
                                inquiryData.file &&
                                <Div marginBottom={ !isMobile ? "11px" : "20px" }>
                                    <Img src={ `${ process.env.REACT_APP_API_URL }${ inquiryData.file }` }/>
                                </Div>
                            }
                            {
                                inquiryData.answer &&
                                <Answer>
                                    { inquiryData.answer }
                                </Answer>
                            }
                        </Div>
                        <Div width="fit-content" padding={ !isMobile ? "10px 14px" : "7px 14px" } borderColor={"gray3"} radius="4px">
                            <Button 
                                weight="500" 
                                style={{ 
                                    fontSize: !isMobile ? 18 : 13 
                                }} 
                                lineHeight="18px" 
                                color="dark_grey" 
                                onClick={onClickEvent}
                            >
                                목록
                            </Button>
                        </Div>
                    </Div>
                </Div>

            </Main>
            <Footer/>
        </>
    )
}

export default MyInquiriesDetailPage