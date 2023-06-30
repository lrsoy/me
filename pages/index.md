---
title: lrsoy_
display: ''
notes: 
  Basal: 
    - name: 'HTML'
      link: "/html"
      desc: "Html笔记"
      icon: 'i-ri-html5-fill'
      image: '/image/html.jpg'
    - name: 'CSS'
      link: "/css"
      desc: "css笔记"
      icon: 'i-ion-logo-css3'
      image: '/image/css.png'
    - name: 'JavaScript'
      link: "/js"
      desc: "javascript笔记"
      icon: 'i-teenyicons-javascript-solid'
      image: '/image/JavaScript.jpg'
    - name: 'TypeScript'
      link: "/ts"
      desc: "TypeScript笔记"
      icon: 'i-akar-icons-typescript-fill'
      image: '/image/typescript.png'
  Frame:
    - name: 'Vue'
      link: '/vue'
      desc: 'Vue.js 笔记'
      icon: "i-ri-vuejs-fill"
      image: '/image/vue.jpg'
    - name: 'React'
      link: '/react'
      desc: 'React 笔记'
      icon: "i-akar-icons-react-fill"
      image: '/image/react.png'
  Frontend Tooling:
    - name: 'Vite'
      link: '/'
      desc: 'Vite笔记'
      icon: "i-simple-icons-vite"
      image: '/image/vite.png'
    - name: 'webpack'
      link: '/webpack'
      desc: 'webpack笔记'
      icon: "i-file-icons-webpack"
      image: '/image/webpack.jpeg'
    - name: 'rollup'
      link: '/rollup'
      desc: 'rollup笔记'
      icon: "i-simple-icons-rollupdotjs"
      image: '/image/rollup.jpg'
  Package Management Tool:
    - name: 'npm'
      link: '/'
      desc: 'npm笔记'
      icon: "i-teenyicons-npm-outline"
      image: '/image/npm.png'
    - name: 'yarn'
      link: '/'
      desc: 'yarn笔记'
      icon: "i-simple-icons-yarn"
      image: '/image/yarn.png'
    - name: 'pnpm'
      link: '/'
      desc: 'pnpm笔记'
      icon: "i-file-icons-pnpm"
      image: '/image/pnpm.jpg'
  Git: 
    - name: 'git'
      link: '/git'
      desc: 'git笔记'
      icon: "i-teenyicons-git-solid"
      image: '/image/git.png'
    - name: 'github'
      link: '/'
      desc: 'github笔记'
      icon: "i-bi-github"
      image: '/image/github.jpeg'
    - name: 'github actions'
      link: '/'
      desc: 'github actions 笔记'
      icon: "i-simple-icons-githubactions"
      image: '/image/github-actions.png'
  Server: 
    - name: 'Node'
      link: '/node'
      desc: 'Node 笔记'
      icon: "i-mdi-nodejs"
      image: '/image/node.jpg'
  Test: 
    - name: 'Vitest'
      link: '/vitest'
      desc: 'Vitest笔记'
      icon: "i-simple-icons-vitest"
      image: '/image/vitest.png'
  Other: 
    - name: '算法'
      link: '/LeetCode'
      desc: 'LeetCode 算法'
      icon: "i-simple-icons-leetcode"
      image: '/image/sf.png'
    - name: '部署'
      link: '/other'
      desc: '前端部署相关知识'
      icon: 'i-devicon-jenkins'
      image: ''

---
<!-- @layout-full-width -->
<ListNotes :notes="frontmatter.notes"/>