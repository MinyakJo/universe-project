import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import commonButton from "components/common/Button"
import MainIntroText from "../../component/main_page/MainIntroText"
import background from "../../../image/main_page/main_page_03.png"
import mo_background from "../../../image/main_page/patent_mobile.png"
import main_patent1 from "../../../svg/main_patent_01.svg"
import main_patent2 from "../../../svg/main_patent_02.svg"
import main_patent3 from "../../../svg/main_patent_03.svg"
import main_patent4 from "../../../svg/main_patent_04.svg"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import { useNavigate } from "react-router-dom"

const Div = styled(commonDiv)`
    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : null
    }};

    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
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

    overflow: hidden;

    ::-webkit-scrollbar{
        height: 1px;
    }
    ::-webkit-scrollbar-thumb{
        background-color: black;
        border-radius: 10px;
    }
`

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`

const Button = styled(commonButton)`
    background: linear-gradient(116.86deg, #FF5C00 0%, #FFA959 104.7%);
`

// 진짜머임?
const Patent = () => {

    const patentList = [ main_patent1, main_patent2, main_patent3, main_patent4 ]
    const isMobile = useRecoilValue(isMobileState)
    const navigate = useNavigate()

    return(
        <Div flex="column_top" alignItems="center" padding={ !isMobile ? null : "0px 20px" } paddingTop={ !isMobile ? "144px" : "48px" } paddingBottom={ !isMobile ? "142px" : "48px" } src={ !isMobile ? background : mo_background }>
            <Div maxWidth="1180px">
                <MainIntroText>
                    {{
                        top: {
                            text: "반복학습을 신뢰할 수 있는",
                            margin: "11px"
                        },
                        bottom: {
                            text: "총 6건특허 등록 및 40건 출원",
                            margin: !isMobile ? "21px" : "23px"
                        },
                        color: "white"
                    }}
                </MainIntroText>
                <Div flex="row_center" paddingBottom="48px">
                    <Div width="162px" height="48px">
                        <Button color="white" radius="4px" size="small_medium" weight="700" onClick={ () => { navigate("/characteristic") } }>
                            유니버스반복 특징
                        </Button>
                    </Div>
                </Div>
                <Div flex="row" width={ !isMobile ? null : "100%" } style={{ overflowX: "auto" }}>
                    {
                        patentList && patentList.map((e, i) =>
                            <Div key={ i } width={ !isMobile ? "260px" : "157px" } minWidth={ !isMobile ? null : "157px" } marginRight={ !isMobile ? "24px" : "8px" } marginLeft={ !isMobile ? "24px" : "8px" }>
                                <Img src={main_patent1}/>
                            </Div>
                        )
                    }
                </Div>
            </Div>
        </Div>
    )
}

export default Patent
// 진짜모름