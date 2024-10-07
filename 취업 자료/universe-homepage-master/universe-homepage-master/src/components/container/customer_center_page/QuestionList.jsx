import React, { useState, useEffect } from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import Question from "../../component/customer_center_page/Question"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import { useQuery } from "@tanstack/react-query"
import { fetch } from "modules/fetch"


const Div = styled(commonDiv)`
    flex-wrap: ${props => {
        return props.wrap ? props.wrap : null
    }};
`

const QuestionList = () => {

    const isMobile = useRecoilValue(isMobileState)
    const [ data, setData ] = useState([])

    const faqData = useQuery(
        [ "faqFetchData" ],
        async () => await fetch("GET", `/faq?page=0&open=1`),
        { refetchOnWindowFocus: false }
    )

    useEffect(() => {

        if(faqData.data?.data){
            const d = faqData.data.data
            const list = []

            for(let i of d.faqArray){
                list.push({
                    id: i.id,
                    category: i.category,
                    question: i.title,
                    answer: i.contents,
                })
            }

            setData(list)
        }
    }, [ setData, faqData.data ])

    return(
        <Div flex={ !isMobile ? "row" : "row_center" } wrap="wrap" marginBottom={ !isMobile ? "20px" : "24px" }>
            {
                data && data.map((e, i) =>
                    <Question 
                        key={ i } 
                        marginRight={ 
                            !isMobile && (i === 0 || ((i + 1) % 4 !== 0 && i !== 0)) ? 
                            "20px":
                            null 
                        }
                    >
                        { e }
                    </Question>
                )
            }
        </Div>
    )
}

export default React.memo(QuestionList)