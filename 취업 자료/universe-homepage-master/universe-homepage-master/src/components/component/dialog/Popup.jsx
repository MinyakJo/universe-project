import React, { Suspense, useEffect, useState } from "react"
import { Div, Img, Button, CloseButton } from "components/container/Dialog"
import check from "../../../svg/check.svg"
import Spinner from "../Spinner"
import { useNavigate } from "react-router-dom"

const Popup = (props) => {

    const data = props.children

    const [ radio, setRadio ] = useState( 0 )
    const [ popupList, setPopupList ] = useState([])
    const isMobile = props.isMobile
    const navigate = useNavigate()
    const [ cnt, setCnt ] = useState( 0 )
    const reset = props.reset

    useEffect(() => {
        const list = []

        if( data?.length ){
            for(let i = 0; i < data.length; i++){
                if( data.open[ i ] ) list.push( data.data[ i ] )
            }

            if( list.length === 0 ) reset()
            else setPopupList( list )
        }else reset()
    }, [ data, reset ])

    const onClickEvent = async(e) => {
        const id = e.target.id

        if(( id === "1" ) || ( id === "2" )) {
            if( Number( id ) === radio ) setRadio( 0 )
            else setRadio( Number( id ) )
        }else if(id === "close"){
            const getDate = new Date()
            
            if( radio === 1 ){
                getDate.setDate(getDate.getDate() + 1)
                localStorage.setItem(`popup_${ data.data[ cnt ].id }`, getDate)
            }else if( radio === 2 ){
                getDate.setDate(getDate.getDate() + 7)
                localStorage.setItem(`popup_${ data.data[ cnt ].id }`, getDate)
            }

            if(( cnt + 1 ) < popupList.length){
                setCnt(cnt + 1)
            }else{
                reset()
            }
        }else if(id){
            window.open( id.includes("https://") ? id : `https://${ id }`, "_blank")
            reset()
        }
    }

    return (
        <Div position="relative" flex="column" maxWidth="600px" backgroundColor="white" radius="10px 10px 0px 0px" onClick={onClickEvent}>
            <CloseButton/>
                <Div flex="row">
                    {
                        popupList.length > 0 &&
                        <Img 
                            src={ 
                                !isMobile ? 
                                `${ process.env.REACT_APP_API_URL }${ popupList[ cnt ].pcImage }` : 
                                `${ process.env.REACT_APP_API_URL }${ popupList[ cnt ].mobileImage }`
                            } 
                            id={ popupList[ cnt ].url }
                            cursor="pointer"
                        />
                    }
                </Div>
            <Div flex={ !isMobile ? "row" : "row_between" } padding="18px 25px" backgroundColor="black">
                <Div flex="row" width="fit-content" marginRight={ !isMobile ? "24px" : null }>
                    <Div 
                        width="22px" 
                        minWidth="22px" 
                        height="22px" 
                        backgroundColor={ radio === 1 ? "orange" : null } 
                        radius="50%" 
                        borderColor={ radio === 1 ? "none" : "white" } 
                        padding="2px" 
                        marginRight="6px" 
                        id="1"
                    >
                        <Button flex="row_center" id="1">
                            {
                                radio === 1 &&
                                <Img src={check} id="1"/>
                            }
                        </Button>
                    </Div>
                    <Div>
                        <Button color="white" weight="400" lineHeight="140%" id="1" style={{ fontSize: !isMobile ? 16 : 13 }}>
                            오늘 하루 열지 않기
                        </Button>
                    </Div>
                </Div>
                <Div flex="row" width="fit-content">
                    <Div 
                        width="22px" 
                        minWidth="22px" 
                        height="22px" 
                        backgroundColor={ radio === 2 ? "orange" : null } 
                        radius="50%" 
                        borderColor={ radio === 2 ? "none" : "white" } 
                        padding="2px" 
                        marginRight="6px" 
                        id="2"
                    >
                        <Button flex="row_center" id="2">
                            {
                                radio === 2 &&
                                <Img src={ check } id="2"/>
                            }
                        </Button>
                    </Div>
                    <Div>
                        <Button color="white" weight="400" lineHeight="140%" id="2" style={{ fontSize: !isMobile ? 16 : 13 }}>
                            일주일간 열지 않기
                        </Button>
                    </Div>
                </Div>
            </Div>
        </Div>
    )
}

export default Popup