import { resolveHighlightLines, isHighlightLine } from "./resolveHighlightLines";
import { resolveLanguage } from './resolveLanguage';
import { resolveLineNumbers } from './resolveLineNumbers'
import { resolveVPre } from "./resolveVPre";
import type { PluginWithOptions } from 'markdown-it';
export interface CodePluginOptions {
  highlightLines?: boolean;
  lineNumbers?: boolean | number;
  preWrapper?: boolean;
  vPre?: {
    block?: boolean;
    inline?: boolean;
  };
}

/**
 * Code plugin
 */
const codePlugin: PluginWithOptions<CodePluginOptions> = (md, { highlightLines = true, lineNumbers = true, preWrapper = true, vPre: { block: vPreBlock = true, inline: vPreInline = true } = {}, } = {}) => {
  // override default fence renderer
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    // get token info
    const info = token.info ? md.utils.unescapeAll(token.info).trim() : '';
    // resolve language from token info
    const language = resolveLanguage(info);
    const languageClass = `${options.langPrefix}${language.name}`;
    // try to get highlighted code
    const code = options.highlight?.(token.content, language.name, '') ||
      md.utils.escapeHtml(token.content);
    // wrap highlighted code with `<pre>` and `<code>`
    let result = code.startsWith('<pre')
      ? code
      : `<pre class="${languageClass}"><code>${code}</code></pre>`;
    // resolve v-pre mark from token info
    const useVPre = resolveVPre(info) ?? vPreBlock;
    if (useVPre) {
      result = `<pre v-pre${result.slice('<pre'.length)}`;
    }
    // if `preWrapper` is disabled, return directly
    if (!preWrapper) {
      return result;
    }
    // code fences always have an ending `\n`, so we should trim the last line
    const lines = code.split('\n').slice(0, -1);
    // resolve highlight line ranges from token info
    const highlightLinesRanges = highlightLines
      ? resolveHighlightLines(info)
      : null;
    // generate highlight lines
    if (highlightLinesRanges) {
      const highlightLinesCode = lines
        .map((_, index) => {
          if (isHighlightLine(index + 1, highlightLinesRanges)) {
            return '<div class="highlight-line">&nbsp;</div>';
          }
          return '<br>';
        })
        .join('');
      result = `${result}<div class="highlight-lines">${highlightLinesCode}</div>`;
    }
    // resolve line-numbers mark from token info
    const useLineNumbers = resolveLineNumbers(info) ??
      (typeof lineNumbers === 'number'
        ? lines.length >= lineNumbers
        : lineNumbers);
    // generate line numbers
    if (useLineNumbers) {
      // generate line numbers code
      const lineNumbersCode = lines
        .map(() => `<div class="line-number"></div>`)
        .join('');
      result = `${result}<div class="line-numbers" aria-hidden="true">${lineNumbersCode}</div>`;
    }
    // 代码快复制相关代码， 向当前元素内插入一个button 此按钮用于复制当前代码块
    const lang = extractLang(info)
    const CopyCodeBtn = `<button title="Copy Code" class="copy"></button>`
    result = `<div class="${languageClass} ext-${language.ext}${useLineNumbers ? ' line-numbers-mode' : ''}">${CopyCodeBtn}${result}</div>`;

    return result;
  };

  if (vPreInline) {
    const rawInlineCodeRule = md.renderer.rules.code_inline;
    if (rawInlineCodeRule) {
      md.renderer.rules.code_inline = (tokens, idx, options, env, slf) => {
        const token = tokens[idx];
        const lang = token.info ? md.utils.escapeHtml(token.info).trim() : '';
        const code = md.utils.escapeHtml(token.content);

        return `<code class="${options.langPrefix}${lang}">${code}</code>`;
      };
      // md.renderer.rules.code_inline = (tokens, idx, options, env, slf) => {
      //   const result = rawInlineCodeRule(tokens, idx, options, env, slf);
      //   return `<code v-pre${result.slice('<code'.length)}`;
      // };
    }
  }
};

function extractLang(info: string) {
  return info
    .trim()
    .replace(/:(no-)?line-numbers({| |$).*/, '')
    .replace(/(-vue|{| ).*$/, '')
    .replace(/^vue-html$/, 'template')
}


export default codePlugin
