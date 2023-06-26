<!-- Post -->

<script setup lang="ts">
import { formatDate } from '~/logics'
import dayjs from 'dayjs'
import type { Frontmatter } from '~/types'
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



// 通过路由获取最新发布的文章
const routes: Frontmatter[] = router.getRoutes()
  .map(i => {
    const frontmatter = i.meta.frontmatter as any;
    return { ...i, meta: { ...i.meta, frontmatter } };
  })
  .sort((a, b) => +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date))
  .filter(f => f.meta.frontmatter?.toc)
  .filter(i => !i.path.endsWith('.html') && i.meta.frontmatter.type)
  .slice(0, 9)
  .map(m => {
    return {
      path: m.path,
      ...m.meta.frontmatter
    }
  })

const link = computed(() => {
  const i = route.path.split('/').slice(0, -1).join('/')
  const isHas = router.getRoutes().some(s => s.path === route.path)
  if (!isHas) {
    return '/'
  }
  return i
})

</script>
<template>
  <template v-if="frontmatter.display ?? frontmatter.title">
    <div class="w-[960px] m-auto displaytitle slide-enter">
      <h1 class="mb-0 ">
        {{ frontmatter.display ?? frontmatter.title }}
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
    <div>
      <div class="side">
        <div v-if="frontmatter?.toc" id="view_side" ref="viewSide" class="slide-enter"></div>
        <div v-if="frontmatter?.update" id="update" class="slide-enter">
          <div class="update-release">
            <div class="mb-1 text-[14px]">🔥 最新发布</div>
            <ul>
              <template v-for="(item, index) in routes" :key="item.path">
                <li>
                  <span class="idx">{{ index + 1 }}</span>
                  <div class="flex-1 w-full ct">
                    <router-link :to="item.path">
                      <p class="text-[14px]">{{ item.display }}</p>
                    </router-link>
                    <span class="text-2">{{ dayjs(item.date).format('YYYY-MM-DD') }}</span>
                  </div>
                </li>
              </template>
            </ul>
          </div>
        </div>
        <div v-if="route.path !== '/'" class="go-back slide-enter">
          <router-link :to="link || '/'" class="font-mono no-underline opacity-50 hover:opacity-75">
            cd ..
          </router-link>
        </div>
      </div>
    </div>
  </article>
</template>

<style  lang="scss">
#update {
  ul {
    li {
      display: flex;
      box-sizing: border-box;
      padding: 2px 0;

      .ct {
        overflow: hidden;
        color: #c0c0c0;
      }

      .idx {
        display: block;
        font-size: 14px;
        font-weight: 600;
        margin: 6px 12px 10px 0;
        width: 18px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        color: #86909c;
      }

      a:hover {
        text-decoration: underline;
      }

      p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}

#article_content {
  width: 960px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  .go-back {
    font-size: 15px;
    margin-top: 20px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    padding: 10px;
    border-radius: 5px;
    color: #ffffff;
  }
}

.displaytitle {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 10px 0;
  border-radius: 5px;
  margin-bottom: 20px;

  h1 {
    font-weight: 800;
    font-size: 34px;
    font-family: "Josefin Sans", Helvetica, Arial, sans-serif;
    letter-spacing: 0;
    color: #ffffff;
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


#view_side,
#update {
  width: 260px;
  overflow: visible;
}
</style>
