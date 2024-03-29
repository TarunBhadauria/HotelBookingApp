import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";


const OpenRoutes = ({children})=>{

    const { token } = useSelector((state)=>state.user);
    if(token){
        return <Navigate to='/my-account'/>
    }

    return children;
}

export default OpenRoutes;