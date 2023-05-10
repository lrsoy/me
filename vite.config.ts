import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import fs from 'fs-extra'
import matter from 'gray-matter'
import Pages from 'vite-plugin-pages'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Inspect from 'vite-plugin-inspect'
import Icons from 'unplugin-icons/vite'
import SVG from 'vite-svg-loader'
import Markdown from 'vite-plugin-vue-markdown'
import LinkAttributes from 'markdown-it-link-attributes'
import Shiki from 'markdown-it-shiki'
import anchor from 'markdown-it-anchor'
import { slugify } from './scripts/slugify'
import emoji from 'markdown-it-emoji'
// @ts-expect-error missing types
import TOC from 'markdown-it-table-of-contents'

// 自定义插件
import codePlugin from './src/plugins/MarkDown/codePlugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    UnoCSS(),
    vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true,
    }),
    Pages({
      extensions: ['vue', 'md'],
      pagesDir: 'pages',
      extendRoute(route) {
        const path = resolve(__dirname, route.component.slice(1))

        if (!path.includes('projects.md')) {
          const md = fs.readFileSync(path, 'utf-8')
          const { data } = matter(md)
          route.meta = Object.assign(route.meta || {}, { frontmatter: data })
        }

        return route
      },
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        '@vueuse/head',
      ],
    }),
    Components({
      extensions: ['vue', 'md'],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          componentPrefix: '',
        }),
      ],
    }),
    Inspect(),

    Icons({
      defaultClass: 'inline',
      defaultStyle: 'vertical-align: sub;',
    }),

    SVG({
      svgo: false,
    }),
    Markdown({
      wrapperComponent: 'post',
      wrapperClasses: (id, code) => {
        return code.includes('@layout-full-width') ? 'layout-full-width' : 'prose  slide-enter-content'
      },
      headEnabled: true,
      markdownItOptions: {
        quotes: '""\'\'',
      },
      markdownItSetup(md) {
        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })
        md.use(anchor, {
          slugify,
          permalink: anchor.permalink.linkInsideHeader({
            symbol: '#',
            renderAttrs: () => ({ 'aria-hidden': 'true' }),
          }),
        })
        md.use(Shiki, {
          theme: 'dark-plus'
        })
        md.use(codePlugin)
        md.use(TOC, {
          includeLevel: [1, 2, 3, 4, 5, 6],
          slugify,
        })
        md.use(emoji)
      }
    })

  ],
  optimizeDeps: { // 优化依赖项
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
      'dayjs',
      'dayjs/plugin/localizedFormat',
    ],
  },
  resolve: { // 通配符
    alias: [
      { find: '~/', replacement: `${resolve(__dirname, 'src')}/` },
    ],
  },
  build: {
    rollupOptions: {
      onwarn(warning, next) {
        if (warning.code !== 'UNUSED_EXTERNAL_IMPORT')
          next(warning)
      },
    },
  },
  ssgOptions: {
    formatting: 'minify',
    format: 'cjs',
  },
})
