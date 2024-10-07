import React, { useState } from "react"
import commonDiv from "components/common/Div"
import commonButton from "components/common/Button"
import topLogo from "../../svg/top_logo.svg"
import styled from "styled-components"
import CommonStyle from "components/style"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { menuIsOpenState, topBarSelectedState } from "../../recoil/topBarAtom"
import { useNavigate } from "react-router-dom"
import xButton from "../../svg/orange_x_button.svg"
import { isMobileState } from "recoil/mainAtom"
import { useEffect } from "react"
import { useCookies } from "react-cookie"
import { useQuery } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import down_vector from "../../svg/down_black_small_vector.svg"
import { userDataState } from "recoil/createAccountAtom"
import default_profile from "../../svg/default_profile.svg"
import { dateFormat } from "modules/dateFormat"

const Nav = styled.nav`
    display: flex;
    position: absolute;
    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : null
    }};
    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};
    z-index: 2;
    top: 0;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: ${props => {
        return props.backgroundColor ? `${CommonStyle.setColor(props.backgroundColor)}` : null
    }};
`

const Div = styled(commonDiv)`
    position: ${props => {
        return props.position ? props.position : null
    }};

    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : "none"
    }};

    min-width: ${props => {
        return props.minWidth ? props.minWidth : "0px"
    }};

    padding: ${props => {
        return props.padding ? props.padding : "0px"
    }};

    box-shadow: ${props => {
        return props.boxShadow ? props.boxShadow : "none"
    }};

    cursor: ${props => {
        return props.cursor ? props.cursor : null
    }};
`

const ButtonDiv = styled(commonDiv)`
    width: fit-content;
    margin-right: 60px;
    padding-top: 9px;
    padding-bottom: 15px;
    cursor: pointer;
`

const HoverButtonDiv = styled(commonDiv)`
    opacity: 0;
    padding-bottom: 15px;
    cursor: pointer;

    transition: opacity 0.5s;
`

const MenuDiv = styled(Div)`
    align-items: flex-start;
    background-color: white;
    overflow: hidden;

    &:hover {
        height: 185px;
    }
    &:hover ${HoverButtonDiv} {
        opacity: 1;
    }
    transition: height 0.3s, transform 0.3s;
`

const Button = styled(commonButton)`
    font-weight: ${props => {
        return props.weight ? props.weight : "600"
    }};
    line-height: 23px;
    text-align: ${props => {
        return props.align ? props.align : "start"
    }};
    font-size: ${props => {
        return props.size ? `${CommonStyle.setFontSize(props.size)}` : `${CommonStyle.setFontSize("small_medium")}`
    }};
    white-space: nowrap;
`

const Line = styled(commonDiv)`
    width: 100%;
    border-bottom: ${props => {
        return props.borderBottom ? `1px solid ${CommonStyle.setColor(props.borderBottom)}` : `1px solid ${CommonStyle.setColor("grey2")}`
    }};
`

const LineLength = styled(commonDiv)`
    width: 0px;
    height: 15px;
    border-left: 1px solid ${CommonStyle.setColor("grey2")};
`

const MobileLine = styled(Line)`
    opacity: 0.3;
`

const Img = styled.img`
    width: 100%;
    object-fit: contain;
`

const Link = styled.a`
    ${ CommonStyle.setFlex( "row_center" ) }
    width: 100%;
    height: 100%;
    border-radius: ${({ radius }) => {
        return radius ? radius : null
    }};
    background-color: ${({ backgroundColor }) => {
        return backgroundColor ? CommonStyle.setColor( backgroundColor ) : CommonStyle.setColor( "none" )
    }};
    color: ${({ color }) => {
        return color ? CommonStyle.setColor( color ) : "black"
    }};
    font-family: regular;
    text-decoration: none;
    font-weight: 600;
    font-size: ${ CommonStyle.setFontSize("small_medium") };
`

const TopBar = (props) => {

    const [ cookies, , removeCookies ] = useCookies([ "token" ])
    const [ open, setOpen ] = useState( false )
    const navigate = useNavigate()

    const setIsOpen = useSetRecoilState(menuIsOpenState)
    
    const selected = useRecoilValue(topBarSelectedState)

    const isMobile = useRecoilValue(isMobileState)

    const setUserData = useSetRecoilState(userDataState)
    
    const { data } = useQuery(
        [ "userFetchData" ],
        async() => await fetch("GET", `/student/myInfo`, null, { Authorization: cookies.token }),
        { enabled: !!cookies.token, refetchOnWindowFocus: false, retry: false }
    )

    useEffect(() => {
        if( data?.data ) setUserData({ ...data.data.studentData, birthday: dateFormat( new Date( data.data.studentData.birthday ), "-" ) })
    }, [ data, setUserData ])

    const onClickEvent = (e) => {
        const id = e.target.id
        
        switch(id){
            case "home":
                navigate("/")
                setIsOpen(false)
                return
            case "open":
                setOpen( !open )
                return
            case "login":
                navigate("/login")
                setIsOpen(false)
                return
            case "logout":
                removeCookies( "token" )
                navigate("/")
                return
            case "join":
                navigate("/create-account")
                setIsOpen(false)
                return
            case "repeatPass":
            case "repeatUPass":
                navigate("/u-pass")
                return
            case "zeroPass":
                navigate("/zero-pass")
                return
            case "courseRegistration":
                navigate("/passes")
                return
            case "courseReview":
                navigate("/best-reviews")
                return
            case "schoolarship":
                navigate("/schoolarship")
                return
            case "characteristic":
                navigate("/characteristic")
                return
            case "teachers":
                navigate("/teachers")
                return
            case "textbook":
                navigate("/teaching-materials")
                return
            case "event":
                navigate("/events")
                return
            case "menuOpen":
                setIsOpen(true)
                return
            case "menuClose":
                setIsOpen(false)
                return
            case "myPage":
                navigate("/me")
                setIsOpen(false)
                return
            default:
                return
        }
    }

    return(
        <Nav maxWidth={ !isMobile ? "1920px" : null } minWidth={ !isMobile ? "1180px" : "360px" } backgroundColor={ !isMobile ? "white" : "none" }>
            <Div flex="column_center" onClick={ onClickEvent }>

                {/* Logo */}
                <Div flex="row_between" padding={ !isMobile ? "16px 0px" : "10.1px 20px" } maxWidth="1180px">
                    <Div flex="row" width={ !isMobile ? "237px" : "155px" } minWidth={ !isMobile ? "237px" : "155px" }>
                        <Button id="home">
                            <Img src={ topLogo } id="home"/>
                        </Button>
                    </Div>
                    {
                        !isMobile && !cookies?.token ?
                        <Div flex="row" width="fit-content">
                            <Div flex="row" minWidth="46px" marginRight="34px">
                                <Button id="login" color={ isSelected( "login", selected ) }>로그인</Button>
                            </Div>
                            <Div flex="row" minWidth="70px">
                                <Button id="join" color={ isSelected( "join", selected ) }>회원가입</Button>
                            </Div>
                        </Div>:
                        !isMobile && cookies.token ?
                        <Div flex="row" width="fit-content" position="relative">
                            <Div width="44px" height="44px" radius="50%" style={{ border: `1px solid ${ CommonStyle.setColor("orange") }` }} marginRight="5px">
                                { 
                                    data?.data?.studentData?.profileImage?
                                    <Div height="100%">
                                        <Button flex="row_center" radius="50%" style={{ overflow: "hidden" }}>
                                            <Img src={ `${ process.env.REACT_APP_API_URL }${ data.data.studentData.profileImage }` } id="open"/>
                                        </Button>
                                    </Div> :
                                    <Div height="100%">
                                        <Button>
                                            <Img src={ default_profile } id="open"/>
                                        </Button>
                                    </Div>
                                }
                            </Div>
                            <Div flex="row_center" width="20px" height="20px">
                                <Button>
                                    <Img src={ down_vector } id="open" style={{ transform: open ? "rotate( 180deg )" : null }}/>
                                </Button>
                            </Div>
                            {
                                open && !isMobile &&
                                <Div width="100px" padding="6px 10px" bakcgroundColor="white" radius="10px" backgroundColor="white" position="absolute" style={{ bottom: -110, right: 0, boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)" }}>
                                    <Div height="40px">
                                        <Button color={ selected === "my" ? "orange" : "bk" } size="small" weight="500" id="myPage">
                                            마이페이지
                                        </Button>
                                    </Div>
                                    <Line borderBottom="grey1"/>
                                    <Div height="40px">
                                        <Button color="bk" size="small" weight="500" id="logout">
                                            로그아웃
                                        </Button>
                                    </Div>
                                </Div>
                            }
                        </Div>:
                        isMobile && !props.isOpen ?
                        <Div flex="column_between" width="20px" height="16px" cursor="pointer" id="menuOpen">
                            <Div height="2px" radius="70px" backgroundColor={ props.menu ? props.menu : "white" } cursor="pointer" id="menuOpen"/>
                            <Div height="2px" radius="70px" backgroundColor={ props.menu ? props.menu : "white" } cursor="pointer" id="menuOpen"/>
                            <Div height="2px" radius="70px" backgroundColor={ props.menu ? props.menu : "white" } cursor="pointer" id="menuOpen"/>
                        </Div>:
                        isMobile && props.isOpen &&
                        <Div flex="row" width="fit-content">
                            <Div width="fit-content">
                                <Button id={ cookies.token ? "myPage" : "login" } color={ isSelected( "my", selected, "gray3" ) } size="extra_small">
                                    {
                                        cookies.token?
                                        "마이페이지" :
                                        "로그인"
                                    }
                                </Button>
                            </Div>
                            <LineLength marginRight="11px" marginLeft="11px"/>
                            <Div width="fit-content">
                                <Button id={ cookies.token ? "logout" : "join"} color={ isSelected( "join", selected, "gray3" ) } size="extra_small">
                                    {
                                        cookies.token?
                                        "로그아웃" :
                                        "회원가입"
                                    }
                                </Button>
                            </Div>
                            <Div width="24px" minWidth="24px" height="18px" marginLeft={ cookies.token ? "8px" : "23px" }>
                                <Button>
                                    <Img src={xButton} id="menuClose"/>
                                </Button>
                            </Div>
                        </Div>
                    }
                </Div>

                {
                    !isMobile ?
                    <Line/>:
                    <MobileLine/>
                }

                {/* Menu */}
                {
                    !isMobile && !props.join &&
                    <MenuDiv flex="row_between" height="56px" padding="8px 0px" maxWidth="1180px">
                        <Div height="100%" flex="row_top">
                            <Div height="100%">
                                <ButtonDiv id="repeatPass">
                                    <Button id="repeatPass" color={ isSelected(["repeatPass", "repeatUPass", "zeroPass" ], selected) }>반복PASS</Button>
                                </ButtonDiv>
                                <HoverButtonDiv id="repeatUPass">
                                    <Button id="repeatUPass" weight="400" color={ isSelected("repeatUPass", selected) }>반복 U 패스</Button>
                                </HoverButtonDiv>
                                <HoverButtonDiv id="zeroPass">
                                    <Button id="zeroPass" weight="400" color={ isSelected("zeroPass", selected) }>0원 패스</Button>
                                </HoverButtonDiv>
                            </Div>
                            <ButtonDiv>
                                <Button id="courseRegistration" color={ isSelected("courseRegistration", selected) }>수강신청</Button>
                            </ButtonDiv>
                            <ButtonDiv>
                                <Button id="courseReview" color={ isSelected("courseReview", selected) }>반복수강후기</Button>
                            </ButtonDiv>
                            <ButtonDiv>
                                <Button id="schoolarship" color={ isSelected("schoolarship", selected) }>반복장학금</Button>
                            </ButtonDiv>
                            <ButtonDiv>
                                <Button id="characteristic" color={ isSelected("characteristic", selected) }>유니버스반복 특징</Button>
                            </ButtonDiv>
                            <ButtonDiv>
                                <Button id="teachers" color={ isSelected("teachers", selected) }>강사소개</Button>
                            </ButtonDiv>
                            <ButtonDiv>
                                <Button id="textbook" color={ isSelected("textbook", selected) }>교재</Button>
                            </ButtonDiv>
                            <ButtonDiv>
                                <Button id="event" color={ isSelected("event", selected) }>이벤트</Button>
                            </ButtonDiv>
                        </Div>
                        <Div width="135px" minWidth="135px" height="40px" marginRight="0px">
                            <Link radius="4px" backgroundColor="orange" color="white" id="start" 
                                href={ cookies.token ? `${ process.env.REACT_APP_SOLUTION_URL }` : "/login" } target="_blank"
                            >
                                반복시작하기
                            </Link>
                        </Div>
                    </MenuDiv>
                }
            </Div>
        </Nav>
    )
}

export const isSelected = (id, value, color="black") => {
    if(Array.isArray(id)){
        for(let i of id){
            if(i === value){
                return "orange"
            }
        }
    }else if(id === value){
        return "orange"
    }
    return color
}

export default React.memo( TopBar )