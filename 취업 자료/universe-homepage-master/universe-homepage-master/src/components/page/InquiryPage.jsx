import React, { useState } from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import TopBar from "../container/TopBar"
import Footer from "../container/footer/Footer"
import { Main } from "./MainPage"
import commonDiv from "components/common/Div"
import P from "components/common/P"
import H1 from "components/common/H1"
import Button from "components/common/Button"
import { useNavigate, useParams } from "react-router-dom" 
import Answer from "components/component/customer_center_page/Answer"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import Img from "components/common/Img"
import { dateFormat } from "modules/dateFormat"
import useRefetch from "hooks/useRefetch"

const Div = styled(commonDiv)`
    max-width: 1180px;

    border-bottom: ${props => {
        return props.borderBottom ? `1px solid ${CommonStyle.setColor(props.borderBottom)}` : null
    }};

    cursor: ${({ cursor }) => {
        return cursor ? cursor : null
    }};
`

const Contents = styled(P)`
    white-space: pre-line;
    word-break: break-all;
`

export { Contents, Div }

const InquiryPage = (props) => {

    const { id } = useParams()

    const isMobile = useRecoilValue(isMobileState)

    const [ data, setData ] = useState({})

    const navigate = useNavigate()

    const onClickEvent = () => {
        navigate("/customer-center")
    }

    let url

    if(props.faqs){
        url = `/faq/${ id }`
    }else{
        url = `/question/list/${ id }`
    }


    const detailData = useQuery(
        [ "faqDetailFetchData" ],
        async() => await fetch("GET", url),
        { refetchOnWindowFocus: false }
    )

    useEffect(() => {
        if(detailData.data?.data?.faq ){
            const d = detailData.data.data.faq

            setData({
                id: d.id,
                title: d.title,
                date: dateFormat( new Date( d.registrationDate ), "-" ),
                name: d.userName ? d.userName : "",
                category: d.category,
                contents: d.contents,
                answer: d.answer,
                file: d.attached
            })
        }else if( detailData.data?.data?.question ){
            const d = detailData.data.data.question

            setData({
                id: d.id,
                title: d.title,
                date: dateFormat( new Date( d.registrationDate ), "-" ),
                name: d.userName ? d.userName : "",
                category: d.category,
                contents: d.contents,
                answer: d.answer,
                file: d.attached
            })
        }

    }, [ setData, detailData.data ])

    useRefetch({ refetch: detailData.refetch, el: id })

    return(
        <>
            {/* 상단바 */}
            <TopBar menu="orange"/>
            <Main>
                <Div flex="column" padding={ !isMobile ? "76px 0px" : "92px 20px" } paddingBottom={ !isMobile ? "122px" : null }>
                    <Div flex="column" paddingBottom={ !isMobile ? "32px" : "16px" } borderBottom="grey2">
                        {/* QNA Mobile */}
                        {
                            props.faqs && isMobile &&
                            <Div flex="row" marginBottom="11px">
                                <Div flex="row_center" width="19px" height="19px" radius="50%" backgroundColor="orange" marginRight="7px">
                                    <H1 color="white" weight="700" style={{ fontSize: 12 }} lineHeigh="24px" family="pretendard">
                                        Q
                                    </H1>
                                </Div>
                                <Div width="fit-content">
                                    <H1 color="orange" weight="700" size="extra_small" lineHeigh="24px" family="pretendard">
                                        { data?.category && data.category }
                                    </H1>
                                </Div>
                            </Div>
                        }
                        {/* 제목 */}
                        <Div>
                            <H1 weight="700" color="bk" size={ !isMobile ? "large_medium" : "medium_small" } lineHeight={ !isMobile ? "40px" : "29px" }>
                                { data?.title && data.title }
                            </H1>
                        </Div>
                        {/* QNA Desktop */}
                        {
                            props.faqs && !isMobile ?
                            <Div flex="row" marginTop="20px">
                                <Div flex="row_center" width="28px" height="28px" radius="50%" backgroundColor="orange" marginRight="7px">
                                    <H1 color="white" weight="700" size="medium_small" lineHeigh="24px" family="pretendard">
                                        Q
                                    </H1>
                                </Div>
                                <Div width="fit-content">
                                    <H1 color="orange" weight="700" size="medium_small" lineHeigh="24px" family="pretendard">
                                        { data?.category && data.category }
                                    </H1>
                                </Div>
                            </Div>:
                            !props.faqs &&
                            <Div flex="row" marginTop={ !isMobile ? "20px" : "7px" }>
                                <Div flex="row" width="fit-content" marginRight="23px">
                                    <Div marginRight={ !isMobile ? "14px" : "6px" }>
                                        <P color="dark_grey" style={{ fontSize: !isMobile ? 16 : 13, whiteSpace: "nowrap" }} weight="700" lineHeight="26px">
                                            작성일
                                        </P>
                                    </Div>
                                    <Div>
                                        <P color="dark_grey" style={{ fontSize: !isMobile ? 16 : 13, whiteSpace: "nowrap" }} weight="400" lineHeight="26px">
                                            { data?.date && data.date }
                                        </P>
                                    </Div>
                                </Div>
                                <Div flex="row" width="fit-content">
                                    <Div marginRight={ !isMobile ? "14px" : "6px" }>
                                        <P color="dark_grey" style={{ fontSize: !isMobile ? 16 : 13, whiteSpace: "nowrap" }} weight="700" lineHeight="26px">
                                            작성자
                                        </P>
                                    </Div>
                                    <Div>
                                        <P color="dark_grey" style={{ fontSize: !isMobile ? 16 : 13, whiteSpace: "nowrap" }} weight="400" lineHeight="26px">
                                            { data?.name && data.name }
                                        </P>
                                    </Div>
                                </Div>
                            </Div>
                        }
                    </Div>
                    <Div marginTop="25px" marginBottom="25px" paddingBottom="31px" borderBottom="grey2">
                        <Contents color="bk" size={ !isMobile ? "small_large" : "extra_small" } lineHeight="190%" weight="400">
                            { data?.contents && data.contents }
                        </Contents>
                        {
                            data.file &&
                            <Div marginTop={ !isMobile ? "11px" : "20px" } marginBottom={ !isMobile ? "11px" : "20px" }>
                                <Img src={ `${ process.env.REACT_APP_API_URL }${ data.file }` } cursor="default"/>
                            </Div>
                        }
                        {
                            !props.faqs && data?.answer &&
                            <Answer>
                                { data.answer }
                            </Answer>
                        }
                    </Div>
                    <Div width="fit-content" padding={ !isMobile ? "10px 14px" : "7px 12px" } borderColor={"gray3"} radius="4px" onClick={ onClickEvent } cursor="pointer">
                        <Button 
                            weight="500"
                            size="small_large" 
                            lineHeight="18px" 
                            style={{ 
                                color: "#4D4444", 
                                fontSize: !isMobile ? 18 : 13  
                            }}
                        >
                            목록
                        </Button>
                    </Div>
                </Div>
            </Main>
            <Footer/>
        </>
    )
}

export default InquiryPage