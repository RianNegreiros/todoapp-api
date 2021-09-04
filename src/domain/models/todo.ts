import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user"

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  body: string

  @Column({
    default: false
  })
  isCompleted: boolean

  @ManyToOne(() => User)
  user: User
}