---
title: lrsoy_
notes: 
  Basal: 
    - name: 'HTML'
      link: "/posts/html"
      desc: "Html笔记"
      icon: 'i-ri-html5-fill'
    - name: 'CSS'
      link: "/posts/css"
      desc: "css笔记"
      icon: 'i-ion-logo-css3'
    - name: 'JavaScript'
      link: "/posts/javascript"
      desc: "javascript笔记"
      icon: 'i-teenyicons-javascript-solid'
    - name: 'TypeScript'
      link: "/posts/typescript"
      desc: "TypeScript笔记"
      icon: 'i-akar-icons-typescript-fill'
  Frame:
    - name: 'Vue2'
      link: '/'
      desc: 'Vue.js 2.x笔记'
      icon: "i-ri-vuejs-fill"
    - name: 'Vue3'
      link: '/'
      desc: 'Vue.js 3.x笔记'
      icon: "i-ri-vuejs-fill"
    - name: 'React'
      link: '/'
      desc: 'React 笔记'
      icon: "i-akar-icons-react-fill"
    - name: 'Electron桌面端'
      link: '/posts/electron'
      desc: '桌面端应用开发'
      icon: 'i-ion-logo-electron'
  Frontend Tooling:
    - name: 'Vite'
      link: '/'
      desc: 'Vite笔记'
      icon: "i-simple-icons-vite"
    - name: 'webpack'
      link: '/'
      desc: 'webpack笔记'
      icon: "i-file-icons-webpack"
    - name: 'rollup'
      link: '/'
      desc: 'rollup笔记'
      icon: "i-simple-icons-rollupdotjs"
  Package Management Tool:
    - name: 'npm'
      link: '/posts/npm'
      desc: 'npm笔记'
      icon: "i-teenyicons-npm-outline"
    - name: 'yarn'
      link: '/'
      desc: 'yarn笔记'
      icon: "i-simple-icons-yarn"
    - name: 'pnpm'
      link: '/'
      desc: 'pnpm笔记'
      icon: "i-file-icons-pnpm"
  Git: 
    - name: 'git'
      link: '/posts/git'
      desc: 'git笔记'
      icon: "i-teenyicons-git-solid"
    - name: 'github'
      link: '/'
      desc: 'github笔记'
      icon: "i-bi-github"
    - name: 'github actions'
      link: '/posts/github-actions'
      desc: 'github actions 笔记'
      icon: "i-simple-icons-githubactions"
  Server: 
    - name: 'Node'
      link: '/'
      desc: 'Node 笔记'
      icon: "i-mdi-nodejs"
  Test: 
    - name: 'Vitest'
      link: '/posts/vitest'
      desc: 'Vitest笔记'
      icon: "i-simple-icons-vitest"
  Other: 
    - name: '算法'
      link: '/'
      desc: 'LeetCode 算法'
      icon: "i-simple-icons-leetcode"

---
<!-- @layout-full-width -->

<ListNotes :notes="frontmatter.notes"/>