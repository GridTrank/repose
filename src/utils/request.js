import config from './config'
import axios from 'axios'
import {Message, Loading} from 'element-ui';

let baseURL = 'http://api.wxo2020.xyz';

const instance = axios.create({
   baseURL: '/api',  
   headers: {'Content-Type': 'application/json'},
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
   return config;
 }, function (error) {
   return Promise.reject(error);
 });
 // 添加响应拦截器
instance.interceptors.response.use(function (response) {
   endLoading()
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
