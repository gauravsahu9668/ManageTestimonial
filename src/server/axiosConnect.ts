import axios from "axios"
export const BACKEND_URL="https://backend.sahug6194.workers.dev/api/v1";
const axiosConnect=async(url:string,method:string,credential:Object,token:string)=>{
try{ 
    return await axios({
        url:`${BACKEND_URL}/api/v1${url}`,
        method:method,
        data:credential,
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}catch(error){
 console.log(error);
}
}
export default axiosConnect