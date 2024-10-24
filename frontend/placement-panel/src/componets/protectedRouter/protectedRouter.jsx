import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN,REFRESH_TOKEN } from "../../constant";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import api from "../../api";


const ProtectdRouter = ({children}) =>{

    const [isAutherized, setIsAutherized] = useState(null)

    useEffect(() =>{
        auth().catch(() => {setIsAutherized(false)})

    },[])

    const refreshToken = async () => {
        const refreshToken = Cookies.get(REFRESH_TOKEN)
        try {
            const res = await api.post('/api/token/refresh/',{refresh:refreshToken})
            if( res.status === 200) {
            Cookies.set(ACCESS_TOKEN,res.data.access)
            setIsAutherized(true)
        }else{
            setIsAutherized(false)
        }
        } catch (error) {
            console.log(error)
            setIsAutherized(true)   
        }
    }

    const auth = async () => {
        const token = Cookies.get(ACCESS_TOKEN)
        if(!token){
            setIsAutherized(false)
            return;
        }
        const decoed = jwtDecode(token)
        const tokenExpiry = decoed.exp
        const now = Date.now() / 1000

        if(now < tokenExpiry){
            await refreshToken()
        }else{
            setIsAutherized(true)
        }

    }
    if(isAutherized===null){
        return <div className="">Loading.....</div>
    }
    return isAutherized ? children : <Navigate to={'/login'}/>
}

export default ProtectdRouter