import React, { useEffect, useState } from "react"
import { Div, CloseButton, ButtonComponent, Title, Input, Guide, GuideBox, GuideAndInputBox, StyledDialog, TitleBox } from "components/container/Dialog"
import { useRecoilState, useSetRecoilState } from "recoil"
import { userDataState } from "recoil/createAccountAtom"
import { dialogState } from "recoil/dialogAtom"
import { useCookies } from "react-cookie"
import { fetch } from "modules/fetch"
import { useMutation } from "@tanstack/react-query"
import { userInfoChangeAlert } from "modules/userInfoChangeAlert"
import { dateFormat } from "modules/dateFormat"
import InputAlert from "../InputAlert"
import { errorAlert } from "modules/errorAlert"


const BirthDate = (props) => {

    const [ cookies ] = useCookies([ "token" ])
    
    const bt = props.children.bt
    const reset = props.reset
    const isMobile = props.isMobile

    const [ text, setText ] = useState("")
    const [ dateAlert, setDateAlert ] = useState(null)
    const dateReg =  /^(?:20\d{2}|19\d{2})\-(?:0[1-9]|1[012])\-(?:0[1-9]|[12][0-9]|3[01])$/

    const [ userData, setUserData ] = useRecoilState(userDataState)
    const setDialog = useSetRecoilState( dialogState )

    const mutation = useMutation(async data => await fetch("PUT", "/student/myinfo", data, { Authorization: cookies.token }),
    {
        onSuccess: ({ data }) => {
            setUserData({
                ...data.studentData,
                birthday: dateFormat( new Date( data.studentData.birthday ), "-" )
            })
            userInfoChangeAlert( setDialog, "생년월일" )
        },
        onError: error => {
            errorAlert( setDialog, error )
        }
    })

    useEffect(() => {
        if( userData.birthday ){
            setText( userData.birthday )
        }
    }, [ userData.birthday ])

    const onClickEvent = (e) => {
        const id = e.target.id

        switch(id){
            case "birthDate":
                if( dateAlert === false ) mutation.mutate({ birthday: text })
                return
            case "close":
                reset()
                return
            default:
        }
    }

    const onChangeEvent = (e) => {
        const value = e.target.value

        setText( value )
        if( dateReg.test( value ) && value !== "" ) setDateAlert( false )
        else setDateAlert( true )
    }

    return(
        <Div position="relative" maxWidth="500px" backgroundColor="white" radius="20px" onClick={onClickEvent}>
            <CloseButton/>
            <StyledDialog isMobile={ isMobile }>
                <TitleBox isMobile={ isMobile }>
                    <Title isMobile={ isMobile }>
                        생년월일 변경
                    </Title>
                </TitleBox>
                <GuideAndInputBox isMobile={ isMobile } end>
                    <GuideBox marginBottom={ !isMobile ? "12px" : "7px" }>
                        <Guide isMobile={ isMobile }>
                            생년월일
                        </Guide>
                    </GuideBox>
                    <Div>
                        <Input type="text" placeholder="YYYY-MM-DD" onChange={ onChangeEvent } maxLength="10" value={ text } isMobile={ isMobile }/>
                    </Div>
                    {
                        dateAlert &&
                        <InputAlert>
                            생년월일을 올바르게 입력해 주세요.
                        </InputAlert>
                    }
                </GuideAndInputBox>
            </StyledDialog>
            <ButtonComponent>
                {{
                    id: "birthDate", 
                    type: bt,
                }}
            </ButtonComponent>
        </Div>
    )
}

export default React.memo(BirthDate)