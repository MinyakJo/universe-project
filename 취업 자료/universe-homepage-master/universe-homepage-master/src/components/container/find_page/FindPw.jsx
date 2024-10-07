import React, { useEffect, useState } from "react"
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import InputBox from "components/component/find_page/InputBox"
import FindButton from "components/component/find_page/FindButton"
import { dialogState } from "recoil/dialogAtom"
import { useNavigate } from "react-router-dom"
import { findIdState } from "recoil/findAtom"
import { fetch } from "modules/fetch"
import { useMutation } from "@tanstack/react-query"
import { errorAlert } from "modules/errorAlert"

const FindPw = () => {

    //전화번호
    const [ tel, setTel ] = useState("")
    const [ telAlert, setTelAlert ] = useState(null)
    //사용자가 적는 코드
    const [ code, setCode ] = useState( null )
    //사용자가 받는 코드
    const [ getCode, setGetCode ] = useState(null)
    //인증번호 버튼을 눌렀는지 안눌렀는지
    const [ codeSubmit, setCodeSubmit ] = useState(null)
    //아이디
    const [ idText, setIdText ] = useState("")
    const [ idAlert, setIdAlert ] = useState(null)
    const idReg = /^[0-9a-zA-Z]{6,13}$/

    const navigate = useNavigate()

    const isMobile = useRecoilValue( isMobileState )
    
    const setDialog = useSetRecoilState( dialogState )
    const reset = useResetRecoilState( dialogState )

    const setFindId = useSetRecoilState( findIdState )

    //query
    const codeMutation = useMutation(
        async data => await fetch( "POST", "/phone-auth/password", data, null ),
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
                setCodeSubmit(null)
            }
        }
    )

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
            case "id":
                setIdText(value)
                if(idReg.test(value)) setIdAlert(false)
                else setIdAlert( true )
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
                if((telNum !== "") && (telNum.length === 11) && idText !== "" ){
                    codeMutation.mutate({
                        phone: telNum,
                        loginId: idText
                    })
                }else{
                    setTelAlert( tel.replace(/-/g, "").length !== 11 ? true : false )
                    setIdAlert(idText === "" ? true : false)
                    setCodeSubmit(null)
                }
                break
            case "resetPw":
                if(isSame()) {
                    setFindId( idText )
                    navigate("/reset-password")
                }
                else if(isSame() === null){
                    setCode(null)
                    setCodeSubmit(null)
                    setTelAlert(tel === "" ? true : false)
                    setIdAlert(idText === "" ? true : false)
                }
                else setCodeSubmit(false)
                break
            default:
        }
    }

    const isSame = () => {
        if(getCode){
            if(getCode === code) return true
        }
        if(getCode === null) return null
        return false
    }

    useEffect(() => {
        return () => {
            setTel("")
            setCode("")
            setGetCode(null)
            setIdText("")
            setCodeSubmit(null)
            setTelAlert(null)
            setIdAlert(null)
            reset()
        }
    }, [ setTel, setCode, setGetCode, setCodeSubmit, setIdText, setTelAlert, setIdAlert, reset ])


    return (
        <>           
            <InputBox 
                marginBottom={ !isMobile ? "17px" : "14px" }
                placeholder="아이디를 입력해주세요." 
                id="id" 
                onChange={onChangeEvent}
                disabled={ codeSubmit || (codeSubmit === false) } 
                value={ idText }
                maxLength="13"
                alert={{
                    message: "6글자 이상 13자 이하 영문과 숫자를 입력해 주세요.",
                    hidden: !idAlert
                }}
            >
                아이디
            </InputBox>
            
            <InputBox 
                marginBottom={ !isMobile ? "17px" : "13px" }
                placeholder="휴대폰번호를 입력해주세요." 
                id="tel" 
                onChange={ onChangeEvent } 
                disabled={ codeSubmit || (codeSubmit === false) } 
                value={ tel }
                code="codeSubmit"
                maxLength="13"
                onClick={ onClickEvent }
                alert={{
                    message: "휴대폰 번호를 정확히 입력해주세요.",
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
                disabled={ codeSubmit === null || isSame() } 
                value={ code }
                alert={{
                    message: "올바른 인증 코드가 아닙니다.",
                    hidden: ((codeSubmit === false) && (code !== null)) ? false : true
                }}
            >
                인증번호
            </InputBox>
            <FindButton id="resetPw" onClick={ onClickEvent }>
                비밀번호 찾기
            </FindButton>
        </>
    )
}

export default FindPw