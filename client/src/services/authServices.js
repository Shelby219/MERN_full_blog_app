import api from "../config/api"

async function registerUser(userInfo){
    const response = await api.post("/auth/register", userInfo)
    console.log("got user back from server", response)
    return response.data
}

async function loginUser(userInfo){
    const response = await api.post("/auth/login", userInfo)
    console.log("got user back from server", response)
    return response.data
}

export async function logoutUser() {
    // call to server to logout user
    return api.get("/auth/logout")
}
export {
    registerUser,
    loginUser
}