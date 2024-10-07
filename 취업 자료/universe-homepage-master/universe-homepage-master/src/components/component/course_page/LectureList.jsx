import React from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import commonDiv from "components/common/Div"
import commonButton from "components/common/Button"
import commonP from "components/common/P"
import eye from "../../../svg/orange_eye.svg"
import { useRecoilValue } from "recoil"
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

const Img = styled.img`
    width: 100%;
    object-fit: contain;
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
    cursor: ${({ cursor }) => {
        return cursor ? cursor : null
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

const LectureList = ({ children, backgroundColor }) => {

    const isMobile = useRecoilValue( isMobileState )

    return(
        <Div flex="column" backgroundColor={ backgroundColor ? backgroundColor : "white" }>
            <Div flex="row" borderBottom="gray3" padding={ !isMobile ? "12px 40px" : "12px 0px" }>
                <Div flex={ !isMobile ? "row_center" : "row" } 
                    minWidth={ !isMobile ? "110px" : null } 
                    width={ !isMobile ? "110px" : "40px" } 
                    marginRight={!isMobile ? "60px" : "20px" }
                >
                    <P isMobile={ isMobile }>
                        강의 수
                    </P>
                </Div>
                <Div flex="row">
                    <P isMobile={ isMobile }>
                        강의 명
                    </P>
                </Div>
            </Div>
            {
                children && children.map((e, i) =>
                    <Div 
                        key={ i } 
                        flex="row_between"  
                        borderBottom="gray3"
                        id={ `course_${ i }` }
                        height={ !isMobile ? "50px" : "40px" }
                        padding={ !isMobile ? "0px 40px" : null }
                        cursor={ e.representative ? "pointer" : "default" }
                    >
                        {/* 채용 : 모집분야 */}
                        <Div width="fit-content" flex="row" cursor={ e.representative ? "pointer" : "default" } id={ `course_${ i }` }>
                            {/* 강의 수 */}
                            <Div 
                                flex="row" 
                                id={ `course_${ i }` }
                                minWidth={ !isMobile ? "110px": "40px" } 
                                width={ !isMobile ? "110px": "40px" }
                                marginRight={ !isMobile ? "60px" : "19px" } 
                                maxWidth={ !isMobile ? null : "40px" }
                                paddingTop="12px" 
                                paddingBottom="12px"
                            >
                                <Button id={ `course_${ i }` } justify={ !isMobile ? null : "flex-start" } cursor={ e.representative ? "pointer" : "default" } >
                                    <Title 
                                        color="grey5" 
                                        weight="400" 
                                        style={{ fontSize: !isMobile ? 16 : 13 }}
                                        id={ `course_${ i }` }
                                        cursor={ e.representative ? "pointer" : "default" }
                                    >
                                        { `${ i + 1 }강` }
                                    </Title>
                                </Button>
                            </Div>
                        </Div>

                        <Div flex={ !isMobile ? "row" : "row_end" } cursor={ e.representative ? "pointer" : "default" }>
                            
                            {/* 이름 */}
                            <Div flex="row" id={ `course_${ i }` } cursor={ e.representative ? "pointer" : "default" }>
                                <Title
                                    id={ `course_${ i }` }
                                    color="grey4" 
                                    weight="400" 
                                    style={{ fontSize: !isMobile ? 17 : 11 }} 
                                    justify="flex-start" 
                                    cursor={ e.representative ? "pointer" : "default" }
                                >
                                    { e.name }
                                </Title>
                            </Div>
                            {/* 강의 : 대표강의 표시 */}
                            {
                                e.representative &&
                                <Div flex="row" minWidth="72px" width="72px" marginLeft={ !isMobile ? null : "40px" } id={ `course_${ i }` } cursor="pointer">
                                    <Div width="19px" height="19px" marginRight="5px" id={ `course_${ i }` }>
                                        <Button>
                                            <Img src={eye} id={ `course_${ i }` }/>
                                        </Button>
                                    </Div>
                                    <Div width="fit-content" id={ `course_${ i }` }>
                                        <Button 
                                            weight="500" 
                                            color="orange" 
                                            style={{ fontSize: 13 }} 
                                            id={ `course_${ i }` }
                                        >
                                            대표강의
                                        </Button>
                                    </Div>
                                </Div>
                            }
                        </Div>
                    </Div>
                )
            }
        </Div>
    )
}

export default React.memo( LectureList )