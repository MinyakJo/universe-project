import React, { useEffect, useState } from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import CommonStyle from "components/style"
import PageButtonBox from "../../component/PageButtonBox"
import Title from "components/component/my_page/Title"
import { useRecoilValue } from "recoil"
import { currentPageState, isMobileState } from "recoil/mainAtom"
import { useQuery } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import { userDataState } from "recoil/createAccountAtom"
import { useCookies } from "react-cookie"
import useRefetch from "hooks/useRefetch"
import { dateFormat } from "modules/dateFormat"
import InquiryList from "components/component/customer_center_page/InquiryList"

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

const InquiryHistory = () => {

    const [ cookies ] = useCookies([ "token" ])

    const [ dataList, setDataList ] = useState([])
    
    const userData = useRecoilValue(userDataState)

    const isMobile = useRecoilValue(isMobileState)

    const page = useRecoilValue(currentPageState)

    const { data, refetch } = useQuery(
        [ "userInquiryFetchData" ],
        async() => await fetch("GET", `/question/list?page=${ page }&student=${ userData.studentId }`, null, { Authorization: cookies.token }),
        { refetchOnWindowFocus: false }
    )

    useEffect(() => {
        if(data?.data && userData?.studentId ){
            const list = []

            for( let i of data.data.questionArray ){
                list.push({
                    title: i.title,
                    date: dateFormat( new Date( i.registrationDate ), "-" ),
                    isWait: i.answerDate ? false : true,
                    name: i.userName,
                    id: i.id
                })
            }

            setDataList( list )
        }
    }, [ data, setDataList, userData ])

    useRefetch({ refetch, el: userData })

    return(
        <Div flex="column">
            <Div flex="column" marginBottom="30px">
                <Title borderColor="none">
                    내가 쓴 문의
                </Title>
                <Div flex="column" marginTop={ !isMobile ? null : "2px" }>
                    <InquiryList my>
                        { dataList }
                    </InquiryList>
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

export default InquiryHistory