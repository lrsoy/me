export const obj = {
  name: '小明',
  status: false,
  ageLogFun() {
    return this.status
  }
}


export const objKeyTest = () => {
  if (obj.status === true) {
    return 18
  }
  return '错误信息'
}

export const objFuncTest = () => {
  return obj.ageLogFun() ? 'yes' : 'no'
}