import { Restaurant } from './../restaurant/restaurant.models';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';

export type ProductDocument = Product & Document

@Schema()
export class Product {

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    price: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Restaurant.name })
    @Type(() => Restaurant)
    restaurant: Restaurant;

}

export const ProductSchema = SchemaFactory.createForClass(Product)