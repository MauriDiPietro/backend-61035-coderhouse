import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  products: Product[];
  constructor(){
    this.products = [];
  }
  create(product: Product): Product {
    this.products.push(product);
    return product
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: string): Product | null {
    const prod = this.products.find(product => product.id === id);
    if(!prod) return null;
    return prod
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
