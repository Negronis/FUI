import { oneOf } from '../../Util/assist.js'; 
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
        },
		// 用于判定是否允许在current路由上面附加路径
		append:{
			type:Boolean,
			required:false,
			default:false
		}
    },
    computed:{
        linkUrl(){
			let type = typeof this.to;
			// 判定如果传过来的to不是字符串则直接返回null
			if(type !== 'string'){
				return null;
			}
			// 判定跳转路径是否存在2个以上//,如果是则为绝对路径,不需要使用router
			if(this.to.includes('//')){
				return this.to;
			}
			// 在route中查找当前路由地址
			let router = this.$route;
			if(router){
				let current = this.$route;
				let route = router.resolve(this.to,current,this.append);
				return route ? route.href : this.to;
			}
			return this.to;
		}
    }
}