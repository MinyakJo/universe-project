import React, { useState } from "react"
import { Div, CloseButton, ButtonComponent, Input, Title, GuideBox, Guide, GuideAndInputBox, StyledDialog, TitleBox } from "components/container/Dialog"
import { useMutation } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import { useSetRecoilState } from "recoil"
import { dialogState } from "recoil/dialogAtom"
import { useCookies } from "react-cookie"
import { userInfoChangeAlert } from "modules/userInfoChangeAlert"
import InputAlert from "../InputAlert"
import { errorAlert } from "modules/errorAlert"


const Password = (props) => {

    const bt = props.children

    const setDialog = useSetRecoilState( dialogState )

    const [ cookies ] = useCookies([ "token" ])

    const [ newPw, setNewPw ] = useState("")
    const [ pwAlert, setPwAlert ] = useState(null)

    const [ newPwCheck, setNewPwCheck ] = useState("")
    const [ checkPwAlert, setCheckPwAlert ] = useState(null)
    
    const pwReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&].*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,20}$/

    const reset = props.reset
    const isMobile = props.isMobile

    const mutation = useMutation(
        async data => await fetch("PUT", "/student/myinfo", data, { Authorization: cookies.token }),
        {
            onSuccess: () => {
                userInfoChangeAlert( setDialog, "비밀번호" )   
            },
            onError: error => {
                errorAlert( setDialog, error )
            }
        }
    )

    const onClickEvent = (e) => {
        const id = e.target.id
        
        switch(id){
            case "close":
                reset()
                break
            case "pw":
                if( newPw === "" || newPwCheck === "" ) {
                    setDialog({
                        isOpen: true,
                        btnType: 1,
                        textType: "alert",
                        data: { message: "비밀번호 또는 새 비밀번호를 입력해 주세요." }
                    })
                }else if( ( pwAlert === true ) || ( checkPwAlert === true ) ) return
                else if( newPw === newPwCheck ){
                    mutation.mutate({
                        password: newPw,
                    })
                }
                break
            default:
                break
        }
    }

    const onChangeEvent = (e) => {

        const value = e.target.value
        const id = e.target.id
        
        switch(id){
            case "newPwText":
                setNewPw( value )
                if( pwReg.test( value ) ) setPwAlert( false )
                else setPwAlert( true )
                if( ( value !== newPwCheck ) && newPwCheck ) setCheckPwAlert( true )
                else setCheckPwAlert( false )
                break
            case "newPwCheckText":
                setNewPwCheck( value )
                if( value !== newPw ) setCheckPwAlert( true )
                else setCheckPwAlert( false )
                break
            default:
                break
        }
    }

    return(
        <Div position="relative" maxWidth="500px" backgroundColor="white" radius="20px" onClick={onClickEvent}>
            <CloseButton/>
            <StyledDialog isMobile={ isMobile }>
                <TitleBox isMobile={ isMobile }>
                    <Title isMobile={ isMobile }>
                        비밀번호 변경
                    </Title>
                </TitleBox>
                <GuideAndInputBox>
                    <GuideBox isMobile={ isMobile }>
                        <Guide isMobile={ isMobile }>
                            새 비밀번호
                        </Guide>
                    </GuideBox>
                    <Div>
                        <Input 
                            type="password" 
                            placeholder="새 비밀번호를 입력해주세요." 
                            id="newPwText" 
                            onChange={onChangeEvent} 
                            isMobile={ isMobile }
                            maxLength="20"
                        />
                    </Div>
                    {
                        pwAlert &&
                        <InputAlert>
                            영문, 숫자, 특수문자를 2가지 이상 조합해 10자리 이상 입력해 주세요.
                        </InputAlert>
                    }
                </GuideAndInputBox>
                <GuideAndInputBox end>
                    <GuideBox isMobile={ isMobile }>
                        <Guide color="bk" size="small_medium" weight="500" lineHeight="21px">
                            새 비밀번호 확인
                        </Guide>
                    </GuideBox>
                    <Div>
                        <Input 
                            type="password" 
                            placeholder="새 비밀번호를 다시 입력해주세요." 
                            id="newPwCheckText" 
                            onChange={onChangeEvent} 
                            isMobile={ isMobile }
                            maxLength="20"
                        />
                    </Div>
                    {
                        checkPwAlert &&
                        <InputAlert>
                            비밀번호가 일치하지 않습니다.
                        </InputAlert>
                    }
                </GuideAndInputBox>
            </StyledDialog>
            <ButtonComponent change>
                {{
                    id: "pw",
                    type: bt,
                }}
            </ButtonComponent>
        </Div>
    )
}

export default Password