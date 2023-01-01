import { OrderService } from './order.service';
import { Body, Controller, Post, Req, Get, UnauthorizedException, Put, Param } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateOrderDto } from './order.dto/createOrder.dto';
import { OrderUpdateDto } from './orderUpdate.dto';

@Controller('order')
export class OrderController {

    constructor(
        private readonly orderService: OrderService,
        private jwtService: JwtService

    ) {

    }
    @Post()
    async createOrder(@Req() request: any, @Body() createOrderDto: CreateOrderDto) {
        const data = await this.jwtService.verifyAsync(request.cookies['jwt'])
        return await this.orderService.createProduct(data.id, createOrderDto)
    }

    @Get()
    async getClientOrder(@Req() request: any) {
        if (!request.cookies['jwt']) throw new UnauthorizedException("t7")
        console.log("lol")
        const data = await this.jwtService.verifyAsync(request.cookies['jwt'])
        return await this.orderService.getOrderClient(data.id)
    }
    @Get("/restaurant")
    async getRestaurantOrder(@Req() request: any) {
        if (!request.cookies['jwt']) throw new UnauthorizedException("t7")
    
        console.log(request)
        const data = await this.jwtService.verifyAsync(request.cookies['jwt'])
        console.log(data)
        return await this.orderService.getOrderRestaurant(data.id)
    }

    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() orderUpdateDto: OrderUpdateDto) {
        return await this.orderService.updateOrder(id, orderUpdateDto)

    }
}
