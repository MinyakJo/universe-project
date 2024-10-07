import React, { useEffect, useState } from "react"
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import InputBox from "components/component/find_page/InputBox"
import FindButton from "components/component/find_page/FindButton"
import { dialogState } from "recoil/dialogAtom"
import { useMutation } from "@tanstack/react-query"
import { errorAlert } from "modules/errorAlert"
import { fetch } from "modules/fetch"

const FindId = () => {

    //전화번호
    const [ tel, setTel ] = useState("")
    const [ telAlert, setTelAlert ] = useState(null)
    //사용자가 적는 코드
    const [ code, setCode ] = useState(null)
    //사용자가 받는 코드
    const [ getCode, setGetCode ] = useState(null)
    //인증번호 버튼을 눌렀는지 안눌렀는지
    const [ codeSubmit, setCodeSubmit ] = useState(null)

    const isMobile = useRecoilValue( isMobileState )
    const setDialog = useSetRecoilState( dialogState )
    const reset = useResetRecoilState( dialogState )

    //query
    const codeMutation = useMutation(
        async data => await fetch( "POST", "/phone-auth", data, null ),
        {
            onSuccess: ({ data }) => {
                setTelAlert( false )
                setCodeSubmit( false )
                setDialog({
                    isOpen: true,
                    btnType: 1,
                    textType: "alert",
                    data: { message: "인증번호가 발송되었습니다." }
                })
                setGetCode( data.code )
            },
            onError: error => {
                errorAlert( setDialog, error )
                setTelAlert(true)
                setCodeSubmit(null)
            }
        }
    )

    useEffect(() => {
        return () => {
            setTel("")
            setCode(null)
            setGetCode(null)
            setCodeSubmit(null)
            setTelAlert(null)
            reset()
        }
    }, [ setTel, setCode, setGetCode, setCodeSubmit, setTelAlert, reset ])

    const onChangeEvent = (e) => {
        const id = e.target.id
        const value = e.target.value

        switch(id){
            case "tel":
                setTel(
                    value
                    .replace(/[^0-9]/g, '')
                    .replace(/^(\d{3})(\d{4})(\d{4})$/, `$1-$2-$3`)
                )
                break
            case "code":
                if( value === getCode ) setCodeSubmit( true )
                setCode(value)
                break
            default:
        }
    }

    const onClickEvent = async(e) => {
        const id = e.target.id

        switch(id){
            case "codeSubmit":
                if(codeSubmit !== null) break

                const telNum = tel.replace(/-/g, "")
                if((telNum !== "") && (telNum.length === 11)){
                    codeMutation.mutate({
                        phone: telNum,
                        type: 3
                    })
                }else{
                    setTelAlert(true)
                    setCodeSubmit(null)
                }
                break
            case "idDialogOpen":
                if(isSame()){
                    setDialog({
                        isOpen: true,
                        btnType: 2,
                        textType: "findId",
                        data: { tel: tel, code: code }
                    })
                    setCodeSubmit(true)
                }else if(isSame() === null){
                    setTelAlert(tel === "" ? true : false)
                    setCode(null)
                    setCodeSubmit(null)
                }else setCodeSubmit( false )
                break
            default:
        }
    }

    const isSame = () => {
        if( getCode ){
            if( getCode === code ) return true
        }
        if( getCode === null ) return null
        return false
    }

    return (
        <>
            <InputBox 
                marginBottom={ !isMobile ? "17px" : "13px" }
                placeholder="휴대폰번호를 입력해주세요." 
                id="tel" 
                onChange={ onChangeEvent } 
                disabled={ codeSubmit || (codeSubmit === false) } 
                value={ tel ? tel : "" }
                code="codeSubmit"
                maxLength="13"
                onClick={ onClickEvent }
                alert={{
                    message: "휴대폰번호를 입력해 주세요.",
                    hidden: !telAlert
                }}
            >
                휴대폰번호
            </InputBox>
            <InputBox 
                marginBottom={ !isMobile ? "17px" : "13px" }
                placeholder="인증번호를 입력해주세요." 
                id="code"
                onChange={ onChangeEvent } 
                disabled={ ( codeSubmit === null ) || isSame() } 
                value={ code }
                alert={{
                    message: "올바른 인증 코드가 아닙니다.",
                    hidden: ((codeSubmit === false) && (code !== null)) ? false : true
                }}
            >
                인증번호
            </InputBox>
            <FindButton id="idDialogOpen" onClick={ onClickEvent }>
                아이디찾기
            </FindButton>
        </>
    )
}

export default FindId