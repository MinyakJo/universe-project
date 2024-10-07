import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import Button from "components/common/Button"
import orange_vector from "../../../svg/right_orange_vector.svg"
import vector from "../../../svg/right_grey_vector.svg"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"

const Div = styled(commonDiv)`
    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};

    box-shadow: ${props => {
        return props.shadow ? props.shadow : null
    }};

    cursor: ${props => {
        return props.cursor ? props.cursor : null
    }};

    flex-wrap: ${props => {
        return props.wrap ? props.wrap : null
    }};
`

const Img = styled.img`
    width: 100%;
    object-fit: contain;
`

const Menu = (props) => {

    const isMobile = useRecoilValue(isMobileState)
    const select = props.select
    const list = [ { name: "회원정보", id: "info" }, { name: "결제내역", id: "paymentHistory" }, { name: "내가 쓴 문의", id: "myInquiry" } ]
    const navigate = useNavigate()
    
    const onClickEvent = (e) => {
        const id = e.target.id

        switch(id){
            case "info":
                navigate("/me")
                break
            case "paymentHistory":
                navigate("/purchase-histories")
                break
            case "myInquiry":
                navigate("/my-inquiries")
                break
            default:
        }
    }

    return(
        <Div 
            flex="row"
            width={ !isMobile ? "280px" : null } 
            minWidth={ !isMobile ? "280px" : null } 
            marginRight={ !isMobile ? "100px" : null }
            wrap="wrap"
            marginBottom={ !isMobile ? null : "47px" }
        >
            <Div 
                radius="10px" 
                paddingLeft={ !isMobile ? "24px" : "12px" } 
                backgroundColor="orange" 
                height={ !isMobile ? "53px" : "40px" } 
                marginBottom={ !isMobile ? "19px" : "9px" } 
                cursor="pointer"
            >
                <Button 
                    flex="row" 
                    color="white" 
                    weight={ !isMobile ? "700" : "500" } 
                    size={ !isMobile ? "medium_small" : "small_medium" }
                >
                    마이 페이지
                </Button>
            </Div>
            {
                list && list.map((e, i) =>
                    <Div 
                        key={e.id} 
                        flex="row_between" 
                        radius="10px" 
                        paddingLeft={ !isMobile ? "24px" : "12px" } 
                        paddingRight={ !isMobile ? "17px" : "7px" } 
                        width={ !isMobile ? null : "calc(50% - 5px)" }
                        height={ !isMobile ? "53px" : "40px" } 
                        marginRight={ isMobile && (i % 2 === 0) ? "10px" : null }
                        marginBottom={ !isMobile ? "18px" : "8px" } 
                        cursor="pointer" 
                        shadow="0px 1px 4px rgba(0, 0, 0, 0.1)" 
                        id={e.id} 
                        onClick={onClickEvent}
                    >
                        <Div>
                            <Button 
                                flex="row" 
                                color={ e.id === select ? "orange" : "grey2" } 
                                weight="500" 
                                size={ !isMobile ? "medium_small" : "small_medium" } 
                                id={e.id}
                            >
                                {e.name}
                            </Button>
                        </Div>
                        <Div flex="row" width="24px" minWidth="24px" height="24px" id={e.id}>
                            {
                                e.id === select ?
                                <Img src={orange_vector} id={e.id}/>:
                                <Img src={vector} id={e.id}/>
                            }
                        </Div>
                    </Div>
                )
            }
        </Div>
    )
}

export default React.memo(Menu)