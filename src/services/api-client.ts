import axios , {AxiosError,CanceledError} from "axios";

export default  axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    /* 
    optionally set the HTTP headers, and these headers will be passed with every HTTP request. 
    sometimes this i necessary if some backends require us to send an API key with every HTTP req
    if there is such a requirement , we can pass an API-key 'api-key' and set it to some value '...'
    ********
    headers: {
        // 'Content-Type': 'application/json'
        'api-key' : '...'
    }
    */
})
export {AxiosError};
export {CanceledError};