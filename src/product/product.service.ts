import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    private cloudinary: CloudinaryService,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async uploadImageToCloudinary(file: Express.Multer.File) {
    return await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll(): Promise<Product[]> {
    const products: Array<Product> = await this.productsRepository.find();
    if (!products.length) throw new NotFoundException('Not found Products');
    return products;
  }

  async findOne(id: number): Promise<Product> {
    const product: Product = await this.productsRepository.findOneBy({ id });
    if (!product)
      throw new NotFoundException([`product with id ${id} don't exist`]);
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
