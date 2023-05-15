// myTableOfContentsPlugin.ts

import MarkdownIt from 'markdown-it'
// @ts-expect-error missing types
import MarkdownItTableOfContents from 'markdown-it-table-of-contents'

export default function myTableOfContentsPlugin(options: MarkdownItTableOfContents.Options): MarkdownIt.PluginSimple {
  const tocPlugin = MarkdownItTableOfContents(options)
  return (md: MarkdownIt) => {
    md.core.ruler.before('normalize', 'insert-toc', (state) => {
      const tocHTML = tocPlugin.render(state.tokens, options)
      const env = state.env
      env.tocHTML = tocHTML
    })
  }
}
