import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'user' })
export class User {

  newtype: 'User'

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('timestamp', { name: 'created_at', default: () => 'now()' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Column('text', { name: 'user_name' })
  userName: string

  @Column('text', { name: 'password' })
  password: string

  @Column('boolean', { name: 'admin' })
  admin: boolean

}