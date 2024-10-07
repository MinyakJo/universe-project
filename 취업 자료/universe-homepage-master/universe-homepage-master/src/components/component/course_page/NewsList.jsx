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

    cursor: ${({ cursor }) => {
        return cursor ? cursor : "pointer"
    }};

    height: 100%;
`

const Button = styled(commonButton)`
    display: flex;
    width: ${props => {
        return props.width ? props.width : "100%"
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
    cursor: ${({ cursor }) => {
        return cursor ? cursor : "pointer"
    }};
`

const P = styled(commonP)`
    height: 100%;
    color: ${CommonStyle.setColor("grey7")};
    font-weight: 700;
    white-space: nowrap;
    cursor: ${({ cursor }) => {
        return cursor ? cursor : "pointer"
    }};
    font-size: ${props => {
        return props.isMobile ? "13px" : "16px"
    }};
`

const NewsList = ({ children, backgroundColor }) => {

    const data = children
    const navigate = useNavigate()
    const isMobile = useRecoilValue( isMobileState )

    const onClickEvent = (e, i) => {
        if( i ) navigate(`/teacher-news/${ i }`)
    }

    return(
        <Div flex="column" backgroundColor={ backgroundColor ? backgroundColor : "white" }>
            <Div flex={ !isMobile ? "row" : "row_between" }borderBottom="gray3" padding={ !isMobile ? "0px 40px" : null } cursor="default">
                <Div flex="row" padding="12px 0px" cursor="default">
                    <P isMobile={ isMobile } cursor="default">
                        제목
                    </P>
                </Div>
                <Div 
                    flex="row_center"
                    width={ !isMobile ? "176px" : "65px" } 
                    minWidth={ !isMobile ? "176px" : "65px" }
                    cursor="default"
                >
                    <P isMobile={ isMobile } cursor="default">
                        작성일자
                    </P>
                </Div>
            </Div>
            {
                data && data.map((e, i) =>
                    <Div 
                        key={ i } 
                        flex="row_between"  
                        borderBottom="gray3"
                        height={ !isMobile ? "50px" : "40px" }
                        padding={ !isMobile ? "0px 40px" : null }
                        onClick={ ev => onClickEvent( ev, e.id )}
                    >
                        <Div flex="row">
                            {/* 제목 */}
                            <Div flex="row" 
                                width={ !isMobile ? null : "calc(100% - 80px)" }
                                marginRight={ !isMobile ? null : "15px" }
                                maxWidth={ !isMobile ? "770px" : null }
                                cursor="pointer"
                                paddingTop="12px" 
                                paddingBottom="12px"
                            >
                                <Button>
                                    <Title color="grey5" weight="400" style={{ fontSize: !isMobile ? 16 : 13 }}>
                                        { e.title && e.title }
                                    </Title>
                                </Button>
                            </Div>
                        </Div>

                        {/* 날짜 */}
                        <Div flex="row_center" width={ !isMobile ? "176px" : "65px" } minWidth={ !isMobile ? "176px" : "65px" }>
                            <Title color="grey4" weight="400" style={{ fontSize: !isMobile ? 16 : 11 }}>
                                { e.date && e.date }
                            </Title>
                        </Div>
                    </Div>
                )
            }
        </Div>
    )
}

export default React.memo( NewsList )