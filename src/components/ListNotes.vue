<!-- ListNotes 主页知识汇总模块-->

<script setup lang="ts">
defineProps<{ notes: Record<string, any[]> }>()
</script>
<template>
  <template v-for="key in Object.keys(notes)" :key="key">
    <div class="mod-hd mt-10">
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
              <h2>a</h2>
            </div>
            <div class="content">a</div>
          </div>
        </article>
      </router-link>
    </div>
  </template>
</template>

<style lang="scss">
.mod-hd {
  height: 30px;
  margin-bottom: 15px;
  border-bottom: 1px solid #f1f1f1;
  line-height: 30px;
  box-sizing: border-box;

  h2 {
    font-size: 24px;
    font-weight: normal;
    color: #333;
  }
}

.CustomizeHomeFeatures {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;

  a.item {
    opacity: 1;
  }

  .item {
    overflow: auto;
    background-color: #ffffff;
    cursor: pointer;
    // filter: drop-shadow(5px 5px 10px #000);
    box-shadow: 0 0px 10px 0px rgb(0 0 0 / 15%);

    img {
      width: 100%;
      height: 100%;
    }

    article {
      width: 100%;
      height: auto;

      .entry-media {
        overflow: auto;
      }

      .inner {
        padding: 10px 10px 20px 10px;
        box-sizing: border-box;

        .avatar {
          position: relative;
          z-index: 9;
          margin-top: -28px;
          margin-left: -10px;
          width: 100px;
          height: 36px;

          img {
            position: absolute;
            margin: auto;
            top: 0;
            right: 0;
            left: 0;
            z-index: 9;
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }

          &::after {
            background-image: url();
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background-position: right top;
            background-repeat: no-repeat;
            background-size: 100px 37px;
            background-image: url(/image/icon-img.svg);
            top: -3px;
            left: 50%;
            transform: translate(-50%, 0);
            z-index: -1;
          }
        }

        .title {
          h2 {
            padding-bottom: 0;
            font-size: 15px;
            font-weight: 600;
            letter-spacing: -0.2px;
            border: none;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .content {
          font-size: 13px;
          margin-top: 10px;
          // color: #aaa;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          white-space: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
