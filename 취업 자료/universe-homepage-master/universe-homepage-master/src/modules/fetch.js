import axios from "axios";
import { Cookies } from "react-cookie";

const remove = () => {
    const cookies = new Cookies()
    return cookies.remove( "token" )
}

export const fetch = async(type, url, body, headers, withCredentials) => {
    let fetchData = null
    
    try{
        fetchData = await axios({
            method: type,
            url: `${ process.env.REACT_APP_API_URL }${ url }`,
            data: body,
            headers: headers,
            withCredentials: withCredentials ? true : false
        })
    }catch({ response }){
        if( ( response.status === 401 ) || ( response.status === 403 ) )
            remove()
        throw new Error( response.data.err.myError.message )
    }
    return fetchData
}