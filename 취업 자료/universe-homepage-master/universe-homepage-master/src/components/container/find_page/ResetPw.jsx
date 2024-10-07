import React, { useEffect, useState } from "react"
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import InputBox from "components/component/find_page/InputBox"
import FindButton from "components/component/find_page/FindButton"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import { findIdState } from "recoil/findAtom"
import { dialogState } from "recoil/dialogAtom"
import { topBarSelectedState } from "recoil/topBarAtom"
import { errorAlert } from "modules/errorAlert"

const ResetPw = () => {

    //비밀번호
    const [ pw, setPw ] = useState("")
    const [ pwAlert, setPwAlert ] = useState(null)
    //비밀번호 체크
    const [ pwCheck, setPwCheck ] = useState("")
    const [ pwCheckAlert, setPwCheckAlert ] = useState(null)

    const pwReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&].*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,20}$/

    //recoil
    const setTopBar = useSetRecoilState( topBarSelectedState )
    const resetTop = useResetRecoilState( topBarSelectedState )

    const isMobile = useRecoilValue(isMobileState)

    const findId = useRecoilValue( findIdState )
    const resetFindId = useResetRecoilState( findIdState )

    const setDialog = useSetRecoilState( dialogState )

    //navigate
    const navigate = useNavigate()

    //query
    const mutation = useMutation(
        async() => await fetch( "PUT", "/user/password", { password: pwCheck, loginId: findId } ),
        {
            onSuccess: () => {
                setDialog({
                    isOpen: true,
                    btnType: 1,
                    textType: "alert",
                    data: { message: "비밀번호 변경이 완료 되었습니다.", navigate: "login" }
                })
            },
            onError: error => {
                errorAlert( setDialog, error )
            }
        }
    )

    //useEffect
    useEffect(() => {
        if( !findId ){
            setDialog({
                isOpen: true,
                btnType: 1,
                textType: "alert",
                data: { message: "다시 인증해 주세요.", navigate: "pwCheck" }
            })
        }
        setTopBar( "login" )

        return () => {
            resetTop()
            resetFindId()
        }
    }, [ setTopBar, resetTop, resetFindId, findId ])

    const onChangeEvent = (e) => {
        const id = e.target.id
        const value = e.target.value

        switch(id){
            case "pw":
                setPw(value)
                if( pwReg.test( value ) ) setPwAlert( false )
                else setPwAlert( true )
                if( ( value !== pwCheck ) && pwCheck ) setPwCheckAlert( true )
                else setPwCheckAlert( false )
                break
            case "pwCheck":
                setPwCheck( value )
                if( value !== pw ) setPwCheckAlert( true )
                else setPwCheckAlert( false )
                break
            default:
        }
    }

    const onClickEvent = async() => {
        if(( pw !== "" ) && ( pwCheck !== "" )){
            if(pw === pwCheck) mutation.mutate( pwCheck )
        }
    }

    return (
        <>
            <InputBox 
                marginBottom={ !isMobile ? "50px" : "14px" }
                type="password"
                placeholder="비밀번호를 입력해주세요." 
                id="pw"
                onChange={ onChangeEvent }
                maxLength="20"
                alert={{
                    message: "영문, 숫자, 특수문자를 2가지 이상 조합해 비밀번호를 10자리 이상 입력해 주세요.",
                    hidden: !pwAlert
                }}
            >
                비밀번호
            </InputBox>
            <InputBox 
                marginBottom={ !isMobile ? "50px" : "43px" }
                type="password"
                placeholder="비밀번호를 다시 입력해주세요." 
                id="pwCheck" 
                onChange={ onChangeEvent }
                maxLength="20"
                alert={{
                    message: "비밀번호가 일치하지 않습니다.",
                    hidden: !pwCheckAlert
                }}
            >
                비밀번호 재확인
            </InputBox>
            <FindButton id="check" onClick={ onClickEvent }>
                확인
            </FindButton>
        </>
    )
}

export default ResetPw