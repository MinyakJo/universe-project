import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import Div from "components/common/Div"
import Button from "components/common/Button"
import TopBar from "components/container/TopBar"
import { useRecoilState, useRecoilValue } from "recoil"
import { menuIsOpenState, topBarSelectedState } from "recoil/topBarAtom"
import { isSelected } from "components/container/TopBar"
import up from "../../svg/triangle_orange.svg"
import down from "../../svg/triangle_grey.svg"
import { useNavigate } from "react-router-dom"

const StyledMenu = styled(Div)`
    position: fixed;
    top: 0px;
    z-index: 6;
    right: ${props => {
        return props.right ? props.right : null
    }};
    transition: right 0.7s;
`

const MenuParent = styled(Div)`
    position: relative;
`

const MenuChild = styled(Div)`
    position: "relative";
    visibility: ${props => {
        return props.action ? "visible" : "hidden"
    }};
    opacity: ${props => {
        return props.action ? "1" : "0"
    }};
    height: ${props => {
        return props.action ? "50px" : "0px"
    }};
    padding: ${props => {
        return props.action ? "15px 30px" : "0px 30px"
    }};
    transition: height 0.5s, opacity 0.5s, visibility 0.5s, transform 0.5s, padding 0.5s;
`

const Aside = styled.aside`
    display: flex;
    align-items: center;
    justify-content: center;
`

const Img = styled.img`
    width: 100%;
    object-fit: contain;
`

const Menu = () => {

    const [ isOpen, setIsOpen ] = useRecoilState(menuIsOpenState)
    const selected = useRecoilValue(topBarSelectedState)
    const navigate = useNavigate()

    const data = useMemo(() => [
        {
            name: "반복PASS",
            id: "repeatPass",
            child: [
                {
                    name: "반복 U 패스",
                    id: "repeatUPass"
                },
                {
                    name: "0원 패스",
                    id: "zeroPass"
                }
            ],
            ids: [ "repeatPass" ,"repeatUPass", "zeroPass" ]
        },
        {
            name: "수강신청",
            id: "courseRegistration",
        },
        {
            name: "반복수강후기",
            id: "courseReview",
        },
        {
            name: "반복장학금",
            id: "schoolarship",
        },
        {
            name: "유니버스반복 특징",
            id: "characteristic",
        },
        {
            name: "강사소개",
            id: "teachers",
        },
        {
            name: "교재",
            id: "textbook",
        },
        {
            name: "이벤트",
            id: "event",
        },
    ], [])

    const [ parentIsOpen, setParentIsOpen ] = useState([])

    const onClickEvent = (e, i) => {
        const id = e.target.id

        switch(id){
            case "home":
                navigate("/")
                break
            case "login":
                navigate("/login")
                setIsOpen(false)
                break
            case "join":
                navigate("/create-account")
                setIsOpen(false)
                break
            case "repeatPass":
            case "repeatUPass":
                navigate("/u-pass")
                break
            case "zeroPass":
                navigate("/zero-pass")
                break
            case "courseRegistration":
                navigate("/passes")
                break
            case "courseReview":
                navigate("/best-reviews")
                break
            case "schoolarship":
                navigate("/schoolarship")
                break
            case "characteristic":
                navigate("/characteristic")
                break
            case "teachers":
                navigate("/teachers")
                break
            case "textbook":
                navigate("/teaching-materials")
                break
            case "event":
                navigate("/events")
                break
            case "isOpen":
                const copy = [...parentIsOpen]
                copy.splice(i, 1, !copy[i])
                setParentIsOpen(copy)
                return
            default:
                return
        }

        setIsOpen(false)
    }

    useEffect(() => {
        for(let i = 0; i < data.length; i++){
            setParentIsOpen(parentIsOpen => [...parentIsOpen, false])
        }
    }, [ data ])

    return(
        <StyledMenu height="100vh" backgroundColor="white" right={ isOpen ? "0px" : "-100%" }>
            <TopBar isOpen={ true }/>
            <Aside>
                <Div paddingTop="70px">
                    {
                        data && data.map((e, i) => 
                            <MenuParent key={ `mobile_menu_${ i }` } flex="column" onClick={(ev) => onClickEvent(ev, i)}>
                                <Div flex="row_between" padding="15px 30px" height="50px" style={{ cursor: "pointer" }} id="isOpen">
                                    <Div width="fit-content">
                                        <Button color={ isSelected(e.ids ? e.ids : e.id, selected, "bk") } weight="600" size="small_medium" id={e.id}>
                                            { e.name }
                                        </Button>
                                    </Div>
                                    <Div width="fit-content">
                                        {
                                            e.child && 
                                            <Button flex="row_center">
                                                {
                                                    parentIsOpen[ i ] ?
                                                    <Img src={ up }/>:
                                                    <Img src={ down }/>
                                                }
                                            </Button>
                                        }
                                    </Div>
                                </Div>
                                {
                                    e.child && e.child.map((el, idx) =>
                                        <MenuChild key={`${i}-${idx}`} action={parentIsOpen[i] ? "true" : null} flex="row" backgroundColor="gray1" id={el.id} style={{ cursor: "pointer" }}>
                                            <Div width="fit-content">
                                                <Button color={ isSelected([ e.id, el.id ], selected, "gray3") } weight="400" size="small_medium" id={el.id}>
                                                    { el.name }
                                                </Button>
                                            </Div>
                                        </MenuChild>
                                    )
                                }
                            </MenuParent> 
                        )
                    }
                </Div>
            </Aside>
        </StyledMenu>
    )
}

export default React.memo( Menu )