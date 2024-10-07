import React from "react"
import styled from "styled-components"
import Div from "components/common/Div"
import H1 from "components/common/H1"
import P from "components/common/P"
import background from "../../../image/characteristic_page/background_03.png"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"

const Title = styled(H1)`
    white-space: pre-line;
    text-align: center;
`

const Motivation = () => {

    const isMobile = useRecoilValue(isMobileState)

    return(
        <Div flex="column_center" src={background} padding={ !isMobile ? "423px 0px" : "123px 20px" } paddingBottom={ !isMobile ? "423px" : "128px" }>
            <Div flex="row_center" marginBottom={ !isMobile ? "27px" : "17px" }>
                <Title color="white" family="esamanru" lineHeight="140%" weight="500" style={{ fontSize: !isMobile ? 50 : 20 }}>
                    {"정말 꾸준히 할 수 밖에 없는 학습효과\n동기부여는 확실하게"}
                </Title>
            </Div>
            <Div flex="row_center" marginBottom={ !isMobile ? "12px" : "8px" }>
                <P color="white" weight="700" size={ !isMobile ? "large_small" : "small" } lineHeight="140%" family="pretendard">
                    학습 및 데이터 제공 보상으로 현금 마일리지 제공합니다.
                </P>
            </Div>
            <Div flex="row_center">
                <P color="white" weight="500" style={{ fontSize: !isMobile ? 26 : 13, textAlign: "center" }} lineHeight="140%" family="pretendard">
                    반복학습을 하면서 클릭 1번으로 { isMobile && <br/> }마일리지를 쉽게 쌓을 수 있습니다.
                </P>
            </Div>
        </Div>
    )
}

export default Motivation