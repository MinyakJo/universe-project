import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import commonP from "components/common/P"
import CommonStyle from "components/style"
import MainIntroText from "../../component/main_page/MainIntroText"
import repeat_u_pass_03 from "../../../image/repeat_u_pass_page/repeat_u_pass_03.png"
import long_arrow from "../../../svg/long_arrow_left.svg"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"

const Div = styled(commonDiv)`
    background-color: ${props => {
        return props.backgroundColor ? `${CommonStyle.setColor(props.backgroundColor)}` : "transparent"
    }};

    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : null
    }};

    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};

    border-bottom: ${props => {
        return props.bottom ? `solid 1px ${CommonStyle.setColor(props.bottom)}` : null
    }};
`

const GraphBox = styled(Div)`
    border: 1px solid ${CommonStyle.setColor("orange")};
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    background: rgba(0, 0, 0, 0.3);
`

const Graph = styled(Div)`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-around;
    border-bottom: solid 1px ${CommonStyle.setColor("orange")};

    div{
        max-width: ${props => {
            return props.childrenMaxWidth ? props.childrenMaxWidth : null
        }};
        margin: ${props => {
            return props.childrenMargin ? props.childrenMargin : null
        }};
    }
`

const Img = styled.img`
    object-fit: contain;
    width: 100%;
`

const P = styled(commonP)`
`

const PriceAdvance = () => {

    const isMobile = useRecoilValue(isMobileState)

    return(
        <Div flex="column_center" padding={ !isMobile ? "80px 0px" : "48px 20px" } paddingBottom={ !isMobile ? "83px" : "50px" } src={repeat_u_pass_03}>
            <MainIntroText>
                {{
                    top: {
                        text: "가격이 오르기전에 신청하세요!",
                        margin: !isMobile ? "11px" : "9px"
                    },
                    bottom: {
                        text: !isMobile ? "판매 종료시간 이후 가격이 인상됩니다." : "판매 종료시간 이후\n가격이 인상됩니다." ,
                        accent: "가격이 인상",
                        accentPosition: "center",
                        margin: !isMobile ? "41px" : "23px"
                    },
                    color: "white"
                }}
            </MainIntroText>
            <GraphBox maxWidth="780px" radius="10px" padding={ !isMobile ? "33px 28px" : "28px 12px" } paddingTop="0px">
                <Graph height={ !isMobile ? "380px" : "163px" } padding={ !isMobile ? "0px 20px" : "0px 12px" } childrenMaxWidth={ !isMobile ? "57px" : "24px" } childrenMargin={ !isMobile ? "0px 40px" : "0px 17px" }>
                    <Div height={ !isMobile ? "105px" : "45px" } backgroundColor="orange"></Div>
                    <Div height={ !isMobile ? "162px" : "70px" } backgroundColor="light_blue"></Div>
                    <Div height={ !isMobile ? "206px" : "88px" } backgroundColor="light_blue"></Div>
                    <Div height={ !isMobile ? "259px" : "111px" } backgroundColor="light_blue"></Div>
                    <Div height={ !isMobile ? "300px" : "130px" } backgroundColor="light_blue"></Div>
                </Graph>
                <Div flex={ !isMobile ? "row" : "row_top" } padding={ !isMobile ? "23px 60px" : "10px 27px" } paddingBottom="0px">
                    <Div width="fit-content" minWidth={ !isMobile ? "71px" : "34px" }>
                        <P color="white" weight="500" size={ !isMobile ? "small_large" : "extra_small" } family="esamanru">오픈 특가</P>
                    </Div>
                    <Div marginLeft={ !isMobile ? "27px" : "11px" } marginRight={ !isMobile ? "27px" : "11px" }>
                        <Img src={long_arrow}/>
                    </Div>
                    <Div width="fit-content" minWidth={ !isMobile ? "286px" : "112px" }>
                        <P color="white" weight="500" size={ !isMobile ? "medium" : "extra_small" } family="esamanru" style={{ textAlign: !isMobile ? null : "end" }}>
                            가격이 오르기 전에{ isMobile && <br/> } 신청하세요!
                        </P>
                    </Div>
                </Div>
            </GraphBox>
        </Div>
    )
}

export default PriceAdvance