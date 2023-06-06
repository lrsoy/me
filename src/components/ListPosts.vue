<!-- ListPosts 文章列表-->

<script setup lang="ts">
import dayjs from 'dayjs'
import { useRouter, useRoute } from 'vue-router'
import { formatDate } from '~/logics'
import type { Frontmatter } from '~/types'

const props = defineProps<{
  address?: string
  type?: string
  posts?: Frontmatter[]
}>()

const router = useRouter()
const routes: Frontmatter[] = router.getRoutes()
  .filter(i => i.path.startsWith(props.address as string))
  .map(i => {
    const frontmatter = i.meta.frontmatter as any;
    return { ...i, meta: { ...i.meta, frontmatter } };
  })
  .filter(i => i.meta.frontmatter.date)
  .sort((a, b) => +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date))
  .filter(i => !i.path.endsWith('.html') && i.meta.frontmatter.type === props.type)
  .map(m => {
    return {
      path: m.path,
      ...m.meta.frontmatter
    }
  })


</script>
<template>
  <ul class="ListPosts">
    <template v-for="item in routes" :key="item.path">
      <router-link :to="item.path" class="la ">
        <li class="postnormal review">
          <div class="post-container review-item">
            <div class="ct review-item-wrapper">
              <div class="tg">
                <div class="review-item-img" :style="{ backgroundImage: `url(${item.image})` }"></div>
              </div>
              <div class="flex-xs-middle flex-1">
                <div class="review-item-title">
                  <span>{{ item.title }}</span>
                </div>
                <div class="review-item-creator"><b>发布日期：</b>{{ dayjs(item.date).format('YYYY-MM-DD HH:mm:ss') }}</div>
              </div>
            </div>
            <div class="review-bg-wrapper">
              <div class="bg-blur" :style="{ backgroundImage: `url(${item.image})` }"></div>
            </div>
          </div>
          <div class="post-container">
            <div class="entry-content">{{ item.description }}</div>
          </div>
        </li>
      </router-link>
    </template>
  </ul>
</template>

<style  lang="scss">
.ListPosts {
  .review {
    border-radius: 0 0 6px 6px;
    box-shadow: 0 1px 3px rgba(249, 249, 249, 0.08), 0 0 0 1px rgba(26, 53, 71, .04), 0 1px 1px rgba(26, 53, 71, .06);
  }

  .la {
    &:first-child {
      li {
        margin-top: 25px !important;
      }
    }

    &:not(:first-child) {
      li {
        margin-top: 40px !important;
      }
    }
  }

  .gaz-btn.primary {
    background: #2E60C4
  }

  .gaz-btn {
    font-size: .8em;
    font-weight: 700;
    padding: 12px 25px;
    text-transform: uppercase;
    color: white !important;
    border-radius: 30px;
    border: none;
    -webkit-transition: all .2s;
    transition: all .2s;
    display: inline-block
  }

  .ct {
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
    padding: 10px 0;
  }



  .gaz-btn.primary {
    background: #bebbaa;
  }

  .entry-content {
    font-size: 16px;
    color: rgba(0, 0, 0, .6);
    line-height: 1.75;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
    padding-bottom: 1.3rem;
  }

  .bg-blur {
    background-position: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background-size: cover;
    border-radius: 6px;
    -webkit-filter: blur(5px);
    filter: blur(5px);
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
    -o-object-fit: cover;
    object-fit: cover;
    pointer-events: none;

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
      top: 0;
      left: 0;
      background: -webkit-linear-gradient(top, rgba(105, 105, 105, 0.1) 0%, #fff 85%);
      background: linear-gradient(to bottom, rgba(105, 105, 105, 0.1) 0%, #fff 85%)
    }
  }

  .review-item-title {
    font-size: 20px;
    font-weight: 700;
    text-shadow: 0 2px 3px rgba(0, 0, 0, 0.1)
  }

  .review-item-creator {
    font-size: 1em;
    font-weight: normal;
    padding: 0.5em 0;
  }

  .review-bg-wrapper {
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: 6px 6px 0 0;
    z-index: 0;
  }

  .postnormal.review {
    border-radius: 0 0 6px 6px;
    box-shadow: 0 1px 3px rgba(249, 249, 249, 0.08), 0 0 0 1px rgba(26, 53, 71, .04), 0 1px 1px rgba(26, 53, 71, .06)
  }

  .postnormal.review .review-item {
    position: relative;
    overflow: visible;
    margin-top: 1.5em;
    border-radius: 6px 6px 0 0;
    min-height: 200px
  }

  .postnormal.review .post-container {
    margin-top: 0;
    z-index: 2
  }

  .postnormal .post-container {
    background: white;
    margin-top: 10px;
    padding: 1.3rem 1.3rem 2rem;
    border-radius: 6px;
    overflow: hidden;
  }

  .postnormal.review .review-item .review-item-wrapper {
    position: relative;
    z-index: 1;
    color: white
  }

  .review-item-img {
    position: absolute;
    width: 130px;
    height: 190px;
    top: -50px;
    left: 25px;
    border-radius: 4px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    background-size: cover;
    background-position: top center
  }

  .flex-xs-middle {
    position: relative;
    min-height: 1px;
    padding-right: 0;
    padding-left: 0;
    -ms-flex-item-align: center;
    align-self: center;
    text-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  }

  .tg {
    position: relative;
    min-height: 1px;
    padding-right: 0;
    padding-left: 0;
    width: 25%
  }

}
</style>
