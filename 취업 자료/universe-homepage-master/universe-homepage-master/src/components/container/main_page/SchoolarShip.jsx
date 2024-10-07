import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import commonButton from "components/common/Button"
import commonP from "components/common/P"
import CommonStyle from "components/style"
import main_coins from "../../../svg/main_coins.svg"
import pig_bank from "../../../svg/pig_bank.svg"
import bankroll from "../../../svg/bankroll.svg"
import upass_ticket from "../../../svg/upass_ticket.svg"
import smile_face from "../../../svg/smile_face.svg"
import book from "../../../svg/book.svg"
import bachelor_cap from "../../../svg/bachelor_cap.svg"
import MainIntroText from "../../component/main_page/MainIntroText"
import SchoolarShipArticle from "../../component/main_page/SchoolarShipArticle"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import { useNavigate } from "react-router-dom"

const Div = styled(commonDiv)`
    background-color: ${props => {
        return props.backgroundColor ? `${CommonStyle.setColor(props.backgroundColor)}` : "transparent"
    }};

    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : null
    }};

    position: ${props => {
        return props.position ? props.position : null
    }};

    top: ${props => {
        return props.top ? props.top : null
    }};

    z-index: ${props => {
        return props.zIndex ? props.zIndex : null
    }};

    flex-wrap: ${props => {
        return props.wrap ? props.wrap : null
    }};

    align-items: ${props => {
        return props.alignItems ? props.alignItems : null
    }};

    background-size: contain;
`

const Button = styled(commonButton)`
    background: linear-gradient(116.86deg, #FF5C00 0%, #FFA959 104.7%);
`

const P = styled(commonP)`
`

const SchoolarShip = () => {

    const isMobile = useRecoilValue(isMobileState)
    const navigate = useNavigate()

    const imgList = [ 
        pig_bank, 
        bankroll, 
        upass_ticket, 
        smile_face, 
        book,
        bachelor_cap 
    ]
    const txtList = [ 
        { txt: "적립 마일리지\n100% 현금 환급", accent: "100% 현금 환급" }, 
        { txt: "반복할수록\n매일 쌓이는 환급액", accent: "매일 쌓이는 환급액" }, 
        { txt: "수강신청 시\n현금 마일리지 적립", accent: "현금 마일리지 적립" }, 
        { txt: "연속 수강 실패해도\n매주 도전가능!", accent: "매주 도전가능!" }, 
        { txt: "실력향상x집중력\n학업의지 개선", accent: "학업의지 개선" },
        { txt: "직접 반복학습을 주도하는\n동기부여 시스템", accent: "반복학습을 주도하는" }, 
    ]
    const stampList = [
        { content: "100%", bool: true },
        { content: "", bool: false },
        { content: "중요!", bool: true },
        { content: "", bool: false },
        { content: "", bool: false },
        { content: "", bool: false },
    ]

    const onClickEvent = () => {
        navigate( "/schoolarship" )
    }

    return(
        <Div flex="column_center" backgroundColor="purple" padding={ !isMobile ? null : "0px 20px" }>
            <Div flex="row_center" backgroundColor="none" maxWidth="1470px" paddingTop={ !isMobile ? "123px" : "48px" } paddingBottom={ !isMobile ? "149px" : "42px" } src={main_coins}>
                <Div flex={ !isMobile ? "row_between" : "column_center" } maxWidth="1180px" alignItems="flex-start">
                    <Div flex={ !isMobile ? null : "column_center" } maxWidth={ !isMobile ? "435px" : null } paddingTop={ !isMobile ? "19px" : null }>
                        <MainIntroText>
                            {{
                                top: {
                                    text: "반복을 시작하는 순간 포기는 없습니다.",
                                    margin: !isMobile ? "15px" : "8px",
                                    justify: !isMobile ? "flex-start" : null
                                },
                                bottom: {
                                    text: "더 강하고 꾸준하게 만드는\n반복 장학금"
                                },
                                color: "white"
                            }}
                        </MainIntroText>
                        <Div flex="row_center" marginTop={ !isMobile ? "33px" : "26px" } width="162px" height="48px" onClick={ onClickEvent }>
                            <Button color="white" weight="700" size="small_medium" radius="4px">
                                반복장학금 바로가기
                            </Button>
                        </Div>
                        {
                            !isMobile &&
                            <Div marginTop="25px">
                                <P color="white" weight="500" size="extra_small">*쌓인 마일리지는 모두 현금화가 가능합니다.</P>
                            </Div>
                        }
                    </Div>
                    <Div flex="row_between" maxWidth="614px" wrap="wrap" marginTop={ !isMobile ? null : "40px" }>
                        {
                            imgList && imgList.map((e, i) =>
                                <Div key={i} width="fit-content" flex="row_between" marginBottom="25px">
                                    <SchoolarShipArticle>
                                        {{
                                            img: e,
                                            txt: txtList[i],
                                            stamp: stampList[i],
                                        }}
                                    </SchoolarShipArticle>
                                </Div>
                            )
                        }
                    </Div>
                    {
                        isMobile &&
                        <Div marginTop="25px">
                            <P color="white" weight="500" size="extra_small">*쌓인 마일리지는 모두 현금화가 가능합니다.</P>
                        </Div>
                    }
                </Div>
            </Div>
        </Div>
    )
}

export default SchoolarShip