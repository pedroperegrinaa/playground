import { MyDatabaseClassic } from './my-database-classic'

const myDatabaseClassic = MyDatabaseClassic.getInstance()

myDatabaseClassic.add({ name: 'John', age: 20 })
myDatabaseClassic.add({ name: 'Jane', age: 21 })
myDatabaseClassic.add({ name: 'Joe', age: 22 })
