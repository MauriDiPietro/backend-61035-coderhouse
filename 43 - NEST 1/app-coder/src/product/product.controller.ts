import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() product: Product) {
    try {
      return this.productService.create(product);
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }

  @Get()
  findAll() {
    try {
      return this.productService.findAll();
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      console.log(id)
      const prod = this.productService.findOne(id);
      console.log(prod)
      if(!prod) throw new HttpException('Product not found', 404)
      else return prod
    } catch (error) {
      throw new HttpException(error.message, 500)

    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
