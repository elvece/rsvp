import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, PrimaryColumn } from 'typeorm'

@Entity({ name: 'session' })
export class Session {

  newtype: 'Session'

  @PrimaryColumn('text', { name: 'sid' })
  sid: string

  @Column('timestamp', { name: 'created_at', default: () => 'now()' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Column('timestamp', { name: 'expire', nullable: false })
  expire: Date

  @Column('json', { name: 'sess' })
  sess: JSON

}