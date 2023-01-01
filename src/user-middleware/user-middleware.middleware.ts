import { SignupService } from './../signup/signup.service';
import { RestaurantService } from './../restaurant/restaurant.service';
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService, private signupService: SignupService) { }

  async use(req: any, res: any, next: () => void) {
    console.log(req.cookies['jwt'])
    if (!req.cookies['jwt']) throw new UnauthorizedException("t7")
    const data = await this.jwtService.verifyAsync(req.cookies['jwt'])
    if (!data) { throw new UnauthorizedException("t7") }
    const restaurant = this.signupService.findOneById(data.id)
    if (!restaurant) { throw new UnauthorizedException("t7") }
    next();
  }
}
