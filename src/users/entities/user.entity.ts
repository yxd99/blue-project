import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 20
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 20
  })
  lastName: string;

  @Column({
    type: 'text',
    unique: true
  })
  email: string;

  @DeleteDateColumn({
    select: false
  })
  deleteDate: string;
}
