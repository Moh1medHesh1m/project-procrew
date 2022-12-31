import { JwtModule } from '@nestjs/jwt/dist';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ProductSchema } from './product.models';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { RestaurantSchema } from 'src/restaurant/restaurant.models';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'product', schema: ProductSchema }]), JwtModule.register({
            secret: "secret",
            signOptions: { expiresIn: '1d' }
        }), MongooseModule.forFeature([{ name: 'restaurant', schema: RestaurantSchema }]),
    ],
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule { }
