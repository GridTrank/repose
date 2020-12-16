import request from './request.js'

export const getIndex=(data)=>{
    return  request('post','/books/getHot',data)
}
export const getSearchResult=(data)=>{
    return  request('post','/backdata/searchbook',data)
}