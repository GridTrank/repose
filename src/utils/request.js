import config from './config'
import axios from 'axios'

let baseURL = 'http://api.wxo2020.xyz';
// axios.defaults.timeout = 5000;

const instance = axios.create({
   baseURL: '/api',  
   headers: {'Content-Type': 'application/json'},
 });
 // 添加请求拦截器
instance.interceptors.request.use(function (config) {
    return config;
 }, function (error) {
    return Promise.reject(error);
 });
 // 添加响应拦截器
instance.interceptors.response.use(function (response) {
    return response;
 }, function (error) {
    return Promise.reject(error);
 });

 export default function request(methods, url, params) {
    switch (methods) {
       case 'get':
          return get(url, params);  //把promise对象 返回
       case 'post':
          return post(url, params)
    }
 }

//get请求
function get(url, params) {
    return instance.get(url, params)
 }
 
 //post请求
 function post(url, params) {
    return instance.post(url, params)
 }
