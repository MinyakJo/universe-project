import React, { useState } from "react"
import { Div, CloseButton, Button, ButtonComponent, Title, StyledDialog, GuideBox, Guide } from "components/container/Dialog"
import DropdownBox from "../DropdownBox"
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"
import { dialogState, gradeDialogState } from "recoil/dialogAtom"
import { useMutation } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import { useCookies } from "react-cookie"
import { userDataState } from "recoil/createAccountAtom"
import { useEffect } from "react"
import { userInfoChangeAlert } from "modules/userInfoChangeAlert"
import { dateFormat } from "modules/dateFormat"
import { errorAlert } from "modules/errorAlert"

const Grade = (props) => {

    const bt = props.children.bt
    const reset = props.reset
    const [ grade, setGrade ] = useState("0")
    const [ dateList, setDateList ] = useState([])
    const [ SATList, setSATList ] = useState([])
    const [ subtitle, setSubTitle ] = useState([ "3월 모의고사", "6월 모의고사", "9월 모의고사", "12월 모의고사" ])

    const [ gradeState, setGradeState ] = useRecoilState(gradeDialogState)
    const gradeReset = useResetRecoilState( gradeDialogState )
    const setUserData = useSetRecoilState( userDataState )

    const title = [ "고1", "고2", "고3" ]
    const isMobile = props.isMobile

    const [ cookies ] = useCookies([ "token" ])
    const setDialog = useSetRecoilState( dialogState )
    const userData = useRecoilValue( userDataState )

    const mutation = useMutation(
        async data => await fetch("PUT", "/student/myinfo", data, { Authorization: cookies.token }),
        {
            onSuccess: ({ data }) => {
                setUserData({
                    ...data.studentData,
                    birthday: dateFormat( new Date( data.studentData.birthday ), "-" )
                })
                userInfoChangeAlert( setDialog, "등급" )   
            },
            onError: error => {
                errorAlert( setDialog, error )
            }
        }
    )

    useEffect(() => {
        if( userData.grade ){
            const gradeData = userData.grade

            const firstYearList = []
            const firstGradeList = []

            const secondYearList = []
            const secondGradeList = []

            const thirdYearList = []
            const thirdGradeList = []
            
            for(let i of Object.keys(gradeData.first)){
                firstYearList.push( gradeData.first[ i ].year )
                firstGradeList.push( gradeData.first[ i ].grade )
            }
            for(let i of Object.keys(gradeData.second)){
                secondYearList.push( gradeData.second[ i ].year )
                secondGradeList.push( gradeData.second[ i ].grade )
            }
            for(let i of Object.keys(gradeData.third)){
                thirdYearList.push( gradeData.third[ i ].year )
                thirdGradeList.push( gradeData.third[ i ].grade )
            }

            setGradeState({
                grade1:{
                    year: firstYearList,
                    grade: firstGradeList
                },
                grade2: {
                    year: secondYearList,
                    grade: secondGradeList
                },
                grade3: {
                    year: thirdYearList,
                    grade: thirdGradeList
                }
            })
        }
    }, [ userData.grade, setGradeState ])

    useEffect(() => {
        const date = new Date()
        const year = date.getFullYear()

        const dList = []
        const sList = []
    
        for(let i = 0; i < year - 1989; i++){
            dList.push({ name : year - i, id: "date" })
        }
        for(let i = 0; i < 9; i++){
            sList.push({ name : i + 1, id: "grade" })
        }

        setDateList( dList )
        setSATList( sList )
    }, [])

    useEffect(() => {
        if( grade === "2" ) setSubTitle([ "3월 모의고사", "6월 모의고사", "9월 모의고사", "수능" ])
    }, [ grade ])

    const onClickEvent = (e) => {
        const id = e.target.id

        switch(id){
            case "close":
                reset()
                gradeReset()
                break
            case "0":
            case "1":
            case "2":
                setGrade(id)
                break
            case "gradeSubmit":
                const firstData = []
                const secondData = []
                const thirdData = []

                for(let i = 0; i < gradeState.grade1.year.length; i++){
                    firstData.push({
                        year: Number( gradeState.grade1.year[ i ] ),
                        grade: Number( gradeState.grade1.grade[ i ] )
                    })
                }
                for(let i = 0; i < gradeState.grade2.year.length; i++){
                    secondData.push({
                        year: Number( gradeState.grade2.year[ i ] ),
                        grade: Number( gradeState.grade2.grade[ i ] )
                    })
                }
                for(let i = 0; i < gradeState.grade3.year.length; i++){
                    thirdData.push({
                        year: Number( gradeState.grade3.year[ i ] ),
                        grade: Number( gradeState.grade3.grade[ i ] )
                    })
                }

                mutation.mutate({
                    grade: {
                        first: {
                            march: firstData[ 0 ],
                            june: firstData[ 1 ],
                            september: firstData[ 2 ],
                            november: firstData[ 3 ]
                        },
                        second: {
                            march: secondData[ 0 ],
                            june: secondData[ 1 ],
                            september: secondData[ 2 ],
                            november: secondData[ 3 ]
                        },
                        third: {
                            march: thirdData[ 0 ],
                            june: thirdData[ 1 ],
                            september: thirdData[ 2 ],
                            november: thirdData[ 3 ]
                        },
                    }
                })
                break
            default:
        }
    }

    return(
        <Div position="relative" maxWidth="500px" backgroundColor="white" radius="20px" onClick={ onClickEvent }>
            <CloseButton/>
            <StyledDialog isMobile={ isMobile }>
                <Div flex="row_center" marginBottom={ !isMobile ? "22px" : "24px" }>
                    <Title isMobile={ isMobile }>
                        나의 등급 입력하기
                    </Title>
                </Div>
                <Div flex="row">
                    {
                        title && title.map((e, i) =>
                            <Div key={ `grade_title_${ i }` } position="relative" paddingBottom={ !isMobile ? "16px" : "12px" } borderBottom={ Number(grade) === i ? null : "grey1" }>
                                <Button color={ Number( grade ) === i ? "orange" : "grey4" } size="small_large" lineHeight="26px" weight="500" id={ i }>
                                    { e }
                                </Button>
                                <Div display={  Number( grade ) === i ? "block" : "none" } position="absolute" bottom="0" height="3px" backgroundColor="orange"/>
                            </Div>
                        )
                    }
                </Div>
                {
                    subtitle && subtitle.map((e, i) =>
                        <Div flex="column" key={i} marginTop="22px">
                            <GuideBox>
                                <Guide isMobile={ isMobile }>
                                    { e }
                                </Guide>
                            </GuideBox>
                            <Div flex="row_between">
                                <DropdownBox 
                                    width={ !isMobile ? "200px" : "calc(50% - 4px)" } 
                                    defaultValue={
                                        grade === "0" ?
                                        gradeState.grade1.year[i] ? gradeState.grade1.year[i] : "년도 선택":
                                        grade === "1" ?
                                        gradeState.grade2.year[i] ? gradeState.grade2.year[i] : "년도 선택":
                                        gradeState.grade3.year[i] ? gradeState.grade3.year[i] : "년도 선택"
                                    } 
                                    border="gray3"
                                    color="grey4"
                                    radius="4px" 
                                    padding={ !isMobile ? "14px 20px" : "15px 20px" }
                                    paddingRight={ !isMobile ? "40px" : "33px" }
                                    size={ !isMobile ? "small_large" : "extra_small" } 
                                    lineHeight="130%" 
                                    weight="500"
                                    iconMargin={ !isMobile ? "20px" : "10px" }
                                    index={ i }
                                    grade={ grade }
                                >
                                    { dateList }
                                </DropdownBox>
                                <DropdownBox 
                                    width={ !isMobile ? "200px" : "calc(50% - 4px)" } 
                                    defaultValue={
                                        grade === "0" ?
                                        gradeState.grade1.grade[i] ? gradeState.grade1.grade[i] : "등급 선택":
                                        grade === "1" ?
                                        gradeState.grade2.grade[i] ? gradeState.grade2.grade[i] : "등급 선택":
                                        gradeState.grade3.grade[i] ? gradeState.grade3.grade[i] : "등급 선택"
                                    }
                                    border="grey3"
                                    color="grey4"
                                    radius="4px" 
                                    padding={ !isMobile ? "14px 20px" : "15px 20px" } 
                                    paddingRight={ !isMobile ? "40px" : "33px" }
                                    size={ !isMobile ? "small_large" : "extra_small" } 
                                    lineHeight="130%" 
                                    weight="500" 
                                    iconMargin={ !isMobile ? "20px" : "10px" }
                                    index={ i }
                                    grade={ grade }
                                >
                                    { SATList }
                                </DropdownBox>
                            </Div>
                        </Div>
                    )
                }
            </StyledDialog>
            <ButtonComponent>
                {{
                    id: "gradeSubmit", 
                    type: bt,
                }}
            </ButtonComponent>
        </Div>
    )
}

export default Grade