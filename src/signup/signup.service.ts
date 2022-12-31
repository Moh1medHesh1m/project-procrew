import {  SignupModel } from './signup.model';
import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import * as bcrypt from 'bcrypt'

interface User{
    username : string,
    password: string,
}

@Injectable()
export class SignupService {
    constructor(
        @InjectModel("Signup") private SignupModel : Model<SignupModel>,
        
    ){}
   async Signup(user:User){
        const newUser = new this.SignupModel({
            username: user.username,
            password : await bcrypt.hash(user.password,10)
        })
        try{
            await newUser.save()
        }
        catch(error){console.error();}
        
    }
    async findone(condition:any){
        return this.SignupModel.findOne(condition)
      }
      async findOneById(id: string) {
        return this.SignupModel.findOne({ _id: id })
    }
}
