import axios from "axios";

const Api = axios.create({
    baseURL: `http://localhost:3000/api`
    // baseURL: `http://192.168.87.36:3000/api`
})

export default Api;

