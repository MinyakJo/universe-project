import React from "react"
import styled from "styled-components"
import Button from "components/common/Button"
import commonDiv from "components/common/Div"
import { Div } from "components/page/EventDetailPage"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import CommonStyle from "components/style"


const ButtonDiv = styled(commonDiv)`
    cursor: pointer;
`

const ButtonBox = (props) => {

    const isMobile = useRecoilValue(isMobileState)
    const data = props.children
    const navigate = useNavigate()

    const onClickEvent = e => {
        const basic = e.target.id
        const type = basic.split("_")[ 0 ]

        switch( type ){
            case "event":
            case "recruit":
                const id = basic.split("_")[ 1 ]

                if(props.event) {
                    if( !isNaN( Number( id ) ) ) navigate(`/events/${id}`)
                }
                else if( props.recruit ) {
                    if( !isNaN( Number( id ) ) ) navigate(`/recruitings/${id}`)
                }
                break
            case "list":
                if( props.event ) navigate("/events")
                else if( props.recruit ) navigate("/recruitings")
                break
            default:
        }
    }

    return(
        <Div flex="row_between" onClick={ onClickEvent } paddingTop="21px" style={{ borderTop: `1px solid ${CommonStyle.setColor("gray3")}`}}>
            <Div flex="row" width="fit-content">
                <ButtonDiv 
                    id={ props.event ? `event_${ data?.prevId }` : props.recruit ? `recruit_${ data.prevId }` : null }
                    padding={ !isMobile ? "10px 14px" : "7px 14px" } 
                    borderColor="gray3" 
                    radius="4px" 
                    marginRight={ !isMobile ? "22px" : "8px" }
                >
                    <Button 
                        id={ props.event ? `event_${ data?.prevId }` : props.recruit ? `recruit_${ data.prevId }` : null }
                        radius="4px"
                        weight="500" 
                        family="pretendard" 
                        lineHeight="18px" 
                        style={{ 
                            color: "#4D4444",
                            fontSize: !isMobile ? 18 : 13 
                        }}
                    >
                        이전글
                    </Button>
                </ButtonDiv>
                <ButtonDiv 
                    id={ props.event ? `event_${ data?.nextId }` : props.recruit ? `recruit_${ data.nextId }` : null }
                    padding={ !isMobile ? "10px 14px" : "7px 14px" } 
                    borderColor="gray3" 
                    radius="4px"
                >
                    <Button
                        id={ props.event ? `event_${ data?.nextId }` : props.recruit ? `recruit_${ data.nextId }` : null } 
                        radius="4px"
                        weight="500" 
                        family="pretendard" 
                        lineHeight="18px" 
                        style={{ 
                            color: "#4D4444",
                            fontSize: !isMobile ? 18 : 13  
                        }}
                    >
                        다음글
                    </Button>
                </ButtonDiv>
            </Div>
            <ButtonDiv 
                width="fit-content" 
                padding={ !isMobile ? "10px 14px" : "7px 14px" }
                borderColor="gray3" 
                radius="4px"
                id="list"
            >
                <Button 
                    radius="4px"
                    weight="500" 
                    family="pretendard" 
                    lineHeight="18px" 
                    style={{ 
                        color: "#4D4444",
                        fontSize: !isMobile ? 18 : 13  
                    }}
                    id="list"
                >
                    목록
                </Button>
            </ButtonDiv>
        </Div>
    )
}

export default ButtonBox