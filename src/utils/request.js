import axios from 'axios'
import {Message, Loading} from 'element-ui';
import md5 from 'js-md5';
import qs from 'qs';

let baseURL = 'http://127.0.0.1:3000';

const instance = axios.create({
   // baseURL: '',  
   baseURL: baseURL,  
   headers: {'Content-Type': 'application/json'},
   timeout: 30000 
 });

 // loading框设置局部刷新，且所有请求完成后关闭loading框
let loading;
function startLoading() {
  loading = Loading.service({
    text: "数据加载中...",
    background:'rgba(255,255,255,.5)',
    // target: document.querySelector('.loading-area')//设置加载动画区域
  });
}
function endLoading() {
    if(typeof(loading) == "object"){
        loading.close();
    }
  
}


 // 添加请求拦截器
instance.interceptors.request.use(function (config) {
   startLoading()
   config.method === 'post'
        ? config.data = qs.stringify({...config.data})
        : config.params = {...config.params};
   config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

   return config;
 }, function (error) {
   return Promise.reject(error);
 });
 // 添加响应拦截器
instance.interceptors.response.use(function (response) {
   // setTimeout(()=>{
   //    router.push({
   //       path:'/Login'
   //    })
   // },1000)
   endLoading()
   return response.data;
 }, function (error) {
   return Promise.reject(error);
 });



export default instance

