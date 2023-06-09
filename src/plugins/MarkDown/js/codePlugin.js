import { resolveHighlightLines, isHighlightLine } from "./resolveHighlightLines";
import { resolveLanguage } from './resolveLanguage';
import { resolveLineNumbers } from './resolveLineNumbers'
import { resolveVPre } from "./resolveVPre";

/**
 * Code plugin
 */
const codePlugin = (md, { highlightLines = true, lineNumbers = true, preWrapper = true, vPre: { block: vPreBlock = true, inline: vPreInline = true } = {}, } = {}) => {
  // override default fence renderer
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    // get token info
    const info = token.info ? md.utils.unescapeAll(token.info).trim() : '';
    // resolve language from token info
    const language = (0, resolveLanguage)(info);
    const languageClass = `${options.langPrefix}${language.name}`;
    // try to get highlighted code
    const code = options.highlight?.(token.content, language.name, '') ||
      md.utils.escapeHtml(token.content);
    // wrap highlighted code with `<pre>` and `<code>`
    let result = code.startsWith('<pre')
      ? code
      : `<pre class="${languageClass}"><code>${code}</code></pre>`;
    // resolve v-pre mark from token info
    const useVPre = (0, resolveVPre)(info) ?? vPreBlock;
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
      ? (0, resolveHighlightLines)(info)
      : null;
    // generate highlight lines
    if (highlightLinesRanges) {
      const highlightLinesCode = lines
        .map((_, index) => {
          if ((0, isHighlightLine)(index + 1, highlightLinesRanges)) {
            return '<div class="highlight-line">&nbsp;</div>';
          }
          return '<br>';
        })
        .join('');
      result = `${result}<div class="highlight-lines">${highlightLinesCode}</div>`;
    }
    // resolve line-numbers mark from token info
    const useLineNumbers = (0, resolveLineNumbers)(info) ??
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
    result = `<div class="${languageClass} ext-${language.ext}${useLineNumbers ? ' line-numbers-mode' : ''}">${result}</div>`;
    return result;
  };
  if (vPreInline) {
    const rawInlineCodeRule = md.renderer.rules.code_inline;
    md.renderer.rules.code_inline = (tokens, idx, options, env, slf) => {
      const result = rawInlineCodeRule(tokens, idx, options, env, slf);
      return `<code v-pre${result.slice('<code'.length)}`;
    };
  }
};
export default codePlugin
