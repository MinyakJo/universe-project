import React, { useRef, useState } from "react"
import TopBar from "../container/TopBar"
import Footer from "../container/footer/Footer"
import { Main } from "./MainPage"
import commonDiv from "components/common/Div"
import styled from "styled-components"
import H1 from "components/common/H1"
import commonH2 from "components/common/H2"
import P from "components/common/P"
import Button from "components/common/Button"
import CommonStyle from "components/style"
import { Input, TextArea, TitleBox } from "components/container/Dialog"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil" 
import { dialogState } from "recoil/dialogAtom"
import { isMobileState } from "recoil/mainAtom"
import FileUploadButton from "components/component/customer_center_page/FileUploadButton"
import { useMutation } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import { useCookies } from "react-cookie"

const Div = styled(commonDiv)`
    max-width: 500px;
`

const Contents = styled(P)`
    white-space: pre-line;
    word-break: break-all;
    text-align: center;
`

const Accent = styled.span`
    color: ${CommonStyle.setColor("orange")};
`

const H2 = styled(commonH2)`
    color: ${CommonStyle.setColor("bk")};
    font-weight: 600;
    font-size: ${CommonStyle.setFontSize("small_medium")};
    line-height: 130%;
`

const ReportServicePage = () => {

    //ref
    const ref = useRef( null )

    //cookie
    const [ cookies ] = useCookies([ "token" ])

    //state
    const [ file, setFile ] = useState(null)
    const [ title, setTitle ] = useState("")
    const [ tel, setTel ] = useState("")
    const [ contents, setContents ] = useState("")

    //recoil
    const setDialog = useSetRecoilState( dialogState )
    const isMobile = useRecoilValue( isMobileState )

    const imgMutation = useMutation(
        async data => await fetch("POST", "/upload/report/attached", data, { "Content-Type": "multipart/form-data", Authorization: cookies.token }),
        {
            onSuccess: ({ data }) => {
                mutation.mutate({
                    title: title,
                    contents: contents,
                    phone: tel,
                    attached: data.filename,
                })
            },
            onError: err => {
                setDialog({
                    isOpen: true,
                    btnType: 1,
                    textType: "alert",
                    data: { message: err.message }
                })

                return false
            }
        }
    )

    const mutation = useMutation(
        async data => await fetch("POST", "/report", data, { Authorization: cookies.token }),
        {
            onSuccess: () => {
                setDialog({
                    isOpen: true,
                    btnType: 1,
                    textType: "alert",
                    data: { message: "제보 되었습니다.", navigate: "back" }
                })
            },
            onError: err => {
                setDialog({
                    isOpen: true,
                    btnType: 1,
                    textType: "alert",
                    data: { message: err.message }
                })
            }
        }
    )

    const onClickEvent = async(e) => {
        const id = e.target.id

        switch(id){
            case "file":
                ref.current.click()
                break
            case "submit":
                if( title !== "" && contents !== "" ) {
                    if( file !== null ){
                        imgMutation.mutate({
                            attached: file
                        })
                        return
                    }
                    
                    mutation.mutate({
                        title: title,
                        contents: contents,
                        phone: tel,
                        attached: file,
                    })
                }else {
                    setDialog({
                        isOpen: true,
                        btnType: 1,
                        textType: "alert",
                        data: { message: "제목과 내용을 입력해 주세요." }
                    })
                }
                return
            default:
        }
    }

    const onChangeEvent = (e) => {
        const value = e.target.value
        const id = e.target.id
        
        switch(id){
            case "title":
                setTitle(value)
                break
            case "contents":
                setContents(value)
                break
            case "tel":
                if( !isNaN( Number( value.replace(/-/g, "") ) ) ) {
                    setTel(
                        value
                        .replace(/[^0-9]/g, '')
                        .replace(/^(\d{3})(\d{4})(\d{4})$/, `$1-$2-$3`)
                    )
                }
                break
            case "file":
                if( e.target.files[ 0 ].size < 1024 ** 2 * 10 ){
                    if(e.target.files[0]) setFile(e.target.files[ 0 ])
                    else setFile(null)
                }else{
                    setDialog({
                        isOpen: true,
                        textType: "alert",
                        btnType: 1,
                        data: { message: "파일 용량이 10MB를 초과 했습니다." }
                    })
                    setFile(null)
                }
                break
            default:
        }
    }

    return(
        <>
            {/* 상단바 */}
            <TopBar menu="orange"/>
            <Main>
                <Div flex="column_center" padding={ !isMobile ? "86px 0px" : "105px 20px" } paddingBottom="100px" onClick={onClickEvent}>
                    <Div flex="row_center" marginBottom={ !isMobile ? "27px" : "20px" }>
                        <H1 color="black" size={ !isMobile ? "large" : "large_small" } weight="500" family="esamanru" lineHeight="44px">
                            제보하기
                        </H1>
                    </Div>
                    <Div flex="row_center" padding={ !isMobile ? "23px 24px" : "20px 7px" } backgroundColor="gray1" marginBottom={ !isMobile ? "28px" : "20px" }>
                        <Contents style={{ fontSize: !isMobile ? 16 : 13 }} lineHeight="170%" weight="400">
                            {"구체적으로 학원 과외에서 불법으로 학생용 솔루션으로 영리 목적으로 수업을 하는 것을 금지하며 이것에 대해 제보합니다.\n이미지와 동영상 첨부 후 해당 내용의 적절함이 결정되면\n"}
                            <Accent>{"제보자에게는 100만원의 포상금이 제공됩니다."}</Accent>
                        </Contents>
                    </Div>
                    <Div flex="column" marginBottom="20px">
                        <Div marginBottom="12px">
                            <H2>
                                제목<Accent>*</Accent>
                            </H2>
                        </Div>
                        <Div>
                            <Input 
                                id="title" 
                                placeholder="제목을 입력해 주세요." 
                                padding={ !isMobile ? null : "14px" } 
                                size={ !isMobile ? null : "extra_small" }
                                onChange={ onChangeEvent }
                                autoComplete="off"
                            />
                        </Div>
                    </Div>
                    <Div flex="column" marginBottom="20px">
                        <Div marginBottom="12px">
                            <H2>
                                휴대폰 번호
                            </H2>
                        </Div>
                        <Div>
                            <Input 
                                id="tel" 
                                placeholder="휴대폰번호를 입력해 주세요." 
                                padding={ !isMobile ? null : "14px" } 
                                size={ !isMobile ? null : "extra_small" } 
                                onChange={ onChangeEvent }
                                value={ tel }
                                autoComplete="off"
                            />
                        </Div>
                    </Div>
                    <Div flex="column" marginBottom="20px">
                        <Div marginBottom="12px">
                            <H2>
                                내용<Accent>*</Accent>
                            </H2>
                        </Div>
                        <Div height={ !isMobile ? "223px" : "320px" }>
                            <TextArea 
                                id="contents"
                                size={ !isMobile ? "small_medium" : "extra_small" } 
                                padding={ !isMobile ? "15px 20px" : "16px 14px" } 
                                placeholder="내용을 입력해 주세요." 
                                onChange={ onChangeEvent }
                                autoComplete="off"
                            />
                        </Div>
                    </Div>
                    <FileUploadButton parentRef={ ref } onChange={ onChangeEvent } file={ file }/>
                    <Div height={ !isMobile ? "50px" : "45px" } marginTop={ !isMobile ? "30px" : "10px" } backgroundColor="orange" radius="4px">
                        <Button size="small_medium" weight="500" color="white" id="submit">
                            제출하기
                        </Button>
                    </Div>
                </Div>
            </Main>
            <Footer/>
        </>
    )
}

export default ReportServicePage