import { Restaurant, RestaurantDocument } from './../restaurant/restaurant.models';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { Product, ProductDocument } from './product.models';
import { AddProductDto } from './product.dto';
@Injectable()
export class ProductService {

    constructor(
        @InjectModel('product') private readonly productModel: Model<ProductDocument>,
        @InjectModel('restaurant') private readonly restaurantModel: Model<RestaurantDocument>
    ) {

    }
    async createProduct(restaurantId: any, addProductDto: AddProductDto) {


        const restaurant = await this.restaurantModel.findById(restaurantId);
        console.log(restaurant)

        const newProduct = new this.productModel({ ...addProductDto, restaurant })
        console.log(newProduct)
        return newProduct.save()
    }

    async readProduct() {
        try {
            return await this.productModel.find({});
        } catch (err) {
            return console.log(err)
        }
    }
    async updateProduct(id, data) {
        return this.productModel.findByIdAndUpdate(id, data, { new: true })
    }
    async deleteProduct(id) {
        return this.productModel.findByIdAndDelete(id)
    }

    async getProductsById(id: string) {
        return await this.productModel.find({ restaurant: id })
    }

    async getAllProduct(id: string) {
        return await this.productModel.find({ restaurant: id })
    }

}
