import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Todo } from "../../todos/entities/Todo"

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id?: number

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