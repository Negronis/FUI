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

##### 混入的使用，以及点击事件的绑定：
新建一个mixin文件夹，加入link.js用来编写a标签的处理方式，最后混入组件中：

```javascript

// 首先引入mixin：
import mixinLink from '../Mixin/link.js';
// 然后添加mixins属性
mixins:[mixinLink]

```
然后开始编写link.js用来处理：
