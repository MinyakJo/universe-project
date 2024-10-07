import React, { useState } from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import commonDiv from "components/common/Div"
import commonButton from "components/common/Button"
import flag from "../../../svg/flag.svg"
import CourseStructureTitle from "../../component/passes_page/CourseStructureTitle"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { dialogState } from "../../../recoil/dialogAtom"
import { isMobileState } from "recoil/mainAtom"
import { useQuery } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import { useParams } from "react-router-dom"
import RowsInfo from "components/component/passes_page/RowsInfo"
import ColumnInfo from "components/component/passes_page/ColumnInfo"
import TableContents from "components/component/passes_page/TableContents"
import Icon from "components/common/Icon"
import { useEffect } from "react"

const Div = styled(commonDiv)`
    position: ${props => {
        return props.position ? props.position : null
    }};

    border-bottom: ${props => {
        return props.borderBottom ? `3px solid ${CommonStyle.setColor("orange")}` : null
    }};

    padding: ${props => {
        return props.padding ? props.padding : null
    }};

    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : null
    }};
`

const Button = styled(commonButton)`
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: ${props => {
        return props.lineHeight ? props.lineHeight : null
    }};
    padding: ${({ padding }) => {
        return padding ? padding : null
    }};

    background-color: ${CommonStyle.setColor("none")};
`

const Line = styled.div`
    visibility: ${props => {
        return props.visibility ? props.visibility : null
    }};
    width: 100%;
    height: 3px;
    margin-top: ${props => {
        return props.marginTop ? props.marginTop : null
    }};
    background-color: ${CommonStyle.setColor("orange")};
`

const Cell = styled(commonDiv)`
    position: relative;
    padding: 17px 25px;

    height: ${props => {
        return props.height ? props.height : "150px"
    }};
    border-right: ${props => {
        return props.borderRight ? `1px solid ${ CommonStyle.setColor(props.borderRight) }` : null
    }};

    p{
        width: 100%;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
    }
`
const CellIcon = styled(Icon)`
    position: absolute;
    bottom: 15px;
    right: 15px;
`

export { Cell, CellIcon }

const CourseCurriculum = () => {

    const { id } = useParams()
    const [ grade, setGrade ] = useState( null )
    const [ gradeList, setGradeList ] = useState([])

    const setDialog = useSetRecoilState( dialogState )
    const isMobile = useRecoilValue(isMobileState)

    const { data } = useQuery(
        [ "courseCurriculumFetchData" ],
        async () => await fetch("GET", `/home/pass/${ id }/curriculum`),
        { refetchOnWindowFocus: false }
    )

    const onClickEvent = (e) => {
        const basic = e.target.id
        const type = basic.split("_")[ 0 ]
        
        switch( type ){
            case "tag":
                const curriculumId = basic.split("_")[ 1 ]

                setGrade( Number( curriculumId ) )
                break
            case "videoOpen":
                const curriculumIndex = basic.split("_")[ 1 ]
                const firstIndex = basic.split("_")[ 2 ]
                const secondIndex = basic.split("_")[ 3 ]
                const src = data?.data?.curriculumArray[ curriculumIndex ]?.curriculumTable?.cell[ firstIndex ][ secondIndex ]?.video
                
                if( src ){
                    setDialog({
                        isOpen: true,
                        textType: "video",
                        data: { src: src }
                    })
                }
                break
            default:
        }
    }

    useEffect(() => {
        if( data?.data ){
            const list = []

            for( let i of data.data.curriculumArray ){
                list.push({ name: i.curriculumName, id: i.id })
            }
            
            setGrade( list[ 0 ].id )
            setGradeList( list )
        }
    }, [ data, setGradeList ])

    return(
        <Div flex="column_top" marginTop="50px" marginBottom="80px" onClick={onClickEvent} width={ !isMobile ? null : "1180px" }>

            {/* 강좌구성 타이틀 */}
            <CourseStructureTitle>
                {{
                    img: flag,
                    title: "커리큘럼",
                    color: !isMobile ? null : "black"
                }}
            </CourseStructureTitle>

            {/* 학년 선택 */}
            
            <Div flex="row" marginTop="34px">
                {
                    gradeList && gradeList.map((e, i) =>
                        <Div key={ `curriculum_tag_${ i }` } width="fit-content" marginRight={ !isMobile ? "24px" : "12px" }>
                            <Button id={ `tag_${ e?.id ? e.id : null }` } weigth="600" size={ !isMobile ? "medium" : "small_large" } lineHeight="32px" color={ grade === e.id ? "orange" : "grey4" } padding={ !isMobile ? "0px 8px" : "0px 4px" }>
                                { e?.name && e.name }
                            </Button>
                            <Line visibility={ grade === e.id ? "visible" : "hidden" } marginTop={ !isMobile ? "11px" : "9px" } />
                        </Div>
                    )
                }
            </Div>

            {/* 커리큘럼 표 */}
            {
                data?.data?.curriculumArray && data.data.curriculumArray.map(( e, i ) =>
                    <React.Fragment key={ `curriculum_${ i }` }>
                        {
                            e.id === grade &&
                            <Div flex="row" marginTop={ !isMobile ? "30px" : "15px" }>
                                {/* 행에 대한 정보 */}
                                <RowsInfo>
                                    { e.curriculumTable }
                                </RowsInfo>

                                {/* 표 */}
                                <Div flex="column_top" width="80%" height="100%">

                                    {/* 열에 대한 정보 */}
                                    <ColumnInfo>
                                        { e.curriculumTable }
                                    </ColumnInfo>

                                    {/* 내용 */}
                                    <TableContents index={ i }>
                                        { e.curriculumTable }
                                    </TableContents>
                                </Div>
                            </Div>
                        }
                    </React.Fragment>
                )
            }
        </Div>
    )
}

export default CourseCurriculum