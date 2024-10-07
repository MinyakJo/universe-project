import React from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import commonDiv from "components/common/Div"
import commonButton from "components/common/Button"
import commonP from "components/common/P"
import eye from "../../../svg/orange_eye.svg"
import { useRecoilValue, useRecoilState } from "recoil"
import { useNavigate } from "react-router-dom"
import { isMobileState } from "recoil/mainAtom"

const Div = styled(commonDiv)`
    border-bottom: ${props => {
        return props.borderBottom ? `1px solid ${CommonStyle.setColor(props.borderBottom)}` : null
    }};

    border-top: ${props => {
        return props.borderTop ? `1px solid ${CommonStyle.setColor(props.borderTop)}` : null
    }};

    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};

    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : null
    }};

    cursor: ${({ cursor }) => {
        return cursor ? cursor : null
    }};
    
    height: 100%;
`

const Button = styled(commonButton)`
    display: flex;
    width: ${props => {
        return props.width ? props.width : "100%"
    }};
    justify-content: ${props => {
        return props.justify ? props.justify : "center"
    }};
    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : null
    }};
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: ${({ cursor }) => {
        return cursor ? cursor : "default"
    }};
`

const Title = styled(commonP)`
    height: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: ${({ cursor }) => {
        return cursor ? cursor : null
    }};
`

const P = styled(commonP)`
    height: 100%;
    color: ${CommonStyle.setColor("grey7")};
    font-weight: 700;
    white-space: nowrap;
    font-size: ${props => {
        return props.isMobile ? "13px" : "16px"
    }};
    cursor: ${({ cursor }) => {
        return cursor ? cursor : null
    }};
`

const InquiryList = ({ children, my, backgroundColor }) => {

    const navigate = useNavigate()
    const isMobile = useRecoilValue(isMobileState)

    const onClickEvent = (e, i) => {
        if( !my && i ) navigate(`/inquiries/${ i }`)
        else if( i )navigate(`/my-inquiries/${ i }`)
    }

    return(
        <Div flex="column" backgroundColor={ backgroundColor ? backgroundColor : "white" }>
            <Div 
                flex="row_between" 
                borderBottom="gray3" 
                borderTop="grey2" 
                padding={ !isMobile ? "0px 40px" : null }
            >
                <Div 
                    flex="row" 
                    minWidth={ !isMobile ? null : "93px" } 
                    maxWidth={ !isMobile ? null : "150px" } 
                    padding={ !isMobile ? "12px 0px" : "10px 0px" } 
                >
                    <P isMobile={ isMobile }>
                        제목
                    </P>
                </Div>
                <Div flex="row_end">
                    <Div 
                        flex="row_center" 
                        width={ !isMobile ? "176px" : "65px" } 
                        minWidth={ !isMobile ? "176px" : "65px" } 
                        marginRight={ !isMobile ? null : "5px" }
                    >
                        <P isMobile={ isMobile }>
                            답변상태
                        </P>
                    </Div>
                    {
                        !my &&
                        <Div 
                            flex="row_center" 
                            width={ !isMobile ? "176px" : "65px" } 
                            minWidth={ !isMobile ? "176px" : "65px" } 
                            marginRight={ !isMobile ? null : "5px" }
                        >
                            <P isMobile={ isMobile }>
                                이름
                            </P>
                        </Div>
                    }
                    <Div 
                        flex="row_center" 
                        width={ !isMobile ? "176px" : "65px" } 
                        minWidth={ !isMobile ? "176px" : "65px" }
                    >
                        <P isMobile={ isMobile }>
                            작성일
                        </P>
                    </Div>
                </Div>
            </Div>
            {
                children && children.map((e, i) =>
                    <Div 
                        key={ !my ? `inquiry_${ i }` : `myInquiry_${ i }` } 
                        flex="row"  
                        borderBottom="gray3"
                        height={ !isMobile ? "50px" : "40px" }
                        padding={ !isMobile ? "0px 40px" : null }
                        onClick={ ev => onClickEvent( ev, e.id )}
                        cursor={ e.id ? "pointer" : "default" }
                    >
                        {/* 제목 */}
                        <Div flex="row">
                            <Div 
                                flex="row" 
                                minWidth={ !isMobile ? null : "93px" } 
                                maxWidth={ !isMobile ? "550px" : "115px" }
                                paddingTop="12px" 
                                paddingBottom="12px"
                            >
                                <Title color="grey5" weight="400" style={{ fontSize: !isMobile ? 16 : 13 }}>
                                    { e?.title && e.title }
                                </Title>
                            </Div>
                        </Div>

                        <Div flex="row" width="fit-content">
                            
                            {/* 문의 : 답변상태 */}
                            {
                                e.isWait !== null && e.isWait !== undefined &&
                                <Div 
                                    flex="row"
                                    width={ !isMobile ? "176px" : "65px" }
                                    minWidth={ !isMobile ? "176px" : "65px" }
                                    marginRight={ !isMobile ? null : "5px" }
                                    id={ my ? "myInquiry" : "inquiry" }
                                >
                                    <Button color={ e.isWait ? "orange" : "grey4" } weight="500" style={{ fontSize: !isMobile ? 16 : 13 }}>
                                        {
                                            e.isWait ?
                                            "답변대기":
                                            "답변완료"
                                        }
                                    </Button>
                                </Div>
                            }
                            {/* 문의 : 작성자이름 */}
                            {
                                e?.name && !my &&
                                <Div 
                                    flex="row"
                                    width={ !isMobile ? "176px" : "65px" }
                                    minWidth={ !isMobile ? "176px" : "65px" }
                                    marginRight={ !isMobile ? null : "5px" }
                                    
                                >
                                    <Button color="grey4" weight="500" style={{ fontSize: !isMobile ? 16 : 13 }}>
                                        { e?.name && e.name }
                                    </Button>
                                </Div>
                            }
                            {/* 날짜 */}
                            <Div flex="row_center" width={ !isMobile ? "176px" : "65px" } minWidth={ !isMobile ? "176px" : "65px" } >
                                <Title color="grey4" weight="400" style={{ fontSize: !isMobile ? 16: 11 }}>
                                    { e?.date && e.date }
                                </Title>
                            </Div>
                        </Div>
                    </Div>
                )
            }
        </Div>
    )
}

export default React.memo( InquiryList )