import React, { Suspense, useEffect, useState } from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import TopBar from "../container/TopBar"
import Footer from "../container/footer/Footer"
import { useSetRecoilState, useResetRecoilState, useRecoilValue } from "recoil"
import { topBarSelectedState } from "../../recoil/topBarAtom"
import { Main } from "./MainPage"
import commonDiv from "components/common/Div"
import P from "components/common/P"
import H1 from "components/common/H1"
import book from "../../svg/orange_open_book.svg"
import { isMobileState } from "recoil/mainAtom"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import Spinner from "components/component/Spinner"
import { dateFormat } from "modules/dateFormat"

const Div = styled(commonDiv)`
    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : "1180px"
    }};

    border-bottom: ${props => {
        return props.borderBottom ? `1px solid ${CommonStyle.setColor(props.borderBottom)}` : null
    }};

    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};

    aspect-ratio: ${props => {
        return props.ratio ? props.ratio : null
    }};
`

const Title = styled(H1)`
    white-space: pre-line;
    word-break: break-all;
`

const Img = styled.img`
    width: 100%;
    object-fit: contain;
`

const Contents = styled(P)`
    white-space: pre-line;
    word-break: break-all;
`

const Button = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: none;
    text-decoration: none;
    color: white;
    background-color: ${CommonStyle.setColor("orange")};
    font-family: "regular";
    border-radius: 4px;
    font-size: ${CommonStyle.setFontSize("small_medium")};
`

const TeachingMaterialsDetailPage = () => {

    const { id } = useParams()

    const isMobile = useRecoilValue(isMobileState)
    const setTopBar = useSetRecoilState(topBarSelectedState)
    const reset = useResetRecoilState(topBarSelectedState)
    const [ data, setData ] = useState({
        id: null, 
        isEnd: false, 
        img: null,
        title: "", 
        introduction: "", 
        date: null,
        size: null, 
        place: "", 
        page: "",
        href: []
    })
    const bookInfo = [
        { name: "발행처", data: data.place },
        { name: "발행일", data: data.date },
        { name: "사이즈", data: data.size },
        { name: "페이지", data: data.page }
    ]

    const textbookData = useQuery(
        [ "textbookDetailFetchData" ],
        async () => await fetch("GET", `/textbook/${ id }`),
        { refetchOnWindowFocus: false }
    )

    useEffect(() => { 
        setTopBar("textbook")
        if( textbookData.data?.data ){
            const d = textbookData.data.data.book
            
            setData({
                id: d.id,
                isEnd: d.inactive,
                img: d.detailImage,
                title: d.bookName,
                introduction: d.description,
                date: dateFormat( new Date( d.issuedDate ), "-" ),
                size: d.size,
                place: d.issuer,
                page: d.pageCount,
                href: d.urlList
            })
        }
        return () => {
            reset()
        }
    }, [ setTopBar, reset, textbookData.data ])

    return(
        <>
            {/* 상단바 */}
            <TopBar menu="orange"/>
            <Main>
                <Div flex={ !isMobile ? "row_center" : "column" } padding={ !isMobile ? "48px 0px" : "80px 20px" } paddingBottom={ !isMobile ? "152px" : null }>
                    {/* 교재 이미지 */}
                    <Div flex="row_center" width={ !isMobile ? "480px" : null } ratio="1/1" marginRight={ !isMobile ? "120px" : null }>
                        <Suspense fallback={ <Spinner width="150px"/> }>
                            {
                                data?.img && data.img &&
                                <Img src={ `${ process.env.REACT_APP_API_URL }${ data.img }` }/>
                            }
                        </Suspense>
                    </Div>
                    {/* 정보 */}
                    <Div flex="column_center" width={ !isMobile ? "580px" : null } marginTop={ !isMobile ? null : "17px" }>
                        {/* 이름 */}
                        <Div flex="row" marginBottom={ !isMobile ? "21px" : "9px" }>
                            <Div 
                                flex="row" 
                                minWidth={ !isMobile ? "30px" : "24px" } 
                                width={ !isMobile ? "30px" : "24px" } 
                                ratio="1/1" 
                                marginRight={ !isMobile ? "14px" : "8px" } 
                                marginTop="4px"
                            >
                                <Img src={ book }/>
                            </Div>
                            <Div>
                                <Title color="bk" size={ !isMobile ? "large" : "small_large" } weight="700" lineHeight="40px">
                                    { data?.title && data.title }
                                </Title>
                            </Div>
                        </Div>
                        {/* 설명 */}
                        <Div marginBottom={ !isMobile ? "36px" : "28px" } borderBottom="grey1" paddingBottom="26px">
                            <Contents color="bk" weight="400" size="small_medium" lineHeight="26px">
                                { data?.introduction && data.introduction }
                            </Contents>
                        </Div>
                        {/* 책 상세정보 */}
                        <Div flex="column" marginBottom={ !isMobile ? "40px" : "43px" }>
                            {
                                bookInfo && bookInfo.map((e, i) => 
                                    <Div key={i} flex="row" marginBottom={ !isMobile ? "12px" : "7px" }>
                                        <Div marginRight="22px" width="fit-content">
                                            <P color="bk" weight="400" size="extra_small" lineHeight="20px">
                                                { e?.name && e.name }
                                            </P>
                                        </Div>
                                        <Div width="fit-content">
                                            <P color="grey5" weight="400" size="extra_small" lineHeight="20px">
                                                { e?.data && e.data }

                                                {/* 뒤에 붙일거 */}
                                                {
                                                    i === 3 &&
                                                    " page"
                                                }
                                            </P>
                                        </Div>
                                    </Div>
                                )
                            }
                        </Div>
                        {/* 바로가기 버튼 */}
                        <Div flex={ !isMobile ? "row" : "row_between" } height="42px">
                            {
                                data?.href && data.href.map(( e, i ) =>
                                    <Div key={ i } width="150px" marginRight={ !isMobile ? "16px" : null } height="100%">
                                        <Button href={ e.url.search( "https://" ) !== -1 ? e.url : `https://${ e.url }` } target="_blank">
                                            { e?.name && e.name } 바로가기
                                        </Button>
                                    </Div>
                                )
                            }
                        </Div>
                    </Div>
                </Div>
            </Main>
            <Footer/>
        </>
    )
}

export default TeachingMaterialsDetailPage