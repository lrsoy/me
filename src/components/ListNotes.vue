<!-- ListNotes 主页知识汇总模块-->

<script setup lang="ts">
defineProps<{ notes: Record<string, any> }>()
</script>
<template>
  <div class="CustomizeHomeFeatures">
    <!-- <router-link data-aos="fade-up" v-for="(item, index) in notes" :key="index" :to="item.link"
      class="column  item mb-10 ">
      <article>
        <div class="entry-media">
          <img :src="item.image" class="w-full" />
        </div>
        <div class="inner flex ">
          <h2>{{ item.name }}</h2>
          <span :class="item.icon"></span>
        </div>
      </article>
    </router-link> -->

    <router-link data-aos="flip-up" v-for="(item, index) in notes" :key="index" :to="item.link"
      class="column  item mb-10 ">
      <div class="tc-image-effect16">
        <img :src="item.image" alt="img1">
        <div class="caption">
          <h3>{{ item.name }}</h3>
          <p>{{ item.desc }}</p>
        </div>
        <div class="link-wrap">
          <a href="#"><i :class="item.icon"></i></a>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style lang="scss">
.CustomizeHomeFeatures {
  width: 100%;
  column-count: 3;
  column-gap: 20px;

  .tc-image-effect16 {
    position: relative;
    overflow: hidden;
    background: #222;
  }

  .tc-image-effect16 img {
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
    opacity: 0.9;
  }

  .tc-image-effect16:hover img {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
    filter: blur(4px);
  }

  .tc-image-effect16 .caption {
    position: absolute;
    bottom: calc(50% - 30px);
    left: 50%;
    transform: translateX(-50%) translateY(50%);
    z-index: 10;
    text-align: center;
    width: 100%;
  }

  .tc-image-effect16:before,
  .tc-image-effect16:after {
    position: absolute;
    content: '';
    height: 0px;
    width: 0px;
    background-color: transparent;
    -webkit-transition: all .25s ease-in-out;
    transition: all .3s ease-in-out;
    opacity: 0;
  }

  .tc-image-effect16:before {
    border-left: 1px solid #fff;
    border-top: 1px solid #fff;
    top: 20px;
    left: 20px;
    z-index: 1;
  }

  .tc-image-effect16:after {
    border-right: 1px solid #fff;
    border-bottom: 1px solid #fff;
    bottom: 20px;
    right: 20px;
  }

  .tc-image-effect16:hover:before,
  .tc-image-effect16:hover:after {
    height: 40px;
    width: 40px;
    opacity: 1;
  }

  .tc-image-effect16 .caption h3 {
    color: #fff;
    margin-bottom: 8px;
    -webkit-transform: translateY(20px);
    transform: translateY(20px);
    -webkit-transition: all .5s ease-in-out;
    transition: all .5s ease-in-out;
    opacity: 0;
  }

  .tc-image-effect16 .caption p {
    -webkit-transform: translateY(50px);
    transform: translateY(50px);
    color: rgba(255, 255, 255, 0.7);
    opacity: 0;
    -webkit-transition: all .5s ease-in-out;
    transition: all .5s ease-in-out;
  }

  .tc-image-effect16:hover .caption h3,
  .tc-image-effect16:hover .caption p {
    opacity: 1;
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
  }

  .tc-image-effect16 .link-wrap {
    position: absolute;
    top: calc(50% - 25px);
    right: 50%;
    transform: translateX(50%) translateY(-50%);
    z-index: 10;
  }

  .tc-image-effect16 .link-wrap a {
    display: inline-block;
    height: 40px;
    width: 40px;
    line-height: 40px;
    background-color: rgba(0, 0, 0, 0.56);
    text-align: center;
    color: #fff;
    font-size: 14px;
    opacity: 0;
    border-radius: 50%;
    -webkit-transition: all .5s ease-in-out;
    transition: all .5s ease-in-out;
  }

  .tc-image-effect16 .link-wrap a:first-child {
    -webkit-transform: translateY(-30px);
    transform: translateY(-30px);
    margin-right: 5px;
  }

  .tc-image-effect16 .link-wrap a:last-child {
    -webkit-transform: translateY(-60px);
    transform: translateY(-60px);
  }

  .tc-image-effect16:hover .link-wrap a {
    opacity: 1;
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
  }

  .tc-image-effect16 .link-wrap a:hover {
    background-color: rgba(0, 0, 0, 0.76);
  }



  a.item {
    opacity: 1;
    break-inside: avoid-column;
    box-sizing: border-box;
    border-radius: 20px;

  }

  .column {
    display: inline-block;
    width: 100%;
    /* 列宽度 */
    margin-bottom: 20px;
    /* 元素间距 */
  }

  .entry-media {
    position: relative;
    overflow: hidden;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    transition: transform 0.3s ease;
  }

  .item:hover .entry-media img {
    /* 鼠标悬停时的图片效果 */
    // transform: scale(1.1);
  }

}
</style>

