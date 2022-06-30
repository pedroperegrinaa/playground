import { MyDatabaseClassic } from './my-database-classic'
import './module_a.ts'

const myDatabaseClassic = MyDatabaseClassic.getInstance()

myDatabaseClassic.add({ name: 'Roberto', age: 20 })
myDatabaseClassic.add({ name: 'Natal', age: 21 })
myDatabaseClassic.add({ name: 'totriste', age: 22 })
// MyDatabaseClassic.getInstance().show()
