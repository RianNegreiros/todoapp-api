import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Todo } from "./todo";

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  password: string

  @ManyToOne(() => Todo, todo => todo.user)
  todos: Todo[]
}