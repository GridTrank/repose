import {
    getOrdertList
}from '@/utils/api'
export default{
    data(){
        return{

        }
    },
    created(){
        getOrdertList().then(res=>{
        })
    }
}