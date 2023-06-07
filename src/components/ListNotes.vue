<!-- ListNotes 主页知识汇总模块-->

<script setup lang="ts">
defineProps<{ notes: Record<string, any> }>()
</script>
<template>
  <div class="CustomizeHomeFeatures">
    <router-link v-for="(item, index) in notes" :key="index" :to="item.link" class="column  item mb-10 ">
      <article>
        <div class="entry-media">
          <img :src="item.image" class="w-full" />
        </div>
        <div class="inner flex ">
          <h2>{{ item.name }}</h2>
          <span :class="item.icon"></span>
        </div>
      </article>
    </router-link>
  </div>
</template>

<style lang="scss">
.CustomizeHomeFeatures {
  width: 100%;
  column-count: 3;
  column-gap: 20px;

  a.item {
    opacity: 1;
    break-inside: avoid-column;
    box-sizing: border-box;
    box-shadow: 18px 18px 30px rgba(0, 0, 0, 0.1), -18px -18px 30px rgba(255, 255, 255, 1);
    border-radius: 20px;
    background-color: #efeeee;
    transition: box-shadow .2s ease-out;

    &:hover {
      box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px rgba(255, 255, 255, 0.8), inset 18px 18px 30px rgba(0, 0, 0, 0.1), inset -18px -18px 30px rgba(255, 255, 255, 1);
      transition: box-shadow .2s ease-out;
    }

    article {
      box-sizing: border-box;
      padding: 10px;

      .entry-media {
        border-radius: 20px;
      }

      .inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: bold;
        height: 40px;

        span {
          font-size: 20px;
        }
      }
    }
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
    // transform: scale(1.1);
  }

}
</style>
