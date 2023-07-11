
export const num1 = () => {
  return 10
}

export const num2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(10)
    }, 0)
  })
}

