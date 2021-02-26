import instance from './request.js'


// 获取菜单
export const getMenu=(data)=>{
    return  instance({
        method:'get',
        url:'/menu/getMenu',
        params:data
    })
}
//添加角色
export const addRole=(data)=>{
    return  instance({
        method:'post',
        url:'/role/addRole',
        data:data
    })
}

//获取商品列表
export const getProductList=(data)=>{
    return  instance({
        method:'post',
        url:'/product/getList',
        data:data
    })
}
//获取商品列表
export const getOrdertList=(data)=>{
    return  instance({
        method:'post',
        url:'/order/getOrderList',
        data:data
    })
}
//登录
export const login=(data)=>{
    return  instance({
        method:'post',
        url:'/user/login',
        data:data
    })
}

