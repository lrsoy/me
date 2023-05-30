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


const router = useRouter()
const route = useRoute()
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

nextTick(() => {

})

const titleMouseover = () => {

}
const titleMouseout = () => {
}


</script>
<template>
  <div>
    <article ref="content" id="article_content">
      <slot />
      <template v-if="route.path !== '/'">
        <div id="view_side">这是测试文字</div>
      </template>
    </article>
  </div>
</template>

<style  lang="scss">
#article_content {
  width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

}

#view_side {
  width: 245px;
}
</style>
