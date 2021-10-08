import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Todo } from "./Todo"

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id?: number

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  password: string

  @ManyToOne(() => Todo, todo => todo.user)
  todos?: Todo[]


}

export { User }