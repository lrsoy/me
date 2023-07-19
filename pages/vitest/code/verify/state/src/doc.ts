import { Databases, } from './config'


export class UserService {

  constructor(private databases: Databases) { }

  createUser(name: string) {
    const id = Math.floor(Math.random() * 1000)
    const userObj = { id, name }
    this.databases.addUser(userObj)
    return userObj
  }
}