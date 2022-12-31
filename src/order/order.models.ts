import { Restaurant } from './../restaurant/restaurant.models';
import { Signup } from './../signup/signup.model';

import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Product } from 'src/product/product.models';

export type OrderDocument = Order & Document
export enum State {
    Preparing,
    Delivering,
    Delivered
}
@Schema()
export class Order {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Signup.name })
    @Type(() => Signup)
    user: Signup;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Restaurant.name })
    @Type(() => Restaurant)
    restaurant: Restaurant;

    @Prop({ type: String, enum: State, default: State.Preparing })
    state: State


    // @Prop({
    //     type: [{ type: mongoose.Schema.Types.ObjectId, ref: Product.name }],
    // })
    // @Type(() => Product)
    // products: Product;


    @Prop({
        type: [{ quantity: { type: Number }, price: { type: Number }, product: { type: mongoose.Schema.Types.ObjectId } }]
    })
    products: { quantity: number; price: number; product: Product }[];

    @Prop()
    total: number


}

export const OrderSchema = SchemaFactory.createForClass(Order)