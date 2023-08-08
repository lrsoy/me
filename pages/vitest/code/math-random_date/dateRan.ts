// 测试当前时间是什么

export function currentDate(): string {
  const date = new Date().getDay()
  if (date === 5) {
    return `今天是星期${date}`
  }
  return `今天是星期${date}`
}