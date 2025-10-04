const API_URL ='http://127.0.0.1:5000/api'


export const check_auth_status=()=>{
const response = fetch(`${API_URL}/auth/status`,{credentials:'include'}).then((response)=>{return response.status})
console.log(response)
}

export const login_request = ()=>{
    const response = fetch(`${API_URL}/login`).then((response)=>{return response.status})
    console.log(response)
}