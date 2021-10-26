import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from '@modules/users/infra/typeorm/entities/User'

@Entity('todos')
class Todo {
  @PrimaryGeneratedColumn('increment')
  readonly id?: string

  @Column()
  body: string

  @Column({
    default: false,
  })
  isCompleted: boolean

  @CreateDateColumn()
  created_at: Date

  @ManyToOne(() => User)
  user: User
}

export { Todo }
