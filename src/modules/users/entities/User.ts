import { v4 as uuidV4 } from 'uuid'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Todo } from '@/modules/todos/entities/Todo'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id?: string

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  password: string

  @CreateDateColumn()
  created_at: Date

  @ManyToOne(() => Todo, (todo) => todo.user)
  todos?: Todo[]

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { User }
