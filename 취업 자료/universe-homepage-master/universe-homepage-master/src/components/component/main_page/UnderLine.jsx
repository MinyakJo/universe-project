import React from "react"
import CommonStyle from "components/style" 

const UnderLine = () => {
    return(
        <span style={{
            position: "absolute", 
            width: "100%", height: 
            "9px", 
            bottom: 0, 
            left: 0, 
            backgroundColor: `${CommonStyle.setColor("orange")}`, opacity: 0.2}}
        ></span>
    )
}

export default UnderLine