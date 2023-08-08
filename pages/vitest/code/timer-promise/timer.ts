// 1. 处理延时器
export class SetTimeOut {
  id: string;
  constructor(id: string) {
    this.id = id;
  }
  getSetTimeOut(callback: (data: any) => void, delay: number) {
    setTimeout(() => {
      callback(this.id)
    }, delay);
  }
}

// 2. 处理定时器

export function timer() {
  setInterval(() => {
    console.log('aaa');
  }, 100)
}