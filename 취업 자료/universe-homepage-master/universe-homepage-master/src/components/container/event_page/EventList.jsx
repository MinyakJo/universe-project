import React, { useState } from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import commonP from "components/common/P"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { currentPageState, isMobileState } from "recoil/mainAtom"
import { fetch } from "modules/fetch"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import PageButtonBox from "components/component/PageButtonBox"
import useRefetch from "hooks/useRefetch"

const Div = styled(commonDiv)`
    position: ${props => {
        return props.position ? props.position : null
    }};

    left: ${props => {
        return props.left ? props.left : null
    }};

    top: ${props => {
        return props.left ? props.left : null
    }};

    box-shadow: ${props => {
        return props.shadow ? props.shadow : null
    }};

    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};

    opacity: ${props => {
        return props.opacity ? props.opacity : null
    }};

    cursor: ${props => {
        return props.cursor ? props.cursor : null
    }};

    aspect-ratio: ${props => {
        return props.ratio ? props.ratio : null
    }};

    overflow: ${({ overflow }) => {
        return overflow ? overflow : null
    }};
`

const P = styled(commonP)`
    cursor: pointer;
`

const Img = styled.img`
    width: 100%;
    object-fit: contain;
    cursor: pointer;
`

const Contents = styled(P)`
    display: -webkit-box;
    width: 100%;
    white-space: pre-line;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    cursor: pointer;
`

const EventList = () => {

    const isMobile = useRecoilValue(isMobileState)

    const [ data, setData ] = useState([])

    const navigate = useNavigate()
    const page = useRecoilValue(currentPageState)

    const eventData = useQuery(
        [ "eventListData" ],
        async () => await fetch("GET", `/event?page=${ page }&order=0&open=0`),
        { refetchOnWindowFocus: false }
    )

    const onClickEvent = (e) => {
        const id = e.target.id
        
        if(id){
            navigate(`/events/${id}`)
        }
    }

    useEffect(() => {
        if(eventData.data?.data){
            const d = eventData.data.data
            const list = []
            
            for(let i of d.eventArray){
                list.push({
                    id: i.id,
                    img: i.thumbnail,
                    isEnd: !i.onGoing,
                    text: i.title,
                    startDate: i.startDate,
                    endDate: i.endDate
                })
            }

            setData(list)
        }
    }, [ eventData.data ])

    useRefetch({ refetch: eventData.refetch, el: page })

    return(
        <Div flex="column_center">
            {
                data && data.map((e, i) => 
                    <Div 
                        key={i} 
                        flex={ !isMobile ? "row" : "column" } 
                        width={ !isMobile ? "780px" : null } 
                        height={ !isMobile ? "180px" : null } 
                        marginBottom={ !isMobile ? "30px" : "18px" } 
                        shadow="0px 2px 8px rgba(0, 0, 0, 0.1)" 
                        opacity={ e.isEnd ? "0.7" : null } 
                        id={ e.id } 
                        onClick={onClickEvent}
                        backgroundColor="white"
                        cursor="pointer"
                    >
                        {
                            !isMobile ?
                            <Div flex="row_center" minWidth="306px" width="306px" height="100%" backgroundColor="grey1" marginRight="23px" cursor="pointer" overflow="hidden">
                                {
                                    e?.img && e.img &&
                                    <Img src={ `${ process.env.REACT_APP_API_URL }${ e.img }` } id={ e.id }/>
                                }
                            </Div>:
                            <Div flex="row_center" position="relative" backgroundColor="grey1" ratio="16/9" id={e.id} cursor="pointer" overflow="hidden">
                                {
                                    e?.img && e.img &&
                                    <Img src={ `${ process.env.REACT_APP_API_URL }${ e.img }` } id={ e.id }/>
                                }
                                <Div position="absolute" left="9px" top="9px" width="fit-content" backgroundColor={ e.isEnd ? "grey2" : "orange" } padding="3px 12px" cursor="pointer">
                                    <P color="white" weight="400" lineHeight="20px" style={{ fontSize: 13 }} id={e.id}>
                                        { e.isEnd ? "종료" : "진행중" }
                                    </P>
                                </Div>
                            </Div>
                        }
                        <Div width={ !isMobile ? "calc(100% - 360px)" : null } flex="column" id={e.id} cursor="pointer" padding={ !isMobile ? null : "9px 14px" }>
                            {
                                !isMobile &&
                                <Div width="fit-content" backgroundColor={ e.isEnd ? "grey2" : "orange" } padding="5px 17px" marginBottom="13px" id={e.id} cursor="pointer">
                                    <P color="white" weight="400" size="extra_small" lineHeight="20px" id={e.id}>
                                        { e.isEnd ? "종료" : "진행중" }
                                    </P>
                                </Div>
                            }
                            <Div marginBottom={ !isMobile ? "10px" : "7px" } id={e.id} cursor="pointer">
                                <Contents 
                                    color="grey7" 
                                    weight="600" 
                                    size={ !isMobile ? "small_large" : "small" } 
                                    lineHeight="140%" 
                                    id={ e.id }
                                >
                                    { e?.text && e.text }    
                                </Contents>
                            </Div>
                            <Div flex="row" id={ e.id } cursor="pointer">
                                {
                                    e?.startDate && e.startDate &&
                                    <Div width="fit-content" marginRight="2px">
                                        <P color="grey5" weight="400" lineHeight="26px" size="extra_small" id={ e.id }>
                                            { e.startDate.split("T")[ 0 ] } ~
                                        </P>
                                    </Div>
                                }
                                {
                                    e?.endDate && e.endDate &&
                                    <Div width="fit-content" marginLeft="2px">
                                        <P color="grey5" weight="400" lineHeight="26px" size="extra_small" id={ e.id }>
                                            { e.endDate.split("T")[ 0 ] }
                                        </P>
                                    </Div>
                                }
                            </Div>
                        </Div>
                    </Div>
                )
            }

            <Div marginTop={ !isMobile ? "60px" : "40px" }>
                <PageButtonBox>
                    {{
                        page: page,
                        pageCnt: eventData.data?.data?.totalPage ? eventData.data.data.totalPage : 1
                    }}
                </PageButtonBox>
            </Div>
        </Div>
    )
}

export default EventList