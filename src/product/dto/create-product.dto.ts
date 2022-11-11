import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, MaxLength } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  description: string;

  imageUrl: File;

  @ApiProperty()
  @IsNumber()
  price: number;
}
