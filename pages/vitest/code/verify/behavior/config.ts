interface User {
  id: number,
  name: string
}

export class Databases {

  private database: User[] = []

  addUser(user: User): void {
    this.database.push(user)
  }

  getDatabase(id: number): User | undefined {
    return this.database.find(f => f.id === id)
  }
}