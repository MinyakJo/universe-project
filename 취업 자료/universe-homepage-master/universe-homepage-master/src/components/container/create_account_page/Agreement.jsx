import React, { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import styled from "styled-components"
import Div from "components/common/Div"
import Button from "components/common/Button"
import CommonStyle from "components/style"
import check from "../../../svg/check.svg"
import grey_check from "../../../svg/grey_check.svg"
import down_vector from "../../../svg/down_vector.svg"
import P from "components/common/P"
import { agreementState, alertState, userDataState } from "recoil/createAccountAtom"
import InputAlert from "components/component/InputAlert"

const ActionDiv = styled(Div)`
    visibility: ${props => {
        return props.action ? "visible" : "hidden"
    }};
    opacity: ${props => {
        return props.action ? "1" : "0"
    }};
    height: ${props => {
        return props.action ? props.height : "0px"
    }};
    padding: ${props => {
        return props.action ? "9px 6px 9px 9px" : "0px 9px"
    }};
    margin-bottom: ${props => {
        return props.action ? props.marginBototm : "0px"
    }};
    transition: height 0.5s, opacity 0.5s, visibility 0.5s, transform 0.5s, padding 0.5s;
`

const TextBox = styled(Div)`
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar{
        width: 3px;
    }
    &::-webkit-scrollbar-thumb{
        background-color: #D7D7D7;
        border-radius: 10px;
    } 
`

const Text = styled(P)`
    white-space: pre-line;
    word-break: break-all;
`

const Span = styled.span`
    color: ${props => {
        return props.color ? `${CommonStyle.setColor(props.color)}` : `${CommonStyle.setColor("orange")}`
    }};
`

const Img = styled.img`
    width: 100%;
    object-fit: contain;
`

const Agreement = (props) => {

    const isMobile = useRecoilValue( isMobileState )
    const alert = useRecoilValue( alertState )
    const setAgreement = useSetRecoilState( agreementState )
    const [ data, setData ] = useRecoilState( userDataState )
    const agreeList = props.children
    const age = props.age
    const [ listOpen, setListOpen ] = useState([])
    const [ agreeCheckList, setAgreeCheckList ] = useState([])
    const [ agreeCheck, setAgreeCheck ] = useState(0)

    useEffect(() => {
        const list = []

        for(let i = 0; i < agreeList.length; i++){
            list.push( false )
        }

        setListOpen( list )
        setAgreeCheckList( list )
    }, [ agreeList, setAgreeCheckList, setListOpen ])

    const onClickEvent = (e, i) => {
        const id = e.target.id
        let list = []
        const copyData = { ...data }

        switch(id){
            case "agreeOpen":
                list = [...listOpen]
                list[i] = !list[i]
                setListOpen(list)
                break
            case "agreeCheck":
                list = [...agreeCheckList]
                list[i] = !list[i]
                
                if(list[i]) {
                    setAgreeCheck(agreeCheck + 1)
                    setAgreement(( list[ 0 ] && list[ 1 ] ) ? true : false )
                }
                else {
                    setAgreeCheck(agreeCheck - 1)
                    setAgreement(( list[ 0 ] && list[ 1 ] ) ? true : false )
                }
                if(i === 2){  
                    copyData.marketing = list[ i ]
                    setData(copyData)
                }

                setAgreeCheckList(list)
                break
            case "allAgree":
                list = [...list]
                for(let i = 0; i < agreeList.length; i++){
                    if(agreeCheck === 3) list[i] = false
                    else list[i] = true
                }
                if(agreeCheck === 3) {
                    setAgreeCheck(0)
                    setAgreement(false)
                }
                else {
                    setAgreeCheck(3)
                    setAgreement(true)
                }
                setAgreeCheckList(list)
                break
            default:
        }
    }

    return(
        <Div flex="column" marginTop={ !age ? !isMobile ? "42px" : "30px" : null }>
            <Div flex="row" marginBottom="9px">
                <Div 
                    width="24px" 
                    height="24px" 
                    marginRight="9px" 
                    padding="4px" 
                    backgroundColor={ agreeCheck !== 3 ? "grey2" : "orange" } 
                    radius="50%"
                >
                    <Button flex="row_center">
                        <Img src={ check } id="allAgree" onClick={ onClickEvent }/>
                    </Button>
                </Div>
                <Div width="fit-content">
                    <Button id="allAgree" color="bk" weight="700" size="small_large" lineHeight="23px" onClick={ onClickEvent }>
                        전체동의
                    </Button>
                </Div>
            </Div>
            <Div flex="column" borderColor="gray3" radius="4px" padding="17px 20px" paddingBottom="0px">
                <Div paddingBottom="11px" style={{ borderBottom: `0.5px solid ${ CommonStyle.setColor("grey1") }` }}>
                    <P color="grey4" weight="500" linHeight="19px" style={{ fontSize: 12 }}>
                        전체동의는 필수 및 선택정보에 대한 동의도 포함되어 있으며, 개별적으로도 동의를 선택하실 수 있습니다.<br/>
                        선택 항목은 동의를 거부하시는 경우에도 서비스의 이용은 가능하십니다.
                    </P>
                </Div>
                <Div flex="column" marginTop="13px">
                    {
                        agreeList && agreeList.map((e, i) =>
                            <Div key={i} flex="column_center" onClick={(ev) => onClickEvent(ev, i)}>
                                <Div flex="row_between" marginBottom="20px">
                                    <Div flex="row" id="agreeOpen">
                                        <Div 
                                            width="22px" 
                                            height="22px" 
                                            borderColor={ agreeCheckList[i] ? "orange" : "grey2" } 
                                            backgroundColor={ agreeCheckList[i] ? "orange" : "white" } 
                                            padding="3px" 
                                            marginRight="7px" 
                                            radius="50%"
                                        >
                                            <Button flex="row_center">
                                                {
                                                    agreeCheckList[i] ?
                                                    <Img src={ check } id="agreeCheck"/>:
                                                    <Img src={ grey_check } id="agreeCheck"/>
                                                }
                                            </Button>
                                        </Div>
                                        <Div width="fit-content">
                                            <Button color="grey6" size="small_medium" lineHeight="21px" id="agreeCheck">
                                                { 
                                                    e.title === 0 ? "이용약관" :
                                                    e.title === 1 ? "개인정보 수집이용 동의" :
                                                    e.title === 2 ? "마케팅 활용에 대한 동의" :
                                                    e.title
                                                }
                                                {
                                                    e.isEssential &&
                                                    <Span color="light_washed_orange">{" (필수)"}</Span>
                                                }
                                            </Button>
                                        </Div>
                                    </Div>
                                    <Div width="10px" style={{ minWidth: 10 }}>
                                        {
                                            listOpen[i] ?
                                            <Button flex="row_center" style={{ transform: "rotate(-180deg)" }}>
                                                <Img src={down_vector} id="agreeOpen"/>
                                            </Button>:
                                            <Button flex="row_center">
                                                <Img src={down_vector} id="agreeOpen"/>
                                            </Button>
                                        }
                                    </Div>
                                </Div>
                                <ActionDiv action={ listOpen[i] } marginBottom="13px" radius="4px" borderColor="gray3" height="111px">
                                    <TextBox height="100%" paddingRight="6px">
                                        <Text weight="500" lineHeight="16px" style={{ fontSize: 10 }}>
                                            { e.contents }
                                        </Text>
                                    </TextBox>
                                </ActionDiv>
                            </Div>
                        )
                    }
                </Div>
            </Div>
            {
                alert && ( !agreeCheckList[ 0 ] || !agreeCheckList[ 1 ] ) &&
                <InputAlert>
                    필수 동의사항에 동의해 주세요.
                </InputAlert>
            }
        </Div>
    )
}

export default Agreement