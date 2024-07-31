import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { JWT_SECRET } from 'src/utils/constants';
import moment from 'moment';

@Injectable()
export class AddSongGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1] ?? '';

    if (!token) throw new UnauthorizedException('Se requiere token');

    try {
      const payload = this.jwtService.verify(token, { secret: JWT_SECRET });

      const lastSongAdded = payload.lastSongAdded;
      const now = moment().unix();

      if (lastSongAdded === 0) return true;

      if (now - lastSongAdded < 900)
        throw new ForbiddenException(
          'Solo puedes añadir canciones cada 15 minutos',
        );
        
      return true;
    } catch (error) {
      throw Error(error.message);
    }
  }
}
