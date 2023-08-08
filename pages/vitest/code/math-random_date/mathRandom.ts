// 随机数的测试: 函数接收一个 长度值 感觉长度值循环随机从字符串中获取一个字符然后赋值给str

export function matchRandomCreateStr(lang: number): string {
  let str = ""
  const character = 'jdlkajlkcxznmfhkjshdfjkaduiasuirejkl'
  for (let index = 0; index < lang; index++) {
    const idx = Math.floor(Math.random() * character.length)
    str += character.charAt(idx)
  }
  return str
}