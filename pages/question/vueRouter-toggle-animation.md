---
  title: 关于 Cannot read property of null (reading '_leave Cb') 错误
  display: 关于 Cannot read property of null (reading '_leave Cb') 错误
  image: /image/banner1.jpg
  description: 
  subtitle: 
  date: 2023-07-09
  type: question
  author: lrsoy
  toc: true
  duration: 30min
---


<DelayTeleport>

[[toc]]
</DelayTeleport>

# 你好
## 你好
### 你好
#### 你好
##### 你好
###### 你好

你好**你好**

## 面包屑
1. 在实现一个面包屑的时候，遇到了这样的一个问题，三级路由页面需要与二级路由页面同级显示，但是他们的路由配置规则是嵌套的关系，也就是二级路由页面与三级路由页面，都会通过一级路由页面去展示。通过在网络上找答案，找到几个相关的，但绝大部分都是`vue2` 实现的方式，下面是通过`vue3` h函数去实现的，然后在通过路由记录，去渲染面包屑导航。

* 你好  




> 你好吗
>
> 你好吗



<CodeGroup>
  <CodeGroupItem title="PNPM" active>

```bash
git init
pnpm init
```

  </CodeGroupItem>

  <CodeGroupItem title="YARN">

```bash
git init
yarn init
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
git init
npm init
```

  </CodeGroupItem>
</CodeGroup>




| 1    | 1    | 1    |
| ---- | ---- | ---- |
| 1    | 1    | 1    |
| 1    | 1    | 1    |
| 1    | 1    | 1    |



```js

1. 实现方式
import { h, resolveComponent } from 'vue'
export default {
  path: '/edit',
  name: 'edit',
  meta: { auth: true, permission: "edit", menu: { icon: 'fab fa-fort-awesome-alt', title: '编辑列表', breadCrumbs: '编辑列表' } },
  component: () => import("@/layouts/admin.vue"),
  redirect: "/edit/content",
  children: [
    {
      path: '/edit/content',
      component: { // 重点
        render: () => {
          return h(resolveComponent('router-view'))
        }
      },
      meta: { permission: "content", isMenu: true, menu: { title: '编辑内容', breadCrumbs: '编辑内容' } },
      children: [
        {
          path: '',
          name: 'content',
          component: () => import("@/views/edit/content.vue"),
        },
        {
          name: 'content_about',
          path: '/edit/content/about',
          component: () => import("@/views/edit/about.vue"),
          meta: { menu: { breadCrumbs: '编辑详情' } }
        },
      ]
    },
    {
      name: 'edit_data',
      path: '/edit/edit_data',
      component: () => import("@/views/edit/edit-data.vue"),
      meta: { permission: "edit_data", menu: { title: '数据管理', breadCrumbs: '数据管理' } }
    }
  ]
}
```

2. 问题就是配置完这个之后，当路由跳转的时候，就开始报错，`Cannot read property of null (reading '_leave Cb') `一开始是这个错误，之后的错误我没有复制，各种的找不到，各种为空，最后在通过找了几天的答案，在github上面找到了这个问题，提出的人，并且也找到了回答，发现确实是他所回答到的，由于`过渡和 KeepAlive 的使用仍在进行中，RFC 可能会有一些重大变化`，打开我自己的代码，注掉了过度组件确实是因为这个动画的原因

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cee94a033bfc4144a1d9296a675879ee~tplv-k3u1fbpfcp-watermark.image?)

最后通过自定义的`tailwindcss`，而不是去使用动画库完成动画，希望这个答案会给你很多帮助，面对这种错误，对于我这种菜鸡，只能不断的去查找答案，简单的记录一下，下次在遇到会有一个印象。

[github issuse的位置](https://github.com/vuejs/router/issues/341)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2202d3104bb24af596488fdd5387b283~tplv-k3u1fbpfcp-watermark.image?)


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17b4a905e20e47998bc94e84ee7c5f49~tplv-k3u1fbpfcp-watermark.image?)