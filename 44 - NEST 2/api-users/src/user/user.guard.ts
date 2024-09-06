import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private JwtService: JwtService) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    //Bearer sdfsdfsdfsdfsdfsdfdf23874y234uh23
    //[type: Bearer, token: sdfsdfsdfsdfsdfsdfdf23874y234uh23]
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if(!token) throw new UnauthorizedException('Unauthorized');
    try {
      const payload = await this.JwtService.verify(token, { secret: 'jwt-secret' });
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
    return true;
  }
}
