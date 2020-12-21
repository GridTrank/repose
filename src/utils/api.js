import request from './request.js'

// 轮播
export const getBanners=(data)=>{
    return  request('post','/tag/getBanners',data)
}
// 热门漫画
export const getHot=(data)=>{
    return  request('post','/books/getHot',data)
}
//最新漫画
export const getNewest=(data)=>{
    return  request('post','/books/getNewest',data)
}
//充值排行
export const getmostcharged=(data)=>{
    return  request('post','/books/getmostcharged',data)
}
//完结漫画
export const getEnds=(data)=>{
    return  request('post','/books/getEnds',data)
}
//漫画详情
export const booksDetail=(data)=>{
    return  request('post','/books/detail',data)
}
//漫画评论
export const getComments=(data)=>{
    return  request('post','/books/getComments',data)
}
//搜索
export const getSearchResult=(data)=>{
    return  request('post','/books/search',data)
}
//漫画详情
export const getBookDetail=(data)=>{
    return  request('post','/books/detail',data)
}
//章节列表
export const getChapList=(data)=>{
    return  request('post','/chapters/getList',data)
}
//章节详情
export const getChapDetail=(data)=>{
    return  request('post','/chapters/detail',data)
}


//漫画分类
export const getList=(data)=>{
    return  request('post','/tag/getList',data)
}
//收藏
export const getFavor=(data)=>{
    return  request('post','/users/isfavor',data)
}
//注册
export const userRegister=(data)=>{
    return  request('post','/account/register',data)
}
//自动注册
export const userAutoReg=(data)=>{
    return  request('post','/account/autoreg',data)
}
//自动注册
export const userAutoLogin=(data)=>{
    return  request('post','/account/login',data)
}
//登录
export const userLogin=(data)=>{
    return  request('post','/account/login',data)
}
//发送短信
export const sendcms=(data)=>{
    return  request('post','/users/sendcms',data)
}
