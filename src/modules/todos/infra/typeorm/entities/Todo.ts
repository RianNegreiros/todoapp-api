import { User } from '@modules/users/infra/typeorm/entities/User'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm'

@Entity('todos')
class Todo {
  @PrimaryColumn()
  id: string

  @Column()
  body: string

  @Column()
  isCompleted: boolean

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @CreateDateColumn()
  created_at: Date

  constructor() {
    this.isCompleted = false
  }
}

export { Todo }
