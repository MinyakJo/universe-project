import React from "react"
import Div from "components/common/Div"
import CourseStructureTitle from "../passes_page/CourseStructureTitle"
import document from "../../../svg/document.svg"
import NewsList from "./NewsList"
import PageButtonBox from "../PageButtonBox"
import { isMobileState } from "recoil/mainAtom"
import { useRecoilValue } from "recoil"


const LatestNews = (props) => {

    const data = props.children
    
    const isMobile = useRecoilValue(isMobileState)

    return(
        <Div marginTop={ !isMobile ? "60px" : "40px" }>
            <CourseStructureTitle>
                {{
                    img: document,
                    title: "최신소식",
                }}
            </CourseStructureTitle>
            
            <NewsList>
                { data }
            </NewsList>

            <Div marginTop="40px">
                <PageButtonBox>
                    {{
                        page: props?.page ? props.page : 1,
                        pageCnt: props?.totalPage ? props.totalPage : 1,
                    }}
                </PageButtonBox>
            </Div>
        </Div>
    )
}

export default LatestNews