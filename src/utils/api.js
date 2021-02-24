import request from './request.js'


// 热门漫画
export const getHot=(data)=>{
    return  request('get','/menu/getMenu',data)
}
export const test=(data)=>{
    return  request('get','/login',data)
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
//推荐
export const getTops=(data)=>{
    return  request('post','/books/getTops',data)
}
//更新数据
export const getUpdate=(data)=>{
    return  request('post','/books/getupdate',data)
}
//漫画详情
export const booksDetail=(data)=>{
    return  request('post','/books/detail',data)
}

//搜索
export const getSearchResult=(data)=>{
    return  request('post','/books/search',data)
}
//漫画详情
export const getBookDetail=(data)=>{
    return  request('post','/books/detail',data)
}
//相关推荐
export const getRecommend=(data)=>{
    return  request('post','/books/getRecommend',data)
}

//章节列表
export const getChapList=(data)=>{
    return  request('post','/chapters/getList',data)
}
//章节详情
export const getChapDetail=(data)=>{
    return  request('post','/chapters/detail',data)
}
//漫画评论
export const getComments=(data)=>{
    return  request('post','/chapters/getComments',data)
}


//漫画分类
export const getList=(data)=>{
    return  request('post','/tag/getList',data)
}
//漫画分类搜索
export const getBookList=(data)=>{
    return  request('post','/tag/getBookList',data)
}
// 轮播
export const getBanners=(data)=>{
    return  request('post','/tag/getBanners',data)
}

//购买章节
export const buyChapter=(data)=>{
    return  request('post','/finance/buychapter',data)
}
//是否收藏
export const getFavor=(data)=>{
    return  request('post','/users/isfavor',data)
}
//变更收藏
export const switchFavor=(data)=>{
    return  request('post','/users/switchfavor',data)
}
//删除收藏
export const delFavors=(data)=>{
    return  request('post','/users/delfavors',data)
}
//阅读历史
export const getHistory=(data)=>{
    return  request('post','/finance/history',data)
}
//删除历史
export const delHistory=(data)=>{
    return  request('post','/users/delhistory',data)
}
//消费记录
export const getSpendings=(data)=>{
    return  request('post','/finance/getSpendings',data)
}
//充值记录
export const getCharges=(data)=>{
    return  request('post','/finance/getCharges',data)
}
//发送短信
export const sendcms=(data)=>{
    return  request('post','/util/sendcms',data)
}
//用户收藏接口
export const bookShelf=(data)=>{
    return  request('post','/users/bookshelf',data)
}

//修改昵称
export const changeName=(data)=>{
    return  request('post','/users/getVipExpireTime',data)
}
//修改密码
export const changePwd=(data)=>{
    return  request('post','/users/resetpwd',data)
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
    return  request('post','/account/autologin',data)
}
//登录
export const userLogin=(data)=>{
    return  request('post','/account/login',data)
}
//登出
export const userLogout=(data)=>{
    return  request('post','/account/logout',data)
}
//手机号注册
export const phoneReg=(data)=>{
    return  request('post','/account/phonereg',data)
}
//手机号登录
export const phoneLogin=(data)=>{
    return  request('post','/account/phonelogin',data)
}


//用户余额
export const getBalance=(data)=>{
    return  request('post','/finance/getBalance',data)
}
//用户充值
export const charge=(data)=>{
    return  request('post','/finance/charge',data)
}

