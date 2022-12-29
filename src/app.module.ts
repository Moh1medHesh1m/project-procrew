
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SignupModule } from './signup/signup.module';
import { ProductModule } from './product/product.module';


@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://mohamed-hesham:12345@cluster0.nulomd6.mongodb.net/restaurant?retryWrites=true&w=majority"),
    SignupModule,
    ProductModule
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
