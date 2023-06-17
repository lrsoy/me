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
const viewSide = ref<HTMLDivElement>()

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
  <template v-if="frontmatter?.display">
    <div class="w-[960px] m-auto displaytitle slide-enter">
      <h1 class="mb-0 ">
        {{ frontmatter.display }}
      </h1>
      <hr class="h-1 block" />
      <div class="post_detail post_date " v-if="frontmatter.date">
        <span class="post_info_date">
          <span>发布于: {{ dayjs(frontmatter.date) }}</span>
        </span>
      </div>
    </div>
  </template>
  <article ref="content" id="article_content">
    <slot />
    <div v-if="frontmatter?.toc" id="view_side" ref="viewSide" class="slide-enter"></div>
  </article>
</template>

<style  lang="scss">
#article_content {
  width: 960px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

}

.displaytitle {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-weight: 800;
    font-size: 34px;
    font-family: "Josefin Sans", Helvetica, Arial, sans-serif;
    letter-spacing: 0;
    color: #222;
  }

  hr {
    width: 50px;
    display: block;
    margin: auto;
    margin: 5px 0 10px 0;
    border-color: #be9656;
  }

  .post_detail {
    font-size: 13px;
    color: #999;
  }
}


#view_side {
  width: 245px;
}
</style>
