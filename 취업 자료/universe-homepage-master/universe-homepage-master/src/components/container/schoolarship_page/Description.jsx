import React from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import commonDiv from "components/common/Div"
import H1 from "components/common/H1"
import H2 from "components/common/H2"
import P from "components/common/P"
import Button from "components/common/Button"
import pig_bank from "../../../svg/pig_bank.svg"
import six_infinity from "../../../svg/six_infinity.svg"
import mo_background from "../../../image/main_page/patent_mobile.png"
import background from "../../../image/main_page/main_page_03.png"
import eCommerce_01 from "../../../svg/pass_introduction_01.svg"
import eCommerce_02 from "../../../svg/book.svg"
import eCommerce_03 from "../../../svg/shopping.svg"
import one_coin from "../../../svg/one_coin.svg"
import MainIntroText from "../../component/main_page/MainIntroText"
import { isMobileState } from "recoil/mainAtom"
import { useRecoilValue } from "recoil"

const Div = styled(commonDiv)`
    flex-wrap: ${props => {
        return props.wrap ? props.wrap : null
    }};

    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};

    box-shadow: ${props => {
        return props.shadow ? props.shadow : null
    }};

    border: ${props => {
        return props.border ? `1px solid ${CommonStyle.setColor(props.border)}` : null
    }};

    aspect-ratio: ${props => {
        return props.ratio ? props.ratio : null
    }};

    border: ${props => {
        return props.borderImage ? "1px solid" : null
    }};

    border-image-source: ${props => {
        return props.borderImage ? "linear-gradient(270deg, #1F1E2A 7%, #FE7E48 47.33%, #1F1E2A 88.5%)" : null
    }};
`

const Line = styled(Div)`
    width: ${props => {
        return props.isMobile ? null : "400px"
    }};
    height: 1px;
    background: linear-gradient(270deg, #1F1E2A 7%, #FE7E48 47.33%, #1F1E2A 88.5%);
    border-image-source: linear-gradient(270deg, #1F1E2A 7%, #FE7E48 47.33%, #1F1E2A 88.5%);
`

const Img = styled.img`
    object-fit: contain;
    width: 100%;
    height: 100%;
`

const Span = styled.span`
    color: ${CommonStyle.setColor("orange")};
    font-weight: ${props => {
        return props.weight ? props.weight: null
    }};
`

const Description = () => {

    const isMobile = useRecoilValue(isMobileState)

    const eCommerce = [ 
        { name : "신규강의", img: eCommerce_01, cost: "24,000", commingsoon: true },
        { name : "교재", img: eCommerce_02, cost: "24,000", commingsoon: true  },
        { name : "쇼핑", img: eCommerce_03, cost: "24,000", commingsoon: true  }
     ]

    return(
        <Div flex="column_center" padding={ !isMobileState ? "100px 0px" : "48px 0px" } paddingBottom={ !isMobileState ? "80px" : "30px" } style={{ backgroundColor: "#FFF7EA" }}>
            <MainIntroText>
                {{
                    top: {
                        text: "패스 수강하고 반복장학금 받자!",
                        margin: !isMobileState ? "11px" : "9px"
                    },
                    bottom: {
                        text: "하루하루 쌓이는 반복 마일리지",
                        accent: "반복 마일리지",
                        accentPosition: "end",
                        margin: !isMobileState ? "33px" : "23px"
                    },
                    color: "black"
                }}
            </MainIntroText>

            {/* 01 */}
            <Div flex="column_center" backgroundColor="white" padding={ !isMobile ? "85px 200px" : "25px 20px" } paddingTop={ !isMobile ? "51px" : null } marginBottom="30px">
                <Div 
                    flex="row_center" 
                    width={ !isMobile ? "50px" : "40px" } 
                    height={ !isMobile ? "50px" : "40px" } 
                    backgroundColor="orange" 
                    radius="50%" 
                    marginBottom={ !isMobile ? "24px" : "20px" }
                >
                    <P color="white" size={ !isMobile ? "small_large" : "small_medium" } weight="700" family="pretendard" lineHeight="22px">
                        01
                    </P>
                </Div>
                <Div flex="column_center" marginBottom={ !isMobile ? "45px" : "40px" }>
                    <Div width="fit-content" marginBottom={ !isMobile ? "12px" : "9px" }>
                        <H2 color="black" size={ !isMobile ? "medium" : "small_medium" } weight="700" lineHeight={ !isMobile ? "35px" : "23px" } style={{ textAlign: "center" }}>
                            실력향상과 동시에{ isMobile && <br/> }집중력x학업의지를 개선할 수 있도록!
                        </H2>
                    </Div>
                    <Div width="fit-content">
                        <H1 color="black" size={ !isMobile ? "large" : "medium" } weight="500" family="esamanru" lineHeight="35px">
                            <Span>누구나 쉽게</Span> 참여 할 수 있습니다.
                        </H1>
                    </Div>
                </Div>
                <Div flex={ !isMobile ? "row_between" : "row" } width={ !isMobile ? "780px" : null } height={ !isMobile ? "310px" : null } style={{ justifyContent: !isMobile? null : "space-around" }}>
                    <Div 
                        flex="column_between" 
                        width={ !isMobile ? null : "160px" }
                        height={ !isMobile ? "100%" : null }
                        ratio="1/1"
                        border="grey1" 
                        radius="20px"
                        shadow="0px 2px 8px rgba(0, 0, 0, 0.1)" 
                        padding={ !isMobile ? "50px 0px" : "16px 13px" } 
                        paddingTop={ !isMobile ? "30px" : null }
                        marginRight={ !isMobile ? "20px" : null }
                    >
                        <Div flex="row" width={ !isMobile ? "164px" : "68px" } marginBottom={ !isMobile ? "40px" : "15px" }>
                            <Img src={pig_bank}/>
                        </Div>
                        <Div width="fit-content">
                            <P color="black" weight="300" family="esamanru" size={ !isMobile ? "medium_small" : "small_medium" } lineHeight="24px" style={{ textAlign: "center" }}>
                                현금 마일리지 <Span weight="500">100% 환급!</Span>
                            </P>
                        </Div>
                    </Div>
                    <Div 
                        flex="column_between" 
                        width={ !isMobile ? null : "160px" }
                        height={ !isMobile ? "100%" : null }
                        ratio="1/1"
                        border="grey1" 
                        radius="20px"
                        shadow="0px 2px 8px rgba(0, 0, 0, 0.1)" 
                        padding={ !isMobile ? "50px 0px" : "16px 13px" } 
                        paddingTop={ !isMobile ? "30px" : null }
                        marginRight={ !isMobile ? "20px" : null }
                    >
                        <Div flex="row" width={ !isMobile ? "218px" : "90px" }>
                            <Img src={six_infinity}/>
                        </Div>
                        <Div width="fit-content">
                            <P color="black" weight="300" family="esamanru" size={ !isMobile ? "medium_small" : "small_medium" } lineHeight="24px" style={{ textAlign: "center" }}>
                                <Span weight="500">완벽한 동기부여로</Span>{ isMobile && <br/> } 꾸준히 도전!
                            </P>
                        </Div>
                    </Div>
                </Div>
            </Div>
            {/* 02 */}
            <Div flex="column_center" backgroundColor="white" padding={ !isMobile ? "85px 200px" : "25px 20px" } paddingTop={ !isMobile ? "51px" : null }>
                <Div 
                    flex="row_center" 
                    width={ !isMobile ? "50px" : "40px" } 
                    height={ !isMobile ? "50px" : "40px" } 
                    backgroundColor="orange" 
                    radius="50%" 
                    marginBottom={ !isMobile ? "24px" : "20px" }
                >
                    <P color="white" size={ !isMobile ? "small_large" : "small_medium" } weight="700" family="pretendard" lineHeight="22px">
                        02
                    </P>
                </Div>
                <Div flex="column_center" marginBottom={ !isMobile ? "45px" : "40px" }>
                    <Div width="fit-content" marginBottom={ !isMobile ? "12px" : "9px" }>
                        <H2 color="black" size={ !isMobile ? "medium" : "small_medium" } weight="700" lineHeight={ !isMobile ? "35px" : "23px" } style={{ textAlign: "center" }}>
                            반복해서 쌓은 장학금으로</H2>
                    </Div>
                    <Div width="fit-content">
                        <H1 color="black" size={ !isMobile ? "large" : "medium" } weight="500" family="esamanru" lineHeight="35px">
                            신규 강의, 교재, 그리고 <Span>쇼핑</Span>까지!
                        </H1>
                    </Div>
                </Div>
                <Div flex="column_center" width={ !isMobile ? "880px" : null } src={ !isMobile ? background : mo_background } radius="20px">
                    <Div flex="column_center" padding={ !isMobile ? "30px 50px" : "40px 0px" } paddingBottom={ !isMobile ? "67px" : "27px" }>
                        <Div flex="column_center" marginBottom={ !isMobile ? "35px" : "28px" } padding={ !isMobile ? null : "0px 4px" }>
                            <Line isMobile={ isMobile }/>
                            <Div flex="row" width="row_center" height="54px">
                                <P color="orange" size="medium" lineHeight="160%" weight="700">
                                    반복 마일리지 STORE
                                </P>
                            </Div>
                            <Line isMobile={ isMobile }/>
                        </Div>
                        <Div flex={ !isMobile ? "row_between" : "column_center" } height={ !isMobile ? "300px" : null } padding="0px 45px">
                            {
                                eCommerce && eCommerce.map((e, i) =>
                                    <Div 
                                        key={i} 
                                        flex="column_center" 
                                        width="244px" 
                                        minWidth="244px" 
                                        height="100%" 
                                        padding="28px 22px" 
                                        paddingBottom="18px" 
                                        backgroundColor="bk" 
                                        border="grey4" 
                                        radius="4px"
                                        marginBottom={ !isMobile ? null : "28px" }
                                    >
                                        <Div flex="row_center" marginBottom="15px">
                                            {/* 이름 */}
                                            <P size="medium_small" weight="300" lineHeight="120%" color="orange">
                                                {
                                                    e.name && e.name
                                                }
                                            </P>
                                        </Div>
                                        {/* 이미지 */}
                                        <Div 
                                            flex="row_center" 
                                            height="100px" 
                                            marginBottom="12px" 
                                            backgroundColor="white" 
                                            padding="0px 40px" 
                                            style={{
                                                position: "relative"
                                            }}
                                        >
                                            {
                                                e.img &&
                                                <Img src={e.img}/>
                                            }
                                            {/* 준비안되었을시 */}
                                            {
                                                e.commingsoon &&
                                                <>
                                                    <Div 
                                                        height="100%"
                                                        backgroundColor="black"
                                                        style={{
                                                            position: "absolute",
                                                            top: 0,
                                                            left: 0,
                                                            zIndex: 3,
                                                            opacity: 0.5
                                                        }}
                                                    />
                                                    <Div 
                                                        flex="row_center"
                                                        height="100%"
                                                        style={{
                                                            position: "absolute",
                                                            top: 0,
                                                            left: 0,
                                                            zIndex: 4,
                                                        }}
                                                    >
                                                        <P color="white" family="esamanru" lineHeight="21px" style={{ fontSize: 13 }}>
                                                            coming soon
                                                        </P>
                                                    </Div>
                                                </>
                                            }
                                        </Div>
                                        {/* 가격 */}
                                        <Div flex="row_center" padding="9px 0px" backgroundColor="grey6" marginBottom="23px">
                                            <Div width="20px" marginRight="13px">
                                                <Img src={one_coin}/>
                                            </Div>
                                            <P color="white" size="small_medium" family="esamanru" lineHeight="19px" weight="500">
                                                { e.cost && e.cost }
                                            </P>
                                        </Div>
                                        {/* 신청하기 버튼 */}
                                        <Div backgroundColor="orange" radius="4px" height="43px">
                                            <Button color="white" weight="600" size="small_medium" family="pretendard">
                                                신청하기
                                            </Button>
                                        </Div>
                                    </Div>
                                )
                            }
                        </Div>
                    </Div>
                </Div>
                <Div flex="row_end" width={ !isMobile ? "880px" : null } marginTop="15px">
                    <P color="grey4" size="extra_small" lineHeight="22px" weight="500">
                        *추후 이커머스 도입 예정
                    </P>
                </Div>
            </Div>
        </Div>
    )
}

export default Description