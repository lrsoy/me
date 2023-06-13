<!-- NavBar -->

<script setup lang="ts">
import type { Frontmatter } from '~/types'
import { ComputedRef } from 'vue'
import dayjs from 'dayjs'
const route = useRoute()
const metaData: ComputedRef<Frontmatter> = computed(() => route.meta?.frontmatter as Frontmatter)

</script>
<template>
  <header class="mb-[20px]">
    <TransitionGroup name="fade" tag="div" class="bk-img">
      <div key="img1" v-if="route.path === '/'" class="header-img1"></div>
      <div key="img2" v-else-if="route.path === '/homes'" class="header-img2"></div>
      <div key="img3" v-else class="header-img3"></div>
    </TransitionGroup>
    <div class="title">
      <router-link class="w-10 h-10 absolute   select-none outline-none " to="/" focusable="false">
        <img src="/book.svg" alt="" class="w-10 h-10">
      </router-link>
      <nav class="nav">
        <div class="right">
          <router-link to="/homes" title="Blog">
            <span>
              <i class="i-fxemoji-books"></i>
              知识汇总
            </span>
          </router-link>
          <router-link to="/about" title="Blog">
            <span>
              <i class="i-icon-park-error"></i>
              问题合集
            </span>
          </router-link>
          <a href="https://github.com/lrsoy" target="_blank" title="github">
            <span>
              <i class="i-devicon-github"></i>
              Github
            </span>
          </a>
          <a href="https://www.instagram.com/lrsoy_" target="_blank" title="github">
            <span>
              <i class="i-skill-icons-instagram"></i>
              instagram
            </span>
          </a>
        </div>
      </nav>

    </div>
    <template v-if="metaData.display ?? metaData.title">
      <div class="description absolute z-10  text-white">
        <h1 class="mb-0 slide-enter">
          {{ metaData.display ?? metaData.title }}
        </h1>
      </div>
    </template>
  </header>
  <!-- <header class="mb-[90px]">
    <TransitionGroup name="fade" tag="div" class="bk-img">
      <div key="img1" v-if="route.path === '/'" class="header-img1"></div>
      <div key="img2" v-else-if="route.path === '/homes'" class="header-img2"></div>
      <div key="img3" v-else class="header-img3"></div>
    </TransitionGroup>
    <div class="nav-wrapper text-white">
      <nav class="nav">
        <router-link class="w-10 h-10 block" to="/" focusable="false">
          <img src="/book.svg" alt="" class="w-10 h-10">
        </router-link>
        <div class="links flex gap-4">
          <router-link to="/homes" title="Blog">
            <span>知识汇总</span>
          </router-link>
          <router-link to="/about" title="Blog">
            <span>about</span>
          </router-link>
        </div>
      </nav>
    </div>
    <div class="view_info">
      <div class="vi_con">
        <h1>{{ metaData.display ?? metaData.title ?? '这是我的Blog' }}</h1>
        <div class="subtitle">
          {{ metaData.subtitle ?? '还没想好要介绍什么' }}
        </div>
      </div>
    </div>
    <div class="creative-time h-[80px] absolute w-full -bottom-[80px]">
      <div class="w-[1000px] m-auto h-full flex justify-between">
        <div class="avatar w-[680px] h-full relative">
          <a href="https://github.com/lrsoy" target="_blank" class="absolute z-10 left-0 -top-19">
            <img class="w-30 h-30 rounded-full" src="/image/avatar.jpg" alt="">
          </a>
          <strong>
            <a href="https://github.com/lrsoy">Lrsoy（中国北京）</a>
          </strong>
          <div class="vc_time">
            <span>{{ dayjs(metaData.date).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </div>
        </div>
        <div class="w-[245px] grid grid-cols-2">
          <div class="icons">
            <a href="https://github.com/lrsoy">
              <Github />
              <p>Github</p>
            </a>
          </div>
          <div class="icons">
            <a href="https://www.instagram.com/lrsoy_/">
              <Ins />
              <p>instagram</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </header> -->
</template>

<style  lang="scss">
header {
  width: 100%;
  height: 400px;
  position: relative;

  .title {
    height: 64px;
    box-sizing: border-box;
    border-bottom: 1px solid #d7d7d7;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.05);
    display: flex;
    padding: 12px 20px;
    background-color: white;
  }


  .nav {
    width: 100%;
    display: grid;
    // grid-template-columns: auto max-content;

    .right {
      margin: auto;
      line-height: 40px;
      display: grid;
      grid-gap: 1.2rem;
      grid-auto-flow: column;
      font-weight: 500;
      white-space: nowrap;
      font-size: .9rem;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  transform: scale(1.1) translateZ(0);
  opacity: 0;
  background-color: pink;
}


header .bk-img {
  position: absolute;
  width: 100%;
  height: 400px;
  overflow: hidden;
  top: 0;
  z-index: -1;
}

@mixin headers ($imgurl) {
  background: url($imgurl) center center;
  background-size: cover;
  position: absolute;
  width: 100%;
  height: 400px;
}

.header-img1 {
  @include headers('/image/th.jpg');
}

.header-img2 {
  @include headers('/image/banner1.jpg');
}

.header-img3 {
  @include headers('/image/banner3.jpg');
}
</style>
