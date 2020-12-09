import request from './request.js'

export const getIndex=(data)=>{
    return  request('post','/backdata/webindex',data)
}