import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import P from "components/common/P"
import Button from "components/common/Button"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"

const Div = styled(commonDiv)`
    max-width: 580px;

    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};

    box-shadow: ${props => {
        return props.shadow ? props.shadow : null
    }};
`

const FileUploadButton = (props) => {

    const isMobile = useRecoilValue(isMobileState)

    return(
        <Div flex="column" marginBottom="20px">
            <Div marginBottom="12px">
                <P color="bk" weight="600" size="small_medium" lineHeight="20px">
                    첨부파일
                </P>
            </Div>
            <Div flex="row" height={ !isMobile ? "50px" : "40px" }>
                <Div 
                    flex="row" 
                    marginRight={ !isMobile ? "15px" : "6px" } 
                    radius="4px" 
                    padding={ !isMobile ? "15px 20px" : "12px" } 
                    borderColor="gray2" 
                    height="100%"
                >
                    <P color="gray2" style={{ fontSize: !isMobile ? 16 : 12 }} weight="400" lineHeight="130%">
                        {
                            props.file ?
                            props.file.name:
                            "10MB 이하 jpg, jpeg, png파일, 최대 1개까지"
                        }
                    </P>
                </Div>
                <Div flex="row_center" width={ !isMobile ? "131px" : "75px" } minWidth={ !isMobile ? "131px" : "75px" } height="100%" backgroundColor="orange" radius="4px">
                    <Button color="white" id="file" weight="500" size="small_medium">
                        첨부파일
                    </Button>
                    <input type="file" id="file" style={{ display: "none" }} ref={ props.parentRef } onChange={ props.onChange } accept="image/png, image/jpeg, image/webp, image/jpg"/>
                </Div>
            </Div>
        </Div>
    )
}

export default FileUploadButton