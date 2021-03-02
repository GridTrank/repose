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
//获取订单列表
export const getOrdertList=(data)=>{
    return  instance({
        method:'post',
        url:'/order/getOrderList',
        data:data
    })
}
//查询商品详情
export const getProductDetail=(data)=>{
    return  instance({
        method:'post',
        url:'/product/detail',
        data:data
    })
}
//添加商品
export const addProduct=(data)=>{
    return  instance({
        method:'post',
        url:'/product/addProduct',
        data:data
    })
}
//修改商品
export const editProduct=(data)=>{
    return  instance({
        method:'post',
        url:'/product/editProduct',
        data:data
    })
}
//删除商品
export const delProduct=(data)=>{
    return  instance({
        method:'post',
        url:'/product/delProduct',
        data:data
    })
}
//登录
export const login=(data)=>{
    return  instance({
        method:'post',
        url:'/store/login',
        data:data
    })
}

