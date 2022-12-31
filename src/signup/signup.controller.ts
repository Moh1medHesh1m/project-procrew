import { SignupDto } from './signup.dto';
import { SignupService } from './signup.service';
import { Controller, Post, Body, Res, Get, Req } from '@nestjs/common';
import { BadRequestException, UnauthorizedException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Controller('api')
export class SignupController {
    constructor(
        private readonly signupService: SignupService,
        private jwtService: JwtService
    ) {

    }
    @Post('signup')
    Signup(@Body() signupDto: SignupDto) {
        return this.signupService.Signup(signupDto)
    }

    @Post('login')
    async login(
        @Body('username') username: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response
    ) {
        const user = await this.signupService.findone({ username })
        console.log('sad')
        if (!user) {
            throw new BadRequestException('invalid credationals')

        }
        if (! await bcrypt.compare(password, user.password)) {
            throw new BadRequestException('invalid password')
        }
        const jwt = await this.jwtService.signAsync({ id: user.id })
        response.cookie('jwt', jwt, { httpOnly: true })
        console.log(jwt)
        return {
            message: 'success', jwt
        }
    }
    @Get('user')
    async user(@Req() request: Request) {
        try {
            const cookie = request.cookies['jwt']

            const data = await this.jwtService.verifyAsync(cookie)

            const user = await this.signupService.findOneById(data.id)

            return user

        }
        catch (e) {
            throw new UnauthorizedException()
        }
    }
    
    

    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt')


        return {
            message: 'logged out'
        }
    }



}
