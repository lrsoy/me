// import './styles/index.css'
// import './styles/markdown.css'

import './styles/new-style/index.css'

import '@unocss/reset/tailwind.css'
import 'uno.css'

import './styles/new-style/post.css'
import './styles/new-style/markdown.css'
import './styles/new-style/code-group.css'
// import './styles/post.css'
// import './styles/code-group.css'
import 'aos/dist/aos.css'
import 'animate.css'

import autoRoutes from 'pages-generated'
import NProgress from 'nprogress'
import { ViteSSG } from 'vite-ssg'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat.js'
import App from './App.vue'
import aos from 'aos'
import { Badge, CodeGroup, CodeGroupItem } from '~/components/global/index'

// copy code plugin
import { useCopyCode } from '~/hooks'

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
    useCopyCode()
    if (isClient) {
      router.beforeEach(() => { NProgress.start() })
      router.afterEach(() => { NProgress.done() })
    }
  },
)

