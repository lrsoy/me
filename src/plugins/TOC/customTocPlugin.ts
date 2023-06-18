import MarkdownIt from 'markdown-it';
import emoji from 'markdown-it-emoji'
// @ts-expect-error missing types
import MarkdownItToc from 'markdown-it-table-of-contents';

const customTocPlugin = (md: MarkdownIt, options: MarkdownItToc.Options): void => {
  md.use(MarkdownItToc, options)
  md.use(emoji)

  const originalRender = md.renderer.render;
  md.renderer.render = function (tokens, options, env) {
    const html = originalRender.call(this, tokens, options, env);

    return html
  };

};



export default customTocPlugin;
