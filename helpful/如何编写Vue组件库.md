##### 第一步
使用Vue-CLI3创建一个项目
##### 第二步
修改文件夹名称：
src => examples
添加一个文件夹packages
##### 第三步
修改Vue默认启动目录：
    1. 新建vue.config.js
    2. 写入代码：  
```javascript
module.exports = {
    pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    // 拓展webpacK
    chainWebpack: config => {
        config.module.rule('js')
            .include
            .add('/packages')
            .end()
            .use('bable')
            .loader('babel-loader')
    }
}
```
##### 第四部 编写组件
在Packages下新建组件Button的文件夹：
Button -> src ->index.html
       -> index.js
然后编写这个组件：
```javascript

<template>
  <div class="x-button">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "x-button",
  props: {
    type: String,
  },
};
</script>

<style scope>
.x-button {
  display: inline-block;
  padding: 3px 6px;
  background: #000;
  color: #fff;
}
</style>

```
##### 第五步 编写button下的index.js

```javascript

import XButton from './src';
// 按需引入
XButton.install = function (Vue) {
    Vue.component(XButton.name, XButton)
}
// 导出组件
export default XButton;

```

##### 第六步 在packages的入口文件位置导入组件并安装导出

```javascript

import XButton from './Button/src';
const components = [
    XButton
];
// 定义install方法，接受Vue，如果使用use注册则所有组件都会被注册
const install = function (Vue) {
    if (install.installed) return;
    components.map(component => Vue.component(component.name, component))
}
//判定是否直接引入文件
if (typeof window !== undefined && window.Vue) {
    install(window.Vue)
}
export default {
    install,
    XButton
}


```

##### 第七步 测试
找到Main.js并写入：
```javascript

import Vue from 'vue'
import App from './App.vue'
import Xui from '../package';
Vue.use(Xui)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')


```

然后再app.vue中写入：

```javascript

  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <x-button>
      这是个按钮
    </x-button>
  </div>

```


##### 第六步 配置打包规范
script下新增：
```javascript

  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "lib":"vue-cli-service build --target lib --name xui --dest lib packages/index.js"
  }

```