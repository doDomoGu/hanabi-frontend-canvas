import axios from 'axios'
import qs from 'qs'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
/* console.log(process.env);*/
// axios.defaults.baseURL = process.env.AXIOS_BASEURL
// axios.defaults.baseURL = 'http://localhost:8889/v1'
// axios.defaults.baseURL = 'http://10.21.1.230:8889/v1'
axios.defaults.baseURL = 'http://192.168.31.176:8889/v1'


// POST传参序列化
axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('__HANABI_AUTH_TOKEN__');
    if (token != null) {
        config.headers['X-Token'] = token;
    }

    if (config.method === 'post') {
        config.data = qs.stringify(config.data)
    }
    return config
}, (error) => {
    // console.log('错误的传参')
    return Promise.reject(error)
})
// code状态码200判断
axios.interceptors.response.use((res) => {
    if (res.status !== 200) {
        // console.log(res.data.msg)
        return Promise.reject(res)
    }
    return res
}, (error) => {
    // console.log('网络异常')
    return Promise.reject(error)
})

export default axios

