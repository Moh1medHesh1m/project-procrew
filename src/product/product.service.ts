import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { Product, ProductDocument } from './product.models';
import { AddProductDto } from './product.dto';
@Injectable()
export class ProductService {
    constructor(
        @InjectModel('product') private readonly productModel: Model<ProductDocument>

    ) {

    }
    async createProduct(addProductDto: AddProductDto) {
        const newProduct = new this.productModel(addProductDto)
        return newProduct.save()
    }

    async readProduct(){
        return this.productModel.find({}).
        then((Product)=>{return Product}).catch((err)=>console.log(err))
    }

}
