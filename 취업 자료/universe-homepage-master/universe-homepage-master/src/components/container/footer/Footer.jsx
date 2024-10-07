import React from "react"
import styled from "styled-components"
import Div from "components/common/Div"
import Button from "components/common/Button"
import P from "components/common/P"
import footer_logo from "../../../svg/footer_logo.svg"
import { useNavigate } from "react-router-dom"
import { isMobileState } from "recoil/mainAtom"
import { useRecoilValue } from "recoil"
import CommonStyle from "components/style"

const StyledFooter = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: ${({ align }) => {
        return align ? align : null
    }};
    border-top: 1px solid #C7C7C7;
    margin-bottom: ${props => {
        return props.marginBottom ? props.marginBottom : null
    }};
    padding: ${({ padding }) => {
        return padding ? padding : null
    }};
    padding-right: ${({ paddingRight }) => {
        return paddingRight ? paddingRight : null;
    }};
`

const Img = styled.img`
    width: 100%;
    object-fit: contain;
`

const TextDiv = styled(Div)`
    width: fit-content;
    flex-wrap: wrap;
    margin: ${({ margin }) => {
        return margin ? margin : null
    }};

    p, button{
        white-space: nowrap;
        color: ${ CommonStyle.setColor( "grey5" ) };
        font-size: ${({ isMobile }) => {
            return isMobile ? "12px" : "15px"
        }};
        font-family: ${({ isMobile }) => {
            return isMobile ? "pretendard" : "regular"
        }};
    }
`

const ListDiv = styled(Div)`
    flex-wrap: wrap;
`

const Footer = (props) => {

    const btnList = [ "제휴문의", "이용약관", "개인정보취급방침", "고객센터", "채용", "특허소개", "제보하기" ]
    const btnLink = [ "", "", "", "customer-center", "recruitings", "", "report-service", ]
    const infoTopList = [ "(주)유니버스반복", "서울특별시 강남구 테헤란로 146 현익빌딩 11층", "대표자 : 박명재" ]
    const infoBottomList = [ "사업자등록번호 : 123-12-12347", "통신판매번호 : 2014-서울서초-0345", "유니버스반복 고객센터 : 1544-1234" ]
    const isMobile = useRecoilValue(isMobileState)
    const navigate = useNavigate()

    const onClickEvent = (e) => {
        const id = e.target.id

        if(id){
            navigate(`/${id}`)
        }
    } 

    return (
        <StyledFooter align={ !isMobile ? "center" : "start" } marginBottom={ !isMobile && props.marginBottom ? props.marginBottom : null } padding={ !isMobile ? null : "30px 20px" } paddingRight={ !isMobile ? null : "0px" }>
            <Div width={ !isMobile ? "fit-content" : "140px" } marginTop={ !isMobile ? "36px" : null }>
                <Img src={footer_logo}/>
            </Div>
            <ListDiv flex={ !isMobile ? "row_center" : "row" } width={ !isMobile ? "fit-content" : null } marginTop={ !isMobile ? "22px" : "30px" }>
                {
                    btnList && btnList.map((e, i) => 
                        <TextDiv 
                            isMobile={ isMobile } 
                            key={ `footer_btn_${ i }` } 
                            width="fit-content" 
                            margin={ !isMobile ? "0px 22.5px" : null }
                            marginRight={ !isMobile ? null : "14px" }
                        >
                            <Button id={ btnLink[i] } onClick={ onClickEvent } weight={ !isMobile ? null : 600 }>
                                {e}
                            </Button>
                        </TextDiv>
                    )
                }
            </ListDiv>
            <ListDiv flex={ !isMobile ? "row_center" : "column_top" } width="fit-content" marginTop={ !isMobile ? "22px" : "25px" }>
                {
                    infoTopList && infoTopList.map((e, i) =>
                        <TextDiv isMobile={ isMobile } key={ `footer_info_top_${ i }` } width="fit-content" margin={ !isMobile ? "0px 16px" : null }>
                            <P>
                                {e}
                            </P>
                        </TextDiv>
                    )
                }
            </ListDiv>
            <ListDiv flex={ !isMobile ? "row_center" : "column_top" } width="fit-content" marginTop={ !isMobile ? "9px" : null }>
            {
                    infoBottomList && infoBottomList.map((e, i) =>
                        <TextDiv isMobile={ isMobile } key={ `footer_info_bottom_${ i }` } width="fit-content" margin={ !isMobile ? "0px 16px" : null }>
                            <P>
                                {e}
                            </P>
                        </TextDiv>
                    )
                }
            </ListDiv>
            <Div width="fit-content" marginTop={ !isMobile ? "32px" : "25px" } marginBottom={ !isMobile ? "30px" : null }>
                <P color="grey5" style={{ fontSize: !isMobile ? 15 : 10 }} weight="400">
                    Copyright © 2022 Universe Banbok. All Rights Reserved.
                </P>
            </Div>
        </StyledFooter>
    )
}

export default React.memo(Footer)