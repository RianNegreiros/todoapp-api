import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('todos')
class Todo {
  @PrimaryGeneratedColumn('increment')
  readonly id: string

  @Column()
  body: string

  @Column({
    default: false,
  })
  isCompleted: boolean

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if(!this.isCompleted) {
      this.isCompleted = false
    }
  }
}

export { Todo }
