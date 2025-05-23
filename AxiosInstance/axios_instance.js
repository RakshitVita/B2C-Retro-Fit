import axios from "axios"
export const axiosInstance=axios.create({
    baseURL:"http://3.222.109.101:5000",
    withCredentials:true,
})