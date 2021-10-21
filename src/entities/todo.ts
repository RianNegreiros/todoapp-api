import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  readonly id: number

  @Column()
  body: string

  @Column({
    default: false
  })
  isCompleted: boolean

  @ManyToOne(() => User)
  user: User
}