---
title: lrsoy_
display: ''
homeLogo: '/image/logoHomeLogo.jpg'
notes: 
  - name: 'HTML'
    link: "/html"
    desc: "Html笔记"
    icon: 'i-ri-html5-fill'
    image: '/image/html.jpg'
    type: 'html'
  - name: 'CSS'
    link: "/css"
    desc: "css笔记"
    icon: 'i-ion-logo-css3'
    image: '/image/css.png'
    type: 'css'
  - name: 'JavaScript'
    link: "/js"
    desc: "javascript笔记"
    icon: 'i-teenyicons-javascript-solid'
    image: '/image/JavaScript.jpg'
    type: 'javascript'
  - name: 'TypeScript'
    link: "/ts"
    desc: "TypeScript笔记"
    icon: 'i-akar-icons-typescript-fill'
    image: '/image/typescript.png'
    type: 'typescript'
  - name: 'Vue'
    link: '/vue'
    desc: 'Vue.js 笔记'
    icon: "i-ri-vuejs-fill"
    image: '/image/vue.jpg'
    type: 'vue'
  - name: 'React'
    link: '/react'
    desc: 'React 笔记'
    icon: "i-akar-icons-react-fill"
    image: '/image/react.png'
    type: 'react'
  - name: 'Vite'
    link: '/'
    desc: 'Vite笔记'
    icon: "i-simple-icons-vite"
    image: '/image/vite.png'
    type: 'vite'
  - name: 'webpack'
    link: '/webpack'
    desc: 'webpack笔记'
    icon: "i-file-icons-webpack"
    image: '/image/webpack.jpeg'
    type: 'webpack'
  - name: 'rollup'
    link: '/rollup'
    desc: 'rollup笔记'
    icon: "i-simple-icons-rollupdotjs"
    image: '/image/rollup.jpg'
    type: 'rollup'
  - name: 'npm'
    link: '/'
    desc: 'npm笔记'
    icon: "i-teenyicons-npm-outline"
    image: '/image/npm.png'
    type: 'npm'
  - name: 'yarn'
    link: '/'
    desc: 'yarn笔记'
    icon: "i-simple-icons-yarn"
    image: '/image/yarn.png'
    type: 'yarn'
  - name: 'pnpm'
    link: '/'
    desc: 'pnpm笔记'
    icon: "i-file-icons-pnpm"
    type: 'pnpm'
    image: '/image/pnpm.jpg'
  - name: 'git'
    link: '/git'
    desc: 'git笔记'
    icon: "i-teenyicons-git-solid"
    image: '/image/git.png'
    type: 'git'
  - name: 'github'
    link: '/'
    desc: 'github笔记'
    icon: "i-bi-github"
    image: '/image/github.jpeg'
    type: 'github'
  - name: 'github actions'
    link: '/'
    desc: 'github actions 笔记'
    icon: "i-simple-icons-githubactions"
    image: '/image/github-actions.png'
    type: 'actions'
  - name: 'Node'
    link: '/node'
    desc: 'Node 笔记'
    icon: "i-mdi-nodejs"
    image: '/image/node.jpg'
    type: 'node'
  - name: 'Vitest'
    link: '/vitest'
    desc: 'Vitest笔记'
    icon: "i-simple-icons-vitest"
    image: '/image/vitest.png'
    type: 'vitest'
  - name: '算法'
    link: '/LeetCode'
    desc: 'LeetCode 算法'
    icon: "i-simple-icons-leetcode"
    image: '/image/sf.png'
    type: 'LeetCode'
  - name: '部署'
    link: '/other'
    desc: '前端部署相关知识'
    icon: 'i-devicon-jenkins'
    image: '/image/sf.png'
    type: 'other'
  - name: 'vscode'
    link: '/vscode-plugin'
    desc: 'vscode 插件开发'
    icon: 'i-vscode-icons-file-type-vscode'
    image: '/image/sf.png'
    type: 'vscode-plugin'
---

<!-- @layout-full-width -->
<NewListNotes :notes="frontmatter.notes"/>