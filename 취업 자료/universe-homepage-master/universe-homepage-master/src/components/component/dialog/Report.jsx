import React, { useState } from "react"
import P from "components/common/P"
import { Div, CloseButton, TextArea, TextAreaBox, Button } from "components/container/Dialog"
import { useMutation } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { dialogState } from "recoil/dialogAtom"
import { useCookies } from "react-cookie"
import { userDataState } from "recoil/createAccountAtom"
import { dateFormat } from "modules/dateFormat"
import { errorAlert } from "modules/errorAlert"

const Report = ( props ) => {

    const [ cookie ] = useCookies([ "token" ])

    const [ text, setText ] = useState("")

    const date = new Date()
    const dateText = dateFormat( new Date(), "-" )

    const reset = props.reset

    const isMobile = props.isMobile

    const userData = useRecoilValue(userDataState)
    const setDialog = useSetRecoilState(dialogState)

    const mutation = useMutation(async data => await fetch("POST", "/review/report", data, { "Authorization": cookie.token }),
        {
            onSuccess: () => {
                setDialog({
                    isOpen: true,
                    textType: "alert",
                    btnType: 1,
                    data: { message: "신고가 완료 되었습니다." }
                })
            },
            onError: error => {
                errorAlert( setDialog, error )
            }
        }
    )

    const onChangeEvent = (e) => {
        setText(e.target.value)
    }

    const onClickEvent = (e) => {
        const id = e.target.id
        
        switch(id){
            case "close":
                reset()
                return
            case "submit":
                if( text ){
                    mutation.mutate({
                        contents: text,
                        userId: userData?.studentId,
                        reviewId: props.children?.id
                    })
                }else {
                    setDialog({
                        isOpen: true,
                        textType: "alert",
                        btnType: 1,
                        data: { message: "내용을 입력해 주세요." }
                    })
                }
                return
            default:
        }
    }

    return(
        <Div 
            position="relative" 
            flex="column_center" 
            maxWidth="780px" 
            padding={ !isMobile ? "54px 40px" : "34px 20px" } 
            paddingBottom={ !isMobile ? "56px" : "37px" } 
            zIndex="9" 
            backgroundColor="white" 
            radius="10px" 
            onClick={onClickEvent}
        >
            <CloseButton/>
            <Div flex="row" width="fit-content" marginBottom={ !isMobile ? "12px" : "31px" }>
                <P color="bk" weight="500" family="esamanru" lineHeight={ !isMobile ? "35px" : "24px" } style={{ fontSize: !isMobile ? 30 : 21 }}>
                    신고하기
                </P>
            </Div>
            {
                !isMobile &&
                <Div flex="row_end" marginBottom="14px">
                    {
                        date &&
                        <P color="grey4" weight="400" size="small" lineHeight="22px">
                            { dateText }
                        </P>
                    }
                </Div>
            }
            <Div height={ !isMobile ? "273px" : "243px" } marginBottom={ !isMobile ? "40px" : "20px" }>
                <TextAreaBox border="grey" radius="10px" paddingRight="6px">
                    <TextArea 
                        placeholder="신고 사유를 작성해 주세요." 
                        padding={ !isMobile ? "23px 9px" : "12px" } 
                        radius="10px" 
                        size={ !isMobile ? "small_medium" : "extra_small" }
                        placeColor="grey2" 
                        border="none" 
                        outline="none" 
                        onChange={onChangeEvent}
                    />
                </TextAreaBox>
            </Div>
            <Div maxWidth={ !isMobile ? "262px" : null } height={ !isMobile ? "50px" : "45px" }>
                <Button color="white" backgroundColor="orange" radius="4px" weight="500" size="small_medium" id="submit">
                    제출하기
                </Button>
            </Div>
        </Div>
    )
}

export default Report