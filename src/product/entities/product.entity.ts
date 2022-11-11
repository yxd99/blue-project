import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 30,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  description: string;

  @Column({
    type: 'text',
  })
  imageUrl: string;

  @Column({
    type: 'float',
  })
  price: number;

  @DeleteDateColumn({
    select: false,
  })
  deleteDate: string;
}
