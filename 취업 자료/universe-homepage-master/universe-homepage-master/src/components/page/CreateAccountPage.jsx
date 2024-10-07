import React, { useState, useEffect } from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import Button from "components/common/Button"
import CommonStyle from "components/style"
import { useNavigate } from "react-router-dom"
import TopBar from "components/container/TopBar"
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import ChooseAge from "components/container/create_account_page/ChooseAge"
import LeftDisplay from "components/container/create_account_page/LeftDisplay"
import UserInfo from "components/container/create_account_page/UserInfo"
import { agreementState, alertState, isSameIdState, parentsOKState, userDataState, userOKState } from "recoil/createAccountAtom"
import ParentsInfo from "components/container/create_account_page/ParentsInfo"
import Agreement from "components/container/create_account_page/Agreement"
import { useMutation, useQuery } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import { dialogState } from "recoil/dialogAtom"
import { topBarSelectedState } from "recoil/topBarAtom"

const StyledDiv = styled(commonDiv)`
    overflow-y: auto;
    overflow-x: hidden;
    justify-content: start;

    &::-webkit-scrollbar{
        width: ${props => {
            return props.scrollWidth ? props.scrollWidth : null
        }}
    }
    &::-webkit-scrollbar-thumb{
        background-color: ${props => {
            return props.scrollBackgroundColor ? `${CommonStyle.setColor(props.scrollBackgroundColor)}` : null
        }};
        border-radius: ${props => {
            return props.scrollRadius ? props.scrollRadius : null
        }}
    }
`

const Div = styled(commonDiv)`
    aspect-ratio: ${props => {
        return props.ratio ? props.ratio : null
    }};
`

const Span = styled.span`
    color: ${props => {
        return props.color ? `${CommonStyle.setColor(props.color)}` : `${CommonStyle.setColor("orange")}`
    }};
`

const CreateAccountPage = () => {

    const userData = useRecoilValue(userDataState)
    const resetUserData = useResetRecoilState( userDataState )

    const setTop = useSetRecoilState( topBarSelectedState )
    const resetTop = useResetRecoilState( topBarSelectedState )

    //가입하려는 계정
    const userOK = useRecoilValue(userOKState)
    const resetUserOK = useResetRecoilState(userOKState)
    //부모님
    const parentsOK = useRecoilValue(parentsOKState)
    const resetParentsOK = useResetRecoilState(parentsOKState)
    //알람
    const setAlert = useSetRecoilState(alertState)
    const resetAlert = useResetRecoilState(alertState)

    const setIsSameId = useSetRecoilState( isSameIdState )
    
    const setDialog = useSetRecoilState( dialogState )

    const policy1 = useQuery(
        [ "termsAndConditions" ],
        async () => await fetch("GET", "/policy/0"),
        { refetchOnWindowFocus: false }
    )
    const policy2 = useQuery(
        [ "privacyAgreement" ],
        async () => await fetch("GET", "/policy/1"),
        { refetchOnWindowFocus: false }
    )
    const policy3 = useQuery(
        [ "marketingAgreement" ],
        async () => await fetch("GET", "/policy/2"),
        { refetchOnWindowFocus: false }
    )

    const createMutate = useMutation(async (data) => await fetch("POST", "/home/student", data),
        {
            onSuccess: () => {
                navigate("/done-creating-account")
            },
            onError: err => {
                setDialog({
                    isOpen: true,
                    textType: "alert",
                    data: { message: err.message },
                    btnType: 1
                })
                setIsSameId( true )
            }
        }
    )

    //동의
    const [ agreeList, setAgreeList ] = useState([])
    const agreement = useRecoilValue(agreementState)

    //나이 선택 false = 14세 미만, true = 14세 이상
    const [ age, setAge ] = useState(null)

    const navigate = useNavigate()
    const isMobile = useRecoilValue(isMobileState)

    const onClickEvent = (e) => {
        const id = e.target.id

        switch(id){
            case "14-year":
                setAge(false)
                break
            case "14+year":
                setAge(true)
                break
            case "back":
                navigate(-1)
                break
            case "create":
                if(age && agreement && userOK ){
                    createMutate.mutate(userData)
                }else if(!age && userOK && parentsOK && agreement){
                    createMutate.mutate(userData)
                }else{
                    setAlert(true)
                }
                break
            default:
        }
    }

    useEffect(() => {
        const dataList = []
        let cnt = 3

        const p1 = policy1.data?.data?.policy
        const p2 = policy2.data?.data?.policy
        const p3 = policy3.data?.data?.policy

        if(p1){
            dataList.push({
                title: p1.type,
                isEssential: true,
                contents: p1.contents
            })
            cnt -= 1
        }
        if(p2){
            dataList.push({
                title: p2.type,
                isEssential: true,
                contents: p2.contents
            })
            cnt -= 1
        }
        if(p3){
            dataList.push({
                title: p3.type,
                isEssential: false,
                contents: p3.contents
            })
            cnt -= 1
        }
        for(let i = 0; i < cnt; i++){
            dataList.push({
                title: "",
                isEssential: false,
                contents: ""
            })
        }

        setAgreeList(dataList)

        return () => {
            setAge(null)
            resetUserOK()
            resetParentsOK()
            resetAlert()
        }
    }, [ setAgreeList, resetUserOK, resetParentsOK, resetAlert, policy1.data, policy2.data, policy3.data ])

    useEffect(() => {
        resetUserData()
        setTop( "join" )

        return () => {
            resetTop()
        }
    }, [ resetUserData, setTop, resetTop ])

    return(
        <>
            {
                age === null &&
                <TopBar join/>
            }
            <main>
                {
                    // 첫 시작화면
                    age === null ?
                    <ChooseAge onClick={ onClickEvent }/>:
                    // 왼쪽 배경
                    <Div flex="row" height="100vh">
                        {
                            !isMobile &&
                            <LeftDisplay>
                                유니버스반복은<br/>
                                여러분이 영어실력이 향상하는 그날까지<br/>
                                <Span>항상 함께하겠습니다.</Span>
                            </LeftDisplay>
                        }

                        <StyledDiv 
                            flex="column_center" 
                            height="100%" 
                            padding={ !isMobile ? null : "0px 20px" } 
                            scrollWidth={ !isMobile ? "10px" : "0px" }
                            scrollBackgroundColor={ !isMobile ? "gray2" : null }
                            scrollRadius={ !isMobile ? "10px" : null }
                        >
                            <Div 
                                width={ !isMobile ? "420px" : null } 
                                flex="column" 
                                paddingTop={ !isMobile ? "104px" : "90px" } 
                                paddingBottom={ !isMobile ? "70px" : "50px" }
                            >   
                                {/* 정보 입력 */}
                                <UserInfo age={ age }/>


                                {/* 보호자 정보 입력 */}
                                {
                                    !age &&
                                    <ParentsInfo/>
                                }

                                {/* 동의 */}
                                <Agreement age={ age }>
                                    { agreeList }
                                </Agreement>

                                {/* 버튼박스 */}
                                <Div flex="column" marginTop={ !isMobile ? "40px" : "30px" } onClick={ onClickEvent }>
                                    <Div height={ !isMobile ? "50px" : "45px" } backgroundColor="orange" radius="4px" marginBottom="20px">
                                        <Button id="create" color="white" size={ !isMobile ? "small_medium" : "small" } lineHeight="24px" weight="500">
                                            가입하기
                                        </Button>
                                    </Div>
                                    <Div height={ !isMobile ? "50px" : "45px" } backgroundColor="grey1" radius="4px">
                                        <Button id="back" color="grey4" size={ !isMobile ? "small_medium" : "small" } lineHeight="24px" weight="500">
                                            돌아가기
                                        </Button>
                                    </Div>
                                </Div>
                            </Div>
                        </StyledDiv>
                    </Div>
                }
            </main>
        </>
    )
}

export default CreateAccountPage