import React, { useState, useEffect } from "react"
import P from "components/common/P"
import { Div, Title, CloseButton, ButtonComponent, StyledDialog } from "components/container/Dialog"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { fetch } from "modules/fetch"

const FindId = (props) => {

    const data = props.children.data
    const bt = props.children.bt
    const reset = props.reset
    const isMobile = props.isMobile
    const navigate = useNavigate()

    //state
    const [ dataList, setDataList ] = useState([])

    //query
    const findIdData = useQuery(
        [ "findIdFetchData" ],
        async() => await fetch( "GET", `/user/login-id?phone=${ data.tel }&code=${ data.code }` ),
        { refetchOnWindowFocus: false, enabled: !!data?.code }
    )

    //useEffect
    useEffect(() => {
        if( findIdData.data?.data ){
            const list = []
            
            for( let i of findIdData.data.data.userArray ){
                list.push( i )
            }

            setDataList( list )
        }
    }, [ findIdData.data ])

    const onClickEvent = (e) => {
        const id = e.target.id

        switch(id){
            case "close":
                reset()
                break
            case "login":
                navigate("/login")
                break
            case "findPw":
                navigate("/find-password")
                break
            default:
        }
    }

    return(
        <Div position="relative" maxWidth="500px" backgroundColor="white" radius="20px" zIndex="9" onClick={onClickEvent}>
            <CloseButton/>
            <StyledDialog isMobile={ isMobile }>
                <Div flex="row_center" marginBottom={ !isMobile ? "19px" : "17px" }>
                    <Title isMobile={ isMobile }>
                        계정 확인
                    </Title>
                </Div>
                <Div flex="row_center" marginBottom={ !isMobile ? "36px" : "28px" }>
                    <P color="bk" weight="500" lineHeight="180%" style={{ fontSize: !isMobile ? 18 : 13 }}>
                        입력하신 정보와 일치하는 아이디는 다음과 같습니다.
                    </P>
                </Div>
                <Div flex="column">
                    <Div flex="row" height={ !isMobile ? "65px" : "42px" } borderBottom="grey2">
                        <Div flex="row_center" height="100%">
                            <P weight="700" color="bk" size="small_large" lineHeight="130%">
                                아이디
                            </P>
                        </Div>
                        <Div flex="row_center" height="100%">
                            <P weight="700" color="bk" size="small_large" lineHeight="130%">
                                가입일
                            </P>
                        </Div>
                    </Div>
                    <Div flex="column" height={ !isMobile ? "180px" : "120px" } overflow="hidden" overflowY="auto">
                        {
                            dataList && dataList.map((e, i) =>
                                <Div key={i} flex="row" height={ !isMobile ? "60px" : "40px" } borderBottom="grey2">
                                    <Div flex="row_center" height="100%">
                                        <P weight="700" color="bk" size={ !isMobile ? "small_large" : "extra_small" } lineHeight="130%">
                                            { e.loginId && e.loginId }
                                        </P>
                                    </Div>
                                    <Div flex="row_center" height="100%">
                                        <P weight="700" color="bk" size={ !isMobile ? "small_large" : "extra_small" } lineHeight="130%">
                                            { e.joinDate && e.joinDate.split("T")[ 0 ] }
                                        </P>
                                    </Div>
                                </Div>
                            )
                        }
                    </Div>
                </Div>
            </StyledDialog>
            <ButtonComponent>
                {{
                    id: [ "login", "findPw" ],
                    text: [ "로그인", "비밀번호 찾기" ],
                    type: bt
                }}
            </ButtonComponent>
        </Div>
    )
}

export default FindId