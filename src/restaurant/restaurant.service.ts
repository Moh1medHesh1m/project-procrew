import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Restaurant, RestaurantDocument } from './restaurant.models';
import { CreateRestaurant } from './restaurant.dto';
import * as bcrypt from 'bcrypt'


@Injectable()
export class RestaurantService {
    constructor(
        @InjectModel('restaurant') private readonly restaurantModel: Model<RestaurantDocument>
    ) {

    }
    async Signup(createRestaurant: CreateRestaurant) {
        const newResturant = new this.restaurantModel({
            name: createRestaurant.name,
            password: await bcrypt.hash(createRestaurant.password, 10),
            type: createRestaurant.type
        })
        try {
            return await newResturant.save()
        }
        catch (error) { console.error(error); return error }
    }


    // async createRestaurant(createRestaurant: CreateRestaurant) {
    //     const newResturant = new this.restaurantModel(createRestaurant)
    //     return newResturant.save()
    // }

    async readProduct(page: number) {
        return this.restaurantModel.find({}).limit(4)
            .skip(4 * page).
            then((Product) => { return Product }).catch((err) => console.log(err))
    }
    async findone(condition: any) {
        return this.restaurantModel.findOne(condition)
    }
    async findOneById(id: string) {
        return this.restaurantModel.findOne({ _id: id })
    }
    async pagination(page: number) {
        return this.restaurantModel.find()

    }

    async search(name : string) {
        return this.restaurantModel.find({name})
    }

}
