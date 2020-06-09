function oneOf(value,valueList){
    for(let i = 0 ; i < valueList.length ; i++){
        if(value == valueList[i]){
            return true;
        }
    }
    return false;
}
export default{
    props:{
        to:{
            type:[Object,String]
        },
        target:{
            type:String,
            validator(value){
                return oneOf(value,['_blank', '_self', '_parent', '_top'])
            },
            default:'_self'
        }
    },
    computed:{
        
    }
}