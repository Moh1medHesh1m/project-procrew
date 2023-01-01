import { RestaurantService } from './restaurant.service';
import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { RestaurantSchema } from './restaurant.models';

import { JwtModule } from '@nestjs/jwt/dist';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'restaurant', schema: RestaurantSchema }]),

  JwtModule.register({
    secret: "secret",
    signOptions: { expiresIn: '1d' }
  })
  ],

  controllers: [RestaurantController],
  providers: [RestaurantService],
  exports: [RestaurantService]
})
export class RestaurantModule { }
