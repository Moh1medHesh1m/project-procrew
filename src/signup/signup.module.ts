import { SignupSchema } from './signup.model';
import { Schema } from '@nestjs/mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';
import { JwtModule } from '@nestjs/jwt/dist';
@Module({
  imports : [
    MongooseModule.forFeature([
      {
        name: "Signup",
        schema: SignupSchema
      },
      
    ]
    ),
    JwtModule.register({
      secret:"secret",
      signOptions:{expiresIn:'1d'}
    })
  ],
  controllers: [SignupController],
  providers: [SignupService]
})
export class SignupModule {}
