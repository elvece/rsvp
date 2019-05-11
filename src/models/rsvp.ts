import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'rsvp' })
export class Rsvp {

  newtype: 'Rsvp'

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('timestamp', { name: 'created_at', default: () => 'now()' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Column('text', { name: 'first_name' })
  firstName: string

  @Column('text', { name: 'last_name' })
  lastName: string

  @Column('text', { name: 'email', unique: true })
  email: string

  @Column('text', { name: 'phone' })
  phone: string

  @Column('boolean', { name: 'reply' })
  reply: boolean

  @Column('text', { name: 'note', nullable: true })
  note: string
}
