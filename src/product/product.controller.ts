import { ProductService } from './product.service';
import { Controller, Post, Body,Get } from '@nestjs/common';
import { Product } from './product.models';
import { AddProductDto } from './product.dto';
import { get } from 'http';
@Controller('product')
export class ProductController {

    constructor(
        private readonly ProductService: ProductService,

    ) {

    }
    @Post()
    async createUser(@Body() addProductDto: AddProductDto) {
        return this.ProductService.createProduct(addProductDto)


    }
    @Get()
    readPrduct(){
        return this.ProductService.readProduct()
    }

}
