import React from "react"
import P from "components/common/P"
import { Div, Contents } from "../../page/InquiryPage"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"

const Answer = (props) => {

    const isMobile = useRecoilValue(isMobileState)
    const data = props.children

    return(
        <Div 
            radius="10px" 
            backgroundColor="light_grey" 
            padding={ !isMobile ? "29px 22px" : "22px 15px" } 
            paddingBottom={ !isMobile ? "17px" : "20px" } 
            marginTop={ !isMobile ? "32px" : "20px" }
        >
            <Div 
                flex="row_center" 
                width={ !isMobile ? "60px" : "40px" }
                height={ !isMobile ? "30px" : "24px" }
                backgroundColor="orange" 
                radius="60px"
                marginBottom="10px"
            >
                <P color="white" weight="500" lineHeight="18px" family="pretendard" style={{ fontSize: !isMobile ? 15 : 12 }}>
                    답변
                </P>
            </Div>
            <Div>
                <Contents color="bk" size={ !isMobile ? "small_large" : "extra_small" } lineHeight="170%" weight="400">
                    {data}
                </Contents>
            </Div>
        </Div>
                        
    )
}

export default Answer