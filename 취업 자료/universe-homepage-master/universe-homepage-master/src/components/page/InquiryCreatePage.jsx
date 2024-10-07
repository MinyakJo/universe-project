import React, { useState, useRef } from "react"
import styled from "styled-components"
import TopBar from "../container/TopBar"
import Footer from "../container/footer/Footer"
import { Main } from "./MainPage"
import commonDiv from "components/common/Div"
import H1 from "components/common/H1"
import P from "components/common/P"
import Button from "components/common/Button"
import { useNavigate } from "react-router-dom" 
import CommonStyle from "components/style"
import check from "../../svg/check.svg"
import { useRecoilState, useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import FileUploadButton from "components/component/customer_center_page/FileUploadButton"
import { useMutation } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import { useCookies } from "react-cookie"
import { dialogState } from "recoil/dialogAtom"

const Div = styled(commonDiv)`
    max-width: 580px;

    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};

    box-shadow: ${props => {
        return props.shadow ? props.shadow : null
    }};
`

const Input = styled.input`
    width: 100%;
    padding: ${props => {
        return props.isMobile ? "15px 14px" : "15px 22px"
    }};
    font-weight: 500;
    font-size: ${props => {
        return props.isMobile ? `${CommonStyle.setFontSize("extra_small")}` : `${CommonStyle.setFontSize("small_medium")}`
    }};
    line-height: 130%;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid ${CommonStyle.setColor("gray2")};
    font-family: "regular";

    &::placeholder{
        color: ${CommonStyle.setColor("gray2")}
    }
    &:focus{
        outline: 1px solid ${CommonStyle.setColor("bk")}
    }
`

const Textarea = styled.textarea`
    width: 100%;
    height: ${props => {
        return props.isMobile ? "320px" : "200px"
    }};
    padding: ${props => {
        return props.isMobile ? "15px 14px" : "15px 22px"
    }};
    font-weight: 500;
    font-size: ${props => {
        return props.isMobile ? `${CommonStyle.setFontSize("extra_small")}` : `${CommonStyle.setFontSize("small_medium")}`
    }};
    line-height: 130%;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid ${CommonStyle.setColor("gray2")};
    font-family: "regular";
    resize: none;

    &::placeholder{
        color: ${CommonStyle.setColor("gray2")}
    }
    &::-webkit-scrollbar{
        width: 3px;
    }
    &::-webkit-scrollbar-thumb{
        border-radius: 10px;
        background-color: ${CommonStyle.setColor("gray2")};
    }
    &:focus{
        outline: 1px solid ${CommonStyle.setColor("bk")}
    }
`

const Img = styled.img`
    width: 100%;
    object-fit: contain;
`

const InquiryCreatePage = () => {

    const isMobile = useRecoilValue(isMobileState)

    const [ title, setTitle ] = useState("")
    const [ contents, setContents ] = useState("")
    const [ file, setFile ] = useState(null)
    const [ secret, setSecret ] = useState(false)

    const navigate = useNavigate()

    const ref = useRef()

    const [ dialog, setDialog ] = useRecoilState(dialogState)

    const [ cookies ] = useCookies([ "token" ])

    const mutation = useMutation(async data => await fetch("POST", "/question/list", data, { Authorization: cookies.token }),
    {
        onSuccess: () => {
            const copyDialog = { ...dialog }

            copyDialog.textType = "alert"
            copyDialog.data = {
                message: "문의가 완료 되었습니다.",
                navigate: "home"
            }
            copyDialog.btnType = 1
            copyDialog.isOpen = true

            setDialog(copyDialog)
        },
        onError: (error) => {
            const copyDialog = { ...dialog }

            copyDialog.textType = "alert"
            copyDialog.data = {
                message: error.message
            }
            copyDialog.btnType = 1
            copyDialog.isOpen = true

            setDialog(copyDialog)
        }
    })

    const imgMutation = useMutation(
        async data => await fetch("POST", "/upload/report/attached", data, { "Content-Type": "multipart/form-data", Authorization: cookies.token }),
        {
            onSuccess: ({ data }) => {
                mutation.mutate({
                    title: title,
                    contents: contents,
                    attached: data.filename,
                    secret: secret
                })
            },
            onError: error => {
                const copyDialog = { ...dialog }

                copyDialog.textType = "alert"
                copyDialog.data = {
                    message: error.message
                }
                copyDialog.isOpen = true
                copyDialog.btnType = 1

                setDialog(copyDialog)
            }
        }
    )

    const onClickEvent = (e) => {
        const id = e.target.id

        switch(id){
            case "file":
                ref.current.click()
                return
            case "secret":
                setSecret(true)
                return
            case "notSecret":
                setSecret(false)
                return
            case "cancel":
                navigate("/customer-center")
                return
            case "send":
                if( file !== null ){
                    imgMutation.mutate({
                        attached: file
                    })
                    return
                }
                mutation.mutate({
                    title: title,
                    contents: contents,
                    file: null,
                    secret: secret
                })
                return
            default:
                return
        }
    }

    const onChangeEvent = (e) => {
        const value = e.target.value
        const id = e.target.id
        
        switch(id){
            case "title":
                setTitle(value)
                return
            case "contents":
                setContents(value)
                return
            case "file":
                if(e.target.files[0]){
                    setFile(e.target.files[0])
                }else{
                    setFile(null)
                }
                return
            default:
                return
        }
    }

    return(
        <>
            {/* 상단바 */}
            <TopBar menu="orange"/>
            <Main backgroundColor="gray1">
                <Div 
                    flex="column_center" 
                    padding={ !isMobile ? "60px 40px" : "105px 20px" } 
                    paddingTop={ !isMobile ? "47px" : null } 
                    marginTop={ !isMobile ? "71px" : null } 
                    marginBottom={ !isMobile ? "106px" : null } 
                    radius="10px" 
                    shadow="0px 1px 8px rgba(181, 181, 181, 0.08)" 
                    backgroundColor="white" 
                    onClick={onClickEvent}
                >
                    <Div flex="row_center" marginBottom={ !isMobile ? "24px" : "20px" }>
                        <H1 size={ !isMobile ? "large" : "large_small" } weight="500" lineHeight="140%" family="esamanru">
                            1:1문의하기
                        </H1>
                    </Div> 
                    <Div flex="column" marginBottom={ !isMobile ? "20px" : "16px" }>
                        <Div marginBottom="12px">
                            <P color="bk" weight="600" size="small_medium" lineHeight="20px">
                                제목
                            </P>
                        </Div>
                        <Div>
                            <Input id="title" placeholder="제목을 입력하세요." isMobile={ isMobile } onChange={ onChangeEvent }/>
                        </Div>
                    </Div>
                    <Div flex="column" marginBottom="20px">
                        <Div marginBottom="12px">
                            <P color="bk" weight="600" size="small_medium" lineHeight="20px">
                                내용
                            </P>
                        </Div>
                        <Div>
                            <Textarea id="contents" placeholder="내용을 입력해주세요." isMobile={ isMobile } onChange={ onChangeEvent }/>
                        </Div>
                    </Div>
                    <FileUploadButton parentRef={ ref } onChange={ onChangeEvent } file={ file }/>
                    <Div flex="row_between" marginBottom={ !isMobile ? "44px" : "34px" }>
                        <Div width="fit-content">
                            <P color="bk" weight="600" size="small_medium" lineHeight="130%">
                                비밀글 여부
                            </P>
                        </Div>
                        <Div flex="row" width="fit-content">
                            <Div flex="row" marginRight={ !isMobile ? "18px" : "8px" }>
                                <Button flex="row" color="grey4" size={ !isMobile ? "small" : "extra_small" } weight="400" lineHeight="160%" style={{ whiteSpace: "nowrap" }} id="secret">
                                    <Div flex="row" width="24px" height="24px" backgroundColor={ secret ? "orange" : null } radius="50%" borderColor={ secret ? "orange" : "grey4" } marginRight="6px" padding="2px">
                                        <Img src={check} id="secret"/>
                                    </Div>
                                    사용
                                </Button>
                            </Div>
                            <Div flex="row">
                                <Button flex="row" color="grey4" size={ !isMobile ? "small" : "extra_small" } weight="400" lineHeight="160%" style={{ whiteSpace: "nowrap" }} id="notSecret">
                                    <Div flex="row" width="24px" height="24px" backgroundColor={ !secret ? "orange" : null } radius="50%" borderColor={ !secret ? "orange" : "grey4" } marginRight="6px" padding="2px">
                                        <Img src={check} id="notSecret"/>
                                    </Div>
                                    미사용
                                </Button>
                            </Div>
                        </Div>
                    </Div>
                    <Div flex={ !isMobile ? "row" : "row_between" } height={ !isMobile ? "50px" : "45px" }>
                        <Div flex="row_center" backgroundColor="orange" radius="4px" marginRight="20px" height="100%">
                            <Button color="white" weight="500" size={ !isMobile ? "small_medium" : "extra_small" } id="send">
                                확인
                            </Button>
                        </Div>
                        <Div flex="row_center" backgroundColor="grey2" radius="4px" height="100%">
                            <Button color="white" weight="500" size={ !isMobile ? "small_medium" : "extra_small" } id="cancel">
                                취소
                            </Button>
                        </Div>
                    </Div>
                </Div>
            </Main>
            <Footer/>
        </>
    )
}

export default InquiryCreatePage