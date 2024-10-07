import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import CommonStyle from "components/style"
import Info from "../../component/my_page/Info"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import Title from "components/component/my_page/Title"
import { userDataState } from "recoil/createAccountAtom"
import { dateFormat } from "modules/dateFormat"

const Div = styled(commonDiv)`
    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};

    border-bottom: ${props => {
        return props.borderBottom ? `1px solid ${CommonStyle.setColor(props.borderBottom)}` : null
    }};

    box-shadow: ${props => {
        return props.shadow ? props.shadow : null
    }};

    cursor: ${props => {
        return props.cursor ? props.cursor : null
    }};
`

const AccountInfo = () => {

    const basicInfo = useRecoilValue(userDataState)
    const parentsInfo = {
        name: basicInfo?.parentName,
        tel: basicInfo?.parentPhone,
        date: basicInfo?.parentBirthday ? dateFormat( new Date( basicInfo.parentBirthday ) ) : null
    }
    const isMobile = useRecoilValue(isMobileState)

    return(
        <Div flex="column">
            <Div flex="column" marginBottom="30px">
                <Title>
                    기본정보
                </Title>
                <Div flex="column" marginTop={ !isMobile ? null : "7px" }>
                    <Info>
                        {{
                            guide: "아이디",
                            text: basicInfo?.loginId
                        }}
                    </Info>
                    <Info password change>
                        {{
                            guide: "비밀번호",
                            text: "****",
                            id: "pw"
                        }}
                    </Info>
                    <Info change>
                        {{
                            guide: "휴대폰 번호",
                            text: basicInfo?.phone,
                            id: "tel"
                        }}
                    </Info>
                    <Info change>
                        {{
                            guide: "생년월일",
                            text: basicInfo?.birthday,
                            id: "date"
                        }}
                    </Info>
                </Div>
            </Div>
            {
                !basicInfo?.overFourteen &&
                <Div flex="column" marginBottom="30px">
                    <Title>
                        보호자정보
                    </Title>
                    <Div flex="column" marginTop={ !isMobile ? null : "7px" }>
                        <Info>
                            {{
                                guide: "이름",
                                text: parentsInfo.name
                            }}
                        </Info>
                        <Info>
                            {{
                                guide: "생년월일",
                                text: parentsInfo.date
                            }}
                        </Info>
                        <Info>
                            {{
                                guide: "휴대폰 번호",
                                text: parentsInfo.tel
                            }}
                        </Info>
                    </Div>
                </Div>
            }
            <Div flex="column">
                <Title>
                    프로필정보
                </Title>
                <Div flex="column" marginTop={ !isMobile ? null : "7px" }>
                    <Info profile change>
                        {{
                            guide: "프로필&",
                            text: basicInfo?.name,
                            img: basicInfo?.profileImage,
                            id: "profile"
                        }}
                    </Info>
                    <Info img change>
                        {{
                            guide: "등급설정",
                            text: "나의 등급",
                            img: null,
                            id: "grade"
                        }}
                    </Info>
                </Div>
            </Div>
        </Div>
    )
}

export default AccountInfo