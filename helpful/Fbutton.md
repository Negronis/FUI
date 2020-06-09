##### 步骤
    1. 新建FButton文件夹
    2. 新建FButton.vue
    3. 新建index.js导入
##### 创建components标签 
```html

  <component :is="tagName" :class="classBtn">
    <span v-if="showSlot">
      <slot></slot>
    </span>
  </component>

```
1.先赋予动态属性is用来判定渲染哪种标签，然后赋值class用于渲染样式
2.加入插槽并通过showSlot判定是否渲染插槽

##### 编写计算属性

```javascript

 computed: {
    showSlot() {
        return !!this.$slots.default
    },
    // 判定是否有:to属性 - router标签
    isHref() {
      let { to } = this;
      return !!to;
    },
    // 如果存在to则渲染a标签，否则渲染button
    tagName() {
      let { isHref } = this;
      return isHref ? "a" : "button";
    },
    // 暂时为空
    classBtn(){
        return "";
    }
  }

```
我们通过标签上是否有:to属性来判定渲染a标签还是button，通过判定按钮中是否由内容来决定是否渲染插槽。
这个时候已经可以渲染出一个没有样式的button。


##### 混入的使用
新建一个mixin文件夹，加入link.js用来编写a标签的处理方式，最后混入组件中：

```javascript

// 首先引入mixin：
import mixinLink from '../Mixin/link.js';
// 然后添加mixins属性
mixins:[mixinLink]

```
然后开始编写link.js用来处理：
首先定义函数oneOf用来返回该项目在数组中是否存在
```javascript

function oneOf(value,valueList){
    for(let i = 0 ; i < valueList.length ; i++){
        if(value == valueList[i]){
            return true;
        }
    }
    return false;
}

```
然后开始编写属性：
```javascript

	props:{
			to:{
				type:[Object,String]
			},
	}

```
加入props之后组件就可以通过to来判定是否渲染a标签。

##### 关于标签属性的渲染：
现在我们渲染出来的是一个没有任何属性的a标签  
在component标签上加入v-bind属性：
```html

  <component :is="tagName" :class="classBtn" v-bind='tagProp'>
    <span v-if="showSlot">
      <slot></slot>
    </span>
  </component>

```
然后编写tagProp(他是个计算属性)用来赋予传过来的标签属性，他需要两个属性：一个是要跳转的连接，一个跳转方式，把它写在link.js中：

```javascript

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

```

编写完link.js回来编写计算属性tagProp：
```javascript

	tagProp(){
		const {isHref} = this;
		if(isHref){
			const {linkUrl,target} = this;
			return {href:linkUrl ,target}
		} 
	} 

```
通过判定是否存在url赋予标签href属性和target属性，这个时候就实现了通过to和append判定渲染的问题。
##### 下一步：通过传入的type属性来决定显示的样式
首先抽离oneOf函数，提为公共函数，放入Util/assist.js中。
然后将link.js中的oneOf函数改为：
```javascript

import { oneOf } from '../../Util/assist.js'; 

```
1.在props中加入type用来获取
```javascript

props:{
	type:{ 
		validator(value){
			return oneOf(value,['primary','warning','default','success'])
		},
		default:'default'
	}
}

```
2.修改tagProp，将type进行赋值
```javascript

	tagProp(){
		const {isHref} = this;
		if(isHref){
			const {linkUrl,target} = this;
			return {href:linkUrl ,target}
		}else{
			const {type} = this;
			return {type:type};
		}
	} 

```
3.修改className来为它赋予样式名称：
```javascript
	//首先
	const prefixCls = 'fui-btn'
	//然后在计算属性中重写className
	classBtn(){
	  return [
		  `${prefixCls}`,
		  `${prefixCls}-${this.type}`,
		  //后面会加
		   {
			  [`${prefixCls}-long`]: this.long,
			  [`${prefixCls}-${this.shape}`]: !!this.shape,
			  [`${prefixCls}-${this.size}`]: this.size !== 'default',
			  [`${prefixCls}-loading`]: this.loading != null && this.loading,
			  [`${prefixCls}-icon-only`]: !this.showSlot && (!!this.icon || !!this.customIcon || this.loading),
			  [`${prefixCls}-ghost`]: this.ghost
		   }
	  ]
	}
```
然后开始为它写样式，同时定义一些公共样式：  
新建style文件夹，下面新建components用来存放组件样式  
新建custom.less用来存放公共样式，新建index.less用来导入所有样式。   

首先在最外层style/index.less中导入所有的样式：
```css
	@import './custom';
	@import './components/index';
```
然后在custom.less中写公共开头：
```css
// Prefix
@css-prefix : fui;
@css-prefix-iconfont    : fui-icon;
// 基本颜色
@primary-color          : #2d8cf0;
@info-color             : #2db7f5;
@success-color          : #19be6b;
@processing-color       : @primary-color;
@warning-color          : #ff9900;
@error-color            : #ed4014;
@normal-color           : #e6ebf1;
@link-color             : #2D8cF0;
@link-hover-color       : tint(@link-color, 20%);
@link-active-color      : shade(@link-color, 5%);
@selected-color         : fade(@primary-color, 90%);
@tooltip-color          : #fff;
@subsidiary-color       : #808695;
@rate-star-color        : #f5a623;
@white: #fff;
@black: #000;
```  
先修改style/components/index.less导入样式：
```css
@import  "FButton";
```
然后修改style/components/FButton.less：
```css
.btn{ 
	padding:8px 15px; 
	display:inline-block;
	text-decoration: none;
	color:#000;
	border:0;
	font-size:14px;
	font-size:14px; 
	text-align: center;
	cursor: pointer;
	&:focus{
		outline:none;
	}
}
.colorF{
	color:#fff;
}
.btn-default{
	background-color:@normal-color;
}
.btn-primary{
	background-color:@primary-color; 
	.colorF();
}
.btn-warning{
	background-color:@warning-color; 
	.colorF();
}
.btn-success{
	background-color:@success-color; 
	.colorF();
}
.btn-error{
	background-color:@error-color;
	.colorF();
}
@btn-prefix-cls : ~"@{css-prefix}-btn";
.@{btn-prefix-cls}{
	.btn;
	.btn-default;
	&-primary{
		.btn-primary; 
	}
	&-warning{
		.btn-warning;
	}
	&-success{
		.btn-success;
	}
	&-error{
		.btn-error
	}
}
```