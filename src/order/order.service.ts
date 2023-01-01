import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OrderDocument, State } from './order.models';

import { Model } from 'mongoose'
import { CreateOrderDto, OrderProductDto } from './order.dto/createOrder.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel('order') private readonly ordertModel: Model<OrderDocument>
    ) {

    }
    async createProduct(user: string, createOrderDto: CreateOrderDto) {
        console.log(createOrderDto)
        const newOrder = new this.ordertModel({
            user,
            ...createOrderDto
        })
        return await newOrder.save()
    }

    async getOrderClient(id: string) {
        return await this.ordertModel.find({ user: id })
    }
    async getOrderRestaurant(id: string) {
        return await this.ordertModel.find({ restaurant: id })
    }

    async updateOrder(id, data) {
        return this.ordertModel.findByIdAndUpdate(id, data, { new: true })
    }
}
