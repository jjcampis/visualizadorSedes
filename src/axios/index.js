import axios from 'axios'
export default axios.create({
//baseURL: 'http://localhost:8080',
//baseURL: 'http://192.168.100.32:8080',
// DE: https://github.com/axios/axios/issues/175
// axios.defaults.headers = {
    // 'Cache-Control': 'no-cache',
    // 'Pragma': 'no-cache',
    // 'Expires': '0',
//   };

baseURL:(process.env.NODE_ENV !== 'production') ? 'http://localhost:8080' : 'https://r2d2.roboticamisiones.com',

//baseURL: 'https://r2d2.roboticamisiones.com',
//headers: {"Access-Control-Allow-Origin": "*"}
headers:{
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
}
})