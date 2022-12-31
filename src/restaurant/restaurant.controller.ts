
import { RestaurantService } from './restaurant.service';
import { Controller, Post, Body, Get, Put, Param, Delete, Req, Res } from '@nestjs/common';
import { CreateRestaurant } from './restaurant.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { BadRequestException, UnauthorizedException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt'




@Controller('restaurant')
export class RestaurantController {
    constructor(
        private readonly RestaurantService: RestaurantService,
        private jwtService: JwtService

    ) {

    }
    @Post()
    Signup(@Body() createRestaurant: CreateRestaurant) {
        return this.RestaurantService.Signup(createRestaurant)
    }

    @Get()
    async user(@Req() request: Request) {
        try {
            const cookie = request.cookies['jwt']

            const data = await this.jwtService.verifyAsync(cookie)

            const user = await this.RestaurantService.findOneById(data.id)

            return user

        }
        catch (e) {
            throw new UnauthorizedException()
        }
    }

    @Get("all/:page")
    getAllResturant(@Param('page') page) {
        return this.RestaurantService.readProduct(page)
    }

    @Post('login')
    async login(
        @Body('name') name: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response

    ) {
        const user = await this.RestaurantService.findone({ name })
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

    @Get("/paginate/:page")
    getPaginatedResturant(@Param('page') page) {
        console.log(page)
        return this.RestaurantService.pagination(page)
    }
    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt')


        return {
            message: 'logged out'
        }
    }
}
