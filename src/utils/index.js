export const getFormat=function(str){
    var oDate = new Date(str),  
    oYear = oDate.getFullYear(),  
    oMonth = oDate.getMonth()+1,  
    oDay = oDate.getDate(),  
    oHour = oDate.getHours(),  
    oMin = oDate.getMinutes(),  
    oSec = oDate.getSeconds(),  
    // +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSec);
   	oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) 
    return oTime;  
}
function getzf(num){  
    if(parseInt(num) < 10){  
        num = '0'+num;  
    }  
    return num;  
}
export const validateTel = function (tel){
    var myreg = "^(1)[0-9]{10}$";
    myreg = new RegExp(myreg);
    return myreg.test(tel);
  }
  
export const getDate=function(_,type,value){
    var date=''
    if(value){
        if(type=='day'){
            var d1=new Date(value[0])
            var d2=new Date(value[1])
            value[0]=d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate();
            value[1]=d2.getFullYear() + '-' + (d2.getMonth() + 1) + '-' + d2.getDate();
            return value
        }else if(type=='week'){
            var newDate = new Date(value);
            date= newDate.getFullYear() + '-' + (newDate.getMonth()+1) + '-' + newDate.getDate();
            return date
        }else if(type == 'month'){
            return value
        }
    }else{
        return ''
    }
    
}