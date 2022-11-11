import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  async create(createUserDto: CreateUserDto): Promise<object> {
    await this.throwIfEmailExist(createUserDto.email);
    await this.userRepository.save(createUserDto);
    return {
      message: `user has been created`
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if(!(!!user)) throw new NotFoundException([`user with id ${ id } don't exist`]);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<object> {
    if(!(!!Object.keys(updateUserDto).length)) throw new BadRequestException(['data empty']);
    await this.findOne(id);
    if(updateUserDto.email) await this.throwIfEmailExist(updateUserDto.email);
    await this.userRepository.update(id, updateUserDto);
    return {
      message: `user ${ id } has been updated`
    };
  }

  async remove(id: number): Promise<object> {
    await this.findOne(id)
    await this.userRepository.softDelete(id);
    return {
      message: `User ${ id } has been deleted`
    }
  }

  async throwIfEmailExist(email: string): Promise<void>{
    const _ = await this.userRepository.findBy({email});
    if(!!Object.keys(_).length) throw new BadRequestException([`the email ${ email } already exist`]);
  }
}
