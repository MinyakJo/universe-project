import React, { useState } from "react"
import { Div, CloseButton, ButtonComponent, Input, Title, Button, Guide, GuideBox, StyledDialog, GuideAndInputBox, TitleBox } from "components/container/Dialog"
import { useMutation } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import { userInfoChangeAlert } from "modules/userInfoChangeAlert"
import { useSetRecoilState } from "recoil"
import { dialogState } from "recoil/dialogAtom"
import { useCookies } from "react-cookie"
import { userDataState } from "recoil/createAccountAtom"
import { dateFormat } from "modules/dateFormat"
import InputAlert from "../InputAlert"
import { errorAlert } from "modules/errorAlert"

const Phone = ( props ) => {

    //cookie
    const [ cookies ] = useCookies([ "token" ])

    //variable
    const bt = props.children
    const reset = props.reset
    const isMobile = props.isMobile

    //state
    const [ phoneNum, setPhoneNum ] = useState("")
    const [ phoneAlert, setPhoneAlert ] = useState( null )
    const [ inputCode, setInputCode ] = useState("")
    const [ code, setCode ] = useState(null)
    const [ codeSubmit, setCodeSubmit ] = useState(null)
    const [ isSame, setIsSame ] = useState(null)

    //recoil
    const setDialog = useSetRecoilState( dialogState )
    const setUserData = useSetRecoilState( userDataState )

    //query
    const mutation = useMutation(
        async data => await fetch("PUT", "/student/myinfo/phone", data, { Authorization: cookies.token }),
        {
            onSuccess: ({ data }) => {
                setUserData({
                    ...data.studentData,
                    birthday: dateFormat( new Date( data.studentData.birthday ), "-" )
                })
                userInfoChangeAlert( setDialog, "전화번호" )   
            },
            onError: () => {
                setIsSame( false )
            }
        }
    )
    const codeMutation = useMutation(
        async data => await fetch( "POST", "/phone-auth", data ),
        {
            onSuccess: ({ data }) => {
                setPhoneAlert( false )
                setIsSame( false )
                setCodeSubmit( true )
                setCode( data.code )
            },
            onError: error => {
                errorAlert( setDialog, error )
                setCodeSubmit(null)
            }
        }
    )

    //event
    const onClickEvent = (e) => {
        const id = e.target.id

        switch(id){
            case "close":
                reset()
                break
            case "inputCodeSubmit":
                const num = phoneNum.replace(/-/g, "")
                if((num !== "") && (num.length === 11) && (phoneNum !== "")){
                    codeMutation.mutate({
                        phone: num,
                        type: 2
                    })
                }else{
                    setCodeSubmit( false )
                    setPhoneAlert( true )
                }
                return
            case "phone":
                if( code === inputCode ){
                    mutation.mutate({ 
                        newPhone: phoneNum.replace(/-/g, ""),
                        code: inputCode
                    })
                }
                return
            default:
                return
        }
    }

    const onChangeEvent = (e) => {

        const value = e.target.value
        const id = e.target.id
        
        switch(id){
            case "phoneNum":
                setPhoneNum(
                    value
                    .replace(/[^0-9]/g, '')
                    .replace(/^(\d{3})(\d{4})(\d{4})$/, `$1-$2-$3`)
                )
                return
            case "inputCode":
                if( value === code ) setIsSame( true )
                setInputCode(value)
                return
            default:
                return
        }
    }

    return(
        <Div position="relative" maxWidth="500px" backgroundColor="white" radius="20px" onClick={onClickEvent}>
            <CloseButton/>
            <StyledDialog isMobile={ isMobile }>
                <TitleBox isMobile={ isMobile }>
                    <Title isMobile={ isMobile }>
                        휴대폰번호 변경
                    </Title>
                </TitleBox>
                <GuideAndInputBox isMobile={ isMobile }>
                    <GuideBox isMobile={ isMobile }>
                        <Guide isMobile={ isMobile }>
                            새로운 휴대폰번호
                        </Guide>
                    </GuideBox>
                    <Div flex="row">
                        <Div position="relative">
                            <Input 
                                type="text" 
                                placeholder="휴대폰번호를 입력해주세요." 
                                id="phoneNum" 
                                onChange={onChangeEvent} 
                                autoComplete="off"
                                paddingRight={ !isMobile ? null : "95px" }
                                disabled={ codeSubmit }
                                isMobile={ isMobile }
                                value={ phoneNum ? phoneNum : "" }
                            />
                            {
                                isMobile &&
                                <Div position="absolute" width="85px" height="40px" radius="4px" backgroundColor="orange" top="5px" right="5px">
                                    <Button color="white" weihgt="500" id="inputCodeSubmit" style={{ fontSize: 13 }}>
                                        인증번호 요청
                                    </Button>
                                </Div>
                            }
                        </Div>
                        {
                            !isMobile &&
                            <Div flex="row_center" width="110px" minWidth="110px" height="50px" backgroundColor="orange" radius="4px" marginLeft="12px">
                                <Button color="white" size="small_medium" weihgt="500" id="inputCodeSubmit">
                                    인증번호 요청
                                </Button>
                            </Div>
                        }
                    </Div>
                    {
                        phoneAlert &&
                        <InputAlert>
                            전화번호를 입력 해주세요.
                        </InputAlert>
                    }
                </GuideAndInputBox>
                <GuideAndInputBox isMobile={ isMobile } end>
                    <GuideBox isMobile={ isMobile }>
                        <Guide isMobile={ isMobile }>
                            인증번호
                        </Guide>
                    </GuideBox>
                    <Div>
                        <Input 
                            type="text" 
                            placeholder="인증번호를 입력해주세요." 
                            id="inputCode" 
                            onChange={ onChangeEvent } 
                            disabled={ !codeSubmit || isSame } 
                            autoComplete="off"
                            isMobile={ isMobile }
                        />
                    </Div>
                    {
                        isSame === false &&
                        <InputAlert>
                            올바른 인증코드가 아닙니다.
                        </InputAlert>
                    }
                </GuideAndInputBox>
            </StyledDialog>
            <ButtonComponent change>
                {{
                    id: "phone",
                    type: bt
                }}
            </ButtonComponent>
        </Div>
    )
}

export default Phone