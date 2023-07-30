<!-- Home -->

<script setup lang="ts">
</script>
<template>
  <div class="home-container">
    <div class="P-top-card" v-for="item in 3">
      <div class="P-top-icon-wrap">
        <!-- 封面 -->
        <img src="/image/html.jpg" />
      </div>
      <div class="P-content-wrap">
        <div class="tag"><span>精品歌单</span></div>
        <!-- 标题 -->
        <div class="title">「PB-R&B 」另类迷幻的空灵音律</div>
        <!-- 介绍 -->
        <div class="info">
          PBR&B也可以称为独立R&B或另类R&B，它通过合成器制造出一种冰冷空旷的感觉。 并结合嘻哈、电子、迷幻摇滚和氛围音乐的元素，使歌曲在质感上得到升华。
          PBR&B发源于21世纪00年代末期，大约在2008、2009年。在当代R&B逐渐没落的时候，这种新型的R&B音乐形式就应运而生了。 本歌单PBR&B/Soul/city pop
        </div>
      </div>
      <img src="/image/html.jpg" class="P-top-card-bg" />
      <div class="P-top-card-bg-mask"></div>
    </div>
  </div>
</template>

<style lang="scss">
.home-container {
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;

  .P-top-card {
    position: relative;
    width: 100%;
    height: 200px;
    display: grid;
    grid-template-columns: 160px 1fr;
    gap: 20px;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 6px;
    overflow: hidden;

    .P-content-wrap {
      display: grid;
      grid-template-rows: 30px 30px 1fr;
      height: 100%;

      .tag {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #dfac67;
        border: 1px solid #dfac67;
        width: 100px;
        height: 30px;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        box-sizing: border-box;
      }

      .info {
        color: #888482;
        height: 100%;
        overflow: hidden;
        max-height: 100px;
        font-size: 14px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
      }

      .title {
        color: #ffffff;
        line-height: 30px;
      }
    }

    .P-top-card-bg {
      height: 100%;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      filter: blur(20px);
      z-index: -1;
    }

    .P-top-card-bg-mask {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: -2;
    }

    .P-top-icon-wrap {
      width: 100%;
      height: 160px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
