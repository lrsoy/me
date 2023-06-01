<!-- ListNotes 主页知识汇总模块-->

<script setup lang="ts">
defineProps<{ notes: Record<string, any> }>()
</script>
<template>
  <div class="CustomizeHomeFeatures">
    <router-link v-for="(item, index) in notes" :key="index" :to="item.link" class="column  item mb-10">
      <article>
        <div class="entry-media">
          <img :src="item.image" class="w-full" />
        </div>
      </article>
    </router-link>
  </div>
  <!-- <div class="mod-hd mt-5">
      <h2 class="font-bold">
        {{ key }}
      </h2>
    </div>
    <div class="CustomizeHomeFeatures ">
      <router-link v-for="(item, index) in notes[key]" :key="index" :to="item.link"
        class="item relative flex items-center" :title="item.name">
        <article>
          <div class="entry-media">
            <img src="/image/banner3.jpg" />
          </div>
          <div class="inner">
            <div class="avatar">
              <img src="/image/avatar.jpg" />
            </div>
            <div class="title">
              <div class="label"></div>
              <h2>{{ item.name }}</h2>
            </div>
            <div class="content">a</div>
          </div>
        </article>
      </router-link>
    </div> -->
</template>

<style lang="scss">
.CustomizeHomeFeatures {
  width: 100%;
  column-count: 3;
  column-gap: 20px;

  a.item {
    opacity: 1;
  }

  .column {
    display: inline-block;
    width: 100%;
    /* 列宽度 */
    margin-bottom: 20px;
    /* 元素间距 */
  }

  .item {
    display: block;
    text-decoration: none;
    color: #000;
  }

  .item:hover {
    /* 鼠标悬停时的样式 */
    /* 可根据需要自定义 */
  }

  .entry-media {
    position: relative;
    overflow: hidden;
  }

  .entry-media img {
    display: block;
    width: 100%;
    height: auto;
    transition: transform 0.3s ease;
  }

  .item:hover .entry-media img {
    /* 鼠标悬停时的图片效果 */
    transform: scale(1.1);
  }

}
</style>
