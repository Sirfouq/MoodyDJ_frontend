import { API_ENDPOINTS } from "@/services/config"
interface AuthStatusProps {
    isLoggedIn :boolean
    access_token? : string
}

export interface Track{
    name: string
    artists : string[]
    uri: string
    album_image_url:string
    duration_ms : number
}

export const check_auth_status=async () : Promise<AuthStatusProps> =>{
    try{
        const response = await fetch(API_ENDPOINTS.AUTH_STATUS,
            {
                credentials:'include'
            }   
        )
        const data = await response.json() as AuthStatusProps
        return data
    }
    catch(error:any){
        console.error('Failed to fetch',error)
        return{isLoggedIn : false }

    }
    
}

export const generate_playlist = async(user_input : string,
    genre: string = '',
    artist : string = ''): Promise<Track[]> =>{
    
    try{
        const response = await fetch(API_ENDPOINTS.GENERATE,
            {   headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({user_input,genre,artist})
            }
        )
        if (!response.ok){
            throw Error(`Http Error: ${response.status}`)
        }
        const data = await response.json() as Track[]
        return data

    }
    catch(error:unknown){
        console.error('Failed to fetch', error)
        throw error
    }
}
