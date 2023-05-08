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

</script>
<template>
  <div>
    <div class="content_banner bg-[#787878] relative"
      :class="{ 'h-[400px]': frontmatter.image, 'prose': !frontmatter.image }">
      <img :src="frontmatter.image" class="load_cover " alt="" v-if="frontmatter.image">
      <div class="view_info">
        <div class="vi_con">
          <h1>{{ frontmatter.display ?? frontmatter.title }}</h1>
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
    <!-- <article ref="content">
      <slot />
    </article> -->
  </div>
</template>

<style  scoped></style>
