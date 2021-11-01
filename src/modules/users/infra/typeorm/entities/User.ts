import { Todo } from '@modules/todos/infra/typeorm/entities/Todo'
import { v4 as uuidV4 } from 'uuid'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm'

@Entity('users')
class User {
  @PrimaryColumn('uuid')
  readonly id: string

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  password: string
  
  @ManyToOne(() => Todo)
  @JoinTable({
    name: 'todos_user',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'todo_id' }],
  })
  todos: Todo[]

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { User }
