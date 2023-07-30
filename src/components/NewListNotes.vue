<!-- NewListNotes -->

<script setup lang="ts">
import { formatDate } from '~/logics'
import type { Frontmatter } from '~/types'
import { ComputedRef } from 'vue'
const { notes } = defineProps<{ notes: Record<string, any> }>()

interface notesItem {
  name: string
  link: string
  desc: string
  icon: string
  image: string
  type: string
  article?: Frontmatter[]
}

const router = useRouter()
const routes: ComputedRef<Frontmatter[]> = computed(() => router.getRoutes()
  .map(i => {
    const frontmatter = i.meta.frontmatter as any;
    return { ...i, meta: { ...i.meta, frontmatter } };
  })
  .filter(i => i.meta.frontmatter.date)
  .sort((a, b) => +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date))
  .filter(i => !i.path.endsWith('.html'))
  .map(m => {
    return {
      path: m.path,
      ...m.meta.frontmatter
    }
  }))


const sortList = computed(() => notes.map((m: notesItem) => {
  const article: Frontmatter[] = routes.value.filter(i => i.type === m.type).slice(0, 4)
  return {
    ...m,
    article
  }
}))

</script>
<template>
  <div class="NewListNotes features slide-enter">
    <!-- <div class="item" v-for="(item, index) in sortList" :key="index">
      <article>
        <div class="entry-media">
          <img src="/image/CustomizeHomeFeatures01.jpg" />
        </div>
        <div class="ct">
          <div class="avatar">
            <img src="/image/avatar.jpg" />
          </div>
          <div class="title">
            <div class="label"></div>
            <h2>{{ item.name }}</h2>
          </div>
          <div class="content">
            测试
          </div>
        </div>
      </article>
    </div> -->
    <!-- <router-link v-for="(item, index) in notes" :key="index" :to="item.link" class="card">
      <div class="img-box">
        <img :src="item.image" :alt="item.desc">
      </div>
      <div class="inner">
        <h2>{{ item.name }}</h2>
      </div>
    </router-link> -->
    <div class="P-top-card card" v-for="(item, index) in sortList" :key="index">
      <div class="P-top-icon-wrap">
        <!-- 封面 -->
        <img :src="item.image" />
      </div>
      <div class="P-content-wrap">
        <router-link class="tag" :to="item.link"><span>{{ item.name }}</span></router-link>
        <!-- 介绍 -->
        <div class="info" v-if="item.article.length > 0">
          <div class="list_item" v-for="(ch, i) in item.article" :key="i">
            <router-link :to="ch.path">{{ ch.title }}</router-link>
          </div>
        </div>
        <div class="prompt" v-else>
          <span>暂无内容</span>
        </div>
      </div>
      <img :src="item.image" class="P-top-card-bg" />
      <div class="P-top-card-bg-mask"></div>
    </div>
  </div>
</template>

<style  lang="scss">
.NewListNotes {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin: 0 auto;
  box-sizing: border-box;

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
      grid-template-rows: 30px 1fr;
      height: 100%;

      .tag {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        border: 1px solid #ffffff;
        width: auto;
        height: 30px;
        border-radius: 5px;
        width: 120px;
        font-size: 16px;
        cursor: pointer;
        box-sizing: border-box;
      }

      .prompt {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;

        span {
          font-size: 14px;
          color: #ffffff;
        }
      }

      .info {
        padding: 5px 0;
        box-sizing: border-box;
        color: #888482;
        height: 100%;
        overflow: hidden;
        max-height: 130px;
        font-size: 14px;

        .list_item {
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
          width: 100%;
          height: 30px;

          a {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #ffffff;
          }
        }
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

  // display: grid;
  // grid-template-columns: 1fr 1fr 1fr;
  // gap: 50px;
  // width: 1150px;
  // margin: 0 auto;
  // box-sizing: border-box;

  // .card {
  //   position: relative;
  //   display: flex;
  //   justify-content: center;
  //   align-items: flex-start;
  //   height: 300px;
  //   background-color: #DEE8C2;
  //   border-radius: 20px;
  //   transition: 0.5s;



  //   .inner {
  //     position: absolute;
  //     top: 252px;
  //     width: 100%;
  //     height: 35px;
  //     padding: 0 30px;
  //     text-align: center;
  //     overflow: hidden;
  //     transition: 0.5s;

  //     h2 {
  //       font-size: 1.5rem;
  //       font-weight: 700;
  //       color: #2d7f0b;
  //     }
  //   }

  //   .img-box {
  //     position: absolute;
  //     top: 20px;
  //     width: 300px;
  //     height: 220px;
  //     border-radius: 12px;
  //     overflow: hidden;
  //     transition: 0.5s;

  //     img {
  //       width: 100%;
  //       height: 100%;
  //       object-fit: cover;
  //       object-position: center;
  //     }
  //   }
  // }

  // .item {
  //   overflow: auto;
  //   background-color: #ffffff;
  //   cursor: pointer;
  //   box-shadow: 0 0px 10px 0px rgb(0 0 0 / 15%);
  //   border-radius: 5px;

  //   img {
  //     width: 100%;
  //     height: 100%;
  //     object-fit: cover;
  //   }

  //   article {
  //     width: 100%;
  //     height: auto;
  //     display: block;

  //     .entry-media {
  //       overflow: hidden;
  //       height: 170px;
  //     }

  //     .ct {
  //       width: 100%;
  //       padding: 10px 10px 0 10px;
  //       box-sizing: border-box;
  //       display: block;

  //       .avatar {
  //         display: block;
  //         position: relative;
  //         z-index: 9;
  //         margin-top: -24px;
  //         margin-left: -10px;
  //         width: 100px;
  //         height: 36px;

  //         img {
  //           position: absolute;
  //           margin: auto;
  //           top: 0;
  //           right: 0;
  //           left: 0;
  //           z-index: 9;
  //           width: 30px;
  //           height: 30px;
  //           border-radius: 50%;
  //         }

  //         &::after {
  //           background-image: url();
  //           content: '';
  //           position: absolute;
  //           width: 100%;
  //           height: 100%;
  //           background-position: right top;
  //           background-repeat: no-repeat;
  //           background-size: 100px 30px;
  //           background-image: url(/image/icon-img.svg);
  //           top: -3px;
  //           left: 50%;
  //           transform: translate(-50%, 0);
  //           z-index: -1;
  //         }
  //       }

  //       .title {
  //         h2 {
  //           padding-bottom: 0;
  //           font-size: 15px;
  //           font-weight: 600;
  //           letter-spacing: -0.2px;
  //           border: none;
  //           -webkit-line-clamp: 1;
  //           -webkit-box-orient: vertical;
  //           white-space: nowrap;
  //           overflow: hidden;
  //           text-overflow: ellipsis;
  //           box-sizing: border-box;
  //           padding: 0 0 5px 0;
  //           border-bottom: 1px solid #e7e9e8;
  //         }
  //       }

  //       .null_alt {
  //         display: flex;
  //         height: 110px;
  //         justify-content: center;
  //         align-items: center;
  //         font-size: 12px;
  //         color: #8a8f8d;
  //       }

  //       .content {
  //         // font-size: 13px;
  //         // margin-top: 10px;
  //         // // color: #aaa;
  //         // -webkit-line-clamp: 2;
  //         // -webkit-box-orient: vertical;
  //         // white-space: normal;
  //         // overflow: hidden;
  //         // text-overflow: ellipsis;
  //         // display: -webkit-box;
  //         // margin-bottom: 10px;
  //       }
  //     }
  //   }
  // }
}
</style>
