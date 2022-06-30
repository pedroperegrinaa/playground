interface User {
    name: string;
    age: number;
}

export class MyDatabaseClassic {
  private static instance : MyDatabaseClassic | null = null
  private users: User[] = []

  private constructor () {}

  static getInstance (): MyDatabaseClassic {
    if (MyDatabaseClassic.instance === null) {
      MyDatabaseClassic.instance = new MyDatabaseClassic()
    }
    return MyDatabaseClassic.instance
  }

  add (user : User):void {
    this.users.push(user)
    console.log(user)
  }

  remove (index: number): void {
    this.users.splice(index, 1)
    console.log(this.users)
  }

  show (): void {
    for (const user of this.users) {
      console.log(user)
    }
  }
}

const myDatabaseClassic = MyDatabaseClassic.getInstance()

myDatabaseClassic.add({ name: 'John', age: 20 })
myDatabaseClassic.add({ name: 'Jane', age: 21 })
myDatabaseClassic.add({ name: 'Joe', age: 22 })
