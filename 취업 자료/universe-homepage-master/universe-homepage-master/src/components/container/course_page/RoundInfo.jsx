import React from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import commonDiv from "components/common/Div"
import commonButton from "components/common/Button"
import commonP from "components/common/P"
import document from "../../../svg/document.svg"
import { useRecoilValue, useSetRecoilState } from "recoil"
import CourseStructureTitle from "../../component/passes_page/CourseStructureTitle"
import play from "../../../svg/white_line_play_button.svg"
import { dialogState } from "../../../recoil/dialogAtom"
import { isMobileState } from "recoil/mainAtom"
import { roundInfoState } from "recoil/coursesAtom"
import LectureList from "components/component/course_page/LectureList"

const Div = styled(commonDiv)`
    border-bottom: ${props => {
        return props.borderBottom ? `1px solid ${CommonStyle.setColor(props.borderBottom)}` : null
    }};

    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};
`

const P = styled(commonP)`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`

const Img = styled.img`
    width: 100%;
    object-fit: contain;
`

const Button = styled(commonButton)`
    display: flex;
    justify-content: ${props => {
        return props.justify ? props.justify : "center"
    }};
    align-items: center;
`

const RoundInfo = () => {

    const setDialog = useSetRecoilState( dialogState )
    const isMobile = useRecoilValue( isMobileState )

    const roundInfo = useRecoilValue( roundInfoState )

    const onClickEvent = ( e ) => {
        const id = e.target.id.split("_")[ 0 ]
        
        switch( id ){
            case "ot":
                setDialog({
                    isOpen: true,
                    textType: "video",
                    data: { src: roundInfo.ot.video }
                })
                break
            case "course":
                const data = roundInfo.roundInfo[ Number( e.target.id.split("_")[ 1 ] ) ]

                if( data.src ){
                    setDialog({
                        isOpen: true,
                        textType: "video",
                        data: data
                    })
                }
                break
            default:
        }
    }

    return(
        <Div flex="column_top" marginTop="50px" marginBottom="60px" onClick={ onClickEvent }>
            {/* OT 영상 */}
            <Div flex="column">
                <CourseStructureTitle>
                    {{
                        title: "OT 영상",
                        color: "black"
                    }}
                </CourseStructureTitle>
                <Div flex="row_between" marginBottom={ !isMobile ? "60px" : "37px" }>
                    <Div flex="row" width={ !isMobile ? "calc(100% - 90px)" : "calc(100% - 83px)" } height="40px" paddingRight="30px">
                        <P weight="400" color="grey5" style={{ fontSize: !isMobile ? 17 : 13 }}>
                            { roundInfo.ot.name }
                        </P>
                    </Div>
                    <Div flex="row" width={ !isMobile ? "90px" : "83px" } minWidth={ !isMobile ? "90px" : "83px" } height={ !isMobile ? "32px" : "28px" }>
                        <Button color="white" weight="400" style={{ fontSize: !isMobile ? 13 : 12 }} radius="4px" backgroundColor="bk" id="ot">
                            <Div flex="row" width={ !isMobile ? "14px" : "12px" } height={ !isMobile ? "14px" : "12px" } marginRight="4px">
                                <Img src={ play } id="ot"/>
                            </Div>
                            OT영상
                        </Button>
                    </Div>
                </Div>
            </Div>

            {/* 회차 정보 */}
            <CourseStructureTitle>
                {{
                    img: document,
                    title: "회차 정보",
                    color: "black"
                }}
            </CourseStructureTitle>
            
            <LectureList>
                { roundInfo.roundInfo }
            </LectureList>
        </Div>
    )
}

export default RoundInfo