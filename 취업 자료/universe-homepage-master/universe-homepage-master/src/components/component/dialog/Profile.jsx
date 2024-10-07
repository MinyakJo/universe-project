import React, { useState, useRef } from "react"
import { Div, Img, CloseButton, Input, Button, ButtonComponent, Title, StyledDialog, Guide, GuideBox, GuideAndInputBox } from "components/container/Dialog"
import default_profile from "../../../svg/default_profile.svg"
import camera from "../../../svg/camera.svg"
import imgCompression from "browser-image-compression"
import { useMutation } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import { useEffect } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { userDataState } from "recoil/createAccountAtom"
import { useCookies } from "react-cookie"
import { dialogState } from "recoil/dialogAtom"
import { userInfoChangeAlert } from "modules/userInfoChangeAlert"
import { dateFormat } from "modules/dateFormat"
import InputAlert from "../InputAlert"
import { errorAlert } from "modules/errorAlert"

const Profile = (props) => {

    const data = props.children.data
    const bt = props.children.bt
    const reset = props.reset
    const isMobile = props.isMobile
    const nameReg =  /^[가-힣]{2,8}$/

    const ref = useRef(null)

    const [ file, setFile ] = useState( null )
    const [ name, setName ] = useState( "" )
    const [ nameAlert, setNameAlert ] = useState( null )
    const [ preview, setPreview ] = useState( null )

    const [ cookies ] = useCookies([ "token" ])
    const [ userData, setUserData ] = useRecoilState(userDataState)
    const setDialog = useSetRecoilState( dialogState )

    const mutation = useMutation(async data => await fetch("PUT", "/student/myinfo", data, { Authorization: cookies.token }),
    {
        onSuccess: ({ data }) => {
            console.log(data)
            setUserData({
                ...data.studentData,
                birthday: dateFormat( new Date( data.studentData.birthday ), "-" )
            })
            userInfoChangeAlert( setDialog, "프로필" )   
        },
        onError: error => {
            errorAlert( setDialog, error )
        }
    })

    const imgMutation = useMutation(
        async data => await fetch("POST", "/upload/user/profile", data, { "Content-Type": "multipart/form-data", Authorization: cookies.token }),
        {
            onSuccess: ({ data }) => {
                mutation.mutate({
                    name: name,
                    image: data.filename,
                })
            },
            onError: error => {
                setDialog({
                    isOpen: true,
                    btnType: 1,
                    data: { message: error.message },
                    textType: "alert"
                })

                return false
            }
        }
    )

    useEffect(() => {
        if( userData.name ){
            setName( userData.name )
        }
        if( userData.profileImage ){
            setPreview( `${ process.env.REACT_APP_API_URL }${ userData.profileImage }` )
        }
    }, [ userData.name, userData.profileImage ])

    const onClickEvent = (e) => {
        const id = e.target.id

        switch(id){
            case "close":
                reset()
                return
            case "file":
                ref.current.click()
                return
            case "profile":
                if( !nameAlert ) {
                    if(file !== null){
                        imgMutation.mutate({
                            profile: file
                        })
                        return
                    }
                    mutation.mutate({
                        name: name
                    })
                }
                return
            default:
        }
    }

    const onChangeEvent = async(e) => {
        const id = e.target.id
        const value = e.target.value

        switch(id){
            case "name":
                setName(value)
                if( nameReg.test( value ) ) setNameAlert( false )
                else setNameAlert( true )
                return
            case "file":
                if(e.target.files[0]){
                    setFile(e.target.files[0])

                    const options = { maxSizeMB: 2, maxWidthOrHeight: 97 }
                    const compressedFile = await imgCompression(e.target.files[0], options)
                    const img = await imgCompression.getDataUrlFromFile(compressedFile).then(result => result)
                    setPreview(img)
                }else{
                    setFile(data?.img ? data.img : null)
                }
                return
            default:
                return
        }
    }

    return(
        <Div position="relative" maxWidth="500px" backgroundColor="white" radius="20px" onClick={ onClickEvent }>
            <CloseButton/>
            <StyledDialog isMobile={ isMobile }>
                <Div flex="row_center" marginBottom={ !isMobile ? "21px" : "19px" }>
                    <Title isMobile={ isMobile }>
                        프로필 변경
                    </Title>
                </Div>
                <Div flex="row_center">
                    <Div flex="row_center" position="relative" width={ !isMobile ? "97px" : "83px" } height={ !isMobile ? "97px" : "83px" } maxHeight={ !isMobile ? "97px" : "83px" }>
                        <Div flex="row_center" radius="50%" width={ !isMobile ? "97px" : "83px" } height={ !isMobile ? "97px" : "83px" } maxHeight={ !isMobile ? "97px" : "83px" } overflow="hidden" cursor="pointer">
                            {
                                preview ?
                                <Img src={ preview } id="file" cursor="pointer" fit="cover"/>:
                                <Img src={default_profile} id="file" cursor="pointer"/>
                            }
                        </Div>
                        <Div width={ !isMobile ? "30px" : "25px" } height={ !isMobile ? "30px" : "25px" } position="absolute" right="0" bottom="0">
                            <Button>
                                <Img src={ camera } id="file"/>
                            </Button>
                            <input type="file" id="file" style={{ display: "none" }} ref={ ref } onChange={ onChangeEvent } accept="image/png, image/jpeg, image/webp, image/jpg"/>
                        </Div>
                    </Div>
                </Div>
                <GuideAndInputBox isMobile={ isMobile } end>
                    <GuideBox isMobile={ isMobile }>
                        <Guide isMobile={ isMobile }>
                            이름
                        </Guide>
                    </GuideBox>
                    <Div>
                        <Input 
                            id="name"
                            type="text" 
                            placeholder="ex. 김반복, 홍길동 (8자 이내)" 
                            onChange={ onChangeEvent }
                            value={ name }
                            isMobile={ isMobile }
                            autoComplete="off"
                            maxLength="8"
                        />
                    </Div>
                    {
                        nameAlert &&
                        <InputAlert>
                            한글로 2 ~ 8 이내로 제대로 입력해 주세요.
                        </InputAlert>
                    }
                </GuideAndInputBox>
            </StyledDialog>
            <ButtonComponent>
                {{
                    id: "profile", 
                    type: bt,
                }}
            </ButtonComponent>
        </Div>
    )
}

export default Profile