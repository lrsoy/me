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

const getYear = (a: Date | string | number) => new Date(a).getFullYear()
const isFuture = (a?: Date | string | number) => a && new Date(a) > new Date()
const isSameYear = (a?: Date | string | number, b?: Date | string | number) => a && b && getYear(a) === getYear(b)
function isSameGroup(a: Frontmatter, b?: Frontmatter) {
  return (isFuture(a.date) === isFuture(b?.date)) && isSameYear(a.date, b?.date)
}

function getGroupName(p: Frontmatter) {

  if (isFuture(p.date))
    return 'Upcoming'
  return getYear(p.date as unknown as Date)
}
</script>
<template>
  <ul class="ListPosts">
    <template v-for="route, idx in routes" :key="route.path">
      <div v-if="!isSameGroup(route, routes[idx - 1])" select-none relative h20 pointer-events-none slide-enter :style="{
        '--enter-stage': idx - 2,
        '--enter-step': '60ms',
      }">
        <span text-8em color-transparent absolute left--3rem top--2rem font-bold text-stroke-2 op50 class="time_bt">{{
          getGroupName(route) }}</span>
      </div>
      <div class="slide-enter" :style="{
        '--enter-stage': idx,
        '--enter-step': '60ms',
      }">
        <component :is="route.path?.includes('://') ? 'a' : 'RouterLink'" v-bind="route.path?.includes('://') ? {
          href: route.path,
          target: '_blank',
          rel: 'noopener noreferrer',
        } : {
          to: route.path,
        }
          " class="item block font-normal mb-6 mt-2 no-underline">
          <li class="no-underline" flex="~ col md:row gap-2 md:items-center">
            <div class="title text-lg leading-1.2em">
              <span align-middle class="current_title">{{ route.title }}</span>
            </div>
            <div class="time opacity-50 text-sm">
              <span>{{ formatDate(route.date as string) }}</span>
              <span v-if="route?.duration" op80>· {{ route.duration }}</span>
            </div>
          </li>
        </component>
      </div>
    </template>
  </ul>
</template>

<style  lang="scss">
.ListPosts {
  .current_title {}

  .time_bt {
    color: #DEE8C2;
  }

  .title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .time {
    display: flex;
    min-width: 120px;
  }
}
</style>
