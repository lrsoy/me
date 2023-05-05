interface Language {
  name: string;
  ext: string;
  aliases: string[];
}

const languageBash: Language = {
  name: 'bash',
  ext: 'sh',
  aliases: ['bash', 'sh', 'shell', 'zsh'],
};

const languageCsharp: Language = {
  name: 'csharp',
  ext: 'cs',
  aliases: ['cs', 'csharp'],
};

const languageDocker: Language = {
  name: 'docker',
  ext: 'docker',
  aliases: ['docker', 'dockerfile'],
};

const languageFsharp: Language = {
  name: 'fsharp',
  ext: 'fs',
  aliases: ['fs', 'fsharp'],
};

const languageJavascript: Language = {
  name: 'javascript',
  ext: 'js',
  aliases: ['javascript', 'js'],
};

const languageKotlin: Language = {
  name: 'kotlin',
  ext: 'kt',
  aliases: ['kotlin', 'kt'],
};

const languageMarkdown: Language = {
  name: 'markdown',
  ext: 'md',
  aliases: ['markdown', 'md'],
};

const languagePython: Language = {
  name: 'python',
  ext: 'py',
  aliases: ['py', 'python'],
};

const languageRuby: Language = {
  name: 'ruby',
  ext: 'rb',
  aliases: ['rb', 'ruby'],
};

const languageRust: Language = {
  name: 'rust',
  ext: 'rs',
  aliases: ['rs', 'rust'],
};

const languageStylus: Language = {
  name: 'stylus',
  ext: 'styl',
  aliases: ['styl', 'stylus'],
};

const languageTypescript: Language = {
  name: 'typescript',
  ext: 'ts',
  aliases: ['ts', 'typescript'],
};

const languageYaml: Language = {
  name: 'yaml',
  ext: 'yml',
  aliases: ['yaml', 'yml'],
};

export {
  languageBash,
  languageCsharp,
  languageDocker,
  languageFsharp,
  languageJavascript,
  languageKotlin,
  languageMarkdown,
  languagePython,
  languageRuby,
  languageRust,
  languageStylus,
  languageTypescript,
  languageYaml,
};
