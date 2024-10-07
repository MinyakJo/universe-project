import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import P from "components/common/P"
import default_profile from "../../../svg/default_profile.svg"
import { isMobileState } from "recoil/mainAtom"
import { useRecoilValue } from "recoil"

const Div = styled(commonDiv)`
    padding: ${props => {
        return props.padding ? props.padding : null
    }};

    box-shadow: ${props => {
        return props.shadow ? props.shadow : null
    }};
`

const Img = styled.img`
    object-fit: contain;
    width: 100%;
`

const Rank = (props) => {

    const data = props.children
    const isMobile = useRecoilValue(isMobileState)

    return(
        <Div flex={ !isMobile ? "row" : "column" } width="fit-content" shadow="0px 2px 8px rgba(0, 0, 0, 0.1)" backgroundColor="white" radius="10px" marginBottom="17px" padding="14px 38px">
            {/* 순위 */}
            <Div flex="row" marginBottom={ !isMobile ? null : "16px" }>
                <Div flex="row" width={ !isMobile ? "30px" : "11px" } marginRight={ !isMobile ? "30px" : "16px" }>
                    {
                        props.num &&
                        <P color="black" weight="500" lineHeight="27px" style={{ fontSize: !isMobile ? 19 : 18 }}>
                            { props.num }
                        </P>
                    }
                </Div>
                {/* 이름, 프로필 */}
                <Div flex="row" width="fit-content" marginRight="81px">
                        <Div flex="row" width={ !isMobile ? "36px" : "32px" } height={ !isMobile ? "36px" : "32px" } marginRight={ !isMobile ? "29px" : "15px" }>
                            {
                                data.profile ?
                                <Img src={data.profile}/>:
                                <Img src={default_profile}/>
                            }
                        </Div>
                        <Div flex="row" width="fit-content">
                            {
                                data.name &&
                                <P color="black" weight="600" size="small_medium" lineHeight="140%">
                                    {data.name}
                                </P>
                            }
                        </Div>
                </Div>
           </Div>
           {/* 마일리지, 반복 횟수 */}
           <Div flex="row" width="fit-content">
                <Div flex="row" width="fit-content" marginRight="2px">
                    {
                        data.monthMileage && data.dayRepeat && data.monthRepeat && 
                        <P color="grey4" size="small" weight="400" lineHeight="22px" style={{ whiteSpace: !isMobile ? "nowrap" : null }}>
                            {`월 누적 마일리지 : ${data.monthMileage} / 일 평균 반복 : ${data.dayRepeat}회 / 월 평균 반복 : ${data.monthRepeat}회`}
                        </P>
                    }
                </Div>
           </Div>
        </Div>
    )
}

export default Rank