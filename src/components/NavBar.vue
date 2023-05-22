<!-- NavBar -->

<script setup lang="ts">
import dayjs from 'dayjs'
const route = useRoute()
const metaData = computed(() => route.meta?.frontmatter)

</script>
<template>
  <header>
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
        <h1>{{ metaData.display ?? metaData.title }}</h1>
        <div class="subtitle" v-if="metaData.subtitle">
          {{ metaData.subtitle }}
        </div>
      </div>
    </div>
    <div class="creative-time h-[80px] absolute w-full -bottom-[80px]">
      <div class="avatar w-[680px] m-auto h-full relative">
        <a href="https://github.com/lrsoy" target="_blank" class="absolute z-10 left-0 -top-19">
          <img class="w-30 h-30 rounded-full" src="/image/avatar.jpg" alt="">
        </a>
        <strong>
          <a href="https://github.com/lrsoy">Lrsoy（中国北京）</a>
        </strong>
        <div class="vc_time" v-if="metaData.date">
          <span>{{ dayjs(metaData.date) }}</span>
        </div>
      </div>
    </div>
  </header>
  <!-- <header>
    <router-link class="w-10 h-10 absolute lg:fixed m-2 select-none outline-none" to="/" focusable="false">
      <img src="/book.svg" alt="" class="w-10 h-10">
    </router-link>
    <nav class="w-full p-4 box-border flex justify-end gap-5">
      <router-link to="/" title="Blog">
        <span>/</span>
      </router-link>
      <router-link to="/homes" title="Blog">
        <span>知识汇总</span>
      </router-link>
      <router-link to="/about" title="Blog">
        <span>about</span>
      </router-link>
      <a href="https://www.instagram.com/lrsoy_/" target="_blank" title="Instagram">
        <Ins />
      </a>
      <a href="https://github.com/lrsoy" target="_blank" title="Github">
        <Github />
      </a>
    </nav>
  </header> -->
</template>

<style  lang="scss">
header {
  width: 100%;
  height: 400px;
  position: relative;
}

header::before {
  content: '';
  z-index: 10;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: -moz-radial-gradient(center,
      ellipse cover,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 36%,
      rgba(0, 0, 0, 0.65) 100%);
  /* FF3.6-15 */
  background: -webkit-radial-gradient(center,
      ellipse cover,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 36%,
      rgba(0, 0, 0, 0.65) 100%);
  /* Chrome10-25,Safari5.1-6 */
  background: radial-gradient(ellipse at center,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 36%,
      rgba(0, 0, 0, 0.65) 100%);
  /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000',
      endColorstr='#a6000000',
      GradientType=1);
  /* IE6-9 fallback on horizontal gradient */
  opacity: 0.6;
}

header::after {
  content: '';
  position: absolute;
  z-index: -1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #000;
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

.nav-wrapper {
  width: 100%;
  position: relative;
  z-index: 1000;
  background: rgba(4, 67, 98, 0.25);
}

header .bk-img {
  position: absolute;
  width: 100%;
  height: 400px;
  overflow: hidden;
  top: 0;
}

@mixin headers ($imgurl) {
  background: url($imgurl) center center;
  background-size: cover;
  position: absolute;
  width: 100%;
  height: 400px;
}

.header-img1 {
  @include headers('/image/banner2.jpg');
}

.header-img2 {
  @include headers('/image/banner1.jpeg');
}

.header-img3 {
  @include headers('/image/header3.jpg');
}

.nav {
  max-width: 1000px;
  margin: 0 auto;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .links {

    a,
    a:active,
    a:visited {
      font-weight: 700;
      color: white;
      text-decoration: none;
    }
  }
}
</style>
