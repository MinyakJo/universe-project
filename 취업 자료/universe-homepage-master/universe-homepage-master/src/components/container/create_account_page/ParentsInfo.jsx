import React, { useState } from "react"
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import Div from "components/common/Div"
import H2 from "components/common/H2"
import P from "components/common/P"
import Button from "components/common/Button"
import AccountInputBox from "components/component/create_account_page/AccountInputBox"
import CommonStyle from "components/style"
import { dialogState } from "recoil/dialogAtom"
import { alertState, parentsOKState, userDataState } from "recoil/createAccountAtom"
import check from "../../../svg/check.svg"
import styled from "styled-components"
import { fetch } from "modules/fetch"
import { errorAlert } from "modules/errorAlert"
import { useMutation } from "@tanstack/react-query"

const Img = styled.img`
    width: 100%;
    object-fit: contain;
`

const ParentsInfo = () => {

    const isMobile = useRecoilValue(isMobileState)
    const setParentsOK = useSetRecoilState(parentsOKState)
    const alert = useRecoilValue(alertState)

    //이름
    const [ name, setName ] = useState("")
    const [ nameAlert, setNameAlert ] = useState(null)
    const nameReg =  /^[가-힣]{2,8}$/
    //생년월일
    const [ date, setDate ] = useState("")
    const [ dateAlert, setDateAlert ] = useState(null)
    const dateReg =  /^(?:20\d{2}|19\d{2})\.(?:0[1-9]|1[012])\.(?:0[1-9]|[12][0-9]|3[01])$/
    //전화번호
    const [ tel, setTel ] = useState("")
    const [ telAlert, setTelAlert ] = useState(null)
    //코드
    const [ code, setCode ] = useState(null)
    //받아오는 코드
    const [ getCode, setGetCode ] = useState(null)
    //코드 전송 버튼을 눌렀는지 안눌렀는지
    const [ codeSubmit, setCodeSubmit ] = useState(null)
    //동의, 비동의
    const [ agree, setAgree ] = useState(null)

    const [ data, setData ] = useRecoilState(userDataState)
    const setDialog = useResetRecoilState(dialogState)

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

    const onClickEvent = async(e) => {
        const id = e.target.id

        switch(id){
            case "send":
                if(codeSubmit) break

                const telNum = tel.replace(/-/g, "")
                if(telNum && (telNum.length === 11)){
                    codeMutation.mutate({ phone: telNum, type: 1 })
                }else{
                    setTelAlert(true)
                    setCodeSubmit(null)
                }
                break
            case "agree":
                if((nameAlert === false) && (telAlert === false) && (dateAlert === false) && (codeSubmit === true) && !agree){
                    setParentsOK(true)
                }else setParentsOK(false)

                setAgree(!agree)
                break
            default:
        }
    }

    const onChangeEvent = (e) => {
        const id = e.target.id
        const value = e.target.value 
        const copyData = { ...data }

        switch(id){
            case "pName":
                setName(value)
                if(nameReg.test(value)) setNameAlert(false)
                else setNameAlert(true)

                copyData.parentName = value
                break
            case "pBirthDate":
                setDate(
                    value
                    .replace(/[^0-9]/g, '')
                    .replace(/^(\d{4})(\d{2})(\d{2})$/, `$1.$2.$3`))
                if( dateReg.test( value.replace(/[^0-9]/g, '').replace(/^(\d{4})(\d{2})(\d{2})$/, `$1.$2.$3`) ) ) setDateAlert(false)
                else setDateAlert(true)

                copyData.parentBirthday = value.replace(/[^0-9]/g, '').replace(/^(\d{4})(\d{2})(\d{2})$/, `$1.$2.$3`)
                break
            case "pTel":
                setTel(
                    value
                    .replace(/[^0-9]/g, '')
                    .replace(/^(\d{3})(\d{4})(\d{4})$/, `$1-$2-$3`)
                )

                copyData.parentPhone = value.replace(/[^0-9]/g, '').replace(/^(\d{3})(\d{4})(\d{4})$/, `$1-$2-$3`)
                break
            case "pCode":
                setCode(value)
                if(value !== getCode) setCodeSubmit(false)
                else {
                    setCodeSubmit(true)
                    setParentsOK( agree ? true : false )
                }
                break
            default:
        }
        setData( copyData )
    }

    return (
        <Div 
            flex="column" 
            marginTop="33px" 
            paddingBottom="45px" 
            style={{ borderBottom: `1px solid ${CommonStyle.setColor("grey2")}` }} 
            onClick={ onClickEvent }
        >
            <Div flex="column" marginBottom="22px">
                <Div marginBottom="6px">
                    <H2 color="bk" weight="700" size="small_large" lineHeight="23px">
                        보호자 정보 입력
                    </H2>
                </Div>
                <Div>
                    <P color="grey4" size="extra_small" weight="500" linHeight="18px">
                        만 14세 미만 유니버스반복 가입 시 법정대리인의 동의가 있어야 가능합니다.
                    </P>
                </Div>
            </Div>

            {/* 보호자 이름 */}
            <AccountInputBox
                id="pName" 
                placeholder="이름을 입력해 주세요." 
                onChange={ onChangeEvent }
                disabled={ (nameAlert === false) && (dateAlert === false) }
                required
                first
                alert={{
                    message: [
                        "이름을 입력해 주세요.",
                        "2글자 이상 입력해 주세요.",
                        "이름을 올바르게 입력해 주세요."
                    ],
                    hidden: [
                        (alert !== null) && (nameAlert !== false) ? false : true,
                        (name !== "") && (name.length < 2) ? false : true,
                        (name !== "") && (name.length > 1) && nameAlert ? false : true
                    ]
                }}
                value={ name }
            >
                보호자 이름
            </AccountInputBox>
            
            {/* 보호자 생년월일 */}
            <AccountInputBox
                id="pBirthDate" 
                placeholder="YYYY.MM.DD 입력해 주세요." 
                onChange={ onChangeEvent }
                disabled={ (nameAlert === false) && (dateAlert === false) }
                required
                alert={{
                    message: [
                        "생년월일을 입력해 주세요.",
                        "생년월일을 올바르게 입력해 주세요."
                    ],
                    hidden: [
                        (alert !== null) && (dateAlert !== false) ? false : true,
                        (date !== "") && dateAlert ? false : true
                    ]
                }}
                value={ date }
            >
                보호자 생년월일
            </AccountInputBox>
            
            {/* 보호자 휴대폰번호 */}
            <AccountInputBox
                id="pTel" 
                placeholder="휴대폰번호를 입력해 주세요." 
                onChange={ onChangeEvent }
                disabled={ (codeSubmit !== null) || !((nameAlert === false) && (dateAlert === false)) }
                required
                code={{
                    id: "send",
                    text: "인증번호 요청"
                }}
                alert={{
                    message: "휴대폰번호를 입력해 주세요.",
                    hidden: telAlert ? false : true
                }}
                value={ tel }
            >
                {[ 
                    "보호자 휴대폰번호",
                    <AccountInputBox
                        id="pCode" 
                        placeholder="인증번호를 입력해 주세요." 
                        onChange={ onChangeEvent }
                        disabled={ (codeSubmit === null) || (code === getCode) } 
                        required
                        alert={{
                            message: "인증번호가 틀립니다.",
                            hidden: ((codeSubmit === false) && (code !== null)) ? false : true
                        }}
                        value={ code }
                    />
                ]}
            </AccountInputBox>

            {/* 만 14세 미만 */}
            <Div flex="row">
                <Div 
                    width="24px" 
                    height="24px" 
                    style={{ minWidth: 24 }} 
                    radius="50%" 
                    marginRight="9px" 
                    backgroundColor={ agree ? "orange" : "grey2" } 
                    padding="4px"
                >
                    <Button flex="row_center">
                        <Img id="agree" src={check}/>
                    </Button>
                </Div>
                <Div>
                    <P 
                        color="bk"
                        weight="500" 
                        size="extra_small"
                        lineHeight="18px" 
                        style={{ whiteSpace: !isMobile ? "nowrap" : "pre-line" , cursor: "pointer", userSelect: "none" }} 
                        id="agree"
                    >
                        상기 만 14세 미만 아동의 법적대리인으로서 유니버스반복 가입에 대해 동의합니다.
                    </P>
                </Div>
            </Div>
        </Div>
    )
}

export default ParentsInfo