import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MaxLength(20)
  name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(20)
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
