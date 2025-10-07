import { API_ENDPOINTS } from "@/util/config"
interface AuthStatusProps {
    isLoggedIn :boolean
}

export const check_auth_status=async () : Promise<AuthStatusProps> =>{
    try{
        const response = await fetch(API_ENDPOINTS.AUTH_STATUS,
            {
                credentials:'include'
            }   
        )
        const data = await response.json() as AuthStatusProps
        console.log('Auth status :',data )
        return data
    }
    catch(error:any){
        console.error('Failed to fetch',error)
        return{isLoggedIn : false}

    }
    
}
