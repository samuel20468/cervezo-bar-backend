import { Injectable, UnauthorizedException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ADMIN_PASS, CLIENT_PASS, ROLE } from 'src/utils/constants';
import verifyPassword from 'src/helpers/verifyHashedPassword';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwt(password: string) {
    console.log(password);

    const verifyClient: boolean = await verifyPassword(password, CLIENT_PASS);
    const verifyAdmin: boolean = await verifyPassword(password, ADMIN_PASS);

    if (verifyClient) {
      const sessionId: string = uuidv4();
      const payload = {
        sessionId,
        lastSongAdded: 0,
        roles: [ROLE.CLIENT],
      };
      const accessToken = this.jwtService.sign(payload, { expiresIn: '2h' });

      return { accessToken };
    } else if (verifyAdmin) {
      const sessionId: string = uuidv4();
      const payload = {
        sessionId,
        roles: [ROLE.ADMIN],
      };
      const accessToken = this.jwtService.sign(payload, { expiresIn: '1y' });

      return { accessToken };
    } else {
      throw new UnauthorizedException('Contraseña inválida');
    }
  }
}
