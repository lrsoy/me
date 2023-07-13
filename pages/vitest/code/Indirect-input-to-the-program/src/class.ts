import { User } from './config'

// export class User {
//   age: number = 18
//   name: string = '小明'
//   getAge() {
//     return this.age
//   }
// }


export const testClassAttribute = () => {
  const user = new User()

  return user.age * 10
}


export const testClassFunc = () => {
  const user = new User()

  return user.getAge() * 10
}