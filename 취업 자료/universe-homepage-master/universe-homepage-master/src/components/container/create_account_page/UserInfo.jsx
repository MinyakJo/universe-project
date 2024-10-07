import React, { useState } from "react"
import Div from "components/common/Div"
import H1 from "components/common/H1"
import AccountInputBox from "components/component/create_account_page/AccountInputBox"
import CommonStyle from "components/style"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import { dialogState } from "recoil/dialogAtom"
import { alertState, isSameIdState, userDataState, userOKState } from "recoil/createAccountAtom"
import { useMutation } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import { errorAlert } from "modules/errorAlert"

const UserInfo = (props) => {

    //recoil
    const isMobile = useRecoilValue(isMobileState)
    const setUserOK = useSetRecoilState(userOKState)
    const alert = useRecoilValue(alertState)

    //이름
    const [ name, setName ] = useState("")
    const [ nameAlert, setNameAlert ] = useState(null)
    const nameReg =  /^[가-힣]{2,8}$/

    //아이디
    const [ userId, setUserId ] = useState("")
    const [ userIdAlert, setUserIdAlert ] = useState(null)
    const [ isSameId, setIsSameId ] = useRecoilState( isSameIdState )
    const idReg = /^[0-9a-zA-Z]{6,13}$/

    //비밀번호
    const [ pw, setPw ] = useState("")
    const [ pwAlert, setPwAlert ] = useState(null)
    const pwReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&].*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,20}$/

    //비밀번호 확인
    const [ checkPw, setCheckPw ] = useState("")
    const [ checkPwAlert, setCheckPwAlert ] = useState(null)

    //생년월일
    const [ date, setDate ] = useState("")
    const [ dateAlert, setDateAlert ] = useState(null)
    const dateReg =  /^(?:20\d{2}|19\d{2})\.(?:0[1-9]|1[012])\.(?:0[1-9]|[12][0-9]|3[01])$/

    //전화번호
    const [ tel, setTel ] = useState("")
    const [ telAlert, setTelAlert ] = useState(null)

    //코드
    const [ code, setCode ] = useState(null)
    //코드 만료 기간
    const [ getCode, setGetCode ] = useState(null)
    //코드 전송 버튼을 눌렀는지 안눌렀는지
    const [ codeSubmit, setCodeSubmit ] = useState(null)

    const [ data, setData ] = useRecoilState(userDataState)
    const setDialog = useSetRecoilState(dialogState)

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
                    codeMutation.mutate({ phone: telNum, type: 0 })
                }else{
                    setTelAlert(true)
                    setCodeSubmit(null)
                }
                break
            default:
        }
    }

    const onChangeEvent = (e) => {
        const id = e.target.id
        const value = e.target.value
        const copyData = { ...data }

        switch(id){
            case "name":
                setName(value)
                if(nameReg.test(value)) setNameAlert(false)
                else setNameAlert(true)
                
                copyData.name = value
                break
            case "id":
                setUserId(value)
                if(idReg.test(value)) setUserIdAlert(false)
                else setUserIdAlert(true)

                copyData.loginId = value
                break
            case "pw":
                setPw(value)
                if(pwReg.test(value)) setPwAlert(false)
                else setPwAlert(true)
                break
            case "checkPw":
                setCheckPw(value)
                if(value !== pw) setCheckPwAlert(true)
                else setCheckPwAlert(false)
                
                copyData.password = value
                break
            case "birthDate":
                setDate(
                    value
                    .replace(/[^0-9]/g, '')
                    .replace(/^(\d{4})(\d{2})(\d{2})$/, `$1.$2.$3`))
                if( dateReg.test( value.replace(/[^0-9]/g, '').replace(/^(\d{4})(\d{2})(\d{2})$/, `$1.$2.$3`) ) ) setDateAlert(false)
                else setDateAlert(true)

                copyData.birthday = value.replace(/[^0-9]/g, '').replace(/^(\d{4})(\d{2})(\d{2})$/, `$1.$2.$3`)
                break
            case "tel":
                    setTel(
                        value
                        .replace(/[^0-9]/g, '')
                        .replace(/^(\d{3})(\d{4})(\d{4})$/, `$1-$2-$3`)
                    )

                    copyData.phone = value.replace(/[^0-9]/g, '').replace(/^(\d{3})(\d{4})(\d{4})$/, `$1-$2-$3`)
                break
            case "code":
                if(value !== getCode){
                    setCodeSubmit(false)
                }else if(value === getCode){
                    setCodeSubmit(true)
                    setUserOK(true)
                }
                setCode( value )
                break
            default:
        }
        setData( copyData )
    }
    
    return(
        <Div 
            flex="column" 
            paddingBottom={ 
                !props.age ? 
                !isMobile ? 
                "14px" : 
                "4px" : 
                null 
            } 
            style={{ 
                borderBottom: 
                    props.age ? 
                    null : 
                    `1px solid ${CommonStyle.setColor("grey2")}` 
            }} 
            onClick={ onClickEvent }
        >
            <Div flex="row_center" marginBottom={ !isMobile ? "50px" : "30px" }>
                <H1 family="esamanru" weight="500" size="large" linHeight="150%">
                    회원가입
                </H1>
            </Div>
            {/* 이름 */}
            <AccountInputBox
                id="name" 
                placeholder="ex. 김반복, 홍길동 (8자 이내)" 
                maxLength="8"
                onChange={ onChangeEvent }
                disabled={ (userIdAlert === false) && (nameAlert === false) && (pwAlert === false) && (checkPwAlert === false) && (dateAlert === false) }
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
                이름
            </AccountInputBox>

            {/* 아이디 */}
            <AccountInputBox
                id="id" 
                placeholder="아이디 (영문숫자 6~13자)"
                maxLength="13"
                onChange={ onChangeEvent }
                disabled={ (userIdAlert === false) && (nameAlert === false) && (pwAlert === false) && (checkPwAlert === false) && (dateAlert === false) && !isSameId }
                required
                alert={{
                    message: [
                        "아이디를 입력해 주세요.",
                        "6글자 이상 입력해 주세요.",
                        "영문과 숫자를 입력해 주세요.",
                        "아이디를 새로 입력하시고 회원가입을 눌러주세요."
                    ],
                    hidden: [
                        (alert !== null) && (userIdAlert !== false) ? false : true,
                        (userId !== "") && (userId.length < 6) ? false : true,
                        (userId !== "") && (userId.length > 5) && userIdAlert ? false : true,
                        isSameId ? false : true
                    ]
                }}
                value={ userId }
            >
                아이디
            </AccountInputBox>

            {/* 비밀번호 */}
            <AccountInputBox
                type="password" 
                id="pw" 
                placeholder="비밀번호 (영문 숫자 특수문자 2가지 이상 10~20자)" 
                maxLength="20"
                onChange={ onChangeEvent }
                disabled={((checkPw !== "") && (checkPw === pw)) && ((pw.length > 9) && (checkPw.length > 9)) && !pwAlert}
                required
                alert={{
                    message: [ 
                        "비밀번호를 입력해 주세요.", 
                        "영문, 숫자, 특수문자를 2가지 이상 조합해 주세요.", 
                        "비밀번호를 10자리 이상 입력해 주세요."
                    ],
                    hidden: [
                        (alert !== null) && (pwAlert !== false) ? false : true,
                        (pw !== "") && pwAlert ? false : true,
                        (pw !== "") && (pw.length < 10) ? false : true
                    ]
                }}
            >
                {[ 
                    "비밀번호",
                    <AccountInputBox
                        type="password"
                        id="checkPw" 
                        placeholder="비밀번호를 재입력하세요."
                        maxLength="20" 
                        onChange={ onChangeEvent }
                        disabled={ (checkPw !== "") && (checkPw === pw) && !pwAlert  }
                        alert={{
                            message: "비밀번호가 일치하지 않습니다.",
                            hidden: !checkPwAlert
                        }}
                    />
                ]}
            </AccountInputBox>

            {/* 생년월일 */}
            <AccountInputBox
                id="birthDate" 
                placeholder="YYYY.MM.DD 입력해 주세요." 
                maxLength="10"
                onChange={ onChangeEvent }
                disabled={ (userIdAlert === false) && (nameAlert === false) && (pwAlert === false) && (checkPwAlert === false) && (dateAlert === false) }
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
                생년월일
            </AccountInputBox>

            {/* 휴대폰번호 */}
            <AccountInputBox
                id="tel" 
                placeholder="휴대폰번호를 입력해 주세요."
                maxLength="13"
                onChange={ onChangeEvent }
                disabled={ 
                    (codeSubmit !== null) || 
                    !((userIdAlert === false) && (nameAlert === false) && (pwAlert === false) && (checkPwAlert === false) && (dateAlert === false)) 
                }
                required
                code={{
                    id: "send",
                    text: "인증번호 요청"
                }}
                alert={{
                    message: [ "휴대폰번호를 입력해 주세요.", "휴대폰번호를 올바르게 입력해 주세요." ],
                    hidden: [ (alert !== null) ? false : true, telAlert ? false : true ]
                }}
                value={ tel }
            >
                {[ 
                    "휴대폰번호",
                    <AccountInputBox
                        id="code" 
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
        </Div>
    )
}

export default UserInfo