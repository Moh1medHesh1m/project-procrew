import { JwtModule } from '@nestjs/jwt';

import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SignupModule } from './signup/signup.module';
import { ProductModule } from './product/product.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { OrderModule } from './order/order.module';
import { RestaurantMiddleware } from './restaurant-middleware/restaurant-middleware.middleware';


@Module({

  imports: [
    MongooseModule.forRoot("mongodb+srv://mohamed-hesham:12345@cluster0.nulomd6.mongodb.net/restaurant?retryWrites=true&w=majority"),
    SignupModule,
    ProductModule,
    RestaurantModule,
    OrderModule,
    JwtModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RestaurantMiddleware)
      .exclude(
        { path: 'restaurant/login', method: RequestMethod.POST },
        { path: 'restaurant', method: RequestMethod.POST },
        'restaurant/(.*)',
      )
  }
}
