import MarkdownIt from 'markdown-it';
// @ts-expect-error missing types
import MarkdownItToc from 'markdown-it-table-of-contents';

const customTocPlugin = (md: MarkdownIt, options: MarkdownItToc.Options): void => {
  md.use(MarkdownItToc, options);
  const originalRender = md.renderer.render;
  md.renderer.render = function (tokens, options, env) {
    const html = originalRender.call(this, tokens, options, env);
    const regex = /<div class="table-of-contents">([\s\S]+?)<\/div>/;
    const match = html.match(regex);
    const tocContent = match ? match[1] : '';
    const newToc = `
      <teleport to="#app">
        <div class="table-of-contents">
          ${tocContent}
        </div>
      </teleport>
    `
    // 将原来内容，将新的内容插入进去
    const modifiedHtml = html.replace(regex, newToc);
    return modifiedHtml;
  };
};

export default customTocPlugin;
