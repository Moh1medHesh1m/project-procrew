
import { OrderController } from './order.controller';
import { OrderSchema } from './order.models';
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { OrderService } from './order.service';
import { ProductSchema } from 'src/product/product.models';
import { RestaurantSchema } from 'src/restaurant/restaurant.models';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'restaurant', schema: RestaurantSchema }]),
    MongooseModule.forFeature([{ name: 'product', schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: 'order', schema: OrderSchema }]),

    JwtModule.register({
      secret: "secret",
      signOptions: { expiresIn: '1d' }
    })
  ],

  controllers: [OrderController],
  providers: [OrderService],
  // exports:[]s
})
export class OrderModule { }
