import { Todo } from '@modules/todos/infra/typeorm/entities/Todo'
import { v4 as uuidV4 } from 'uuid'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  password: string

  @CreateDateColumn()
  created_at: Date

  @ManyToOne(() => Todo)
  @JoinColumn({
    name: "todo_id"
  })
  todos: Todo[]

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
    this.todos = []
  }
}

export { User }
