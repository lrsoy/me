<!-- Post -->

<script setup lang="ts">
import { formatDate } from '~/logics'
import dayjs from 'dayjs'
const { frontmatter } = defineProps({
  frontmatter: {
    type: Object,
    required: true,
  },
})

console.log(frontmatter);

const router = useRouter()
const content = ref<HTMLDivElement>()

onMounted(() => {
  const navigate = () => {
    if (location.hash) {
      document.querySelector(decodeURIComponent(location.hash))
        ?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleAnchors = (
    event: MouseEvent & { target: HTMLElement },
  ) => {
    const link = event.target.closest('a')

    if (
      !event.defaultPrevented
      && link
      && event.button === 0
      && link.target !== '_blank'
      && link.rel !== 'external'
      && !link.download
      && !event.metaKey
      && !event.ctrlKey
      && !event.shiftKey
      && !event.altKey
    ) {
      const url = new URL(link.href)
      if (url.origin !== window.location.origin)
        return

      event.preventDefault()
      const { pathname, hash } = url
      if (hash && (!pathname || pathname === location.pathname)) {
        window.history.replaceState({}, '', hash)
        navigate()
      }
      else {
        router.push({ path: pathname, hash })
      }
    }
  }

  useEventListener(window, 'hashchange', navigate)
  useEventListener(content.value!, 'click', handleAnchors, { passive: false })

  navigate()
  setTimeout(navigate, 500)
})

const titleMouseover = () => {

}
const titleMouseout = () => {
}

</script>
<template>
  <div>
    <div v-if="frontmatter.image" class="mb-10">
      <div class="content_banner bg-[#787878] relative" :class="{ 'h-[400px]': frontmatter.image }">
        <img :src="frontmatter.image" class="load_cover " alt="" v-if="frontmatter.image">
        <div class="view_info">
          <div class="vi_con">
            <h1 @mouseover="titleMouseover" @mouseout="titleMouseout">{{ frontmatter.display ?? frontmatter.title }}</h1>
            <div class="subtitle" v-if="frontmatter.subtitle">
              {{ frontmatter.subtitle }}
            </div>
          </div>
        </div>
      </div>
      <div class="creative-time h-[80px]" v-if="frontmatter.image">
        <div class="avatar w-[680px] m-auto h-full relative">
          <a href="https://github.com/lrsoy" target="_blank" class="absolute z-10 left-0 -top-19">
            <img class="w-30 h-30 rounded-full" src="/image/avatar.jpg" alt="">
          </a>
          <strong>
            <a href="https://github.com/lrsoy">Lrsoy（中国北京）</a>
          </strong>
          <div class="vc_time" v-if="frontmatter.date">
            <span>{{ dayjs(frontmatter.date) }}</span>
          </div>
        </div>
      </div>
    </div>
    <template v-else>
      <div v-if="frontmatter.display ?? frontmatter.title" class="titles prose">
        <h1 class="mb-0">
          {{ frontmatter.display ?? frontmatter.title }}
        </h1>
        <p v-if="frontmatter.date" class="opacity-50 !-mt-2">
          {{ formatDate(frontmatter.date) }}
        </p>
        <p v-if="frontmatter.subtitle" class="opacity-50 !-mt-6 italic">
          {{ frontmatter.subtitle }}
        </p>
      </div>
    </template>
    <article ref="content">
      <slot />
    </article>
  </div>
</template>

<style  scoped></style>
