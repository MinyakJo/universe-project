import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import commonP from "components/common/P"
import commonButton from "components/common/Button"
import CommonStyle from "components/style"
import MainIntroText from "../../component/main_page/MainIntroText"
import repeat_u_pass_04 from "../../../image/repeat_u_pass_page/repeat_u_pass_04.png"
import radio_check from "../../../svg/radio_check.svg"
import Pass from "../../component/repeat_u_pass_page/Pass"
import { useRecoilState, useRecoilValue } from "recoil"
import { upassSelectedState } from "../../../recoil/repeatUPassAtom"
import { useNavigate } from "react-router-dom"
import { isMobileState } from "recoil/mainAtom"

const Div = styled(commonDiv)`
    background: ${props => {
        return props.background ? props.background : null
    }};

    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : null
    }};

    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};

    box-shadow: ${props => {
        return props.shadow ? props.shadow : null
    }};

    opacity: ${props => {
        return props.opacity ? props.opacity : null
    }};
`

const Img = styled.img`
    object-fit: contain;
    width: 100%;
`

const P = styled(commonP)`
    line-height: ${props => {
        return props.lineHeight ? props.lineHeight : null
    }};

    cursor: ${props => {
        return props.cursor ? props.cursor : null
    }};
`

const CheckBox = styled(commonButton)`
    display: flex;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    min-width: 20px;
    min-height: 20px;
    margin-right: 9px;
    border: ${props => {
        return props.border ? `1px solid ${CommonStyle.setColor(props.border)}` : null
    }};
`

const Button = styled(commonButton)`
    background: ${props => {
        return props.background ? props.background : null
    }};

    line-height: ${props => {
        return props.lineHeight ? props.lineHeight : null
    }};
`

const Passes = () => {

    const isMobile = useRecoilValue(isMobileState)
    const passList = [ "AI 반복 솔루션 실행", "반복 마일리지 100% 적립", "MY 반복데이터", "마일리지 현금 환급" ]
    const radioList = [ "통합 ALL PACK = 800강" , "고3 패스 = 270강" , "고2 패스 = 200강", "고1 패스 = 200강" ]
    const [ selected, setSelected ] = useRecoilState(upassSelectedState)
    const navigate = useNavigate()

    const onClickEvent = (e) => {
        const id = e.target.id

        switch(id){
            case "0":
            case "1":
            case "2":
            case "3":
                setSelected(id)
                break
            case "nav":
                if(selected === "0"){
                    navigate(`/passes/${selected}`)
                }else if(selected === "1"){
                    navigate(`/passes/${selected}`)
                }else if(selected === "2"){
                    navigate(`/passes/${selected}`)
                }else if(selected === "3"){
                    navigate(`/passes/${selected}`)
                }
                break
            default:
        }
    }

    return(
        <Div flex="column_center" padding={ !isMobile ? "78px 0px" : "48px 20px" } paddingBottom={ !isMobile ? "111px" : "50px" } src={repeat_u_pass_04}>
            <MainIntroText>
                {{
                    top: {
                        text: "영어 반복습관, 실력향상 두가지 모두 만날 준비 되셨나요?",
                        margin: !isMobile ? "11px" : "9px"
                    },
                    bottom: {
                        text: "2022 유니버스반복 U패스",
                        margin: !isMobile ? "40px" : "30px"
                    },
                    color: "white"
                }}
            </MainIntroText>

            {/* UPass 고등 */}
            <Div flex={ !isMobile ? "row" : "column" } maxWidth="980px">
                <Div flex={ !isMobile ? "row_center" : "column" } 
                    minWidth={ !isMobile ? "698px" : null }
                    maxWidth="698px" 
                    marginRight="2px" 
                    backgroundColor="white" 
                    radius="8px" 
                    shadow="0px 2px 8px rgba(0, 0, 0, 0.1)"
                    padding={ !isMobile ? "32px 30px" : "22px 0px" }
                    paddingTop={ !isMobile ? null : "0px" }
                    height={ !isMobile ? "322px" : null }
                >
                    {
                        isMobile &&
                        <Div flex="row_end" radius="10px" marginBottom="7px">
                            <Div flex="row_center" width="54px" height="32px" backgroundColor="black">
                                <P weight="400" size="extra_small" color="white">BEST</P>
                            </Div>
                        </Div>
                    }
                    <Pass height={ !isMobile ? "258px" : "164px" } sale>
                        {{
                            passName: "U패스 고등",
                            title: "U패스 고등",
                            passList: passList
                        }}
                    </Pass>
                </Div>

                {/* 라디오 버튼 */}
                <Div flex="column_between" 
                    backgroundColor="white" 
                    radius="8px" 
                    shadow="0px 2px 8px rgba(0, 0, 0, 0.1)"
                    padding={ !isMobile ? null : "22px 24px" }
                    paddingBottom="32px"
                    marginTop={ !isMobile ? null : "2px" }
                    height={ !isMobile ? "322px" : null }
                >
                    <Div>
                        {
                            !isMobile &&
                            <Div flex="row_end" radius="10px" marginBottom="20px">
                                <Div flex="row_center" width="73px" height="40px" backgroundColor="black">
                                    <P weight="400" size="small_large" color="white">BEST</P>
                                </Div>
                            </Div>
                        }
                        <Div paddingLeft="30px" paddingRight="30px">
                            {
                                radioList && radioList.map((e, i) =>
                                <Div key={i} flex="row" marginBottom="8px" onClick={onClickEvent}>
                                    <CheckBox border={i === 0 ? null : "grey" } id={i}>
                                    {
                                        i === Number(selected) &&
                                        <Img src={radio_check}/>
                                    }
                                    </CheckBox>
                                    <Div>
                                        <P size="extra_small" weight="600" lineHeight="210%" cursor="pointer" id={i}>{e}</P>
                                    </Div>
                                </Div>
                                )
                            }
                        </Div>
                    </Div>
                    <Div paddingLeft="30px" paddingRight="30px" height="48px">
                        <Button color="white" 
                            background="linear-gradient(131.94deg, #FF5C00 45.73%, #FFA959 111.14%)"
                            weight="700"
                            size="small_medium"
                            lineHeight="180%"
                            radius="4px"
                            id="nav"
                            onClick={onClickEvent}
                        >
                            자세히 보기
                        </Button>
                    </Div>
                </Div>
            </Div>
        </Div>
    )
}

export default Passes