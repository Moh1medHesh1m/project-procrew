import { Product } from './../product/product.models';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import {Type} from 'class-transformer'
export type RestaurantDocument = Restaurant & Document

@Schema()
export class Restaurant {

    @Prop()
    @Prop({ unique: true })
    name: string;

    @Prop()
    type: string;

    @Prop()
    image: string;
    @Prop({ unique: true })
    password: String;

    // @Type(()=>Product)
    // products:Product[
    // ]

}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant)