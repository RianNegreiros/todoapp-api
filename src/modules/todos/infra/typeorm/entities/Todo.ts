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

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  user_id: string

  @Column()
  body: string

  @Column()
  isCompleted: boolean

  @CreateDateColumn()
  created_at: Date

  constructor() {
    this.isCompleted = false
  }
}

export { Todo }
