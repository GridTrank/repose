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