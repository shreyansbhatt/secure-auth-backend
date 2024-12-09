import { Controller, Post, Body, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserDto {
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @MinLength(8)
    password: string;
  
    @IsNotEmpty()
    name: string;
  }

@Controller('auth')
export class AuthController {
    private readonly logger: Logger;
  constructor(private readonly authService: AuthService) {
    this.logger = new Logger(AuthController.name);
  }

  /**
   * Handles user registration.
   * @param userDto - User registration data.
   * @returns The newly created user.
   */
  @Post('register')
  async register(@Body() userDto: UserDto) {
    this.logger.log(`Incoming registration request for email: ${userDto.email}`);
    return this.authService.register(userDto);
  }
  /**
   * Handles user login.
   * @param userDto - User login data.
   * @returns JWT access token if credentials are valid.
   */
  @Post('login')
  async login(@Body() userDto: UserDto) {
    this.logger.log(`Incoming login request for email: ${userDto.email}`);
    // Perform manual sanitization if necessary (example shown)
    const sanitizedEmail = userDto.email.trim(); // Remove leading/trailing whitespace
    const sanitizedPassword = userDto.password.trim();

    const user = await this.authService.validateUser(sanitizedEmail, sanitizedPassword);
    if (!user) {
      // Throw exception if authentication fails
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
