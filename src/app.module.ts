import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryProvider } from './cloudinary/cloudinary.provider';
import { Product } from './product/entities/product.entity';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      entities: [Product],
      synchronize: true,
    }),
    CloudinaryModule,
    ProductModule,
  ],
  providers: [CloudinaryProvider],
})
export class AppModule {
  constructor(private readonly dataSource: DataSource) {}
}
