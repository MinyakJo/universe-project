import React from "react"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import commonDiv from "components/common/Div"
import H1 from "components/common/H1"
import Button from "components/common/Button"
import styled from "styled-components"
import CommonStyle from "components/style"
import create_account1 from "../../../image/create_account_page/create_account_page_1.png"
import create_account2 from "../../../image/create_account_page/create_account_page_2.png"

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

const Img = styled.img`
    width: 100%;
    object-fit: contain;
`

const ChooseAge = (props) => {

    const isMobile = useRecoilValue(isMobileState)

    return(
        <Div flex="column_center" height="calc(100vh - 81px)" paddingBottom="30px" onClick={props.onClick}>
            <Div width="fit-content" marginBottom="60px">
                <H1 color="bk" size={ !isMobile ? "large" : "medium" } lineHeight="160%" weight="500" family="esamanru" style={{ textAlign: "center" }}>
                    유니버스 반복을 시작하려는<br/>
                    회원님의 <Span>연령대</Span>를 선택해 주세요!
                </H1>
            </Div>
            <Div flex="row" width={ !isMobile ? "fit-content" : null } padding={ !isMobile ? null : "0px 20px" }>
                <Div flex="column_center" width={ !isMobile ? null : "calc(50% - 7.5px)" } marginRight="15px">
                    <Div 
                        width={ !isMobile ? "195px" : null } 
                        ratio="1 / 1" 
                        radius="25px" 
                        marginRight={ !isMobile ? "20px" : "7.5px" } 
                        marginLeft={ !isMobile ? "20px" : "7.5px" } 
                        style={{ overflow: "hidden" }}
                    >
                        <Button>
                            <Img src={create_account1} id="14-year"/>
                        </Button>
                    </Div>
                    <Div paddingTop="26px" style={{ cursor: "pointer" }} id="14-year">
                        <Button color="bk" size={ !isMobile ? "small_large" : "small_medium" } weight="700" lineHeight="23px" id="14-year">
                            14세 미만
                        </Button>
                    </Div>
                </Div>
                <Div flex="column_center" width={ !isMobile ? null : "calc(50% - 7.5px)" }>
                    <Div 
                        width={ !isMobile ? "195px" : null } 
                        ratio="1 / 1" 
                        radius="25px" 
                        marginRight={ !isMobile ? "20px" : "7.5px" } 
                        marginLeft={ !isMobile ? "20px" : "7.5px" } 
                        style={{ overflow: "hidden" }}
                    >
                        <Button>
                            <Img src={create_account2} id="14+year"/>
                        </Button>
                    </Div>
                    <Div paddingTop="26px" style={{ cursor: "pointer" }} id="14+year">
                        <Button color="bk" size={ !isMobile ? "small_large" : "small_medium" } weight="700" lineHeight="23px" id="14+year">
                            14세 이상
                        </Button>
                    </Div>
                </Div>
            </Div>
        </Div>
    )
}

export default ChooseAge