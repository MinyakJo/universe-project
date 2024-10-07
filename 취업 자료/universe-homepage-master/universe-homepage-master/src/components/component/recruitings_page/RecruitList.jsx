import React from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import commonDiv from "components/common/Div"
import commonButton from "components/common/Button"
import commonP from "components/common/P"
import { useRecoilValue } from "recoil"
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

    cursor: pointer;
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
`

const Title = styled(commonP)`
    height: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
`

const P = styled(commonP)`
    height: 100%;
    color: ${CommonStyle.setColor("grey7")};
    font-weight: 700;
    white-space: nowrap;
    font-size: ${props => {
        return props.isMobile ? "13px" : "16px"
    }};
`

const RecruitList = ({ children }) => {

    const navigate = useNavigate()
    const isMobile = useRecoilValue( isMobileState )

    const onClickEvent = (e, i) => {
        navigate(`/recruitings/${ i }`)
    }

    return(
        <Div flex="column">
            <Div 
                flex="row_between" 
                borderBottom="gray3" 
                borderTop="grey2" 
                padding={ !isMobile ? "0px 40px" : null }
            >
                <Div flex="row">
                    <Div 
                        flex={ !isMobile ? "row_center" : "row" } 
                        width={ !isMobile ? "76px" : "48px" } 
                        minWidth={ !isMobile ? "76px" : "48px" } 
                        marginRight={ !isMobile ? "52px" : "32px" } 
                        padding={ !isMobile ? "12px 0px" : "10.5px 0px" }
                    >
                        <P isMobile={ isMobile }>
                            모집 분야
                        </P>
                    </Div>
                    <Div flex="row">
                        <P isMobile={ isMobile }>
                            모집 직무
                        </P>
                    </Div>
                </Div>
                <Div flex="row_end" width="fit-content">
                    {
                        !isMobile &&
                        <Div flex="row_center" width="176px" minWidth="176px" marginRight="20px">
                            <P isMobile={ isMobile }>
                                모집기간
                            </P>
                        </Div>
                    }
                    <Div flex={ !isMobile ? "row_center" : "row_end" } width={ !isMobile ? "176px" : "55px" } minWidth={ !isMobile ? "176px" : "55px" }>
                        <P isMobile={ isMobile }>
                            진행여부
                        </P>
                    </Div>
                </Div>
            </Div>
            {
                children && children.map((e, i) =>
                    <Div 
                        key={ `recruit_${ i }` } 
                        flex="row_between"  
                        borderBottom="gray3"
                        height={ !isMobile ? "50px" : "40px" }
                        padding={ !isMobile ? "0px 40px" : null }
                        onClick={ ev => onClickEvent( ev, e.id )}
                    >
                        {/* 채용 : 모집분야 */}
                        <Div flex="row">
                            <Div 
                                flex="row"
                                width={ !isMobile ? "76px" : "48px" } 
                                minWidth={ !isMobile ? "76px" : "48px" }
                                marginRight={ !isMobile ? "52px" : "32px" }
                            >
                                <Title color="grey5" weight="400" style={{ fontSize: !isMobile ? 16 : 13 }}>
                                    { e.area && e.area }
                                </Title>
                            </Div>

                            {/* 직무 */}
                            <Div 
                                flex="row" 
                                minWidth={ !isMobile ? null : "190px" }
                                maxWidth={ !isMobile ? "600px": "190px" }
                                paddingTop="12px" 
                                paddingBottom="12px"
                            >
                                <Title color="grey5" weight="400" style={{ fontSize: !isMobile ? 16 : 13 }}>
                                    { e.job && e.job }
                                </Title>
                            </Div>
                        </Div>

                        <Div flex="row" width="fit-content">
                           
                            {/* 날짜 */}
                            <Div flex="row_center" width={ !isMobile ? "176px": "65px" } minWidth={ !isMobile ? "176px" : "65px" } cursor="pointer">
                                <Title color="grey4" weight="400" style={{ fontSize: !isMobile ? 16 : 11 }}>
                                    { `${ e.startDate && e.startDate } - ${ e.endDate && e.endDate }` }
                                </Title>
                            </Div>
                            
                            {/* 채용 : 작성일 */}
                           
                            <Div width={ !isMobile ? "176px" : "55px" }  minWidth={ !isMobile ? "176px" : "55px" } marginLeft={ !isMobile ? "20px" : null }>
                                <Button color="grey4"  style={{ fontSize: !isMobile ? 16 : 13 }}  weight="500">
                                    { 
                                        e.inProgress ?
                                        "진행중":
                                        "마감"
                                    }
                                </Button>
                            </Div>
                        </Div>
                    </Div>
                )
            }
        </Div>
    )
}

export default React.memo( RecruitList )