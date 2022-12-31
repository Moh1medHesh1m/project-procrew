import { UnauthorizedException } from '@nestjs/common/exceptions';
import { ProductUpdateDto } from './productUpdate.dto';
import { ProductService } from './product.service';
import { Controller, Post, Body, Get, Put, Param, Delete, Req } from '@nestjs/common';
import { AddProductDto } from './product.dto'; import { JwtService } from '@nestjs/jwt';
@Controller('product')
export class ProductController {

    constructor(
        private readonly ProductService: ProductService, private jwtService: JwtService,
    ) { }

    @Post()
    async createProduct(@Req() request: any, @Body() addProductDto: AddProductDto) {
        const data = await this.jwtService.verifyAsync(request.cookies['jwt'])
        return await this.ProductService.createProduct(data.id, addProductDto)
    }
    @Get("all")
    getAllProducts() {
        return this.ProductService.readProduct()
    }
    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() productUpdateDto: ProductUpdateDto) {
        return await this.ProductService.updateProduct(id, productUpdateDto)

    }
    @Delete(':id')
    async deleteProduct(@Param('id') id: string) {
        return await this.ProductService.deleteProduct(id)
    }
    @Get("/")
    async getMyProducts(@Req() request: any) {
        if (!request.cookies['jwt']) throw new UnauthorizedException("t7")
        const data = await this.jwtService.verifyAsync(request.cookies['jwt'])
        return await this.ProductService.getProductsById(data.id)
    }
    @Get("/:id")
    async getRestaurantProduct(@Param('id') id: string ,@Req() request: any) {
       
        return await this.ProductService.getProductsById(id)
    }

}
