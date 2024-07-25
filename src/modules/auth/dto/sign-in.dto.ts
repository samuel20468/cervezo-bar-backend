import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  /**
   * La contraseña del Usuario o Administrador
   * @example "Password123"
   */
  @IsNotEmpty()
  @IsString()
  password: string;
}
