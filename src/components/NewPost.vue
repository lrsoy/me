<!-- NewPost -->

<script setup lang="ts">
import { formatDate } from '~/logics'
import dayjs from 'dayjs'
import type { Frontmatter } from '~/types'
const { frontmatter } = defineProps({
  frontmatter: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const route = useRoute()
const content = ref<HTMLDivElement>()
const viewSide = ref<HTMLDivElement>()

onMounted(() => {
  const navigate = () => {
    if (location.hash) {
      document.querySelector(decodeURIComponent(location.hash))
        ?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleAnchors = (
    event: MouseEvent & { target: HTMLElement },
  ) => {
    const link = event.target.closest('a')

    if (
      !event.defaultPrevented
      && link
      && event.button === 0
      && link.target !== '_blank'
      && link.rel !== 'external'
      && !link.download
      && !event.metaKey
      && !event.ctrlKey
      && !event.shiftKey
      && !event.altKey
    ) {
      const url = new URL(link.href)
      if (url.origin !== window.location.origin)
        return

      event.preventDefault()
      const { pathname, hash } = url
      if (hash && (!pathname || pathname === location.pathname)) {
        window.history.replaceState({}, '', hash)
        navigate()
      }
      else {
        router.push({ path: pathname, hash })
      }
    }
  }

  useEventListener(window, 'hashchange', navigate)
  useEventListener(content.value!, 'click', handleAnchors, { passive: false })

  navigate()
  setTimeout(navigate, 500)
})


// 通过路由获取最新发布的文章
const routes: Frontmatter[] = router.getRoutes()
  .map(i => {
    const frontmatter = i.meta.frontmatter as any;
    return { ...i, meta: { ...i.meta, frontmatter } }
  })
  .sort((a, b) => +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date))
  .filter(f => f.meta.frontmatter?.toc)
  .filter(i => !i.path.endsWith('.html') && i.meta.frontmatter.type)
  .slice(0, 9)
  .map(m => {
    return {
      path: m.path,
      ...m.meta.frontmatter
    }
  })

const link = computed(() => {
  const i = route.path.split('/').slice(0, -1).join('/')
  const isHas = router.getRoutes().some(s => s.path === route.path)
  if (!isHas) {
    return '/'
  }
  return i
})
</script>
<template>
  <div class="NewPost">
    <template v-if="frontmatter.display ?? frontmatter.title">
      <div class="w-[750px] m-auto displaytitle slide-enter">
        <h1 class="mb-0 tit">
          {{ frontmatter.display ?? frontmatter.title }}
        </h1>
        <hr class="h-1 block" />
        <div class="post_detail post_date " v-if="frontmatter.date">
          <span class="post_info_date">
            <span>发布于: {{ dayjs(frontmatter.date) }}</span>
          </span>
        </div>
      </div>
    </template>
    <article ref="content" id="article_content">
      <slot />
      <div>
        <div class="side">
          <div v-if="frontmatter?.toc" id="view_side" ref="viewSide" class="slide-enter"></div>
        </div>
      </div>
    </article>
  </div>
</template>

<style lang="scss">
.NewPost {
  width: 100%;
  height: 100%;

  .displaytitle {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 10px 0;
    border-radius: 5px;
    margin-bottom: 20px;

    h1 {
      font-weight: 800;
      font-size: 34px;
      font-family: "Josefin Sans", Helvetica, Arial, sans-serif;
      letter-spacing: 0;
      color: #000000;
    }

    hr {
      width: 50px;
      display: block;
      margin: auto;
      margin: 5px 0 10px 0;
      border-color: #be9656;
    }

    .post_detail {
      font-size: 13px;
      color: #999;
    }
  }
}
</style>
<!-- ---
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
    - name: 'vscode'
      link: '/vscode-plugin'
      desc: 'vscode 插件开发'
      icon: 'i-vscode-icons-file-type-vscode'
      image: ''

---
 -->
<!-- @layout-full-width -->
<!-- <ListNotes :notes="frontmatter.notes"/> -->