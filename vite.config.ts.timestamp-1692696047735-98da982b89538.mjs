var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "file:///F:/me/me/node_modules/.pnpm/registry.npmmirror.com+vite@4.3.4_@types+node@18.16.3_sass@1.62.1/node_modules/vite/dist/node/index.js";
import vue from "file:///F:/me/me/node_modules/.pnpm/registry.npmmirror.com+@vitejs+plugin-vue@4.2.1_vite@4.3.4_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import UnoCSS from "file:///F:/me/me/node_modules/.pnpm/registry.npmmirror.com+unocss@0.51.8_postcss@8.4.23_rollup@2.79.1_vite@4.3.4/node_modules/unocss/dist/vite.mjs";
import fs from "file:///F:/me/me/node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.1/node_modules/fs-extra/lib/index.js";
import matter from "file:///F:/me/me/node_modules/.pnpm/registry.npmmirror.com+gray-matter@4.0.3/node_modules/gray-matter/index.js";
import Pages from "file:///F:/me/me/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-pages@0.29.0_vite@4.3.4/node_modules/vite-plugin-pages/dist/index.mjs";
import AutoImport from "file:///F:/me/me/node_modules/.pnpm/registry.npmmirror.com+unplugin-auto-import@0.15.3_@vueuse+core@10.1.2_rollup@2.79.1/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///F:/me/me/node_modules/.pnpm/registry.npmmirror.com+unplugin-vue-components@0.24.1_rollup@2.79.1_vue@3.3.4/node_modules/unplugin-vue-components/dist/vite.mjs";
import IconsResolver from "file:///F:/me/me/node_modules/.pnpm/registry.npmmirror.com+unplugin-icons@0.16.1/node_modules/unplugin-icons/dist/resolver.mjs";
import Inspect from "file:///F:/me/me/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-inspect@0.7.24_rollup@2.79.1_vite@4.3.4/node_modules/vite-plugin-inspect/dist/index.mjs";
import Icons from "file:///F:/me/me/node_modules/.pnpm/registry.npmmirror.com+unplugin-icons@0.16.1/node_modules/unplugin-icons/dist/vite.mjs";
import SVG from "file:///F:/me/me/node_modules/.pnpm/registry.npmmirror.com+vite-svg-loader@4.0.0/node_modules/vite-svg-loader/index.js";
import Markdown from "file:///F:/me/me/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-vue-markdown@0.23.4_rollup@2.79.1_vite@4.3.4/node_modules/vite-plugin-vue-markdown/dist/index.mjs";
import LinkAttributes from "file:///F:/me/me/node_modules/.pnpm/registry.npmmirror.com+markdown-it-link-attributes@4.0.1/node_modules/markdown-it-link-attributes/index.js";
import Shiki from "file:///F:/me/me/node_modules/.pnpm/registry.npmmirror.com+markdown-it-shiki@0.9.0/node_modules/markdown-it-shiki/dist/index.mjs";
import anchor from "file:///F:/me/me/node_modules/.pnpm/registry.npmmirror.com+markdown-it-anchor@8.6.7_@types+markdown-it@12.2.3_markdown-it@13.0.1/node_modules/markdown-it-anchor/dist/markdownItAnchor.js";

// scripts/slugify.ts
import { remove } from "file:///F:/me/me/node_modules/.pnpm/registry.npmmirror.com+diacritics@1.3.0/node_modules/diacritics/index.js";
var rControl = /[\u0000-\u001F]/g;
var rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g;
var slugify = (str) => {
  return remove(str).replace(rControl, "").replace(rSpecial, "-").replace(/-{2,}/g, "-").replace(/^-+|-+$/g, "").replace(/^(\d)/, "_$1").toLowerCase();
};

// vite.config.ts
import emoji from "file:///F:/me/me/node_modules/.pnpm/registry.npmmirror.com+markdown-it-emoji@2.0.2/node_modules/markdown-it-emoji/index.js";
import TOC from "file:///F:/me/me/node_modules/.pnpm/registry.npmmirror.com+markdown-it-table-of-contents@0.6.0/node_modules/markdown-it-table-of-contents/index.js";

// src/plugins/MarkDown/resolveHighlightLines.ts
function resolveHighlightLines(info) {
  const match = info.match(/{([\d,-]+)}/);
  if (match === null) {
    return null;
  }
  return match[1].split(",").map((item) => {
    const range = item.split("-");
    if (range.length === 1) {
      range.push(range[0]);
    }
    return range.map((str) => Number.parseInt(str, 10));
  });
}
function isHighlightLine(lineNumber, ranges) {
  return ranges.some(([start, end]) => lineNumber >= start && lineNumber <= end);
}

// src/plugins/MarkDown/languages.ts
var languages_exports = {};
__export(languages_exports, {
  languageBash: () => languageBash,
  languageCsharp: () => languageCsharp,
  languageDocker: () => languageDocker,
  languageFsharp: () => languageFsharp,
  languageJavascript: () => languageJavascript,
  languageKotlin: () => languageKotlin,
  languageMarkdown: () => languageMarkdown,
  languagePython: () => languagePython,
  languageRuby: () => languageRuby,
  languageRust: () => languageRust,
  languageStylus: () => languageStylus,
  languageTypescript: () => languageTypescript,
  languageYaml: () => languageYaml
});
var languageBash = {
  name: "bash",
  ext: "sh",
  aliases: ["bash", "sh", "shell", "zsh"]
};
var languageCsharp = {
  name: "csharp",
  ext: "cs",
  aliases: ["cs", "csharp"]
};
var languageDocker = {
  name: "docker",
  ext: "docker",
  aliases: ["docker", "dockerfile"]
};
var languageFsharp = {
  name: "fsharp",
  ext: "fs",
  aliases: ["fs", "fsharp"]
};
var languageJavascript = {
  name: "javascript",
  ext: "js",
  aliases: ["javascript", "js"]
};
var languageKotlin = {
  name: "kotlin",
  ext: "kt",
  aliases: ["kotlin", "kt"]
};
var languageMarkdown = {
  name: "markdown",
  ext: "md",
  aliases: ["markdown", "md"]
};
var languagePython = {
  name: "python",
  ext: "py",
  aliases: ["py", "python"]
};
var languageRuby = {
  name: "ruby",
  ext: "rb",
  aliases: ["rb", "ruby"]
};
var languageRust = {
  name: "rust",
  ext: "rs",
  aliases: ["rs", "rust"]
};
var languageStylus = {
  name: "stylus",
  ext: "styl",
  aliases: ["styl", "stylus"]
};
var languageTypescript = {
  name: "typescript",
  ext: "ts",
  aliases: ["ts", "typescript"]
};
var languageYaml = {
  name: "yaml",
  ext: "yml",
  aliases: ["yaml", "yml"]
};

// src/plugins/MarkDown/resolveLanguage.ts
var languagesMap;
var getLanguagesMap = () => {
  if (!languagesMap) {
    languagesMap = Object.values(languages_exports).reduce((result, item) => {
      item.aliases.forEach((alias) => {
        result[alias] = item;
      });
      return result;
    }, {});
  }
  return languagesMap;
};
var resolveLanguage = (info) => {
  var _a;
  const alias = ((_a = info.match(/^([^ :[{]+)/)) == null ? void 0 : _a[1]) || "text";
  return getLanguagesMap()[alias] ?? {
    name: alias,
    ext: alias,
    aliases: [alias]
  };
};

// src/plugins/MarkDown/resolveLineNumbers.ts
var resolveLineNumbers = (info) => {
  if (/:line-numbers\b/.test(info)) {
    return true;
  }
  if (/:no-line-numbers\b/.test(info)) {
    return false;
  }
  return null;
};

// src/plugins/MarkDown/resolveVPre.ts
var resolveVPre = (info) => {
  if (/:v-pre\b/.test(info)) {
    return true;
  }
  if (/:no-v-pre\b/.test(info)) {
    return false;
  }
  return null;
};

// src/plugins/MarkDown/codePlugin.ts
var codePlugin = (md, { highlightLines = true, lineNumbers = true, preWrapper = true, vPre: { block: vPreBlock = true, inline: vPreInline = true } = {} } = {}) => {
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    var _a;
    const token = tokens[idx];
    const info = token.info ? md.utils.unescapeAll(token.info).trim() : "";
    const language = resolveLanguage(info);
    const languageClass = `${options.langPrefix}${language.name}`;
    const code = ((_a = options.highlight) == null ? void 0 : _a.call(options, token.content, language.name, "")) || md.utils.escapeHtml(token.content);
    let result = code.startsWith("<pre") ? code : `<pre class="${languageClass}"><code>${code}</code></pre>`;
    const useVPre = resolveVPre(info) ?? vPreBlock;
    if (useVPre) {
      result = `<pre v-pre${result.slice("<pre".length)}`;
    }
    if (!preWrapper) {
      return result;
    }
    const lines = code.split("\n").slice(0, -1);
    const highlightLinesRanges = highlightLines ? resolveHighlightLines(info) : null;
    if (highlightLinesRanges) {
      const highlightLinesCode = lines.map((_, index) => {
        if (isHighlightLine(index + 1, highlightLinesRanges)) {
          return '<div class="highlight-line">&nbsp;</div>';
        }
        return "<br>";
      }).join("");
      result = `${result}<div class="highlight-lines">${highlightLinesCode}</div>`;
    }
    const useLineNumbers = resolveLineNumbers(info) ?? (typeof lineNumbers === "number" ? lines.length >= lineNumbers : lineNumbers);
    if (useLineNumbers) {
      const lineNumbersCode = lines.map(() => `<div class="line-number"></div>`).join("");
      result = `${result}<div class="line-numbers" aria-hidden="true">${lineNumbersCode}</div>`;
    }
    const lang = extractLang(info);
    const CopyCodeBtn = `<button title="Copy Code" class="copy"></button>`;
    result = `<div class="${languageClass} ext-${language.ext}${useLineNumbers ? " line-numbers-mode" : ""}">${CopyCodeBtn}${result}</div>`;
    return result;
  };
  if (vPreInline) {
    const rawInlineCodeRule = md.renderer.rules.code_inline;
    if (rawInlineCodeRule) {
      md.renderer.rules.code_inline = (tokens, idx, options, env, slf) => {
        const token = tokens[idx];
        const lang = token.info ? md.utils.escapeHtml(token.info).trim() : "";
        const code = md.utils.escapeHtml(token.content);
        return `<code class="${options.langPrefix}${lang}">${code}</code>`;
      };
    }
  }
};
function extractLang(info) {
  return info.trim().replace(/:(no-)?line-numbers({| |$).*/, "").replace(/(-vue|{| ).*$/, "").replace(/^vue-html$/, "template");
}
var codePlugin_default = codePlugin;

// vite.config.ts
var __vite_injected_original_dirname = "F:\\me\\me";
var vite_config_default = defineConfig({
  plugins: [
    UnoCSS(),
    vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true
    }),
    Pages({
      extensions: ["vue", "md"],
      pagesDir: "pages",
      extendRoute(route) {
        const path = resolve(__vite_injected_original_dirname, route.component.slice(1));
        if (!path.includes("projects.md") && path.endsWith(".md")) {
          const md = fs.readFileSync(path, "utf-8");
          const { data } = matter(md);
          route.meta = Object.assign(route.meta || {}, { frontmatter: data });
        }
        return route;
      }
    }),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "@vueuse/core",
        "@vueuse/head"
      ]
    }),
    Components({
      extensions: ["vue", "md"],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          componentPrefix: ""
        })
      ]
    }),
    Inspect(),
    Icons({
      defaultClass: "inline",
      defaultStyle: "vertical-align: sub;"
    }),
    SVG({
      svgo: false
    }),
    Markdown({
      wrapperComponent: "NewPost",
      wrapperClasses: (id, code) => {
        return code.includes("@layout-full-width") ? "layout-full-width" : "prose  slide-enter-content";
      },
      headEnabled: true,
      markdownItOptions: {
        quotes: `""''`
      },
      markdownItSetup(md) {
        md.use(LinkAttributes, {
          matcher: (link) => /^https?:\/\//.test(link),
          attrs: {
            target: "_blank",
            rel: "noopener"
          }
        });
        md.use(emoji);
        md.use(anchor, {
          slugify,
          permalink: anchor.permalink.linkInsideHeader({
            symbol: "#",
            renderAttrs: () => ({ "aria-hidden": "true" })
          })
        });
        md.use(Shiki, {
          theme: "dark-plus"
        });
        md.use(codePlugin_default);
        md.use(TOC, {
          includeLevel: [1, 2, 3, 4, 5, 6],
          slugify
        });
      }
    })
  ],
  optimizeDeps: {
    // 优化依赖项
    include: [
      "vue",
      "vue-router",
      "@vueuse/core",
      "dayjs",
      "dayjs/plugin/localizedFormat"
    ]
  },
  resolve: {
    // 通配符
    alias: [
      { find: "~/", replacement: `${resolve(__vite_injected_original_dirname, "src")}/` }
    ]
  },
  build: {
    rollupOptions: {
      onwarn(warning, next) {
        if (warning.code !== "UNUSED_EXTERNAL_IMPORT")
          next(warning);
      }
    }
  },
  ssgOptions: {
    formatting: "minify",
    format: "cjs"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic2NyaXB0cy9zbHVnaWZ5LnRzIiwgInNyYy9wbHVnaW5zL01hcmtEb3duL3Jlc29sdmVIaWdobGlnaHRMaW5lcy50cyIsICJzcmMvcGx1Z2lucy9NYXJrRG93bi9sYW5ndWFnZXMudHMiLCAic3JjL3BsdWdpbnMvTWFya0Rvd24vcmVzb2x2ZUxhbmd1YWdlLnRzIiwgInNyYy9wbHVnaW5zL01hcmtEb3duL3Jlc29sdmVMaW5lTnVtYmVycy50cyIsICJzcmMvcGx1Z2lucy9NYXJrRG93bi9yZXNvbHZlVlByZS50cyIsICJzcmMvcGx1Z2lucy9NYXJrRG93bi9jb2RlUGx1Z2luLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRjpcXFxcbWVcXFxcbWVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXG1lXFxcXG1lXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9tZS9tZS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IFVub0NTUyBmcm9tICd1bm9jc3Mvdml0ZSdcbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSdcbmltcG9ydCBtYXR0ZXIgZnJvbSAnZ3JheS1tYXR0ZXInXG5pbXBvcnQgUGFnZXMgZnJvbSAndml0ZS1wbHVnaW4tcGFnZXMnXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gJ3VucGx1Z2luLWljb25zL3Jlc29sdmVyJ1xuaW1wb3J0IEluc3BlY3QgZnJvbSAndml0ZS1wbHVnaW4taW5zcGVjdCdcbmltcG9ydCBJY29ucyBmcm9tICd1bnBsdWdpbi1pY29ucy92aXRlJ1xuaW1wb3J0IFNWRyBmcm9tICd2aXRlLXN2Zy1sb2FkZXInXG5pbXBvcnQgTWFya2Rvd24gZnJvbSAndml0ZS1wbHVnaW4tdnVlLW1hcmtkb3duJ1xuaW1wb3J0IExpbmtBdHRyaWJ1dGVzIGZyb20gJ21hcmtkb3duLWl0LWxpbmstYXR0cmlidXRlcydcbmltcG9ydCBTaGlraSBmcm9tICdtYXJrZG93bi1pdC1zaGlraSdcbmltcG9ydCBhbmNob3IgZnJvbSAnbWFya2Rvd24taXQtYW5jaG9yJ1xuaW1wb3J0IHsgc2x1Z2lmeSB9IGZyb20gJy4vc2NyaXB0cy9zbHVnaWZ5J1xuaW1wb3J0IGVtb2ppIGZyb20gJ21hcmtkb3duLWl0LWVtb2ppJ1xuLy8gQHRzLWV4cGVjdC1lcnJvciBtaXNzaW5nIHR5cGVzXG5pbXBvcnQgVE9DIGZyb20gJ21hcmtkb3duLWl0LXRhYmxlLW9mLWNvbnRlbnRzJ1xuXG4vLyBcdTgxRUFcdTVCOUFcdTRFNDlcdTYzRDJcdTRFRjZcbmltcG9ydCBjb2RlUGx1Z2luIGZyb20gJy4vc3JjL3BsdWdpbnMvTWFya0Rvd24vY29kZVBsdWdpbidcbi8vIGltcG9ydCBjdXN0b21Ub2NQbHVnaW4gZnJvbSAnLi9zcmMvcGx1Z2lucy9UT0MvY3VzdG9tVG9jUGx1Z2luJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIFVub0NTUygpLFxuICAgIHZ1ZSh7XG4gICAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwubWQkL10sXG4gICAgICByZWFjdGl2aXR5VHJhbnNmb3JtOiB0cnVlLFxuICAgIH0pLFxuICAgIFBhZ2VzKHtcbiAgICAgIGV4dGVuc2lvbnM6IFsndnVlJywgJ21kJ10sXG4gICAgICBwYWdlc0RpcjogJ3BhZ2VzJyxcbiAgICAgIGV4dGVuZFJvdXRlKHJvdXRlKSB7XG4gICAgICAgIGNvbnN0IHBhdGggPSByZXNvbHZlKF9fZGlybmFtZSwgcm91dGUuY29tcG9uZW50LnNsaWNlKDEpKVxuXG4gICAgICAgIGlmICghcGF0aC5pbmNsdWRlcygncHJvamVjdHMubWQnKSAmJiBwYXRoLmVuZHNXaXRoKCcubWQnKSkge1xuICAgICAgICAgIGNvbnN0IG1kID0gZnMucmVhZEZpbGVTeW5jKHBhdGgsICd1dGYtOCcpXG4gICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBtYXR0ZXIobWQpXG4gICAgICAgICAgcm91dGUubWV0YSA9IE9iamVjdC5hc3NpZ24ocm91dGUubWV0YSB8fCB7fSwgeyBmcm9udG1hdHRlcjogZGF0YSB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJvdXRlXG4gICAgICB9LFxuICAgIH0pLFxuICAgIEF1dG9JbXBvcnQoe1xuICAgICAgaW1wb3J0czogW1xuICAgICAgICAndnVlJyxcbiAgICAgICAgJ3Z1ZS1yb3V0ZXInLFxuICAgICAgICAnQHZ1ZXVzZS9jb3JlJyxcbiAgICAgICAgJ0B2dWV1c2UvaGVhZCcsXG4gICAgICBdLFxuICAgIH0pLFxuICAgIENvbXBvbmVudHMoe1xuICAgICAgZXh0ZW5zaW9uczogWyd2dWUnLCAnbWQnXSxcbiAgICAgIGR0czogdHJ1ZSxcbiAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC52dWVcXD92dWUvLCAvXFwubWQkL10sXG4gICAgICByZXNvbHZlcnM6IFtcbiAgICAgICAgSWNvbnNSZXNvbHZlcih7XG4gICAgICAgICAgY29tcG9uZW50UHJlZml4OiAnJyxcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgIH0pLFxuICAgIEluc3BlY3QoKSxcblxuICAgIEljb25zKHtcbiAgICAgIGRlZmF1bHRDbGFzczogJ2lubGluZScsXG4gICAgICBkZWZhdWx0U3R5bGU6ICd2ZXJ0aWNhbC1hbGlnbjogc3ViOycsXG4gICAgfSksXG5cbiAgICBTVkcoe1xuICAgICAgc3ZnbzogZmFsc2UsXG4gICAgfSksXG4gICAgTWFya2Rvd24oe1xuICAgICAgd3JhcHBlckNvbXBvbmVudDogJ05ld1Bvc3QnLFxuICAgICAgd3JhcHBlckNsYXNzZXM6IChpZCwgY29kZSkgPT4ge1xuICAgICAgICByZXR1cm4gY29kZS5pbmNsdWRlcygnQGxheW91dC1mdWxsLXdpZHRoJykgPyAnbGF5b3V0LWZ1bGwtd2lkdGgnIDogJ3Byb3NlICBzbGlkZS1lbnRlci1jb250ZW50J1xuICAgICAgfSxcbiAgICAgIGhlYWRFbmFibGVkOiB0cnVlLFxuICAgICAgbWFya2Rvd25JdE9wdGlvbnM6IHtcbiAgICAgICAgcXVvdGVzOiAnXCJcIlxcJ1xcJycsXG4gICAgICB9LFxuICAgICAgbWFya2Rvd25JdFNldHVwKG1kKSB7XG4gICAgICAgIG1kLnVzZShMaW5rQXR0cmlidXRlcywge1xuICAgICAgICAgIG1hdGNoZXI6IChsaW5rOiBzdHJpbmcpID0+IC9eaHR0cHM/OlxcL1xcLy8udGVzdChsaW5rKSxcbiAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgdGFyZ2V0OiAnX2JsYW5rJyxcbiAgICAgICAgICAgIHJlbDogJ25vb3BlbmVyJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICBtZC51c2UoZW1vamkpXG4gICAgICAgIG1kLnVzZShhbmNob3IsIHtcbiAgICAgICAgICBzbHVnaWZ5LFxuICAgICAgICAgIHBlcm1hbGluazogYW5jaG9yLnBlcm1hbGluay5saW5rSW5zaWRlSGVhZGVyKHtcbiAgICAgICAgICAgIHN5bWJvbDogJyMnLFxuICAgICAgICAgICAgcmVuZGVyQXR0cnM6ICgpID0+ICh7ICdhcmlhLWhpZGRlbic6ICd0cnVlJyB9KSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSlcbiAgICAgICAgbWQudXNlKFNoaWtpLCB7XG4gICAgICAgICAgdGhlbWU6ICdkYXJrLXBsdXMnXG4gICAgICAgIH0pXG4gICAgICAgIG1kLnVzZShjb2RlUGx1Z2luKVxuICAgICAgICBtZC51c2UoVE9DLCB7XG4gICAgICAgICAgaW5jbHVkZUxldmVsOiBbMSwgMiwgMywgNCwgNSwgNl0sXG4gICAgICAgICAgc2x1Z2lmeSxcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuXG4gIF0sXG4gIG9wdGltaXplRGVwczogeyAvLyBcdTRGMThcdTUzMTZcdTRGOURcdThENTZcdTk4NzlcbiAgICBpbmNsdWRlOiBbXG4gICAgICAndnVlJyxcbiAgICAgICd2dWUtcm91dGVyJyxcbiAgICAgICdAdnVldXNlL2NvcmUnLFxuICAgICAgJ2RheWpzJyxcbiAgICAgICdkYXlqcy9wbHVnaW4vbG9jYWxpemVkRm9ybWF0JyxcbiAgICBdLFxuICB9LFxuICByZXNvbHZlOiB7IC8vIFx1OTAxQVx1OTE0RFx1N0IyNlxuICAgIGFsaWFzOiBbXG4gICAgICB7IGZpbmQ6ICd+LycsIHJlcGxhY2VtZW50OiBgJHtyZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpfS9gIH0sXG4gICAgXSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvbndhcm4od2FybmluZywgbmV4dCkge1xuICAgICAgICBpZiAod2FybmluZy5jb2RlICE9PSAnVU5VU0VEX0VYVEVSTkFMX0lNUE9SVCcpXG4gICAgICAgICAgbmV4dCh3YXJuaW5nKVxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBzc2dPcHRpb25zOiB7XG4gICAgZm9ybWF0dGluZzogJ21pbmlmeScsXG4gICAgZm9ybWF0OiAnY2pzJyxcbiAgfSxcbn0pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkY6XFxcXG1lXFxcXG1lXFxcXHNjcmlwdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXG1lXFxcXG1lXFxcXHNjcmlwdHNcXFxcc2x1Z2lmeS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovbWUvbWUvc2NyaXB0cy9zbHVnaWZ5LnRzXCI7Ly8gc3RyaW5nLmpzIHNsdWdpZnkgZHJvcHMgbm9uIGFzY2lpIGNoYXJzIHNvIHdlIGhhdmUgdG9cclxuLy8gdXNlIGEgY3VzdG9tIGltcGxlbWVudGF0aW9uIGhlcmVcclxuaW1wb3J0IHsgcmVtb3ZlIH0gZnJvbSAnZGlhY3JpdGljcydcclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRyb2wtcmVnZXhcclxuY29uc3QgckNvbnRyb2wgPSAvW1xcdTAwMDAtXFx1MDAxRl0vZ1xyXG5jb25zdCByU3BlY2lhbCA9IC9bXFxzfmAhQCMkJV4mKigpXFwtXys9W1xcXXt9fFxcXFw7OlwiJzw+LC4/L10rL2dcclxuXHJcbmV4cG9ydCBjb25zdCBzbHVnaWZ5ID0gKHN0cjogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgcmVtb3ZlKHN0cilcclxuICAgICAgLy8gUmVtb3ZlIGNvbnRyb2wgY2hhcmFjdGVyc1xyXG4gICAgICAucmVwbGFjZShyQ29udHJvbCwgJycpXHJcbiAgICAgIC8vIFJlcGxhY2Ugc3BlY2lhbCBjaGFyYWN0ZXJzXHJcbiAgICAgIC5yZXBsYWNlKHJTcGVjaWFsLCAnLScpXHJcbiAgICAgIC8vIFJlbW92ZSBjb250aW51b3Mgc2VwYXJhdG9yc1xyXG4gICAgICAucmVwbGFjZSgvLXsyLH0vZywgJy0nKVxyXG4gICAgICAvLyBSZW1vdmUgcHJlZml4aW5nIGFuZCB0cmFpbGluZyBzZXBhcnRvcnNcclxuICAgICAgLnJlcGxhY2UoL14tK3wtKyQvZywgJycpXHJcbiAgICAgIC8vIGVuc3VyZSBpdCBkb2Vzbid0IHN0YXJ0IHdpdGggYSBudW1iZXIgKCMxMjEpXHJcbiAgICAgIC5yZXBsYWNlKC9eKFxcZCkvLCAnXyQxJylcclxuICAgICAgLy8gbG93ZXJjYXNlXHJcbiAgICAgIC50b0xvd2VyQ2FzZSgpXHJcbiAgKVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRjpcXFxcbWVcXFxcbWVcXFxcc3JjXFxcXHBsdWdpbnNcXFxcTWFya0Rvd25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXG1lXFxcXG1lXFxcXHNyY1xcXFxwbHVnaW5zXFxcXE1hcmtEb3duXFxcXHJlc29sdmVIaWdobGlnaHRMaW5lcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovbWUvbWUvc3JjL3BsdWdpbnMvTWFya0Rvd24vcmVzb2x2ZUhpZ2hsaWdodExpbmVzLnRzXCI7XHJcbi8qKlxyXG4gKiBSZXNvbHZlIGhpZ2hsaWdodC1saW5lcyByYW5nZXMgZnJvbSB0b2tlbiBpbmZvXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZUhpZ2hsaWdodExpbmVzKGluZm86IHN0cmluZyk6IG51bWJlcltdW10gfCBudWxsIHtcclxuICAvLyB0cnkgdG8gbWF0Y2ggaGlnaGxpZ2h0LWxpbmVzIG1hcmtcclxuICBjb25zdCBtYXRjaCA9IGluZm8ubWF0Y2goL3soW1xcZCwtXSspfS8pO1xyXG4gIC8vIG5vIGhpZ2hsaWdodC1saW5lcyBtYXJrLCByZXR1cm4gYG51bGxgXHJcbiAgaWYgKG1hdGNoID09PSBudWxsKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgLy8gcmVzb2x2ZSBsaW5lcyByYW5nZXMgZnJvbSB0aGUgaGlnaGxpZ2h0LWxpbmVzIG1hcmtcclxuICByZXR1cm4gbWF0Y2hbMV0uc3BsaXQoXCIsXCIpLm1hcCgoaXRlbSkgPT4ge1xyXG4gICAgY29uc3QgcmFuZ2UgPSBpdGVtLnNwbGl0KFwiLVwiKTtcclxuICAgIGlmIChyYW5nZS5sZW5ndGggPT09IDEpIHtcclxuICAgICAgcmFuZ2UucHVzaChyYW5nZVswXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmFuZ2UubWFwKChzdHIpID0+IE51bWJlci5wYXJzZUludChzdHIsIDEwKSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBhIGxpbmUgbnVtYmVyIGlzIGluIHJhbmdlc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzSGlnaGxpZ2h0TGluZShsaW5lTnVtYmVyOiBudW1iZXIsIHJhbmdlczogbnVtYmVyW11bXSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiByYW5nZXMuc29tZSgoW3N0YXJ0LCBlbmRdKSA9PiBsaW5lTnVtYmVyID49IHN0YXJ0ICYmIGxpbmVOdW1iZXIgPD0gZW5kKTtcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkY6XFxcXG1lXFxcXG1lXFxcXHNyY1xcXFxwbHVnaW5zXFxcXE1hcmtEb3duXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxtZVxcXFxtZVxcXFxzcmNcXFxccGx1Z2luc1xcXFxNYXJrRG93blxcXFxsYW5ndWFnZXMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Y6L21lL21lL3NyYy9wbHVnaW5zL01hcmtEb3duL2xhbmd1YWdlcy50c1wiO2ludGVyZmFjZSBMYW5ndWFnZSB7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIGV4dDogc3RyaW5nO1xyXG4gIGFsaWFzZXM6IHN0cmluZ1tdO1xyXG59XHJcblxyXG5jb25zdCBsYW5ndWFnZUJhc2g6IExhbmd1YWdlID0ge1xyXG4gIG5hbWU6ICdiYXNoJyxcclxuICBleHQ6ICdzaCcsXHJcbiAgYWxpYXNlczogWydiYXNoJywgJ3NoJywgJ3NoZWxsJywgJ3pzaCddLFxyXG59O1xyXG5cclxuY29uc3QgbGFuZ3VhZ2VDc2hhcnA6IExhbmd1YWdlID0ge1xyXG4gIG5hbWU6ICdjc2hhcnAnLFxyXG4gIGV4dDogJ2NzJyxcclxuICBhbGlhc2VzOiBbJ2NzJywgJ2NzaGFycCddLFxyXG59O1xyXG5cclxuY29uc3QgbGFuZ3VhZ2VEb2NrZXI6IExhbmd1YWdlID0ge1xyXG4gIG5hbWU6ICdkb2NrZXInLFxyXG4gIGV4dDogJ2RvY2tlcicsXHJcbiAgYWxpYXNlczogWydkb2NrZXInLCAnZG9ja2VyZmlsZSddLFxyXG59O1xyXG5cclxuY29uc3QgbGFuZ3VhZ2VGc2hhcnA6IExhbmd1YWdlID0ge1xyXG4gIG5hbWU6ICdmc2hhcnAnLFxyXG4gIGV4dDogJ2ZzJyxcclxuICBhbGlhc2VzOiBbJ2ZzJywgJ2ZzaGFycCddLFxyXG59O1xyXG5cclxuY29uc3QgbGFuZ3VhZ2VKYXZhc2NyaXB0OiBMYW5ndWFnZSA9IHtcclxuICBuYW1lOiAnamF2YXNjcmlwdCcsXHJcbiAgZXh0OiAnanMnLFxyXG4gIGFsaWFzZXM6IFsnamF2YXNjcmlwdCcsICdqcyddLFxyXG59O1xyXG5cclxuY29uc3QgbGFuZ3VhZ2VLb3RsaW46IExhbmd1YWdlID0ge1xyXG4gIG5hbWU6ICdrb3RsaW4nLFxyXG4gIGV4dDogJ2t0JyxcclxuICBhbGlhc2VzOiBbJ2tvdGxpbicsICdrdCddLFxyXG59O1xyXG5cclxuY29uc3QgbGFuZ3VhZ2VNYXJrZG93bjogTGFuZ3VhZ2UgPSB7XHJcbiAgbmFtZTogJ21hcmtkb3duJyxcclxuICBleHQ6ICdtZCcsXHJcbiAgYWxpYXNlczogWydtYXJrZG93bicsICdtZCddLFxyXG59O1xyXG5cclxuY29uc3QgbGFuZ3VhZ2VQeXRob246IExhbmd1YWdlID0ge1xyXG4gIG5hbWU6ICdweXRob24nLFxyXG4gIGV4dDogJ3B5JyxcclxuICBhbGlhc2VzOiBbJ3B5JywgJ3B5dGhvbiddLFxyXG59O1xyXG5cclxuY29uc3QgbGFuZ3VhZ2VSdWJ5OiBMYW5ndWFnZSA9IHtcclxuICBuYW1lOiAncnVieScsXHJcbiAgZXh0OiAncmInLFxyXG4gIGFsaWFzZXM6IFsncmInLCAncnVieSddLFxyXG59O1xyXG5cclxuY29uc3QgbGFuZ3VhZ2VSdXN0OiBMYW5ndWFnZSA9IHtcclxuICBuYW1lOiAncnVzdCcsXHJcbiAgZXh0OiAncnMnLFxyXG4gIGFsaWFzZXM6IFsncnMnLCAncnVzdCddLFxyXG59O1xyXG5cclxuY29uc3QgbGFuZ3VhZ2VTdHlsdXM6IExhbmd1YWdlID0ge1xyXG4gIG5hbWU6ICdzdHlsdXMnLFxyXG4gIGV4dDogJ3N0eWwnLFxyXG4gIGFsaWFzZXM6IFsnc3R5bCcsICdzdHlsdXMnXSxcclxufTtcclxuXHJcbmNvbnN0IGxhbmd1YWdlVHlwZXNjcmlwdDogTGFuZ3VhZ2UgPSB7XHJcbiAgbmFtZTogJ3R5cGVzY3JpcHQnLFxyXG4gIGV4dDogJ3RzJyxcclxuICBhbGlhc2VzOiBbJ3RzJywgJ3R5cGVzY3JpcHQnXSxcclxufTtcclxuXHJcbmNvbnN0IGxhbmd1YWdlWWFtbDogTGFuZ3VhZ2UgPSB7XHJcbiAgbmFtZTogJ3lhbWwnLFxyXG4gIGV4dDogJ3ltbCcsXHJcbiAgYWxpYXNlczogWyd5YW1sJywgJ3ltbCddLFxyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICBsYW5ndWFnZUJhc2gsXHJcbiAgbGFuZ3VhZ2VDc2hhcnAsXHJcbiAgbGFuZ3VhZ2VEb2NrZXIsXHJcbiAgbGFuZ3VhZ2VGc2hhcnAsXHJcbiAgbGFuZ3VhZ2VKYXZhc2NyaXB0LFxyXG4gIGxhbmd1YWdlS290bGluLFxyXG4gIGxhbmd1YWdlTWFya2Rvd24sXHJcbiAgbGFuZ3VhZ2VQeXRob24sXHJcbiAgbGFuZ3VhZ2VSdWJ5LFxyXG4gIGxhbmd1YWdlUnVzdCxcclxuICBsYW5ndWFnZVN0eWx1cyxcclxuICBsYW5ndWFnZVR5cGVzY3JpcHQsXHJcbiAgbGFuZ3VhZ2VZYW1sLFxyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkY6XFxcXG1lXFxcXG1lXFxcXHNyY1xcXFxwbHVnaW5zXFxcXE1hcmtEb3duXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxtZVxcXFxtZVxcXFxzcmNcXFxccGx1Z2luc1xcXFxNYXJrRG93blxcXFxyZXNvbHZlTGFuZ3VhZ2UudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Y6L21lL21lL3NyYy9wbHVnaW5zL01hcmtEb3duL3Jlc29sdmVMYW5ndWFnZS50c1wiO2ltcG9ydCAqIGFzIGxhbmd1YWdlcyBmcm9tICcuL2xhbmd1YWdlcyc7XHJcblxyXG5cclxuaW50ZXJmYWNlIHJlc29sdmVMYW5ndWFnZUxhbmd1YWdlIHtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgZXh0OiBzdHJpbmc7XHJcbiAgYWxpYXNlczogc3RyaW5nW107XHJcbn1cclxuLyoqXHJcbiAqIEEga2V5LXZhbHVlIG1hcCB0byBnZXQgbGFuZ3VhZ2UgaW5mbyBmcm9tIGFsaWFzXHJcbiAqXHJcbiAqIC0ga2V5OiBhbGlhc1xyXG4gKiAtIHZhbHVlOiBsYW5ndWFnZVxyXG4gKi9cclxubGV0IGxhbmd1YWdlc01hcDogeyBbYWxpYXM6IHN0cmluZ106IHJlc29sdmVMYW5ndWFnZUxhbmd1YWdlIH07XHJcblxyXG4vKipcclxuICogTGF6eSBnZW5lcmF0ZSBsYW5ndWFnZXMgbWFwXHJcbiAqL1xyXG5jb25zdCBnZXRMYW5ndWFnZXNNYXAgPSAoKTogeyBbYWxpYXM6IHN0cmluZ106IHJlc29sdmVMYW5ndWFnZUxhbmd1YWdlIH0gPT4ge1xyXG4gIGlmICghbGFuZ3VhZ2VzTWFwKSB7XHJcbiAgICBsYW5ndWFnZXNNYXAgPSBPYmplY3QudmFsdWVzKGxhbmd1YWdlcykucmVkdWNlKChyZXN1bHQsIGl0ZW0pID0+IHtcclxuICAgICAgaXRlbS5hbGlhc2VzLmZvckVhY2goKGFsaWFzKSA9PiB7XHJcbiAgICAgICAgcmVzdWx0W2FsaWFzXSA9IGl0ZW07XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSwge30gYXMgeyBbYWxpYXM6IHN0cmluZ106IHJlc29sdmVMYW5ndWFnZUxhbmd1YWdlIH0pO1xyXG4gIH1cclxuICByZXR1cm4gbGFuZ3VhZ2VzTWFwO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlc29sdmUgbGFuZ3VhZ2UgZm9yIGhpZ2hsaWdodCBmcm9tIHRva2VuIGluZm9cclxuICovXHJcbmV4cG9ydCBjb25zdCByZXNvbHZlTGFuZ3VhZ2UgPSAoaW5mbzogc3RyaW5nKTogcmVzb2x2ZUxhbmd1YWdlTGFuZ3VhZ2UgPT4ge1xyXG4gIC8vIGdldCB1c2VyLWRlZmluZWQgbGFuZ3VhZ2UgYWxpYXNcclxuICBjb25zdCBhbGlhcyA9IGluZm8ubWF0Y2goL14oW14gOlt7XSspLyk/LlsxXSB8fCAndGV4dCc7XHJcblxyXG4gIC8vIGlmIHRoZSBhbGlhcyBkb2VzIG5vdCBoYXZlIGEgbWF0Y2ggaW4gdGhlIG1hcFxyXG4gIC8vIGZhbGxiYWNrIHRvIHRoZSBhbGlhcyBpdHNlbGZcclxuICByZXR1cm4gKFxyXG4gICAgZ2V0TGFuZ3VhZ2VzTWFwKClbYWxpYXNdID8/IHtcclxuICAgICAgbmFtZTogYWxpYXMsXHJcbiAgICAgIGV4dDogYWxpYXMsXHJcbiAgICAgIGFsaWFzZXM6IFthbGlhc10sXHJcbiAgICB9XHJcbiAgKTtcclxufTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxtZVxcXFxtZVxcXFxzcmNcXFxccGx1Z2luc1xcXFxNYXJrRG93blwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRjpcXFxcbWVcXFxcbWVcXFxcc3JjXFxcXHBsdWdpbnNcXFxcTWFya0Rvd25cXFxccmVzb2x2ZUxpbmVOdW1iZXJzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9tZS9tZS9zcmMvcGx1Z2lucy9NYXJrRG93bi9yZXNvbHZlTGluZU51bWJlcnMudHNcIjsvKipcclxuICogUmVzb2x2ZSB0aGUgYDpsaW5lLW51bWJlcnNgIC8gYDpuby1saW5lLW51bWJlcnNgIG1hcmsgZnJvbSB0b2tlbiBpbmZvXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgcmVzb2x2ZUxpbmVOdW1iZXJzID0gKGluZm86IHN0cmluZyk6IGJvb2xlYW4gfCBudWxsID0+IHtcclxuICBpZiAoLzpsaW5lLW51bWJlcnNcXGIvLnRlc3QoaW5mbykpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuICBpZiAoLzpuby1saW5lLW51bWJlcnNcXGIvLnRlc3QoaW5mbykpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgcmV0dXJuIG51bGw7XHJcbn07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRjpcXFxcbWVcXFxcbWVcXFxcc3JjXFxcXHBsdWdpbnNcXFxcTWFya0Rvd25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXG1lXFxcXG1lXFxcXHNyY1xcXFxwbHVnaW5zXFxcXE1hcmtEb3duXFxcXHJlc29sdmVWUHJlLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9tZS9tZS9zcmMvcGx1Z2lucy9NYXJrRG93bi9yZXNvbHZlVlByZS50c1wiOy8qKlxyXG4gKiBSZXNvbHZlIHRoZSBgOnYtcHJlYCAvIGA6bm8tdi1wcmVgIG1hcmsgZnJvbSB0b2tlbiBpbmZvXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgcmVzb2x2ZVZQcmUgPSAoaW5mbzogc3RyaW5nKTogYm9vbGVhbiB8IG51bGwgPT4ge1xyXG4gIGlmICgvOnYtcHJlXFxiLy50ZXN0KGluZm8pKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbiAgaWYgKC86bm8tdi1wcmVcXGIvLnRlc3QoaW5mbykpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgcmV0dXJuIG51bGw7XHJcbn07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRjpcXFxcbWVcXFxcbWVcXFxcc3JjXFxcXHBsdWdpbnNcXFxcTWFya0Rvd25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXG1lXFxcXG1lXFxcXHNyY1xcXFxwbHVnaW5zXFxcXE1hcmtEb3duXFxcXGNvZGVQbHVnaW4udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Y6L21lL21lL3NyYy9wbHVnaW5zL01hcmtEb3duL2NvZGVQbHVnaW4udHNcIjtpbXBvcnQgeyByZXNvbHZlSGlnaGxpZ2h0TGluZXMsIGlzSGlnaGxpZ2h0TGluZSB9IGZyb20gXCIuL3Jlc29sdmVIaWdobGlnaHRMaW5lc1wiO1xyXG5pbXBvcnQgeyByZXNvbHZlTGFuZ3VhZ2UgfSBmcm9tICcuL3Jlc29sdmVMYW5ndWFnZSc7XHJcbmltcG9ydCB7IHJlc29sdmVMaW5lTnVtYmVycyB9IGZyb20gJy4vcmVzb2x2ZUxpbmVOdW1iZXJzJ1xyXG5pbXBvcnQgeyByZXNvbHZlVlByZSB9IGZyb20gXCIuL3Jlc29sdmVWUHJlXCI7XHJcbmltcG9ydCB0eXBlIHsgUGx1Z2luV2l0aE9wdGlvbnMgfSBmcm9tICdtYXJrZG93bi1pdCc7XHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29kZVBsdWdpbk9wdGlvbnMge1xyXG4gIGhpZ2hsaWdodExpbmVzPzogYm9vbGVhbjtcclxuICBsaW5lTnVtYmVycz86IGJvb2xlYW4gfCBudW1iZXI7XHJcbiAgcHJlV3JhcHBlcj86IGJvb2xlYW47XHJcbiAgdlByZT86IHtcclxuICAgIGJsb2NrPzogYm9vbGVhbjtcclxuICAgIGlubGluZT86IGJvb2xlYW47XHJcbiAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvZGUgcGx1Z2luXHJcbiAqL1xyXG5jb25zdCBjb2RlUGx1Z2luOiBQbHVnaW5XaXRoT3B0aW9uczxDb2RlUGx1Z2luT3B0aW9ucz4gPSAobWQsIHsgaGlnaGxpZ2h0TGluZXMgPSB0cnVlLCBsaW5lTnVtYmVycyA9IHRydWUsIHByZVdyYXBwZXIgPSB0cnVlLCB2UHJlOiB7IGJsb2NrOiB2UHJlQmxvY2sgPSB0cnVlLCBpbmxpbmU6IHZQcmVJbmxpbmUgPSB0cnVlIH0gPSB7fSwgfSA9IHt9KSA9PiB7XHJcbiAgLy8gb3ZlcnJpZGUgZGVmYXVsdCBmZW5jZSByZW5kZXJlclxyXG4gIG1kLnJlbmRlcmVyLnJ1bGVzLmZlbmNlID0gKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNsZikgPT4ge1xyXG4gICAgY29uc3QgdG9rZW4gPSB0b2tlbnNbaWR4XTtcclxuICAgIC8vIGdldCB0b2tlbiBpbmZvXHJcbiAgICBjb25zdCBpbmZvID0gdG9rZW4uaW5mbyA/IG1kLnV0aWxzLnVuZXNjYXBlQWxsKHRva2VuLmluZm8pLnRyaW0oKSA6ICcnO1xyXG4gICAgLy8gcmVzb2x2ZSBsYW5ndWFnZSBmcm9tIHRva2VuIGluZm9cclxuICAgIGNvbnN0IGxhbmd1YWdlID0gcmVzb2x2ZUxhbmd1YWdlKGluZm8pO1xyXG4gICAgY29uc3QgbGFuZ3VhZ2VDbGFzcyA9IGAke29wdGlvbnMubGFuZ1ByZWZpeH0ke2xhbmd1YWdlLm5hbWV9YDtcclxuICAgIC8vIHRyeSB0byBnZXQgaGlnaGxpZ2h0ZWQgY29kZVxyXG4gICAgY29uc3QgY29kZSA9IG9wdGlvbnMuaGlnaGxpZ2h0Py4odG9rZW4uY29udGVudCwgbGFuZ3VhZ2UubmFtZSwgJycpIHx8XHJcbiAgICAgIG1kLnV0aWxzLmVzY2FwZUh0bWwodG9rZW4uY29udGVudCk7XHJcbiAgICAvLyB3cmFwIGhpZ2hsaWdodGVkIGNvZGUgd2l0aCBgPHByZT5gIGFuZCBgPGNvZGU+YFxyXG4gICAgbGV0IHJlc3VsdCA9IGNvZGUuc3RhcnRzV2l0aCgnPHByZScpXHJcbiAgICAgID8gY29kZVxyXG4gICAgICA6IGA8cHJlIGNsYXNzPVwiJHtsYW5ndWFnZUNsYXNzfVwiPjxjb2RlPiR7Y29kZX08L2NvZGU+PC9wcmU+YDtcclxuICAgIC8vIHJlc29sdmUgdi1wcmUgbWFyayBmcm9tIHRva2VuIGluZm9cclxuICAgIGNvbnN0IHVzZVZQcmUgPSByZXNvbHZlVlByZShpbmZvKSA/PyB2UHJlQmxvY2s7XHJcbiAgICBpZiAodXNlVlByZSkge1xyXG4gICAgICByZXN1bHQgPSBgPHByZSB2LXByZSR7cmVzdWx0LnNsaWNlKCc8cHJlJy5sZW5ndGgpfWA7XHJcbiAgICB9XHJcbiAgICAvLyBpZiBgcHJlV3JhcHBlcmAgaXMgZGlzYWJsZWQsIHJldHVybiBkaXJlY3RseVxyXG4gICAgaWYgKCFwcmVXcmFwcGVyKSB7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICAvLyBjb2RlIGZlbmNlcyBhbHdheXMgaGF2ZSBhbiBlbmRpbmcgYFxcbmAsIHNvIHdlIHNob3VsZCB0cmltIHRoZSBsYXN0IGxpbmVcclxuICAgIGNvbnN0IGxpbmVzID0gY29kZS5zcGxpdCgnXFxuJykuc2xpY2UoMCwgLTEpO1xyXG4gICAgLy8gcmVzb2x2ZSBoaWdobGlnaHQgbGluZSByYW5nZXMgZnJvbSB0b2tlbiBpbmZvXHJcbiAgICBjb25zdCBoaWdobGlnaHRMaW5lc1JhbmdlcyA9IGhpZ2hsaWdodExpbmVzXHJcbiAgICAgID8gcmVzb2x2ZUhpZ2hsaWdodExpbmVzKGluZm8pXHJcbiAgICAgIDogbnVsbDtcclxuICAgIC8vIGdlbmVyYXRlIGhpZ2hsaWdodCBsaW5lc1xyXG4gICAgaWYgKGhpZ2hsaWdodExpbmVzUmFuZ2VzKSB7XHJcbiAgICAgIGNvbnN0IGhpZ2hsaWdodExpbmVzQ29kZSA9IGxpbmVzXHJcbiAgICAgICAgLm1hcCgoXywgaW5kZXgpID0+IHtcclxuICAgICAgICAgIGlmIChpc0hpZ2hsaWdodExpbmUoaW5kZXggKyAxLCBoaWdobGlnaHRMaW5lc1JhbmdlcykpIHtcclxuICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaGlnaGxpZ2h0LWxpbmVcIj4mbmJzcDs8L2Rpdj4nO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuICc8YnI+JztcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5qb2luKCcnKTtcclxuICAgICAgcmVzdWx0ID0gYCR7cmVzdWx0fTxkaXYgY2xhc3M9XCJoaWdobGlnaHQtbGluZXNcIj4ke2hpZ2hsaWdodExpbmVzQ29kZX08L2Rpdj5gO1xyXG4gICAgfVxyXG4gICAgLy8gcmVzb2x2ZSBsaW5lLW51bWJlcnMgbWFyayBmcm9tIHRva2VuIGluZm9cclxuICAgIGNvbnN0IHVzZUxpbmVOdW1iZXJzID0gcmVzb2x2ZUxpbmVOdW1iZXJzKGluZm8pID8/XHJcbiAgICAgICh0eXBlb2YgbGluZU51bWJlcnMgPT09ICdudW1iZXInXHJcbiAgICAgICAgPyBsaW5lcy5sZW5ndGggPj0gbGluZU51bWJlcnNcclxuICAgICAgICA6IGxpbmVOdW1iZXJzKTtcclxuICAgIC8vIGdlbmVyYXRlIGxpbmUgbnVtYmVyc1xyXG4gICAgaWYgKHVzZUxpbmVOdW1iZXJzKSB7XHJcbiAgICAgIC8vIGdlbmVyYXRlIGxpbmUgbnVtYmVycyBjb2RlXHJcbiAgICAgIGNvbnN0IGxpbmVOdW1iZXJzQ29kZSA9IGxpbmVzXHJcbiAgICAgICAgLm1hcCgoKSA9PiBgPGRpdiBjbGFzcz1cImxpbmUtbnVtYmVyXCI+PC9kaXY+YClcclxuICAgICAgICAuam9pbignJyk7XHJcbiAgICAgIHJlc3VsdCA9IGAke3Jlc3VsdH08ZGl2IGNsYXNzPVwibGluZS1udW1iZXJzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+JHtsaW5lTnVtYmVyc0NvZGV9PC9kaXY+YDtcclxuICAgIH1cclxuICAgIC8vIFx1NEVFM1x1NzgwMVx1NUZFQlx1NTkwRFx1NTIzNlx1NzZGOFx1NTE3M1x1NEVFM1x1NzgwMVx1RkYwQyBcdTU0MTFcdTVGNTNcdTUyNERcdTUxNDNcdTdEMjBcdTUxODVcdTYzRDJcdTUxNjVcdTRFMDBcdTRFMkFidXR0b24gXHU2QjY0XHU2MzA5XHU5NEFFXHU3NTI4XHU0RThFXHU1OTBEXHU1MjM2XHU1RjUzXHU1MjREXHU0RUUzXHU3ODAxXHU1NzU3XHJcbiAgICBjb25zdCBsYW5nID0gZXh0cmFjdExhbmcoaW5mbylcclxuICAgIGNvbnN0IENvcHlDb2RlQnRuID0gYDxidXR0b24gdGl0bGU9XCJDb3B5IENvZGVcIiBjbGFzcz1cImNvcHlcIj48L2J1dHRvbj5gXHJcbiAgICByZXN1bHQgPSBgPGRpdiBjbGFzcz1cIiR7bGFuZ3VhZ2VDbGFzc30gZXh0LSR7bGFuZ3VhZ2UuZXh0fSR7dXNlTGluZU51bWJlcnMgPyAnIGxpbmUtbnVtYmVycy1tb2RlJyA6ICcnfVwiPiR7Q29weUNvZGVCdG59JHtyZXN1bHR9PC9kaXY+YDtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH07XHJcblxyXG4gIGlmICh2UHJlSW5saW5lKSB7XHJcbiAgICBjb25zdCByYXdJbmxpbmVDb2RlUnVsZSA9IG1kLnJlbmRlcmVyLnJ1bGVzLmNvZGVfaW5saW5lO1xyXG4gICAgaWYgKHJhd0lubGluZUNvZGVSdWxlKSB7XHJcbiAgICAgIG1kLnJlbmRlcmVyLnJ1bGVzLmNvZGVfaW5saW5lID0gKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNsZikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRva2VuID0gdG9rZW5zW2lkeF07XHJcbiAgICAgICAgY29uc3QgbGFuZyA9IHRva2VuLmluZm8gPyBtZC51dGlscy5lc2NhcGVIdG1sKHRva2VuLmluZm8pLnRyaW0oKSA6ICcnO1xyXG4gICAgICAgIGNvbnN0IGNvZGUgPSBtZC51dGlscy5lc2NhcGVIdG1sKHRva2VuLmNvbnRlbnQpO1xyXG5cclxuICAgICAgICByZXR1cm4gYDxjb2RlIGNsYXNzPVwiJHtvcHRpb25zLmxhbmdQcmVmaXh9JHtsYW5nfVwiPiR7Y29kZX08L2NvZGU+YDtcclxuICAgICAgfTtcclxuICAgICAgLy8gbWQucmVuZGVyZXIucnVsZXMuY29kZV9pbmxpbmUgPSAodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2xmKSA9PiB7XHJcbiAgICAgIC8vICAgY29uc3QgcmVzdWx0ID0gcmF3SW5saW5lQ29kZVJ1bGUodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2xmKTtcclxuICAgICAgLy8gICByZXR1cm4gYDxjb2RlIHYtcHJlJHtyZXN1bHQuc2xpY2UoJzxjb2RlJy5sZW5ndGgpfWA7XHJcbiAgICAgIC8vIH07XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuZnVuY3Rpb24gZXh0cmFjdExhbmcoaW5mbzogc3RyaW5nKSB7XHJcbiAgcmV0dXJuIGluZm9cclxuICAgIC50cmltKClcclxuICAgIC5yZXBsYWNlKC86KG5vLSk/bGluZS1udW1iZXJzKHt8IHwkKS4qLywgJycpXHJcbiAgICAucmVwbGFjZSgvKC12dWV8e3wgKS4qJC8sICcnKVxyXG4gICAgLnJlcGxhY2UoL152dWUtaHRtbCQvLCAndGVtcGxhdGUnKVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29kZVBsdWdpblxyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7O0FBQWdOLFNBQVMsZUFBZTtBQUN4TyxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sUUFBUTtBQUNmLE9BQU8sWUFBWTtBQUNuQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sV0FBVztBQUNsQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxjQUFjO0FBQ3JCLE9BQU8sb0JBQW9CO0FBQzNCLE9BQU8sV0FBVztBQUNsQixPQUFPLFlBQVk7OztBQ2RuQixTQUFTLGNBQWM7QUFFdkIsSUFBTSxXQUFXO0FBQ2pCLElBQU0sV0FBVztBQUVWLElBQU0sVUFBVSxDQUFDLFFBQXdCO0FB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
