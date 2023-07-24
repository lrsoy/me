import './styles/index.css'
import './styles/markdown.css'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import './styles/post.css'
import './styles/code-group.css'
import 'aos/dist/aos.css'

import autoRoutes from 'pages-generated'
import NProgress from 'nprogress'
import { ViteSSG } from 'vite-ssg'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat.js'
import App from './App.vue'
import aos from 'aos'
import { Badge, CodeGroup, CodeGroupItem } from '~/components/global/index'
aos.init()
const routes = autoRoutes.map((i) => {
  return {
    ...i,
    alias: i.path.endsWith('/')
      ? `${i.path}index.html`
      : `${i.path}.html`,
  }
})

const scrollBehavior = (to: any, from: any, savedPosition: any) => {
  if (savedPosition)
    return savedPosition
  else
    return { top: 0 }
}


export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior },
  ({ app, router, isClient }) => {
    dayjs.extend(LocalizedFormat)
    app.component('Badge', Badge)
    app.component('CodeGroup', CodeGroup)
    app.component('CodeGroupItem', CodeGroupItem)
    if (isClient) {
      router.beforeEach(() => { NProgress.start() })
      router.afterEach(() => { NProgress.done() })
    }
  },
)

