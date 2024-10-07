import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import P from "components/common/P"
import Button from "components/common/Button"
import { useSetRecoilState, useRecoilValue } from "recoil"
import { dialogState } from "../../../recoil/dialogAtom"
import { isMobileState } from "recoil/mainAtom"

const Div = styled(commonDiv)`
    display: inline-flex;
    cursor: pointer;
    flex-wrap: ${props => {
        return props.wrap ? props.wrap : null
    }};
    min-width: ${({ width }) => {
        return width ? width : null
    }};
`

const Img = styled.img`
    width: 100%;
    object-fit: contain;
`

const Certificate = (props) => {

    const isMobile = useRecoilValue(isMobileState)
    const data = props.children
    const setDialog = useSetRecoilState(dialogState)

    const onClickEvent = (e) => {
        const id = e.target.id

        if(id){
            setDialog({ 
                textType: "patent", 
                data: { img: `${ process.env.REACT_APP_API_URL }${ data.img }`, title: data.title },
                isOpen: true 
            })
        }
    }

    return(
        <Div width={ !isMobile ? "378px" : "107px" } marginLeft={ !isMobile ? "10px" : "6px" } marginRight={ !isMobile ? "10px" : "6px" }  flex="column_center" onClick={onClickEvent}>
            <Div 
                flex="row"
                height={ !isMobile ? "378px" : "107px" } 
                padding={ !isMobile ? "32px 80px" : "9px 23px" }  
                style={{ backgroundColor: "#F0F0F0" }} 
                id={ data.id } 
            >
                {
                    data && data.img &&
                    <Button flex="column_center" id={ data.id }>
                        <Img id={ data.id }  src={ `${ process.env.REACT_APP_API_URL }${ data.img }` }/>
                    </Button>
                }
            </Div>
            <Div flex="row_center" wrap="wrap">
                <P 
                    color="bk" 
                    style={{ 
                        width: "100%",
                        fontSize: !isMobile ? 18 : 12,
                        whiteSpace: "nowrap",
                        textAlign: "center",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                    }} 
                    lineHeight="160%" 
                    weight="500" 
                    id={ data.id }
                >
                    { data.title }
                </P>
            </Div>
        </Div>
    )
}

export default Certificate
// 진짜모름