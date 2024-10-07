import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import H1 from "components/common/H1"
import Button from "components/common/Button"
import CommonStyle from "components/style"
import { useNavigate } from "react-router-dom"
import TopBar from "components/container/TopBar"
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import { topBarSelectedState } from "recoil/topBarAtom"
import { useEffect } from "react"

const Div = styled(commonDiv)`
    aspect-ratio: ${props => {
        return props.ratio ? props.ratio : null
    }};
`

const Span = styled.span`
    color: ${props => {
        return props.color ? `${CommonStyle.setColor(props.color)}` : `${CommonStyle.setColor("orange")}`
    }};
`

const CreateAccountDonePage = () => {

    const navigate = useNavigate()
    const isMobile = useRecoilValue( isMobileState )

    const setTopBar = useSetRecoilState( topBarSelectedState )
    const reset = useResetRecoilState( topBarSelectedState )

    useEffect(() => {
        setTopBar( "join" )

        return () => reset()
    }, [ setTopBar, reset ])

    const onClickEvent = () => {
        navigate("/login")
    }

    return(
        <>
            <TopBar join/>
            <main>
                <Div flex="column_center" height="calc(100vh - 81px)" padding={ !isMobile ? null : "50px 20px" } paddingBottom={ !isMobile ? "38px" : "40px" }>
                    <Div width="fit-content" marginBottom={ !isMobile ? "38px" : "40px" }>
                        <H1 color="bk" lineHeight="160%" weight="500" family="esamanru" style={{ textAlign: "center", fontSize: !isMobile ? 34 : 22 }}>
                            <Span>회원가입이 완료되었습니다!</Span><br/>
                            지금부터 반복학습을 시작하세요
                        </H1>
                    </Div>
                    <Div flex="row" width={ !isMobile ? "420px" : null } height={ !isMobile ? "50px" : "45px" } backgroundColor="orange" radius="4px">
                        <Button color="white" size={ !isMobile ? "small_medium" : "extra_small" } weight="500" onClick={onClickEvent}>
                            메인으로 가기
                        </Button>
                    </Div>
                </Div>
            </main>
        </>
    )
}

export default CreateAccountDonePage