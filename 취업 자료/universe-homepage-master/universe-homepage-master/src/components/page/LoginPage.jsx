import React, { useState } from "react"
import styled from "styled-components"
import Div from "components/common/Div"
import H1 from "components/common/H1"
import P  from "components/common/P"
import Button from "components/common/Button"
import CommonStyle from "components/style"
import { Input } from "components/container/Dialog"
import { useNavigate } from "react-router-dom"
import { isMobileState } from "recoil/mainAtom"
import { useRecoilValue, useSetRecoilState } from "recoil"
import logo from "../../svg/top_logo.svg"
import LeftDisplay from "components/container/create_account_page/LeftDisplay"
import { useMutation } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import { dialogState } from "recoil/dialogAtom"
import { useCookies } from "react-cookie"

const Span = styled.span`
    color: ${CommonStyle.setColor("orange")};
`

const Line = styled.div`
    height: 100%;
    width: 0px;
    border-left: 1px solid ${CommonStyle.setColor("gray3")};
`

const Img = styled.img`
    height: 100%;
    object-fit: contain;
    cursor: pointer;
`

const LoginPage = () => {

    const [ userId, setUserId ] = useState("")
    const [ pw, setPw ] = useState("")
    const navigate = useNavigate()
    const isMobile = useRecoilValue( isMobileState )
    const setDialog = useSetRecoilState( dialogState )
    const [ , setCookie ] = useCookies([ "token" ])

    const mutation = useMutation(
        async data => await fetch( "POST", "/user/sign", data ),
        {
            onSuccess: ({ data }) => {
                setCookie( "token", data.token )
                navigate( "/", { replace: true } )
            },
            onError: err => {
                setDialog({
                    isOpen: true,
                    textType: "alert",
                    btnType: 1,
                    data: { message: err.message }
                })
            }
        }
    )

    const onClickEvent = (e) => {
        const id = e.target.id

        switch(id){
            case "login":
                if( userId !== "" && pw !== "" ) mutation.mutate({ loginId: userId, password: pw })
                if( userId === "" || pw === "" ) {
                    setDialog({
                        isOpen: true,
                        btnType: 1,
                        textType: "alert",
                        data: { message: "아이디 또는 비밀번호를 입력해 주세요." }
                    })
                }
                break
            case "join":
                navigate("/create-account")
                break
            case "findId":
                navigate("/find-id")
                break
            case "findPw":
                navigate("/find-password")
                break
            case "home":
                navigate("/")
                break
            default:
        }
    }

    const onKeyUpEvent = (e) => {
        if( e.keyCode === 13 ){
            mutation.mutate({ loginId: userId, password: pw })
        }
    }

    const onChangeEvent = (e) => {
        const id = e.target.id
        const value = e.target.value

        switch(id){
            case "id":
                setUserId(value)
                break
            case "pw":
                setPw(value)
                break
            default:
        }
    }

    return(
        <main>
            <Div flex="row" height="100vh">
                {
                    !isMobile &&
                    <LeftDisplay login>
                        {{
                            title: "Hello, Friend!",
                            subtitle: "유니버스반복에 오신 것을 환영합니다."
                        }}
                    </LeftDisplay>
                }
                <Div 
                    flex="column_center" 
                    height="100%" 
                    onClick={onClickEvent} 
                    padding={ !isMobile ? null : "60px 20px" } 
                    paddingTop={ !isMobile ? null : "118px" }
                >
                    <Div flex="column" width={ !isMobile ? "420px" : null }>
                        <Div flex="row_center" marginBottom={ !isMobile ? "55px" : "35px" }>
                            <H1 
                                size={ !isMobile ? "large" : "medium" } 
                                weight="500" 
                                family="esamanru" 
                                lineHeight="150%" 
                                style={{ textAlign: "center" }}
                            >
                                오늘도 <Span>반복</Span> 하러 와주셨군요!<br/>
                                당신을 응원합니다.
                            </H1>
                        </Div>
                        <Div flex="column" marginBottom={ !isMobile ? "17px" : "20px" }>
                            <Div marginBottom={ !isMobile ? "12px" : "10px" }>
                                <P size={ !isMobile ? "small_medium" : "small" } color="bk" weight="600">
                                    아이디
                                </P>
                            </Div>
                            <Div>
                                <Input 
                                    type="text" 
                                    placeholder="아이디를 입력해 주세요." 
                                    id="id" 
                                    size={ !isMobile ? null : "extra_small" }
                                    onChange={ onChangeEvent } 
                                    onKeyUp={ onKeyUpEvent }
                                    autoComplete="off"
                                    padding={ !isMobile ? null : "14px 11px" }
                                />
                            </Div>
                        </Div>
                        <Div flex="column" marginBottom={ !isMobile ? "50px" : "26px" }>
                            <Div marginBottom={ !isMobile ? "12px" : "10px" }>
                                <P size={ !isMobile ? "small_medium" : "small" } color="bk" weight="600">
                                    비밀번호
                                </P>
                            </Div>
                            <Div>
                                <Input 
                                    type="password" 
                                    placeholder="비밀번호를 입력해 주세요." 
                                    id="pw" 
                                    size={ !isMobile ? null : "extra_small" }
                                    onChange={ onChangeEvent }
                                    onKeyUp={ onKeyUpEvent }
                                    padding={ !isMobile ? null : "14px 11px" }
                                />
                            </Div>
                        </Div>
                        <Div flex="column" marginBottom={ !isMobile ? "50px" : "30px" }>
                            <Div flex="row_center" radius="4px" backgroundColor="orange" height={ !isMobile ? "50px" : "45px" } marginBottom={ !isMobile ? "20px" : "12px" }>
                                <Button color="white" weight="600" size={ !isMobile ? "small_medium" : "small" } id="login">
                                    로그인
                                </Button>
                            </Div>
                            <Div flex="row_center" radius="4px" backgroundColor="grey1" height={ !isMobile ? "50px" : "45px" }>
                                <Button color="grey4" weight="600" size={ !isMobile ? "small_medium" : "small" } id="join">
                                    회원가입
                                </Button>
                            </Div>
                        </Div>
                        <Div flex="row_center">
                            <Div width="fit-content" padding={ !isMobile ? "0px 18px" : "0px 11px" }>
                                <Button color="bk" weight="400" size={ !isMobile ? "small_medium" : "extra_small" } id="findId">
                                    아이디 찾기
                                </Button>
                            </Div>
                            <Line/>
                            <Div width="fit-content" padding={ !isMobile ? "0px 18px" : "0px 11px" }>
                                <Button color="bk" weight="400" size={ !isMobile ? "small_medium" : "extra_small" } id="findPw">
                                    비밀번호 찾기
                                </Button>
                            </Div>
                            <Line/>
                            <Div width="fit-content" padding={ !isMobile ? "0px 18px" : "0px 11px" }>
                                <Button color="bk" weight="400" size={ !isMobile ? "small_medium" : "extra_small" } id="home">
                                    홈으로
                                </Button>
                            </Div>
                        </Div>
                        {
                            isMobile &&
                            <Div flex="row_center" marginTop="84px" height="30px">
                                <Img src={logo} id="home"/>
                            </Div>
                        }
                    </Div>
                </Div>
            </Div>
        </main>
    )
}

export default LoginPage